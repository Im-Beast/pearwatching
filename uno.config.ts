import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  content: {
    pipeline: {
      include: [
        // the default
        /\.(ts|js|vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
      ],
      exclude: [
        "**/node_modules/**",
        "**/.nuxt/**",
      ],
    },
  },
  rules: [
    ["image-pixelated", { "image-rendering": "pixelated" }],
    ["transition-content-colors", {
      "transition":
        "color, background-color, text-decoration-color, fill, stroke",
      "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
      "transition-duration": "150ms",
    }],
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
