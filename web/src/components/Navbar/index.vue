<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-gray-800 mb-2">
    <div class="container mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="toggleMenu"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon class=" block md:hidden h-6 w-6" />
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center text-white">
            Vue Todo
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <Link
                value="Pending"
                :active="taskType == 'pending'"
                @linkClicked="changeTasksType('pending')"
              />
              <Link
                value="Done"
                :active="taskType == 'done'"
                @linkClicked="changeTasksType('done')"
              />
              <Link
                value="Canceled"
                :active="taskType == 'canceled'"
                @linkClicked="changeTasksType('canceled')"
              />
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            @click="toggleDialog"
            class="text-white p-1 sm:px-3 sm:py-2 rounded-full sm:rounded-md focus:outline-none text-base focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800  focus:ring-white font-medium inline-flex items-center bg-green-600 hover:bg-green-500 sm:mr-2"
          >
            <PlusIcon class="h-6 w-6" />
            <span class="sr-only">New Task</span>
            <span class="hidden sm:inline-block">New Task</span>
          </button>
          <div class="ml-3"></div>
          <button
            class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" />
          </button>
          <div class="ml-3 relative">
            <div>
              <button
                type="button"
                class="bg-gray-800 flex p-1 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white text-gray-400 hover:text-white"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
                @click="toggleSettings"
              >
                <span class="sr-only">Open user menu</span>
                <CogIcon class="h-6 w-6" />
              </button>
            </div>
            <transition name="dropdown">
              <div
                v-if="settings"
                class="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Dark theme</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Sign out</a
                >
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <transition name="menu">
      <div v-if="menu" class="sm:hidden h-full" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <div
            @click="changeTasksType('pending')"
            class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Pending
          </div>

          <div
            @click="changeTasksType('done')"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Done
          </div>
          <div
            @click="changeTasksType('canceled')"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Canceled
          </div>
        </div>
      </div>
    </transition>
  </nav>
  <div
    v-if="settings"
    @click="toggleSettings"
    class="block absolute top-0 bottom-0 right-0 left-0 bg-transparent z-40"
  ></div>
  <NewTaskDialog @toggleDialog="toggleDialog" :show="dialog" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { MenuIcon, BellIcon, CogIcon, PlusIcon } from "@heroicons/vue/outline";
import NewTaskDialog from "../TaskDialog.vue";
import { useStore } from "@/store";
import { MutationsType } from "@/store/mutations";
import { TaskStatus } from "@/domain/task";
import Link from "./Link.vue";

export default defineComponent({
  components: {
    MenuIcon,
    BellIcon,
    CogIcon,
    PlusIcon,
    NewTaskDialog,
    Link,
  },
  setup() {
    const store = useStore();
    const settings = ref(false);
    const menu = ref(false);
    const dialog = ref<boolean>(false);
    const taskType = computed(() => store.state.tasksType);

    const toggleSettings = () => {
      settings.value = !settings.value;
    };
    const toggleMenu = () => {
      menu.value = !menu.value;
    };

    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };

    const changeTasksType = (type: TaskStatus) => {
      store.commit(MutationsType.ChangeTasksType, type);
    };

    return {
      settings,
      toggleSettings,
      menu,
      toggleMenu,
      dialog,
      toggleDialog,
      changeTasksType,
      taskType,
    };
  },
});
</script>

<style scoped>
.dropdown-enter-active {
  transition: all 100ms ease-out;
}
.dropdown-enter-from {
  transform: scale(0.95);
  opacity: 0;
}
.dropdown-enter-to {
  transform: scale(1);
  opacity: 1;
}
.dropdown-leave-active {
  transition: all 75ms ease-in;
}
.dropdown-leave-from {
  transform: scale(1);
  opacity: 1;
}
.dropdown-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
.menu-enter-active {
  transition: all 200ms ease-out;
}
.menu-enter-from {
  max-height: 0px;
}
.menu-enter-to {
  max-height: 230px;
}
.menu-leave-active {
  transition: all 200ms ease-in;
}
.menu-leave-from {
  max-height: 230px;
}
.menu-leave-to {
  max-height: 0px;
}
</style>
