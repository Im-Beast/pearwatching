<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
}>();

const color = props.color ?? "primary";

const pearVideoChat = ref<HTMLButtonElement>();
defineExpose({ pearVideoChat });
</script>

<template>
  <section
    ref="pearVideoChat"
    class="video-chat-shared"
    :class="{
      'bg-green-600 border-green-200': color === 'primary',
      'bg-teal-600 border-teal-200': color === 'secondary',
    }"
  >
    <div class="video-chat-messages">
      <PearChatMessage
        :color="color"
        :side="Math.random() > 0.5 ? 'left' : 'right'"
        v-for="x in [0, 1, 2, 3, 3, 5, 6, 7, 8, 9, 10, 11, 12]"
      >
        {{ x }}
      </PearChatMessage>
    </div>
    <PearSendInput :color="color" />
  </section>
</template>

<style scoped>
.video-chat-shared {
  --at-apply: "text-shadow-sm border-l gap-1 flex flex-col transition-content-colors duration-150 px-2 py-1 ring ring-3 ring-inset ring-black/20";
}

.video-chat-messages {
  --at-apply: "w-full h-full p-1.5 overflow-y-scroll flex flex-col gap-1";
}
</style>
