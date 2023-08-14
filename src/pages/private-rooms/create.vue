<script setup lang="ts">
import { usePeerStore, type Message } from "~/stores/peer";
import { useRoomStore, type RoomUser } from "~/stores/room";

const roomStore = useRoomStore();
const peerStore = usePeerStore();

roomStore.id = peerStore.id;
peerStore.peer!.on("open", () => {
  roomStore.id = peerStore.id;
});

peerStore.peer!.on("connection", (connection) => {
  console.log(connection);
  if (roomStore.userByPeerId.has(connection.peer)) return;

  console.log("Connection created");

  const user: RoomUser = reactive({
    id: connection.peer,
    initialized: false,
    color: "",
    username: "",
  });

  roomStore.users.push(user);
  roomStore.userByConnection.set(connection, user);
  roomStore.userByPeerId.set(connection.peer, user);

  connection.on("open", () => {
    console.log("It opened!");
  });

  connection.on("data", (data) => {
    try {
      if (typeof data !== "object") throw "what is this";
      const message = data as Message;

      if (message.type === "init" && user.initialized === false) {
        user.initialized = true;
        user.color = message.color;
        user.username = message.username;
      }
    } catch {
      // TODO: do soemthing
    }

    console.log("data!", data);
  });
});

const { copy } = useClipboard({});
</script>

<template>
  <PearWindow
    tag="main"
    color="primary"
    class="w-full my-auto md:(min-w-1/3 w-max mx-auto)"
  >
    <template #titlebar>
      <h1 class="font-semibold text-2xl">Create room</h1>
    </template>

    <label>
      Send this code to your friends:
      <PearSendInput
        readonly
        type="text"
        :value="peerStore.id!"
        @click="copy(roomStore.id!)"
      >
        <template #button>
          <span
            class="i-mingcute-copy-2-line group-[.active-send-button]:i-mingcute-copy-2-fill group-active:i-mingcute-copy-2-fill"
          />
        </template>
      </PearSendInput>
    </label>

    <label>
      People connected:
      <ul class="flex flex-col gap-1">
        <li
          v-for="user in roomStore.users"
          :key="user.id"
          class="flex items-center p-0.5 border-3 rounded-md border-green-300"
        >
          <span
            class="i-mingcute-user-2-fill mr-1"
            :style="{ color: user.color }"
          />

          <span>{{ user.username }}</span>

          <PearButton class="px-1! py-0!">
            <span class="i-mingcute-delete-2-line"></span>
          </PearButton>
        </li>
      </ul>
    </label>
  </PearWindow>
</template>
