import { NextResponse } from "next/server";

import { adminBatchUploadTasks } from "@/lib/server-utils";

export async function POST(req: Request) {
  const { highTasks, mediumTasks, lowTasks }: Record<any, string[]> =
    await req.json();
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

  await Promise.all([
    adminBatchUploadTasks(highTasks, userEmail as string, "high"),
    adminBatchUploadTasks(mediumTasks, userEmail as string, "medium"),
    adminBatchUploadTasks(lowTasks, userEmail as string, "low"),
  ]);

  console.log(highTasks, mediumTasks, lowTasks);
  return NextResponse.json({ highTasks, mediumTasks, lowTasks });
}
