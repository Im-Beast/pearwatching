<!-- TODO: Save info about current room and display it on the dock, so people can easily go back to it/check other things without disconnecting from the room -->

<script setup lang="ts">
// TODO: uncomment after finished developing
// definePageMeta({ middleware: "in-room" });

import { storeToRefs } from "pinia";
import { useRoomStore } from "~/stores/room";
import { useDockStore } from "~/stores/dock";

const dockStore = useDockStore();
const { teleport } = storeToRefs(dockStore);

const roomStore = useRoomStore();
const { id } = storeToRefs(roomStore);

const videoColumn = ref<HTMLDivElement>();

onMounted(() => {
  teleport.value = videoColumn.value;
});
</script>

<template>
  <section class="flex justify-center w-full h-full bg-black">
    <section class="flex h-60vh! flex-col" ref="videoColumn">
      <PearVideoPlayer videoClass="max-h-[calc(100vh-5rem)]!" />
    </section>
    <PearVideoChat class="min-w-60 max-w-90 h-full w-max flex-grow-1" />
  </section>
</template>
