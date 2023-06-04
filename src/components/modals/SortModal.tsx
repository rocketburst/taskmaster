"use client";

import { type FormEvent, useContext } from "react";

import { ModalContext } from "@/contexts/ModalContext";
import { TaskContext } from "@/contexts/TaskContext";
import type { ModalContextType, TaskContextType } from "@/types";
import SortSelector from "../selectors/SortSelector";
import BaseModal from "./BaseModal";

export default function SortModal() {
  const { changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;
  const { changeNeedToSort } = useContext(TaskContext) as TaskContextType;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    changeModalVisibility("sort");
    changeNeedToSort();
  };

  return (
    <BaseModal type="sort" title="Sort Tasks!">
      <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
        <div className="pb-28 sm:pb-24">
          <label
            htmlFor="priority"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Sorting Method
          </label>

          <div className="mt-2">
            <SortSelector />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            Sort Tasks
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
