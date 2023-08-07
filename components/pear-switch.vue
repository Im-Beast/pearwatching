<!-- TODO: This will be replaced with something better -->

<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
}>();

const color = props.color ?? "primary";

const pearSwitch = ref<HTMLInputElement>();
defineExpose({ pearSwitch });
</script>

<template>
  <input
    ref="pearSwitch"
    type="checkbox"
    class="switch-shared squish-bottom"
    :class="{
      'text-green-900 checked:text-green-100 before:(bg-green-300 border-green-200 hover:(bg-green-400) active:(bg-green-500!) checked:(bg-green-500))':
        color === 'primary',
      'text-teal-800 checked:text-teal-100 before:(bg-teal-300 border-teal-200 hover:(bg-teal-400) active:(bg-teal-500!) checked:(bg-teal-500))':
        color === 'secondary',
    }"
  />
</template>

<style scoped>
.switch-shared::before {
  --at-apply: "ring ring-3 ring-inset ring-black/20";
}

.switch-shared {
  --at-apply: "appearance-none relative w-14 h-7";
  --at-apply: "focus-visible:(outline-none)";

  /* ::before */
  --at-apply: "before:(absolute content-[''] w-full h-full border-outset border-l-[0rem] rounded-md transition-content-colors duration-150 px-2 py-1)";
  --at-apply: "before:focus-visible:(duration-none outline outline-2 outline-emerald-500 outline-offset-2)";

  /* ::after */
  --at-apply: "after:(absolute top-1/2 -translate-y-1/2 left-1 content-['']  transition-transform duration-125 ease-out i-mingcute-close-fill)";

  /* Make checking on different states feel more natural */
  --at-apply: "after:checked:(absolute translate-x-[calc(100%+0.35rem)] content-[''] i-mingcute-check-fill)";
}
</style>
