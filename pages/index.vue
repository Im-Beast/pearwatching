<script setup lang="ts">
const a: Ref<string> = ref("hello");
</script>

<template>
  <main
    class="absolute flex flex-row gap-2 grainy-bg top-1/2 left-1/2 -translate-1/2 w-3/4 bg-dark-200 border-1 border-green-300 rounded-lg p-2"
  >
    <section class="w-1/2">
      <section class="flex flex-col">
        <h1>Buttons</h1>
        <section class="flex flex-wrap items-center gap-1">
          <PearButton>Hello</PearButton>
          <PearButton color="secondary">Hello</PearButton>
        </section>
      </section>

      <section class="flex flex-col gap-1">
        <h1>Text Inputs</h1>
        <PearTextInput class="mb-2" placeholder="wassup" />
        <PearTextInput class="mb-2" color="secondary" placeholder="wassup" />
      </section>

      <section class="flex flex-col gap-1">
        <h1>Send Inputs</h1>
        <PearSendInput />
        <PearSendInput color="secondary" />
        <PearSendInput color="secondary">
          <template #button> custom text </template>
        </PearSendInput>
      </section>
    </section>
    <section>
      <section class="flex flex-col">
        <h1>Checkboxes</h1>
        <section class="flex flex-wrap items-center gap-1">
          <PearCheckbox>Hello</PearCheckbox>
          <PearCheckbox color="secondary">Hello</PearCheckbox>
        </section>
      </section>

      <section class="flex flex-col">
        <h1>Switches</h1>
        <section class="flex flex-wrap items-center gap-1">
          <PearSwitch>Hello</PearSwitch>
          <PearSwitch color="secondary">Hello</PearSwitch>
        </section>
      </section>

      <section class="flex flex-col">
        <h1>Select</h1>
        <section class="flex flex-wrap items-center gap-1">
          <PearSelect>Hello</PearSelect>
          <PearSelect color="secondary">Hello</PearSelect>
        </section>
      </section>

      <section class="flex flex-col">
        <h1>Slider</h1>
        <section class="flex flex-wrap items-center gap-1">
          <PearSlider>Hello</PearSlider>
          <PearSlider color="secondary">Hello</PearSlider>
        </section>
      </section>
    </section>
  </main>
</template>
