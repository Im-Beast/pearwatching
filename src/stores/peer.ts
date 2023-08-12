import Peer, { DataConnection } from "peerjs";
import { defineStore } from "pinia";

interface OptionsStoreSchema {
  peer: Peer | null;
  id: string | null;
  messages: unknown[];
  connections: DataConnection[];
}

interface ActionsStoreSchema {
  setup(): void;
  connect(id: string): Promise<DataConnection>;
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
  }),

  actions: {
    setup() {
      const { peer } = this;
      if (!peer) throw new Error("Peer isn't created");

      peer.on("open", () => {
        this.id = peer.id;
      });
    },
    connect(id: string): Promise<DataConnection> {
      return new Promise((resolve, reject) => {
        const { peer } = this;
        if (!peer) throw new Error("Peer isn't created");

        peer.removeAllListeners();
        const connection = peer.connect(id, {
          reliable: true,
        });

        this.connections.push(connection);

        connection.on("open", () => {
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
          // Connection failed, try to recconect
          peer.reconnect();
        });

        peer.on("error", (error) => {
          console.log("err", error);

          reject();
          throw new Error("Connection errored", error);
        });
      });
    },
  },
});
