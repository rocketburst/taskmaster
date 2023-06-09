import type { Models } from "appwrite";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import React from "react";

import { OpenAIResponse } from "@/lib/validators";

export type LayoutProps = {
  children: React.ReactNode;
};

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

export type ModalType = "create" | "edit" | "sort" | "upload" | "summary";

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
  createTaskSummary: () => Promise<void>;
  handleSummarizeAction: (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => Promise<void>;
};

export type StorageBucketResponse = {
  message?: string;
  error?: string;
  bucket?: {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    fileSecurity: boolean;
    name: string;
    enabled: boolean;
    maximumFileSize: number;
    allowedFileExtensions: string[];
    compression: string;
    encryption: boolean;
    antivirus: boolean;
  };
};

export type SummarizationResponse = Partial<{
  summaryObject: OpenAIResponse;
  remainingUses: number;
}>;
