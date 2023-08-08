// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@unocss/nuxt",
  ],
  pages: true,
  components: [
    {
      path: "~/components",
    },
  ],
  css: [
    // reset styles
    "@unocss/reset/tailwind.css",
    // Global CSS
    "~/assets/global.css",
  ],
});
