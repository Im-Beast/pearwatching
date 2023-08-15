<script setup lang="ts">
const props = defineProps<{
  color?: "primary" | "secondary";
  placeholder?: string;

  disabled?: boolean;

  inputClass?: string;
  buttonClass?: string;

  modelValue?: string;
  value?: string;
  readonly?: any;
}>();

const emit = defineEmits<{
  (event: "send", type: MouseEvent): void;
  (event: "update:modelValue", target: HTMLInputElement): void;
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

function keydown() {
  const pearButton = buttonRefs.value?.pearButton;
  if (!pearButton) return;

  pearButton.classList.add("active-send-button");
}

function keyup() {
  const pearButton = buttonRefs.value?.pearButton;
  if (!pearButton) return;

  pearButton.classList.remove("active-send-button");
  pearButton.click();
}
</script>

<template>
  <div class="relative w-full">
    <PearTextInput
      ref="inputRefs"
      :class="props.inputClass"
      :color="color"
      :value="modelValue ?? value"
      :readonly="readonly"
      @keydown.enter="keydown"
      @keyup.enter="keyup"
      @input="emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
    />
    <PearButton
      aria-label="Send"
      ref="buttonRefs"
      @click="!disabled && emit('send', $event)"
      class="absolute! group right-0 border-b-0! border-r-2 active:(border-r-0 bottom-0!)"
      :class="props.buttonClass"
      :color="alternateColor"
      :placeholder="props.placeholder"
      :disabled="disabled"
    >
      <slot name="button">
        <span
          class="i-mingcute-send-plane-line disabled group-active:i-mingcute-send-plane-fill group-[.active-send-button]:i-mingcute-send-plane-fill"
        />
      </slot>
    </PearButton>
  </div>
</template>

<style scoped>
.active-send-button,
:disabled {
  --at-apply: "border-r-0 bottom-0!";
}
</style>
