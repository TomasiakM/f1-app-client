export default defineNuxtConfig({
  runtimeConfig:{
    public:{
      brand: "brand_name"
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
