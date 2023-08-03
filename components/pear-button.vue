<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
}>();

const color = props.color ?? "primary";
</script>

<template>
  <button
    class="button-shared squish-bottom"
    :class="{
      'text-green-900 text-shadow-sm bg-green-300 border-green-200 hover:(bg-green-400) active:(bg-green-500)':
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
  box-shadow: inset 0 0px 0px 3px rgb(0 0 0 / 0.2);

  --at-apply: "relative w-max border-b-2 rounded-md transition-colors duration-150 px-2 py-1";
  --at-apply: "active:(border-b-0)";
  --at-apply: "focus-visible:(duration-none outline outline-2 outline-emerald-500 outline-offset-2)";
}
</style>
