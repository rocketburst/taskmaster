import { NextResponse } from "next/server";

import { env } from "@/env.mjs";
import { adminDb } from "@/lib/admin";
import { getCurrentUser } from "@/lib/session";
import { Task } from "@/types";

export async function GET(req: Request) {
  const userEmail = (await getCurrentUser())?.email as string;

  const userTasks = await adminDb
    .listDocuments(
      env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID
    )
    .then(list => list.documents as Task[])
    .then(allTasks => allTasks.filter(task => task.userEmail === userEmail));

  const promptString = `I have a couple tasks I need to do. They are listed below. Can you summarize them into a neat and concise sentence? Can you make sure the tasks are mentioned by order of priority (highest to lowest) without mentioning the tasks' priorities in your response?`;

  let taskString = "";
  userTasks.forEach(
    task =>
      (taskString += `
  - ${task.content} (${task.priority} priority)`)
  );

  const inputString = promptString + taskString;
  return NextResponse.json({ inputString });
}
