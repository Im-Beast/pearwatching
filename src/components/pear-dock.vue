<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
}>();

const color = props.color ?? "primary";

const pearButton = ref<HTMLButtonElement>();
defineExpose({ pearButton });
</script>

<template>
  <div
    ref="pearButton"
    class="dock-shared"
    :class="{
      'bg-green-700 border-green-200 hover:(bg-green-700)': color === 'primary',
      'bg-teal-700 border-teal-200 hover:(bg-teal-700)': color === 'secondary',
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.dock-shared {
  --at-apply: "fixed z-10 text-xl flex gap-1 bottom-2 left-1/2 -translate-x-1/2 w-max h-max text-shadow-sm border-b-2 rounded-md transition-content-colors duration-150 px-2 py-1 ring ring-3 ring-inset ring-black/20";
}
</style>
