import { ID } from "appwrite";

import { env } from "@/env.mjs";
import { db } from "./appwrite";
import type { Reminder, Task } from "@/types";

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

export async function getUserReminders(userEmail: string) {
  const tasks = await getUserTasks(userEmail);

  const tasksWithReminders = tasks.filter(task => !!task.reminders);
  const tasksWithOneReminder = tasksWithReminders.filter(
    task => (task.reminders?.length as number) === 1
  );
  const tasksWithMoreThanOneReminder = tasksWithReminders.filter(
    task => (task.reminders?.length as number) > 1
  );

  const reminders: Reminder[] = [];

  tasksWithOneReminder
    .map(task => ({
      id: task.$id,
      content: task.content,
      reminder: (task.reminders as string[])[0],
    }))
    .forEach(reminder => reminders.push(reminder));

  tasksWithMoreThanOneReminder
    .map(task => {
      return (task.reminders as string[]).map(reminder => ({
        id: task.$id,
        content: task.content,
        reminder,
      }));
    })
    .map(reminderArray => {
      reminderArray.forEach(reminder => reminders.push(reminder));
    });

  return reminders;
}
