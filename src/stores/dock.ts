import { acceptHMRUpdate, defineStore } from "pinia";

interface OptionsStoreSchema {
  teleport: Nullable<string>;
}

interface ActionsStoreSchema {
}

export const useDockStore = defineStore<
  "room",
  OptionsStoreSchema,
  {},
  ActionsStoreSchema
>("room", {
  state: () => ({
    teleport: null,
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDockStore, import.meta.hot));
}
