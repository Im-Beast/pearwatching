<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  usePeerStore,
  isValidMessage,
  MessageType,
  type Message,
} from "~/stores/peer";
import { useRoomStore, type RoomUser } from "~/stores/room";
import { generateRandomUsername } from "~/utils/name-generator";

const roomStore = useRoomStore();
const { users } = roomStore;
const { username } = storeToRefs(roomStore);

username.value ??= generateRandomUsername();

const peerStore = usePeerStore();

const selectedUsername = ref(!!username.value);
const connectedUsers = ref(users.all.size);

roomStore.id = peerStore.id;
peerStore.peer!.on("open", () => {
  roomStore.id = peerStore.id;
});

peerStore.peer!.on("connection", (connection) => {
  if (users.byPeerId.has(connection.peer)) {
    // This connection is already active?
    return;
  }

  const user: RoomUser = reactive({
    id: connection.peer,
    initialized: false,
    color: "",
    username: "",
  });

  users.all.add(user);
  users.byConnection.set(connection, user);
  users.byPeerId.set(connection.peer, user);

  connectedUsers.value = users.all.size;

  connection.on("close", () => {
    users.all.delete(user);
    users.byConnection.delete(connection);
    users.byPeerId.delete(connection.peer);

    connectedUsers.value = users.all.size;
  });

  connection.on("data", (message) => {
    if (!isValidMessage(message)) return;

    switch (message.type) {
      case MessageType.INIT:
        user.initialized = true;
        user.username = message.username;
        user.color = message.color;
        break;
      case MessageType.CHAT:
        break;
    }
  });
});

const { copy } = useClipboard();
</script>

<template>
  <PearWindow
    tag="main"
    class="w-full my-auto md:(min-w-100 w-max mx-auto) lg:(w-1/3)"
  >
    <template #titlebar>
      <h1 class="font-semibold text-2xl">Create room</h1>
    </template>

    <label>
      Username:
      <PearSendInput
        color="primary"
        class="w-[calc(100%+10rem)]"
        v-model="(username as string)"
        :readonly="selectedUsername"
        :value="username!"
        @send="selectedUsername = true"
        :disabled="selectedUsername"
      >
        <template #button>
          <span
            :class="{
              'i-mingcute-user-lock-line': selectedUsername,
              'i-mingcute-user-follow-2-line active:i-mingcute-user-follow-2-fill [&.active]:i-mingcute-user-follow-2-fill':
                !selectedUsername,
            }"
          ></span>
        </template>
      </PearSendInput>
    </label>

    <label v-if="selectedUsername">
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

    <div
      v-if="selectedUsername"
      class="mt-2 p-2 border-3 border-green-300 bg-dark-300 rounded-md"
    >
      <div class="contents" v-if="connectedUsers > 0">
        <h2>
          People connected:
          <sup
            title="People will still be able to request to join after the room is created"
            class="text-xs i-mingcute-information-line hover:i-mingcute-information-fill"
          />
        </h2>
        <ul class="flex flex-col gap-1">
          <li
            v-for="user in users.all"
            :key="user.id"
            class="flex items-center p-1 border-2 rounded-md bg-dark-400 border-green-300"
          >
            <span
              class="i-mingcute-user-2-fill mr-1"
              :style="{ color: user.color }"
            />

            <span>{{ user.username }}</span>

            <PearButton class="px-1! py-0! ml-auto">
              <span class="i-mingcute-delete-2-line"></span>
            </PearButton>
          </li>
        </ul>
      </div>
      <div v-else>Noone has connected yet</div>
    </div>

    <PearButton
      v-if="selectedUsername"
      class="mt-2 flex ml-auto"
      color="primary"
      >Create
    </PearButton>
  </PearWindow>
</template>
