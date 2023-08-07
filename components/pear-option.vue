<!-- TODO: This will probably be replaced with custom component -->

<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
  placeholder?: string;
}>();

const parent = getCurrentInstance()?.parent;
const color = props.color ?? parent?.props?.color ?? "primary";

const pearOption = ref<HTMLInputElement>();
defineExpose({ pearOption });
</script>

<template>
  <option
    ref="pearOption"
    :class="{
      'option-shared text-green-900 bg-green-300 hover:(bg-green-400) active:(bg-green-500)':
        color !== 'secondary',
      'option-shared text-teal-800 bg-teal-300 hover:(bg-teal-400) active:(bg-teal-500)':
        color === 'secondary',
    }"
  >
    <slot />
  </option>
</template>

<style scoped>
.option-shared {
  box-shadow: inset 0 0px 0px 3px rgb(0 0 0 / 0.2);

  --at-apply: "relative appearance-none w-full px-2 py-1 rounded-md transition-content-colors duration-150";
  /* FIXME: Outline only on tab */
  --at-apply: "focus:(outline-none)";
  --at-apply: "focus-visible:(duration-none outline! outline-2 outline-emerald-500 outline-offset-2)";
}
</style>
