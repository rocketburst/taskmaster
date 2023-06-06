import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { env } from "@/env.mjs";
import { AIInputSchema, type OpenAIResponse } from "@/lib/validators";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  analytics: true,
  limiter: Ratelimit.slidingWindow(5, "3600s"),
});

export async function POST(req: NextRequest) {
  const { inputString } = AIInputSchema.parse(await req.json());
  const ip = req.headers.get("x-forwarded-for") ?? "";

  const { success, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        ["retry-after"]: `${retryAfter}`,
      },
    });
  }

  const summaryObject = (await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: inputString,
      max_tokens: 1024,
    }),
  }).then(res => res.json())) as OpenAIResponse;

  return NextResponse.json({ summaryObject, remainingUses: remaining });
}
