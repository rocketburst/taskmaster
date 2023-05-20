import { Models } from "appwrite";

export interface Task extends Models.Document {
  content: string;
  priority: "low" | "medium" | "high";
  userEmail: string;
  reminders?: Date[];
  isCompleted: boolean;
}

export type ModalContextType = {
  changeModalVisibility: (modal: ModalType) => void;
  getModalState: (modal: ModalType) => boolean;
};

export type ModalType = "create" | "edit" | "sort";
