"use client";

import { useContext } from "react";

import { TaskContext } from "@/contexts/TaskContext";
import type { Task, TaskContextType } from "@/types";
import TaskComponent from "./Task";

type TaskListProps = { tasks: Task[] };

export default function TaskList({ tasks }: TaskListProps) {
  const { searchInput } = useContext(TaskContext) as TaskContextType;

  const filteredTasks = tasks.filter(task =>
    task.content.toLocaleLowerCase().includes(searchInput)
  );

  return (
    <div className="px-2 pt-5">
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.$id}>
            <TaskComponent task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}
