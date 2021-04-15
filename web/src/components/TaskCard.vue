<template>
  <div
    class="container mx-auto max-w-sm flex flex-col bg-gray-800 p-3 ring-4 ring-green-300 text-white border-4 border-transparent rounded-md hover:border-green-300 transition duration-500"
  >
    <div class="text-2xl mb-3 text-center">{{ task.title }}</div>
    <div class="text-center text-base">{{ task.description }}</div>
    <div class="flex-grow"></div>
    <div class="flex justify-between">
      <div class="flex flex-col-reverse text-left ">
        <div>{{ task.due.format("DD/MM/yyyy").toString() }}</div>
        <div>{{ task.status }}</div>
      </div>
      <div class="flex flex-col text-right justify-between">
        <div
          class="h-10 w-10 text-green-500 hover:bg-green-300 rounded-full transition duration-300 p-1 m-1 cursor-pointer"
          @click="finish"
        >
          <CheckIcon />
        </div>
        <div
          @click="cancel"
          class="h-10 w-10 text-red-500 hover:bg-red-300 rounded-full transition duration-300 p-1 m-1 cursor-pointer"
        >
          <TrashIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CheckIcon, TrashIcon } from "@heroicons/vue/solid";
import { Task } from "@/domain/task";
import { useStore } from "@/store";
import { MutationsType } from "@/store/mutations";

export default defineComponent({
  components: {
    CheckIcon,
    TrashIcon,
  },
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const finish = () => {
      store.commit(MutationsType.FinishTask, props.task.id);
    };
    const cancel = () => {
      store.commit(MutationsType.CancelTask, props.task.id);
    };
    return {
      finish,
      cancel,
    };
  },
});
</script>
