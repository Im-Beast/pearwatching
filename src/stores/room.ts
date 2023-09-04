import { DataConnection } from "peerjs";
import { acceptHMRUpdate, defineStore } from "pinia";

export interface RoomUser {
  id: string;
  initialized: boolean;

  color: string;
  username: string;
}

interface OptionsStoreSchema {
  id: string | null;
  username: string | null;
  users: {
    all: Set<RoomUser>;
    byConnection: WeakMap<DataConnection, RoomUser>;
    byPeerId: Map<string, RoomUser>;
  };
}

interface ActionsStoreSchema {
}

export const useRoomStore = defineStore<
  "room",
  OptionsStoreSchema,
  {},
  ActionsStoreSchema
>("room", {
  state: () => ({
    id: null,
    username: null,
    users: reactive({
      all: new Set(),
      byPeerId: new Map(),
      byConnection: new WeakMap(),
    }),
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoomStore, import.meta.hot));
}
