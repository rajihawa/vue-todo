<template>
  <Navbar />
  <TasksGrid />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import TasksGrid from "./components/TasksGrid.vue";
import Navbar from "./components/Navbar/index.vue";
import { useStore } from "./store";
import { ActionTypes } from "./store/actions";

export default defineComponent({
  name: "App",
  components: {
    TasksGrid,
    Navbar,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      console.log("mounted");
      store.dispatch(ActionTypes.GetTasksItems);
    });
    return {};
  },
});
</script>
