import { Task, TaskStatus } from "@/domain/task";

export type State = {
  tasks: Task[];
  loading: boolean;
  tasksType: TaskStatus;
};

export const state: State = {
  loading: true,
  tasks: [],
  tasksType: "pending",
};
