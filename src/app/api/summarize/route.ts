import { env } from "@/env.mjs";
import { AIInputSchema, OpenAIResponse } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { inputString } = AIInputSchema.parse(await req.json());

  // TODO: uncomment when in final and add rate limitng
  // const summaryObject = (await fetch("https://api.openai.com/v1/completions", {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //     Authorization: `Bearer ${env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     model: "text-davinci-003",
  //     prompt: inputString,
  //     max_tokens: 1024,
  //   }),
  // }).then(res => res.json())) as OpenAIResponse;

  const summaryObject = {
    id: "cmpl-7LdZxaHICSn7Z3R1sEeMy4CULydOM",
    object: "text_completion",
    created: 1685391385,
    model: "text-davinci-003",
    choices: [
      {
        text: "Complete the dishes, wash the car.",
        index: 0,
        // logprobs: null,
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 73,
      completion_tokens: 28,
      total_tokens: 101,
    },
  } as OpenAIResponse;

  return NextResponse.json({ summaryObject });
}
