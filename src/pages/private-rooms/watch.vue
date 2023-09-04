<script setup lang="ts">
definePageMeta({ middleware: "in-room" });

import { storeToRefs } from "pinia";
import { useRoomStore } from "~/stores/room";

const roomStore = useRoomStore();
const { id } = storeToRefs(roomStore);
</script>

<template>Hello {{ $route.params }}</template>
