"use client";

import { createContext, useState } from "react";

import type { Task, TaskContextType } from "@/types";

export const TaskContext = createContext<TaskContextType | null>(null);

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchInput, setSearchInput] = useState("");
  const changeSearchInput = (content: string) => setSearchInput(content);

  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [updatedTasks, setUpdatedTasks] = useState<Task[]>([]);

  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState<Task | null>(
    null
  );

  const priorityOptions = ["Low", "Medium", "High"];
  const [selectedPriority, setSelectedPriority] = useState(priorityOptions[0]);

  return (
    <TaskContext.Provider
      value={{
        searchInput,
        changeSearchInput,
        priorityOptions,
        selectedPriority,
        setSelectedPriority,
        createdTasks,
        setCreatedTasks,
        updatedTasks,
        setUpdatedTasks,
        selectedTaskToEdit,
        setSelectedTaskToEdit,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
