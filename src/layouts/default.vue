<script setup>
import { storeToRefs } from "pinia";
import { usePeerStore } from "~/stores/peer";
import { useDockStore } from "~/stores/dock";

const peerStore = usePeerStore();
peerStore.setup();

const dockStore = useDockStore();
const { teleport, links } = storeToRefs(dockStore);

const route = useRoute();
</script>

<template>
  <Teleport :to="teleport" :disabled="!teleport">
    <PearDock
      :class="{
        'relative! bottom-0! m-1!': teleport,
      }"
      color="primary"
    >
      <PearDockLink v-for="info in links" :info="info">
        <span
          :class="{
            [info.icon.base]: info.to !== route.path,
            [info.icon.current]: info.to === route.path,
          }"
        />
      </PearDockLink>
    </PearDock>
  </Teleport>

  <NuxtPage />
</template>
