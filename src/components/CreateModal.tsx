"use client";

import { Dialog, Transition } from "@headlessui/react";
import {
  type FormEvent,
  Fragment,
  useContext,
  useState,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

import { ModalContext } from "@/contexts/ModalContext";
import { TaskContext } from "@/contexts/TaskContext";
import { createNewTask } from "@/lib/services";
import { client } from "@/lib/appwrite";
import { env } from "@/env.mjs";
import type { ModalContextType, Task, TaskContextType } from "@/types";
import PrioritySelector from "./PrioritySelector";

export default function CreateModal() {
  const { data: session } = useSession();

  const { getModalState, changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;
  const { selectedPriority, fetchedTasks, setFetchedTasks } = useContext(
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

  useEffect(() => {
    client.subscribe(
      `databases.${env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID}.documents`,
      ({ payload }) => {
        console.log(payload);
        setFetchedTasks([
          ...(fetchedTasks as unknown as Task[]),
          payload as Task,
        ]);
      }
    );
  }, [client]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    changeModalVisibility("create");
    const notification = toast.loading("Creating task...");

    await createNewTask(
      contentInput,
      selectedPriority.toLowerCase(),
      session?.user.email as string,
      reminders
    ).then(() => toast.success("Task Created! ", { id: notification }));

    setContentInput("");
    setReminderInput("");
    setReminders([]);
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

                  <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Content
                      </label>

                      <div className="mt-2">
                        <input
                          id="content"
                          name="content"
                          autoComplete="content"
                          type="text"
                          value={contentInput}
                          onChange={e => setContentInput(e.target.value)}
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
