<script setup>
import { usePeerStore } from "~/stores/peer";

const store = usePeerStore();
store.setup();
</script>

<template>
  <PearDock color="primary">
    <PearDockLink to="/" title="Home" class="group">
      <span
        class="i-mingcute-home-6-line group-[.current]:(i-mingcute-home-6-fill)"
      />
    </PearDockLink>
    <PearDockLink to="/private-rooms" title="Private Rooms" class="group">
      <span
        class="i-mingcute-door-line group-[.current]:(i-mingcute-door-fill)"
      />
    </PearDockLink>
    <PearDockLink to="/public-rooms" title="Public Rooms" class="group">
      <span
        class="i-mingcute-open-door-line group-[.current]:(i-mingcute-open-door-fill)"
      />
    </PearDockLink>
    <PearDockLink to="/components" title="Components" class="group">
      <span
        class="i-mingcute-paint-2-line group-[.current]:(i-mingcute-paint-2-fill)"
      />
    </PearDockLink>
  </PearDock>

  <NuxtPage />
</template>
