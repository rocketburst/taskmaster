"use client";

import { ModalContext } from "@/contexts/ModalContext";
import { Task, ModalContextType } from "@/types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";

type TaskComponentProps = {
  task: Task;
};

export default function TaskComponent({ task }: TaskComponentProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <input
          id="checked-checkbox"
          type="checkbox"
          value=""
          className={`h-4 w-4 rounded border-gray-300 bg-gray-100 text-red-500 focus:ring-2 focus:ring-red-400 ${
            isDisabled && "opacity-50"
          }`}
          onClick={() => setIsDisabled(!isDisabled)}
        />

        <label
          htmlFor="terms1"
          className={`pt-[0.05rem] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            isDisabled && "line-through"
          }`}
        >
          {task.content}
        </label>
      </div>

      <div className="-mt-1 flex space-x-4">
        <PencilSquareIcon
          className="h-5 w-5"
          onClick={() => changeModalVisibility("edit")}
        />
        <TrashIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
