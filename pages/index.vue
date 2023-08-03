<script setup lang="ts">
const a: Ref<string> = ref("hello");
</script>

<template>
  <main
    class="absolute grainy-bg top-1/2 left-1/2 -translate-1/2 w-1/2 bg-dark-200 border-1 border-green-300 rounded-lg p-2"
  >
    <PearButton class="mr-2 mb-2">Hello</PearButton>
    <PearButton color="secondary">Hello</PearButton>
    <br />
    <PearTextInput class="mb-2" placeholder="wassup" />
    <br />
    <PearTextInput class="mb-2" color="secondary" placeholder="wassup" />
    <br />
    <PearSendInput />
    <br />
    <PearSendInput color="secondary" />
  </main>
</template>
