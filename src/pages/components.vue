<template>
  <PearWindow tag="main" class="w-full my-auto md:(w-3/4 mx-auto)">
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
          <PearSelect>
            <PearOption value="dog">Dog</PearOption>
            <PearOption value="cat">Cat</PearOption>
            <PearOption value="hamster">Hamster</PearOption>
          </PearSelect>
          <PearSelect color="secondary">
            <PearOption value="dog">Dog</PearOption>
            <PearOption value="cat">Cat</PearOption>
            <PearOption value="hamster">Hamster</PearOption>
          </PearSelect>
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
  </PearWindow>
</template>
