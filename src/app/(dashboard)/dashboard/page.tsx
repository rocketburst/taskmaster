import TaskComponent from "@/components/Task";
import { getUserTasks } from "@/lib/services";
import { getCurrentUser } from "@/lib/session";
import { Task } from "@/types";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const obj = {
  content: "Do that",
  priority: "low",
  reminders: [],
  userEmail: "rayankazi7515@gmail.com",
  isCompleted: true,
  $id: "646591c669aaf4c22396",
  $createdAt: "2023-05-18T02:47:34.433+00:00",
  $updatedAt: "2023-05-18T02:47:34.433+00:00",
  $permissions: [],
  $collectionId: "645f0aac3885ebe5c526",
  $databaseId: "645f0a9c5cd3bd238727",
} as Task;

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const tasks = await getUserTasks(user?.email as string);

  return (
    <main className="mx-auto max-w-screen-xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">All Tasks</h2>
        <ChevronDownIcon className="h-6 w-6" />
      </div>

      <div className="px-2 pt-5">
        {/* {tasks.map(task => (
          <div key={task.$id} className="py-2">
            <TaskComponent task={task} />
          </div>
        ))} */}

        <div className="space-y-4">
          <TaskComponent task={obj} />
          <TaskComponent task={obj} />
          <TaskComponent task={obj} />
          <TaskComponent task={obj} />
          <TaskComponent task={obj} />
          <TaskComponent task={obj} />
          <TaskComponent task={obj} />
        </div>
      </div>
    </main>
  );
}
