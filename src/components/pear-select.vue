<!-- TODO: This will probably be replaced with custom component -->

<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
  placeholder?: string;
}>();

const color = props.color ?? "primary";

const pearSelect = ref<HTMLInputElement>();
defineExpose({ pearSelect });
</script>

<template>
  <div
    class="select-wrapper"
    :class="{
      'text-green-900 hover:text-green-700 active:text-green-800':
        color === 'primary',
      'text-teal-800 hover:text-teal-600 active:text-teal-700':
        color === 'secondary',
    }"
  >
    <select
      ref="pearSelect"
      :class="{
        'select-shared text-green-900 bg-green-300 border-green-200 hover:(bg-green-400) active:(bg-green-500)':
          color === 'primary',
        'select-shared text-teal-800  bg-teal-300 border-teal-200 hover:(bg-teal-400) active:(bg-teal-500)':
          color === 'secondary',
      }"
    >
      <slot />
    </select>
  </div>
</template>

<style scoped>
.select-shared {
  --at-apply: "appearance-none pointer-events-auto border-b-2 w-full pl-2 pr-6.5 py-1 rounded-md transition-content-colors duration-150 ring ring-3 ring-inset ring-black/20";
  --at-apply: "active:(border-b-0 -bottom-2px)";

  /* FIXME: Outline only on tab */
  --at-apply: "focus:(outline-none)";
  --at-apply: "focus-visible:(duration-none outline! outline-2 outline-emerald-500 outline-offset-2)";
}

.select-wrapper {
  --at-apply: "relative pointer-events-none";

  /** ::before */
  --at-apply: "before:(content-[''] absolute right-1 top-1/2 -translate-y-1/2 border-green-900 i-mingcute-down-fill)";
}
</style>
