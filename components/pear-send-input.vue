<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
  placeholder?: string;

  inputClass?: string;
  buttonClass?: string;
}>();

defineSlots<{ button: any }>();

const color = props.color ?? "primary";
const alternateColor = color === "primary" ? "secondary" : "primary";

const buttonRefs = ref<{ pearButton: HTMLButtonElement }>();
const inputRefs = ref<{ pearTextInput: HTMLInputElement }>();

defineExpose({
  button: buttonRefs.value,
  input: inputRefs.value,
});
</script>

<template>
  <div class="relative w-full">
    <PearTextInput :class="props.inputClass" :color="color" />
    <PearButton
      class="absolute! right-0 border-b-0! border-r-2 active:(border-r-0 bottom-0!)"
      :class="props.buttonClass"
      :color="alternateColor"
      :placeholder="props.placeholder"
    >
      <slot name="button">
        <span class="i-mingcute-send-plane-fill" />
      </slot>
    </PearButton>
  </div>
</template>

<style scoped></style>
