import { ID } from "appwrite";

import { env } from "@/env.mjs";
import { db } from "./appwrite";
import type { Task } from "@/types";

export async function getAllTasks() {
  return await db
    .listDocuments(
      env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID
    )
    .then(data => data.documents as Task[]);
}

export async function getUserTasks(userEmail: string) {
  const allTasks = await getAllTasks();
  return allTasks.filter(task => task.userEmail === userEmail);
}

export async function createNewTask(
  content: string,
  priority: string,
  userEmail: string,
  reminders?: Date[]
) {
  await db.createDocument(
    env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID,
    ID.unique(),
    {
      content,
      priority,
      reminders,
      userEmail,
      isCompleted: false,
    }
  );
}
