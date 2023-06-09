import { getUserReminders, getUserTasks } from "@/lib/services";
import { getCurrentUser } from "@/lib/session";
import MobileMenu from "@/components/ui/MobileMenu";
import Calendar from "@/components/ui/Calendar";
import TaskList from "@/components/lists/TaskList";
import ActionsList from "@/components/lists/ActionsList";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const tasks = await getUserTasks(user?.email as string);
  const reminders = await getUserReminders(user?.email as string);

  return (
    <main className="mx-auto max-w-screen-xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <div className="space-y-10 pb-10 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:grid-cols-4">
        <div className="border bg-gray-100 p-2 pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">All Tasks</h2>
            <MobileMenu />
          </div>

          <hr />

          <TaskList tasks={tasks} />
        </div>

        <div className="hidden border bg-gray-100 p-2 pb-3 sm:inline">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Actions</h2>
          </div>

          <hr />

          <ActionsList />
        </div>

        <div className="border bg-gray-100 p-2 pb-3 sm:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
          </div>

          <hr />

          <Calendar reminders={reminders} />
        </div>
      </div>
    </main>
  );
}
