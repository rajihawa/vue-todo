import { emptyTask, intiialTasks } from "@/domain/task";
import { ActionContext, ActionTree } from "vuex";
import { State } from "./state";
import { Mutations, MutationsType } from "./mutations";

export enum ActionTypes {
  GetTasksItems = "GET_TASKS",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.GetTasksItems](context: ActionAugments): void;
};

// to stimulate http request time
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTasksItems]({ commit }) {
    commit(MutationsType.SetLoading, true);
    await sleep(200);
    commit(MutationsType.SetLoading, false);
    commit(MutationsType.SetTasks, intiialTasks);
  },
};
