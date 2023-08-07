<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
  placeholder?: string;
}>();

const pearTextInput = ref<HTMLInputElement>();
defineExpose({ pearTextInput });
</script>

<template>
  <input
    ref="pearTextInput"
    type="text"
    :class="{
      'text-input-shared bg-green-300 hover:(bg-green-400) active:(bg-green-500)':
        props.color !== 'secondary',
      'text-input-shared bg-teal-300 hover:(bg-teal-400) active:(bg-teal-500)':
        props.color === 'secondary',
    }"
  />
</template>

<style scoped>
.text-input-shared {
  box-shadow: inset 0 0px 0px 3px rgb(0 0 0 / 0.2);

  --at-apply: "relative w-full px-2 py-1 rounded-md transition-content-colors duration-150";
  /* FIXME: Outline only on tab */
  --at-apply: "focus:(outline-none)";
  --at-apply: "focus-visible:(duration-none outline! outline-2 outline-emerald-500 outline-offset-2)";
}
</style>
