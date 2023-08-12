<script setup lang="ts">
import { usePeerStore } from "~/stores/peer";
import { useRoomStore } from "~/stores/room";

const roomStore = useRoomStore();
const peerStore = usePeerStore();

const store = peerStore;

const username = ref("");
const color = `#${(~~(Math.random() * 0xffffff)).toString(16)}`;
const status = ref("Idle");

async function connect() {
  status.value = "Connecting...";
  const connection = await store.connect(roomStore.id!);
  status.value = "Connected";

  connection.send({
    type: "info",
    username: username.value,
    color: color,
  });
}
</script>

<template>
  <PearWindow
    tag="main"
    color="secondary"
    class="w-full my-auto md:(min-w-1/3 w-max mx-auto)"
  >
    <template #titlebar>
      <h1 class="font-semibold text-2xl">Join room ({{ status }})</h1>
    </template>

    <label>
      Username:
      <PearTextInput color="secondary" v-model="username" />
    </label>

    <label>
      Your color:
      <div
        class="rounded-md border-3 border-black w-5 h-5"
        :style="{ backgroundColor: color }"
      />
    </label>

    <label>
      Enter code you got from your friend:
      <PearSendInput
        type="text"
        color="secondary"
        @change="roomStore.id = $event.target.value"
        @send="connect()"
      >
        <template #button>
          <span
            class="i-mingcute-enter-door-line group-[.active-send-button]:i-mingcute-enter-door-fill group-active:i-mingcute-enter-door-fill"
          />
        </template>
      </PearSendInput>
    </label>
  </PearWindow>
</template>
