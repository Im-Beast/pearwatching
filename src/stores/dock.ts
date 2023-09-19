import { PearDockLinkInfo } from "~/components/pear-dock-link.vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface OptionsStoreSchema {
  teleport: Element | null | undefined;
  background: boolean;
  links: PearDockLinkInfo[];
}

interface ActionsStoreSchema {
  addDockLink(info: PearDockLinkInfo): void;
  removeDockLink(info: PearDockLinkInfo): void;
}

export const useDockStore = defineStore<
  "dock",
  OptionsStoreSchema,
  {},
  ActionsStoreSchema
>("dock", {
  state: () => ({
    teleport: null,
    background: true,
    links: [
      {
        title: "Home",
        to: "/",
        icon: {
          base: "i-mingcute-home-6-line",
          current: "i-mingcute-home-6-fill",
        },
      },

      {
        title: "Private Rooms",
        to: "/private-rooms",
        icon: {
          base: "i-mingcute-door-line",
          current: "i-mingcute-door-fill",
        },
      },

      {
        title: "Public rooms",
        to: "/public-rooms",
        icon: {
          base: "i-mingcute-open-door-line",
          current: "i-mingcute-open-door-fill",
        },
      },

      {
        title: "Components",
        to: "/components",
        icon: {
          base: "i-mingcute-paint-2-line",
          current: "i-mingcute-paint-2-fill",
        },
      },
    ],
  }),
  actions: {
    addDockLink(info: PearDockLinkInfo) {
      this.links.push(info);
    },
    removeDockLink(info: PearDockLinkInfo) {
      const index = this.links.indexOf(info);
      if (index !== -1) {
        this.links.splice(index, 1);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDockStore, import.meta.hot));
}
