import Peer, { DataConnection } from "peerjs";
import { acceptHMRUpdate, defineStore } from "pinia";

export enum MessageType {
  CHAT = "chat",
  INIT = "init",
  SYNC = "sync",
}

export enum ConnectionStatus {
  IDLE = "idle",
  CONNECTING = "connecting",
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  FAILED = "failed",
}

export interface BaseMessage {
  type: MessageType;
}

export interface ChatMessage extends BaseMessage {
  type: MessageType.CHAT;
  content: string;
}

export interface InitMessage extends BaseMessage {
  type: MessageType.INIT;
  username: string;
  color: string;
}

export interface SyncMessage extends BaseMessage {
  type: MessageType.SYNC;
  timestamp: number;
  videoTime: number;
}

export type Message = ChatMessage | SyncMessage | InitMessage;

export function isValidMessage(data: unknown): data is Message {
  if (!data || typeof data !== "object") {
    return false;
  }

  if (
    !("type" in data) ||
    typeof data.type !== "string" ||
    !(data.type.toUpperCase() in MessageType)
  ) {
    return false;
  }

  switch (data.type) {
    case MessageType.CHAT:
      {
        const message = data as ChatMessage;

        if (typeof message.content !== "string") return false;
        else if (Object.keys(data).length !== 1) return false;
      }
      break;
    case MessageType.INIT:
      {
        const message = data as InitMessage;

        if (
          typeof message.color !== "string" ||
          typeof message.username !== "string"
        ) return false;
        else if (Object.keys(data).length !== 3) return false;
      }
      break;
    case MessageType.SYNC:
      {
        const message = data as SyncMessage;

        if (
          typeof message.timestamp !== "number" ||
          typeof message.videoTime !== "number"
        ) return false;
        else if (Object.keys(data).length !== 3) return false;
      }
      break;
    default:
      return false;
  }

  return true;
}

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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePeerStore, import.meta.hot));
}
