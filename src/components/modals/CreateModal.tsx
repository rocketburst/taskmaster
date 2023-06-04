"use client";

import { type FormEvent, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

import { ModalContext } from "@/contexts/ModalContext";
import { TaskContext } from "@/contexts/TaskContext";
import { createNewTask } from "@/lib/services";
import type { ModalContextType, TaskContextType } from "@/types";
import PrioritySelector from "../selectors/PrioritySelector";
import BaseModal from "./BaseModal";

export default function CreateModal() {
  const { data: session } = useSession();

  const { changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;
  const { selectedPriority } = useContext(TaskContext) as TaskContextType;

  const [contentInput, setContentInput] = useState("");
  const [reminderInput, setReminderInput] = useState("");

  const [reminders, setReminders] = useState<Date[]>([]);

  const addReminder = () => {
    if (reminderInput !== "")
      setReminders([...reminders, new Date(reminderInput)]);

    setReminderInput("");
  };

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

  const onClose = () => {
    setContentInput("");
    setReminderInput("");
    changeModalVisibility("create");
  };

  return (
    <BaseModal type="create" title="Create a New Task!" onClose={onClose}>
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
    </BaseModal>
  );
}
