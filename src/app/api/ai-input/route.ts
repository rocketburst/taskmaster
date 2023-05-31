import { NextResponse } from "next/server";

import { env } from "@/env.mjs";
import { adminDb } from "@/lib/admin";
import { getCurrentUser } from "@/lib/session";
import { PROMPT_STRING } from "@/lib/constants";
import type { Task } from "@/types";

export async function GET(req: Request) {
  const userEmail = (await getCurrentUser())?.email as string;

  const userTasks = await adminDb
    .listDocuments(
      env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID
    )
    .then(list => list.documents as Task[])
    .then(allTasks => allTasks.filter(task => task.userEmail === userEmail));

  let taskString = "";
  userTasks.forEach(
    task =>
      (taskString += `
  - ${task.content}, which has ${task.priority} priority`)
  );

  const inputString = PROMPT_STRING + taskString;
  return NextResponse.json({ inputString });
}
