import { DataConnection } from "peerjs";
import { defineStore } from "pinia";

export interface RoomUser {
  id: string;
  initialized: boolean;

  color: string;
  username: string;
}

interface OptionsStoreSchema {
  id: string | null;
  users: RoomUser[];
  userByConnection: WeakMap<DataConnection, RoomUser>;
  userByPeerId: Map<string, RoomUser>;
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
    users: [],
    userByPeerId: new Map(),
    userByConnection: new WeakMap(),
  }),
});
