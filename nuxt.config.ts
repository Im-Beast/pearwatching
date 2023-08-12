// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  pages: true,
  srcDir: "src",
  app: {
    rootTag: "body",
  },
  components: [
    {
      path: "~/components",
    },
  ],
  googleFonts: {},
  modules: [
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    ["@nuxtjs/google-fonts", {
      download: true,
      fontsDir: "./",
      fontsPath: "./fonts/",
      outputDir: "~/assets/fonts",
      stylePath: "../fonts.css",
      families: {
        "Fredoka": {
          wght: [300, 400, 500, 600, 700],
        },
        "Sniglet": {
          wght: [400],
        },
      },
    }],
  ],
  css: [
    // reset styles
    "@unocss/reset/tailwind.css",
    // Global CSS
    "~/assets/global.css",
  ],
});
