<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  usePeerStore,
  ConnectionStatus,
  MessageType,
  isValidMessage,
} from "~/stores/peer";
import { useRoomStore } from "~/stores/room";

const roomStore = useRoomStore();
const { id, username } = storeToRefs(roomStore);

const peerStore = usePeerStore();
const { connectionStatus } = storeToRefs(peerStore);

const color = `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(
  Math.random() * 255
)})`;

async function connectToPeer() {
  if (connectionStatus.value === ConnectionStatus.CONNECTED) {
    return;
  }

  const connection = await peerStore.connect(id.value!);

  connection.on("close", () => {
    connectionStatus.value = ConnectionStatus.DISCONNECTED;
  });

  connection.on("data", (message) => {
    console.log(message);
    if (!isValidMessage(message)) return;

    switch (message.type) {
      case MessageType.CHAT:
        break;
      case MessageType.SYNC:
        break;
    }
  });

  peerStore.sendMessage(connection, {
    type: MessageType.INIT,
    username: username.value,
    color,
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
      <h1 class="font-semibold text-2xl">Join room ({{ connectionStatus }})</h1>
    </template>

    <label>
      Username:
      <PearTextInput color="secondary" :value="username" v-model="username" />
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
        @change="id = $event.target.value"
        @send="connectToPeer()"
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
