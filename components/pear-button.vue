<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
}>();

const color = props.color ?? "primary";

const pearButton = ref<HTMLButtonElement>();
defineExpose({ pearButton });
</script>

<template>
  <button
    ref="pearButton"
    class="button-shared"
    :class="{
      'text-green-900 bg-green-300 border-green-200 hover:(bg-green-400) active:(bg-green-500)':
        color === 'primary',
      'text-teal-800 bg-teal-300 border-teal-200 hover:(bg-teal-400) active:(bg-teal-500)':
        color === 'secondary',
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
.button-shared {
  --at-apply: "relative w-max h-max text-shadow-sm border-b-2 rounded-md transition-content-colors duration-150 px-2 py-1 ring ring-3 ring-inset ring-black/20";
  --at-apply: "focus-visible:(duration-none outline outline-2 outline-emerald-500 outline-offset-2)";

  /** ::active */
  --at-apply: "active:(border-b-0 -bottom-2px)";

  /* TODO: add disabled state for every component so they're unclickable and gray */
}
</style>
