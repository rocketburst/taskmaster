"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { type ChangeEvent, useContext, type MouseEvent } from "react";

import { ModalContext } from "@/contexts/ModalContext";
import type { Task, ModalContextType, TaskContextType } from "@/types";
import { deleteTask, updateTaskCompletion } from "@/lib/services";
import { TaskContext } from "@/contexts/TaskContext";
import { capitalize } from "@/lib/utils";
import { toast } from "react-hot-toast";

type TaskComponentProps = {
  task: Task;
};

export default function TaskComponent({ task }: TaskComponentProps) {
  const { changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;
  const { setSelectedTaskToEdit, setSelectedPriority } = useContext(
    TaskContext
  ) as TaskContextType;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await updateTaskCompletion(task);
  };

  const handleDelete = async (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const notification = toast.loading("Deleting task...");
    await deleteTask(task).then(() =>
      toast.success("Task Deleted! ", { id: notification })
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <input
          id="checked-checkbox"
          type="checkbox"
          value=""
          checked={task.isCompleted}
          className={`h-4 w-4 rounded border-gray-300 bg-gray-100 text-red-500 focus:ring-2 focus:ring-red-400 ${
            task.isCompleted && "opacity-50"
          }`}
          onChange={handleChange}
        />

        <label
          htmlFor="terms1"
          className={`pt-[0.05rem] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            task.isCompleted && "line-through"
          }`}
        >
          {task.content}
        </label>
      </div>

      <div className="-mt-1 flex space-x-4">
        <PencilSquareIcon
          className="h-5 w-5 cursor-pointer"
          onClick={() => {
            setSelectedTaskToEdit(task);
            setSelectedPriority(capitalize(task.priority));
            changeModalVisibility("edit");
          }}
        />
        <TrashIcon className="h-5 w-5 cursor-pointer" onClick={handleDelete} />
      </div>
    </div>
  );
}
