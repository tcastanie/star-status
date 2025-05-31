export default defineNuxtConfig({
  modules: ['@nuxt/ui-pro', '@nuxt/eslint', '@nuxthub/core'],
  devtools: { enabled: true },
  app: {
    rootAttrs: {
      class: 'font-mona',
    },
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-05-15',
  hub: {
    database: true,
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
})
