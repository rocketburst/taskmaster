import "server-only";
import { ID } from "node-appwrite";

import { env } from "@/env.mjs";
import { adminDb } from "./admin";

export const adminBatchUploadTasks = async (
  tasks: string[],
  userEmail: string,
  priority: "high" | "medium" | "low"
) => {
  tasks.forEach(async task => {
    await adminDb.createDocument(
      env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID,
      ID.unique(),
      {
        content: task,
        priority,
        reminders: [],
        userEmail,
        isCompleted: false,
      }
    );
  });
};
