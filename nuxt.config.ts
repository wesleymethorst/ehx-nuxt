// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.NUXT_SUPABASE_URL,
        key: process.env.NUXT_SUPABASE_KEY
      }
    }
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],

  supabase: {
    url: process.env.NUXT_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY,
    redirectOptions: {
      login: '/',
      callback: '/auth/callback',
      include: ['/dashboard']
    }
  },
  
  fonts: {
    families: [
      {
        name: 'Poppins',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800]
      }
    ]
  },
})