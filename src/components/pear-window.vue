<script setup lang="ts">
defineSlots<{
  default: any;
  titlebar: any;
}>();

const props = defineProps<{
  tag?: string;
  color?: "primary" | "secondary" | "gradient";
}>();

const { color = "primary", tag = "div" } = props;
</script>

<template>
  <component
    :is="tag"
    class="relative rounded-md bg-dark-200 border-3 ring ring-3 ring-inset ring-black/20"
    :class="{
      'border-green-300': color === 'primary',
      'border-teal-300': color === 'secondary',
      'border-0! before:(content-[\'\'] bg-gradient-to-r from-green-300 to-teal-300 -z-1 rounded-md absolute -top-3px -left-3px w-[calc(100%+6px)] h-[calc(100%+6px)] bg-red-300 )':
        color === 'gradient',
      'p-2': !$slots.titlebar,
    }"
  >
    <template v-if="$slots.titlebar">
      <section
        class="relative border-3 border-b-2 border-black/20 rounded-t-[0.225rem] p-2 before:(content-[''] absolute -bottom-4px left-0px h-full w-[calc(100%)] border-b-2 border-black/20) text-shadow-sm"
        :class="{
          'bg-green-300 text-green-900': color === 'primary',
          'bg-teal-300 text-teal-800': color === 'secondary',
          'bg-gradient-to-r from-green-300 to-teal-300': color === 'gradient',
        }"
      >
        <div
          v-if="color === 'gradient'"
          class="bg-gradient-to-r from-teal-800 to-green-900 bg-clip-text text-transparent"
        >
          <slot name="titlebar" />
        </div>
        <slot v-else name="titlebar" />
      </section>

      <section class="p-2">
        <slot />
      </section>
    </template>

    <template v-else>
      <slot />
    </template>
  </component>
</template>
