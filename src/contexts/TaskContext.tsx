"use client";

import { createContext, useState } from "react";

import type { SortingMethod, Task, TaskContextType } from "@/types";

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
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState<Task | null>(
    null
  );

  const priorityOptions = ["Low", "Medium", "High"];
  const [selectedPriority, setSelectedPriority] = useState(priorityOptions[0]);

  const sortMethods = [
    "None",
    "Alphabetical (A - Z)",
    "Alphabetical (Z - A)",
    "Highest Priority",
  ] satisfies SortingMethod[];
  const [selectedSortMethod, setSelectedSortMethod] = useState<SortingMethod>(
    sortMethods[0]
  );

  const [needToSort, setNeedToSort] = useState(false);
  const changeNeedToSort = () => setNeedToSort(!needToSort);

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
        sortMethods,
        selectedSortMethod,
        setSelectedSortMethod,
        needToSort,
        changeNeedToSort,
        sortedTasks,
        setSortedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
