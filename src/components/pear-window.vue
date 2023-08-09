<script setup lang="ts">
const props = defineProps<{
  tag?: string;
  color?: "primary" | "secondary";
}>();

const { color = "primary", tag = "div" } = props;
</script>

<template>
  <component
    :is="tag"
    class="rounded-md p-2 bg-dark-200 border-3"
    :class="{
      'border-green-300': color === 'primary',
      'border-teal-300': color === 'secondary',
    }"
  >
    <slot />
  </component>
</template>
