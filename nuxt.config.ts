// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  pages: true,
  components: [
    {
      path: "~/components",
    },
  ],
  modules: [
    "@unocss/nuxt",
    "@pinia/nuxt",
  ],
  css: [
    // reset styles
    "@unocss/reset/tailwind.css",
    // Global CSS
    "~/assets/global.css",
  ],
});
