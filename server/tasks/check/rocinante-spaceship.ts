export default defineTask({
  meta: {
    name: 'check:rocinante-spaceship',
    description: 'Health check for Rocinante spaceship',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    // eslint-disable-next-line node/prefer-global/process
    const urlRoci = process.env.NUXT_URL_ROCI || ''
    const healthData = await healthFetch(urlRoci)

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 4,
      ...healthData,
    }).returning().get()

    return { result: check }
  },
})
