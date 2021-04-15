<template>
  <transition-group name="backdrop">
    <div v-if="show">
      <div
        class="absolute z-30 w-screen h-screen top-0 right-0 bg-gray-500 bg-opacity-50 flex justify-center content-center"
      />

      <form
        @submit.prevent="submit"
        class="absolute p-3 top-0 md:top-1/4 right-0 left-0 w-5/6 md:w-2/4 my-3 mx-auto bg-white rounded-md shadow-xl cursor-default z-40"
      >
        <h2 class="text-center text-4xl mb-3">
          {{ "New Task" }}
        </h2>
        <div class="flex flex-col content-center justify-center w-full">
          <input
            v-model="title"
            class="mx-3 my-1 p-1 text-lg"
            placeholder="Task title..."
          />
          <textarea
            v-model="description"
            class="mx-3 my-1 p-1 text-lg"
            placeholder="Task description..."
          />
          <input
            :value="due.format('yyyy-MM-DDThh:mm')"
            @change="timeChange"
            class="mx-3 my-1 p-1 text-lg"
            type="datetime-local"
          />
          <div class="space-y-2 mx-3 my-1 text-white flex flex-row ">
            <div class="flex-grow"></div>
            <button
              @click.prevent="toggle"
              class="p-2 bg-red-500 rounded-md mx-1"
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Submit"
              class="p-2 bg-green-500 rounded-md mx-1 cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { Task } from "@/domain/task";
import { useStore } from "@/store";
import { MutationsType } from "@/store/mutations";
import moment from "moment";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  props: {
    show: Boolean,
  },
  setup(_, { emit }) {
    const store = useStore();
    const title = ref("");
    const description = ref("");
    const due = ref(moment());

    const timeChange = (event: any) => {
      due.value = moment(event.target.value);
    };

    const submit = () => {
      console.log(title.value);
      const newTask: Task = {
        id: moment().toISOString(),
        title: title.value,
        description: description.value,
        due: due.value,
        created: moment(),
        updated: moment(),
        status: "pending",
      };
      store.commit(MutationsType.CreateTask, newTask);
      emit("toggleDialog");
    };

    return {
      toggle: () => emit("toggleDialog"),
      timeChange,
      title,
      description,
      due,
      submit,
    };
  },
  name: "TaskDialog",
  emits: ["toggleDialog"],
});
</script>

<style scoped>
.backdrop-enter-active {
  transition: all 200ms ease-out;
}
.backdrop-enter-from {
  opacity: 0;
}
.backdrop-enter-to {
  opacity: 0.5;
}
.backdrop-leave-active {
  transition: all 200ms ease-in;
}
.backdrop-leave-from {
  opacity: 0.5;
}
.backdrop-leave-to {
  opacity: 0;
}
</style>
