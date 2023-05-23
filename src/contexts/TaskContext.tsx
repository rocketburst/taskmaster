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

  const priorityOptions = ["Low", "Medium", "High"];
  const [selectedPriority, setSelectedPriority] = useState(priorityOptions[0]);

  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);

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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
