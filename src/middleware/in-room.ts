import { useRoomStore } from "~/stores/room";

const roomStore = useRoomStore();

export default defineNuxtRouteMiddleware(() => {
  if (!roomStore.id) return navigateTo("/private-rooms");
});
