"use client";

import { Dialog, Transition } from "@headlessui/react";
import { type FormEvent, Fragment, useContext } from "react";

import { ModalContext } from "@/contexts/ModalContext";
import { TaskContext } from "@/contexts/TaskContext";
import type { ModalContextType, TaskContextType } from "@/types";
import SortSelector from "./SortSelector";

export default function SortModal() {
  const { getModalState, changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;
  const { changeNeedToSort } = useContext(TaskContext) as TaskContextType;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    changeModalVisibility("sort");
    changeNeedToSort();
  };

  return (
    <>
      <Transition appear show={getModalState("sort")} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            changeModalVisibility("sort");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Sort Tasks!
                  </Dialog.Title>

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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
