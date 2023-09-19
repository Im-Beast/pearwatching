<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTimeoutFn } from "@vueuse/core";
import { useDockStore } from "~/stores/dock";
import { PearDockLinkInfo } from "./pear-dock-link.vue";

const props = defineProps<{
  videoClass?: string;
}>();

const videoClass = props.videoClass ?? "";

const src = ref("/videos/Big-Buck-Bunny-1440p.webm");
const playing = ref(false);
const showOverlay = ref(false);
const time = ref(0);
const fullscreen = ref(false);

const videoPlayerRef = ref<HTMLVideoElement>();
const videoContainerRef = ref<HTMLDivElement>();

//#region time
watch(time, (value) => {
  const videoPlayer = videoPlayerRef.value!;
  videoPlayer.currentTime = value;
});

onMounted(() => {
  time.value = 45;
});
//#endregion

//#region pause/play
watchDebounced(
  playing,
  (value) => {
    const videoPlayer = videoPlayerRef.value!;

    if (value && videoPlayer.paused) {
      videoPlayer.play();
    } else if (!value && !videoPlayer.paused) {
      videoPlayer.pause();
    }
  },
  { debounce: 150, maxWait: 1000 }
);
//#endregion

//#region fullscreen
watch(fullscreen, (value) => {
  const videoContainer = videoContainerRef.value!;
  if (value) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  const currentState = !!document.fullscreenElement;
  if (fullscreen.value !== currentState) {
    fullscreen.value = currentState;
  }
});

document.addEventListener("fullscreenerror", () => {
  fullscreen.value = !!document.fullscreenElement;
});
//#endregion

//#region pause/play overlay
// TODO: experiment and see what looks and works well
const hideOverlayTimeout = useTimeoutFn(() => {
  showOverlay.value = false;
}, 1500);

function showPauseOverlay(event: PointerEvent) {
  if (
    event.target instanceof HTMLButtonElement ||
    event.target instanceof HTMLInputElement
  ) {
    return;
  }

  showOverlay.value = true;
  hideOverlayTimeout.stop();
  hideOverlayTimeout.start();
}

function hidePauseOverlay() {
  showOverlay.value = false;
}
//#endregion

//#region move dock to bar
const dockStore = useDockStore();
const { teleport, links } = storeToRefs(dockStore);
const dockPositionRef = ref<HTMLElement>();

const watchDockLink: PearDockLinkInfo = {
  title: "Watch",
  to: "/private-rooms/watch",
  icon: {
    base: "i-mingcute-tv-2-line",
    current: "i-mingcute-tv-2-fill",
  },
};

onMounted(() => {
  teleport.value = dockPositionRef.value;
  for (const link of links.value) {
    if (link.title === "Watch") return;
  }
  // TODO: Remove this when user leaves the room
  dockStore.addDockLink(watchDockLink);
});

onUnmounted(() => {
  teleport.value = null;
});
//#endregion
</script>

<template>
  <div
    ref="videoContainerRef"
    id="video-container"
    class="relative w-max h-max flex justify-center items-start bg-green-300"
    :class="{
      'cursor-none': playing && !showOverlay,
    }"
    @pointermove="showPauseOverlay"
    @pointerdown="showPauseOverlay"
    @pointerleave="hidePauseOverlay"
  >
    <div id="video-overlay" class="relative">
      <!-- continuation of experiment todo
        <div
        id="pause-overlay"
        class="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-3px z-1 transition-opacity duration-300"
        :class="{
          'ease-in opacity-100': showOverlay,
          'ease-out opacity-0': playing || !showOverlay,
        }"
      >
        <PearButton
          class="absolute! inset-1/2 group"
          @click="playing = !playing"
        >
          <span
            :class="{
              'i-mingcute-pause-line group-active:i-mingcute-pause-fill':
                playing,
              'i-mingcute-play-line group-active:i-mingcute-play-fill':
                !playing,
            }"
          />
        </PearButton>
      </div> -->

      <video
        ref="videoPlayerRef"
        class="w-full! h-auto max-h-100vh max-w-[calc(100vw-10px)] pointer-events-none select-none"
        :class="videoClass"
        :src="src"
      />

      <div
        class="absolute bottom-0 flex items-center justify-between w-full p-1 border-t-4 border-green-300 bg-dark-500/80 z-2"
      >
        <!-- left buttons -->
        <div class="flex gap-1 items-center">
          <PearVideoPlayerButton class="group" @click="playing = !playing">
            <span
              :class="{
                'i-mingcute-pause-line group-active:i-mingcute-pause-fill':
                  playing,
                'i-mingcute-play-line group-active:i-mingcute-play-fill':
                  !playing,
              }"
            />
          </PearVideoPlayerButton>

          <PearVideoPlayerButton
            v-if="1 /* has previous video */"
            class="group"
            @click="0 /* skip backwards */"
          >
            <span
              class="i-mingcute-skip-previous-line group-active:i-mingcute-skip-previous-fill"
            />
          </PearVideoPlayerButton>

          <PearVideoPlayerButton class="group" @click="0 /* skip forward */">
            <span
              class="i-mingcute-skip-forward-line group-active:i-mingcute-skip-forward-fill"
            />
          </PearVideoPlayerButton>
        </div>

        <!-- dock position -->
        <div ref="dockPositionRef"></div>

        <!-- right buttons -->
        <div class="flex gap-1 items-center">
          <PearVideoPlayerButton class="group" @click="0 /* settings */">
            <span
              class="i-mingcute-settings-3-line group-active:i-mingcute-settings-3-fill"
            />
          </PearVideoPlayerButton>

          <PearVideoPlayerButton
            class="group"
            @click="fullscreen = !fullscreen"
          >
            <span
              :class="{
                'i-mingcute-fullscreen-exit-line group-active:i-mingcute-fullscreen-exit-fill':
                  fullscreen,
                'i-mingcute-fullscreen-line group-active:i-mingcute-fullscreen-fill':
                  !fullscreen,
              }"
            />
          </PearVideoPlayerButton>
        </div>
      </div>
    </div>
  </div>
</template>
