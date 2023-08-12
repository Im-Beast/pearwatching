<script setup lang="ts">
const NuxtLink = defineNuxtLink({});

let selectedComponent = null;
</script>

<template>
  <PearWindow
    tag="main"
    color="gradient"
    class="w-full my-auto md:(min-w-1/3 w-max mx-auto)"
  >
    <template #titlebar>
      <h1 class="font-semibold text-2xl">What would you like to do?</h1>
    </template>

    <div
      class="grid grid-rows-2 gap-3 md:(grid-cols-2 grid-rows-none gap-1) w-full"
    >
      <section class="flex flex-col items-center">
        <p class="font-500 text-xl text-green-300 text-shadow-md">
          Create your own room
        </p>

        <p>You'll be given a code</p>
        <p>that people can use to join</p>

        <PearButton
          :tag="NuxtLink"
          href="/private-rooms/create"
          class="group mt-2"
        >
          <span
            class="i-mingcute-add-circle-line group-active:i-mingcute-add-circle-fill"
          />
          Create a room
        </PearButton>
      </section>
      <section class="flex flex-col items-center">
        <p class="font-500 text-xl text-teal-300 text-shadow-md">
          Join someone's room
        </p>

        <p>You'll need to enter a code</p>
        <p>to join already created room</p>

        <PearButton
          :tag="NuxtLink"
          color="secondary"
          href="/private-rooms/join"
          class="group mt-2"
        >
          <span
            class="i-mingcute-enter-door-line group-active:i-mingcute-enter-door-fill"
          />
          Join a room
        </PearButton>
      </section>
    </div>
  </PearWindow>
</template>
