import Peer, { DataConnection } from "peerjs";
import { defineStore } from "pinia";

export enum ConnectionStatus {
  IDLE = "idle",
  CONNECTING = "connecting",
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  FAILED = "failed",
}

export interface ChatMessage {
  type: "chat";
  message: string;
}

export interface InitMessage {
  type: "init";
  username: string;
  color: string;
}

export type Message = ChatMessage | InitMessage;

interface OptionsStoreSchema {
  peer: Peer | null;
  id: string | null;
  messages: unknown[];
  connections: DataConnection[];
  connectionStatus: ConnectionStatus;
}

interface ActionsStoreSchema {
  setup(): void;
  connect(id: string): Promise<DataConnection>;
  broadcastMessage(message: Message): void;
  sendMessage(
    connection: DataConnection,
    message: Message,
  ): void;
}

export const usePeerStore = defineStore<
  "peer",
  OptionsStoreSchema,
  {},
  ActionsStoreSchema
>("peer", {
  state: () => ({
    peer: new Peer(),
    id: null,
    messages: [],
    connections: [],
    connectionStatus: ConnectionStatus.IDLE,
  }),

  actions: {
    setup() {
      const { peer } = this;
      if (!peer) throw new Error("Peer isn't created");

      peer.on("open", () => {
        this.id = peer.id;
      });
    },
    sendMessage(connection, message) {
      connection.send(message);
    },
    broadcastMessage(message) {
      for (const connection of this.connections) {
        connection.send(message);
      }
    },
    connect(id: string): Promise<DataConnection> {
      return new Promise((resolve, reject) => {
        const { peer } = this;
        if (!peer) throw new Error("Peer isn't created");

        peer.removeAllListeners();
        const connection = peer.connect(id, {
          reliable: true,
        });
        this.connectionStatus = ConnectionStatus.CONNECTING;

        this.connections.push(connection);

        connection.on("open", () => {
          this.connectionStatus = ConnectionStatus.CONNECTED;
          resolve(connection);
          console.log("Connected!");
        });

        peer.on("open", () => {
          this.id = peer.id;
        });

        peer.on("connection", (connection) => {
          connection.on("data", (data) => {
            this.messages.push(data);
          });
        });

        peer.on("disconnected", () => {
          this.connectionStatus = ConnectionStatus.DISCONNECTED;

          // Connection failed, try to recconect
          peer.reconnect();
        });

        peer.on("error", (error) => {
          this.connectionStatus = ConnectionStatus.FAILED;

          console.log("err", error);

          reject();
          throw new Error("Connection errored", error);
        });
      });
    },
  },
});
