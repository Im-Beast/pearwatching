<script setup>
import { usePeerStore } from "~/stores/peer";

const peerStore = usePeerStore();

const store = peerStore;

store.peer.on("connection", (c) => {
  c.on("open", () => {
    console.log("It opened!");
  });

  c.on("data", (data) => {
    console.log("data!", data);
  });
});

let connectionId = "";

function connect() {
  console.log(connectionId);
  store.connect(connectionId);
}

function sendMessage() {
  for (const connection of store.connections) {
    console.log(connection);
    connection.send("Hello");
  }
}
</script>

<template>
  <h1>Your peer id: {{ store.id }}</h1>
  <p>
    You are {{ store.peer.disconnected ? "disconnected" : "connected" }} to
    PeerServer
  </p>

  <h2>Messages:</h2>

  <div></div>

  <div class="flex gap-2 flex-col w-1/2">
    <PearButton @click="sendMessage">Send message</PearButton>
    <PearButton @click="connect">Connect to this:</PearButton>
    <PearSendInput @send="connect" type="text" v-model="connectionId" />
  </div>
</template>
