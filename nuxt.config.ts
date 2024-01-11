// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/robots",
    "nuxt-simple-sitemap",
    '@nuxtjs/prismic'
  ],

  prismic: {
    endpoint: 'wlfm'
  }
})