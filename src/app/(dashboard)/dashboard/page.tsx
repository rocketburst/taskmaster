import MobileMenu from "@/components/MobileMenu";
import TaskComponent from "@/components/Task";
import { getUserTasks } from "@/lib/services";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const tasks = await getUserTasks(user?.email as string);

  return (
    <main className="mx-auto max-w-screen-xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">All Tasks</h2>
        <MobileMenu />
      </div>

      <div className="px-2 pt-5">
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.$id}>
              <TaskComponent task={task} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
