<script setup lang="ts">
import { usePeerStore } from "~/stores/peer";
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
      const message = data as any;

      if (message.type === "info" && user.color === "") {
        console.log("SET STATS");
        user.color = message.color;
        user.username = message.username;
        roomStore.users.splice(0, 0);
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
      <ul>
        <li v-for="user in roomStore.users" :key="user.id">
          <span class="i-mingcute-user-2-fill" :style="{ color: user.color }" />
          <span>{{ user.username }}</span>
        </li>
      </ul>
    </label>
  </PearWindow>
</template>
