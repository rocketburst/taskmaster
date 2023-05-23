import type { Models } from "appwrite";
import type { Dispatch, SetStateAction } from "react";

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

export type TaskContextType = {
  searchInput: string;
  changeSearchInput: (content: string) => void;
  priorityOptions: string[];
  selectedPriority: string;
  setSelectedPriority: Dispatch<SetStateAction<string>>;
  createdTasks: Task[];
  setCreatedTasks: Dispatch<SetStateAction<Task[]>>;
  updatedTasks: Task[];
  setUpdatedTasks: Dispatch<SetStateAction<Task[]>>;
};
