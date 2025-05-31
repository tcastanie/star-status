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
  runtimeConfig: {
    urlTycho: '',
    urlRoci: '',
    urlSpace: '',
    urlSct: '',
    public: {
      defaultTimeout: 10000, // 10 seconds
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-05-15',
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    experimental: {
      tasks: true,
    },
    // scheduledTasks: {
    //   '0 * * * *': [
    //     'check:tcastanie-dev',
    //     'check:another-apod-viewer',
    //     'check:tycho-station',
    //   ],
    //   '*/15 * * * *': [
    //     'check:rocinante-spaceship',
    //     'check:space-platform',
    //     'check:domaine-langelus',
    //     'check:sct-app',
    //     'check:sct-server',
    //   ],
    // },
  },
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
