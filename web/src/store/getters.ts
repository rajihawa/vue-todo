import { Task } from "@/domain/task";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  totalCount(state: State): number;
  getTasks(state: State): Task[];
};

export const getters: GetterTree<State, State> & Getters = {
  totalCount(state) {
    return state.tasks.length;
  },
  getTasks(state) {
    return state.tasks.filter((task) => {
      if (task.status == state.tasksType) {
        return true;
      }
      return false;
    });
  },
};
