export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-headlessui'
  ],
  runtimeConfig:{
    public:{
      brand: "brand_name",
      baseApiUrl: "http://localhost:5245/"
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
})
