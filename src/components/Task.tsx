import { Task } from "@/types";

type TaskComponentProps = {
  task: Task;
};

export default function TaskComponent({ task }: TaskComponentProps) {
  return (
    <div className="items-top flex space-x-2">
      <input
        id="checked-checkbox"
        type="checkbox"
        value=""
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-red-500 focus:ring-2 focus:ring-red-400"
      />

      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="pt-[0.05rem] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {task.content}
        </label>
      </div>
    </div>
  );
}
