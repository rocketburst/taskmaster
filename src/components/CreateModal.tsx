"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";

import { ModalContext } from "@/contexts/ModalContext";
import { TaskContext } from "@/contexts/TaskContext";
import { ModalContextType, TaskContextType } from "@/types";
import PrioritySelector from "./PrioritySelector";

export default function CreateModal() {
  const { getModalState, changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;
  const { selectedPriority, setSelectedPriority, priorityOptions } = useContext(
    TaskContext
  ) as TaskContextType;

  const [contentInput, setContentInput] = useState("");
  const [reminderInput, setReminderInput] = useState("");

  const [reminders, setReminders] = useState<Date[]>([]);

  const addReminder = () => {
    if (reminderInput !== "")
      setReminders([...reminders, new Date(reminderInput)]);

    setReminderInput("");
  };

  return (
    <>
      <Transition appear show={getModalState("create")} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => changeModalVisibility("create")}
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
                    Create a New Task!
                  </Dialog.Title>

                  <form className="mt-4 space-y-6" action="#" method="POST">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Content
                      </label>

                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Priority
                      </label>

                      <div className="mt-2">
                        <PrioritySelector />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="reminders"
                          className="block text-sm font-medium leading-6 text-gray-900"
                          title="Click icon to add reminder"
                        >
                          Reminder
                        </label>

                        <p
                          className="block cursor-pointer text-sm font-medium leading-6 text-red-600 underline hover:text-red-500"
                          onClick={() => addReminder()}
                        >
                          Add
                        </p>
                      </div>

                      <div className="mt-2">
                        <input
                          id="reminder"
                          name="reminder"
                          type="datetime-local"
                          autoComplete="reminder"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          value={reminderInput}
                          onChange={e => setReminderInput(e.target.value)}
                        />
                      </div>

                      <div className="pl-5 pt-2">
                        <ul>
                          {reminders.map((reminder, idx) => (
                            <li key={idx} className="text-xs">
                              - {reminder.toLocaleDateString()} ·{" "}
                              {reminder.toLocaleTimeString()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                      >
                        Create Task
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
