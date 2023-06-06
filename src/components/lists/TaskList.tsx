"use client";

import { useContext, useEffect } from "react";
import type { RealtimeResponseEvent } from "appwrite";

import { TaskContext } from "@/contexts/TaskContext";
import { client } from "@/lib/appwrite";
import { env } from "@/env.mjs";
import {
  CREATE_ACTION_STRING,
  DELETE_ACTION_STRING,
  UPDATE_ACTION_STRING,
} from "@/lib/constants";
import type { Task, TaskContextType } from "@/types";
import TaskComponent from "./Task";

type TaskListProps = { tasks: Task[] };

export default function TaskList({ tasks }: TaskListProps) {
  const {
    searchInput,
    createdTasks,
    setCreatedTasks,
    updatedTasks,
    setUpdatedTasks,
    needToSort,
    selectedSortMethod,
    changeNeedToSort,
    sortedTasks,
    setSortedTasks,
  } = useContext(TaskContext) as TaskContextType;

  const allTasks = tasks;

  useEffect(() => {
    client.subscribe(
      `databases.${env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID}.documents`,
      (res: RealtimeResponseEvent<Task>) => {
        console.log(res);
        console.log(res.payload);

        if (res.events.includes(CREATE_ACTION_STRING)) {
          allTasks.push(res.payload);
          setCreatedTasks([...(createdTasks as Task[]), res.payload]);
        }

        if (res.events.includes(UPDATE_ACTION_STRING)) {
          const element = allTasks.find(task => task.$id === res.payload.$id);
          const index = allTasks.indexOf(element as Task);
          allTasks.splice(index, 1, res.payload);
          setUpdatedTasks([...(updatedTasks as Task[]), res.payload]);
        }

        if (res.events.includes(DELETE_ACTION_STRING)) {
          const element = allTasks.find(task => task.$id === res.payload.$id);
          const index = allTasks.indexOf(element as Task);
          allTasks.splice(index, 1);
          setUpdatedTasks([...(updatedTasks as Task[]), res.payload]);
        }
      }
    );
  }, [allTasks, createdTasks, setCreatedTasks, updatedTasks, setUpdatedTasks]);

  useEffect(() => {
    if (needToSort) {
      if (selectedSortMethod === "None") {
        changeNeedToSort();
        return;
      }

      if (selectedSortMethod === "Alphabetical (A - Z)") {
        allTasks.sort((a, b) => a.content.localeCompare(b.content));
        setSortedTasks(allTasks);
        changeNeedToSort();
        return;
      }

      if (selectedSortMethod === "Alphabetical (Z - A)") {
        allTasks.sort((a, b) => b.content.localeCompare(a.content));
        setSortedTasks(allTasks);
        changeNeedToSort();
        return;
      }

      if (selectedSortMethod === "Highest Priority") {
        const highPriorityTasks = allTasks.filter(
          task => task.priority === "high"
        );
        const mediumPriorityTasks = allTasks.filter(
          task => task.priority === "medium"
        );
        const lowPriorityTasks = allTasks.filter(
          task => task.priority === "low"
        );

        setSortedTasks([
          ...highPriorityTasks,
          ...mediumPriorityTasks,
          ...lowPriorityTasks,
        ]);
        changeNeedToSort();
        return;
      }
    }
  }, [
    needToSort,
    allTasks,
    changeNeedToSort,
    selectedSortMethod,
    setSortedTasks,
  ]);

  const filteredTasks = allTasks
    .filter(task => task.content.toLocaleLowerCase().includes(searchInput))
    .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

  return (
    <div className="px-2 pt-5">
      <div className="max-h-40 space-y-4 overflow-y-scroll py-2 pl-2 scrollbar-hide lg:max-h-96">
        {filteredTasks.map(task => (
          <div key={task.$id}>
            <TaskComponent task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}
