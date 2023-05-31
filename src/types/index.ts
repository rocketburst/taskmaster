import type { Models } from "appwrite";
import type { Dispatch, MouseEvent, SetStateAction } from "react";

import { OpenAIResponse } from "@/lib/validators";

export interface Task extends Models.Document {
  content: string;
  priority: "low" | "medium" | "high";
  userEmail: string;
  reminders?: string[];
  isCompleted: boolean;
}

export interface Reminder {
  id: string;
  content: string;
  reminder: string;
}

export type SortingMethod =
  | "None"
  | "Alphabetical (A - Z)"
  | "Alphabetical (Z - A)"
  | "Highest Priority";

export type ModalContextType = {
  changeModalVisibility: (modal: ModalType) => void;
  getModalState: (modal: ModalType) => boolean;
};

export type ModalType = "create" | "edit" | "sort" | "upload";

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
  selectedTaskToEdit: Task | null;
  setSelectedTaskToEdit: Dispatch<SetStateAction<Task | null>>;
  sortMethods: string[];
  selectedSortMethod: SortingMethod;
  setSelectedSortMethod: Dispatch<SetStateAction<SortingMethod>>;
  needToSort: boolean;
  changeNeedToSort: () => void;
  sortedTasks: Task[];
  setSortedTasks: Dispatch<SetStateAction<Task[]>>;
};

export type SummaryContextType = {
  createTaskSummary: () => Promise<OpenAIResponse>;
  handleSummarizeAction: (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => Promise<void>;
};
