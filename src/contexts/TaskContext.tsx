"use client";

import { createContext, useState } from "react";

import { AIInputSchema, OpenAIResponse } from "@/lib/validators";
import type { SortingMethod, Task, TaskContextType } from "@/types";
import { env } from "@/env.mjs";

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

  const getTaskSummary = async () => {
    const { inputString } = await fetch("/api/ai-input")
      .then(res => res.json())
      .then(json => AIInputSchema.parse(json));

    // TODO: uncomment when in final and add rate limitng
    // const summaryObject = (await fetch(
    //   "https://api.openai.com/v1/completions",
    //   {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //       Authorization: `Bearer ${env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       model: "text-davinci-003",
    //       prompt: inputString,
    //       max_tokens: 1024,
    //     }),
    //   }
    // ).then(res => res.json())) as OpenAIResponse;

    const summaryObject = {
      id: "cmpl-7LdZxaHICSn7Z3R1sEeMy4CULydOM",
      object: "text_completion",
      created: 1685391385,
      model: "text-davinci-003",
      choices: [
        {
          text: "Complete the dishes, wash the car.",
          index: 0,
          // logprobs: null,
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 73,
        completion_tokens: 28,
        total_tokens: 101,
      },
    } as OpenAIResponse;

    return summaryObject;
  };

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
        getTaskSummary,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
