<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
  info: PearDockLinkInfo;
}>();

export interface PearDockLinkInfo {
  to: string;
  title: string;
  icon: {
    base: string;
    current: string;
  };
}

const instance = getCurrentInstance();
const color = props.color ?? instance?.parent?.props?.color ?? "primary";

const pearDockLink = ref<HTMLAnchorElement>();
defineExpose({ pearDockLink });
</script>

<template>
  <NuxtLink
    ref="pearDockLink"
    class="dock-link-shared"
    :to="props.info.to"
    :title="props.info.title"
    :class="{
      'text-green-900 bg-green-300 border-green-200 hover:(bg-green-400) active:(bg-green-500) [&.current]:(bg-green-400!) before:(border-green-900) after:(border-green-900 bg-green-300)':
        color === 'primary',
      'text-teal-800 bg-teal-300 border-teal-200 hover:(bg-teal-400) active:(bg-teal-500) [&.current]:(bg-teal-400!) before:(border-teal-900) after:(border-teal-900 bg-teal-300)':
        color === 'secondary',
    }"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped>
.dock-link-shared {
  --at-apply: "relative w-max h-max text-shadow-sm border-b-2 rounded-md transition-content-colors duration-150 px-2 py-1 ring ring-3 ring-inset ring-black/20";
  --at-apply: "focus-visible:(duration-none outline outline-2 outline-emerald-500 outline-offset-2)";
  --at-apply: "hover:(transition-transform z-2 scale-125 -translate-y-2)";
  --at-apply: "active:(border-b-0 -bottom-2px)";

  /** ::before */
  --at-apply: "before:(content-[''] absolute top-0 left-0 w-full h-full)";
  --at-apply: "before:hover:(rounded-md border-2)";

  /** ::after */
  --at-apply: "after:(content-[attr(title)] opacity-0 scale-80 pointer-events-none absolute text-sm rounded-md px-1.5 py-0 border-1 -top-5.5 left-1/2 -translate-x-1/2 w-max h-max)";
  --at-apply: "after:hover:(transition-opacity duration-150 opacity-100)";
}
</style>
