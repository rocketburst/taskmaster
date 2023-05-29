"use client";

import { PlusCircleIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { CloudIcon } from "@heroicons/react/24/outline";
import { useContext, type MouseEvent } from "react";

import { ModalContext } from "@/contexts/ModalContext";
import { TaskContext } from "@/contexts/TaskContext";
import type { ModalContextType, TaskContextType } from "@/types";

export default function ActionsList() {
  const { changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;
  const { getTaskSummary } = useContext(TaskContext) as TaskContextType;

  const handleSummarize = async (
    e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    await getTaskSummary();
  };

  return (
    <ul className="flex flex-col items-start space-y-4 pt-4">
      <li
        className="flex cursor-pointer items-center space-x-3 pl-2"
        onClick={() => changeModalVisibility("create")}
      >
        <PlusCircleIcon className="h-5 w-5" />
        <span>Create Task</span>
      </li>

      <li
        className="flex cursor-pointer items-center space-x-3 pl-2"
        onClick={() => changeModalVisibility("sort")}
      >
        <ArrowsUpDownIcon className="h-5 w-5" />
        <span>Sort Task</span>
      </li>

      <li
        className="flex cursor-pointer items-center space-x-3 pl-2"
        onClick={handleSummarize}
      >
        <CloudIcon className="h-5 w-5" />
        <span>Get Today's Summary</span>
      </li>
    </ul>
  );
}
