import { Task, TaskStatus } from "@/domain/task";
import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationsType {
  CreateTask = "CREATE_TASK",
  SetTasks = "SET_TASKS",
  SetLoading = "SET_LOADING",
  FinishTask = "FINISH_TASK",
  CancelTask = "CANCEL_TASK",
  ChangeTasksType = "CHANGE_TASKS_TYPE",
}

export type Mutations = {
  [MutationsType.CreateTask](state: State, task: Task): void;
  [MutationsType.SetTasks](state: State, tasks: Task[]): void;
  [MutationsType.SetLoading](state: State, value: boolean): void;
  [MutationsType.FinishTask](state: State, id: string): void;
  [MutationsType.CancelTask](state: State, id: string): void;
  [MutationsType.ChangeTasksType](state: State, type: TaskStatus): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationsType.CreateTask](state, task) {
    state.tasks.unshift(task);
  },
  [MutationsType.SetTasks](state, tasks) {
    state.tasks = tasks;
  },
  [MutationsType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationsType.FinishTask](state, id) {
    const index = state.tasks.findIndex((task) => task.id == id);
    state.tasks[index].status = "done";
  },
  [MutationsType.CancelTask](state, id) {
    const index = state.tasks.findIndex((task) => task.id == id);
    state.tasks[index].status = "canceled";
  },
  [MutationsType.ChangeTasksType](state, type) {
    state.tasksType = type;
  },
};
