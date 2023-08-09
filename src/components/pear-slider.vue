<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
}>();

const color = props.color ?? "primary";

const pearSlider = ref<HTMLInputElement>();
defineExpose({ pearSlider });
</script>

<template>
  <input
    type="range"
    ref="pearSlider"
    class="slider-shared"
    :class="{
      'text-green-900 bg-green-300 border-green-200 hover:(bg-green-400) active:(bg-green-500) [&::-webkit-slider-thumb]:(bg-green-400! hover:bg-green-500! active:bg-green-700! border-green-200) [&::-moz-range-thumb]:(bg-green-400 hover:bg-green-500 active:bg-green-700 border-green-200)':
        color === 'primary',
      'text-teal-800 bg-teal-300 border-teal-200 hover:(bg-teal-400) active:(bg-teal-500) [&::-webkit-slider-thumb]:(bg-teal-400! hover:bg-teal-500! active:bg-teal-700! border-teal-200) [&::-moz-range-thumb]:(bg-teal-400 hover:bg-teal-500 active:bg-teal-700 border-teal-200)':
        color === 'secondary',
    }"
  />
</template>

<style scoped>
.slider-shared {
  --at-apply: "relative appearance-none w-min h-max p-1 rounded-md transition-content-colors duration-150 ring ring-3 ring-inset ring-black/20";
  --at-apply: "focus-visible:(duration-none outline outline-2 outline-emerald-500 outline-offset-2)";
}

.slider-shared::-webkit-slider-thumb {
  --at-apply: "relative ring-3 ring-inset ring-black/20 appearance-none w-5 h-5 border-0 border-b-2 rounded-md transition-content-colors duration";
  --at-apply: "active:(border-b-0)";
}

.slider-shared::-moz-range-thumb {
  --at-apply: "relative ring-3 ring-inset ring-black/20 appearance-none w-5 h-full border-0 border-b-2 rounded-md transition-content-colors duration";
  --at-apply: "active:(border-b-0)";
}
</style>
