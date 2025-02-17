// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],

  build: {
    transpile: ["@fortawesome/vue-fontawesome"],
  },

  image: {
    domains: ['images.unsplash.com'], // Add any external domains you fetch images from
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY, // Exposed to client-side
    },
  },

})
