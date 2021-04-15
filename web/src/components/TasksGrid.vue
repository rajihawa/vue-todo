<template>
  <div
    v-if="!loading"
    class="container px-2 sm:px-6 lg:px-8 mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  >
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
  </div>
  <div v-else class="text-black">
    <Progress />
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import TaskCard from "./TaskCard.vue";
import Progress from "./Progress.vue";

export default defineComponent({
  components: {
    TaskCard,
    Progress,
  },
  setup() {
    const store = useStore();
    const tasks = computed(() => store.getters.getTasks);
    const loading = computed(() => store.state.loading);

    return {
      tasks,
      loading,
    };
  },
});
</script>
