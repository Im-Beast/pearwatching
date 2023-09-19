<!-- TODO: Save info about current room and display it on the dock, so people can easily go back to it/check other things without disconnecting from the room -->

<script setup lang="ts">
// TODO: uncomment after finished developing
// definePageMeta({ middleware: "in-room" });

import { storeToRefs } from "pinia";
import { useRoomStore } from "~/stores/room";

const roomStore = useRoomStore();
const { id } = storeToRefs(roomStore);
</script>

<template>
  <section
    class="flex flex-col justify-center w-full h-full bg-black md:(flex-row)"
  >
    <PearVideoPlayer videoClass="" />
    <PearVideoChat class="h-full w-max! max-w-90 flex-grow-1 md:(w-full)" />
  </section>
</template>
