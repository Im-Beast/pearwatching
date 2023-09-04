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
  <section class="flex w-full h-full">
    <PearVideoPlayer />
    <PearChat />
  </section>
</template>
