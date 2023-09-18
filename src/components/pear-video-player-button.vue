<script setup lang="ts">
const props = defineProps<{
  tag?: any;
  color?: "primary" | "secondary";
}>();

const tag = props.tag ?? "button";
const color = props.color ?? "primary";

const pearVideoPlayerButton = ref<HTMLButtonElement>();
defineExpose({ pearButton: pearVideoPlayerButton });
</script>

<template>
  <PearButton
    ref="pearVideoPlayerButton"
    :tag="tag"
    :color="color"
    class="video-player-button-shared"
  >
    <slot />
  </PearButton>
</template>

<style scoped>
.video-player-button-shared {
  --at-apply: "text-xl px-0.5! py-0!";
}
</style>
