import { DataConnection } from "peerjs";
import { defineStore } from "pinia";
import { generateRandomUsername } from "../../utils/name-generator";

export interface RoomUser {
  id: string;
  initialized: boolean;

  color: string;
  username: string;
}

interface OptionsStoreSchema {
  id: string | null;
  username: string;
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
    username: generateRandomUsername(),
    users: reactive({
      all: new Set(),
      byPeerId: new Map(),
      byConnection: new WeakMap(),
    }),
  }),
});
