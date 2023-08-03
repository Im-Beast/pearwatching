import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  rules: [
    ["image-pixelated", { "image-rendering": "pixelated" }],
  ],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "-0.25em",
        width: "1.25em",
        height: "1.2em",
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerCompileClass(),
    transformerVariantGroup(),
  ],
});
