<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
  placeholder?: string;
}>();

const emit = defineEmits<{
  (event: "send", type: MouseEvent): void;
  (event: "update:modelValue", target: HTMLInputElement): void;
}>();

const color = props.color ?? "primary";

const pearTextInput = ref<HTMLInputElement>();
defineExpose({ pearTextInput });
</script>

<script>
// This is required to fix $event.target!.value type error
declare global {
  interface EventTarget {
    value: HTMLInputElement;
  }
}
</script>

<template>
  <input
    ref="pearTextInput"
    type="text"
    :class="{
      'text-input-shared text-green-900 bg-green-300 hover:(bg-green-400) active:(bg-green-500)':
        color !== 'secondary',
      'text-input-shared text-teal-800 bg-teal-300 hover:(bg-teal-400) active:(bg-teal-500)':
        color === 'secondary',
    }"
    @input="emit('update:modelValue', $event.target!.value)"
  />
</template>

<style scoped>
.text-input-shared {
  --at-apply: "relative w-full px-2 py-1 rounded-md transition-content-colors duration-150 ring ring-3 ring-inset ring-black/20";
  /* FIXME: Outline only on tab */
  --at-apply: "focus:(outline-none)";
  --at-apply: "focus-visible:(duration-none outline! outline-2 outline-emerald-500 outline-offset-2)";
}
</style>
