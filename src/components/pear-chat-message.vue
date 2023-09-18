<script setup lang="ts">
const props = defineProps<{
  tag?: any;
  color?: "primary" | "secondary" | "custom";
  customColor?: string;
  side: "left" | "right";
}>();

const tag = props.tag ?? "button";
const color = props.color ?? "primary";
</script>

<template>
  <section :tag="tag" :color="color" class="chat-message-shared" :class="side">
    <slot />
  </section>
</template>

<style scoped>
.chat-message-shared {
  --at-apply: "relative w-full p-1.5 rounded-md border-green-100 text-green-100 bg-green-700 ring ring-3 ring-inset  ring-black/20";
}

.chat-message-shared.left {
  --at-apply: "border-l-3 border-t-3 bg-yellow";
  --at-apply: "before:(content-[''] absolute -left-1.5 bottom-1 w-0 h-0 border-y-transparent -rotate-9deg border-y-7 border-green-100 border-r-7)";
}

.chat-message-shared.right {
  --at-apply: "border-r-3 border-b-3";
  --at-apply: "before:(content-[''] absolute -right-1.5 bottom-1 w-0 h-0 border-y-transparent rotate-9deg border-y-7 border-green-100 border-l-7)";
}
</style>
