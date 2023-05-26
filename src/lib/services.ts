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
  const userTasks = allTasks.filter(task => task.userEmail === userEmail);
  const completedTasks = userTasks.filter(task => task.isCompleted);
  const incompleteTasks = userTasks.filter(task => task.isCompleted === false);

  return [...incompleteTasks, ...completedTasks];
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

export async function updateTaskCompletion(task: Task) {
  await db.updateDocument(task.$databaseId, task.$collectionId, task.$id, {
    isCompleted: !task.isCompleted,
  });
}

export async function updateTask(
  taskId: string,
  content: string,
  priority: string,
  userEmail: string,
  reminders?: Date[]
) {
  await db.updateDocument(
    env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID,
    taskId,
    {
      content,
      priority,
      reminders,
      userEmail,
    }
  );
}

export async function deleteTask(task: Task) {
  await db.deleteDocument(task.$databaseId, task.$collectionId, task.$id);
}
