<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
}>();

const color = props.color ?? "primary";

const pearCheckbox = ref<HTMLInputElement>();
defineExpose({ pearCheckbox });
</script>

<template>
  <input
    ref="pearCheckbox"
    type="checkbox"
    class="checkbox-shared"
    :class="{
      'text-green-900 before:(bg-green-300 border-green-200 hover:(bg-green-400) active:(bg-green-500!) checked:(bg-green-500))':
        color === 'primary',
      'text-teal-800 before:(bg-teal-300 border-teal-200 hover:(bg-teal-400) active:(bg-teal-500!) checked:(bg-teal-500))':
        color === 'secondary',
    }"
  />
</template>

<style scoped>
.checkbox-shared::before {
  --at-apply: "ring ring-3 ring-inset ring-black/20";
}

.checkbox-shared {
  --at-apply: "appearance-none relative min-w-7 min-h-7";
  --at-apply: "focus-visible:(outline-none)";

  /* ::before */
  --at-apply: "before:(absolute content-[''] w-full h-full border-b-2 rounded-md transition-content-colors duration-150)";
  --at-apply: "before:focus-visible:(duration-none outline outline-2 outline-emerald-500 outline-offset-2)";

  /* Make checking on different states feel more natural */
  --at-apply: "before:active:(border-b-0 h-[calc(100%-2px)] -bottom-1px)";
  --at-apply: "before:checked:(border-b-0 h-[calc(100%-2px)] -bottom-1px)";
  --at-apply: "before:checked:active:(border-b-2 h-full bottom-0)";

  /* ::after */
  --at-apply: "after:(absolute inset-1/2 -translate-1/2 content-[''] i-mingcute-close-fill)";

  /* Make checking on different states feel more natural */
  --at-apply: "after:active:(absolute -translate-y-[calc(50%-2px)] content-[''] i-mingcute-check-fill)";
  --at-apply: "after:checked:(absolute -translate-y-[calc(50%-2px)] content-[''] i-mingcute-check-fill)";
  --at-apply: "after:checked:active:(absolute -translate-y-1/2 content-[''] i-mingcute-close-fill)";
}
</style>
