"use client";

import { TaskContextType } from "@/types";
import { createContext, useState } from "react";

export const TaskContext = createContext<TaskContextType | null>(null);

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchInput, setSearchInput] = useState("");
  const changeSearchInput = (content: string) => setSearchInput(content);

  return (
    <TaskContext.Provider value={{ searchInput, changeSearchInput }}>
      {children}
    </TaskContext.Provider>
  );
}
