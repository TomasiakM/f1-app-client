export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-headlessui',
    'nuxt-primevue'
  ],
  runtimeConfig:{
    public:{
      brand: "app_name",
      baseApiUrl: "http://localhost:5245/api/"
    }
  },
  devtools: { 
    enabled: true
  },
  postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
  },
  css: [
    '@/assets/main.css',
  ],
  primevue: {
    importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
    usePrimeVue: true,
    options: {
      unstyled: false,
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
        prefix: 'Prime',
    },
}
})
