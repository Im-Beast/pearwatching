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
  modules: [
    "@unocss/nuxt",
    "@pinia/nuxt",
    ["@nuxtjs/google-fonts", {
      download: true,
      outputDir: "~/assets/",
      stylePath: "fonts.css",
      families: {
        "Varela Round": true,
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
