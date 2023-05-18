import { env } from "@/env.mjs";
import { db } from "./appwrite";
import { Task } from "@/types";

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
