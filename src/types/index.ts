import { Models } from "appwrite";

export interface Task extends Models.Document {
  content: string;
  priority: "low" | "medium" | "high";
  userEmail: string;
  reminders?: Date[];
  isCompleted: boolean;
}
