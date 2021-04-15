<template>
  <div
    @click="click"
    :class="
      (active ? activeClass : defaultClass) +
        ' cursor-pointer block px-3 py-2 rounded-md text-base font-medium'
    "
  >
    {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },

  setup(_, { emit }) {
    const activeClass = "bg-gray-900 text-white";
    const defaultClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return {
      click: () => emit("linkClicked"),
      activeClass,
      defaultClass,
    };
  },
  emits: ["linkClicked"],
});
</script>
