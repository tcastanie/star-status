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
    resendApiKey: '',
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
      // wrangler: {
      //   triggers: {
      //     crons: [
      //       '*/30 * * * *',
      //       '*/15 * * * *',
      //       '*/5 * * * *',
      //     ],
      //   },
      // },
    },
    experimental: {
      tasks: true,
    },
    // scheduledTasks: {
    //   '*/30 * * * *': [
    //     'check:tcastanie-dev',
    //     'check:another-apod-viewer',
    //     'check:tycho-station',
    //   ],
    //   '*/15 * * * *': [
    //     'check:space-platform',
    //     'check:domaine-langelus',
    //     'check:sct-app',
    //     'check:sct-server',
    //   ],
    //   '*/5 * * * *': [
    //     'check:rocinante-spaceship',
    //   ],
    // },
  },
  hub: {
    cache: false,
    database: true,
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
      icons: [
        'mingcute:check-fill',
        'mingcute:moon-fill',
        'mingcute:sun-fill',
        'mingcute:loading-fill',
      ],
    },
  },
})
