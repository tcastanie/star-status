export default defineTask({
  meta: {
    name: 'check:rocinante-spaceship',
    description: 'Health check for Rocinante spaceship',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    // const { urlRoci } = useRuntimeConfig(event)
    // eslint-disable-next-line node/prefer-global/process
    console.log(process.env.NUXT_URL_ROCI)
    // eslint-disable-next-line node/prefer-global/process
    const urlRoci = process.env.NUXT_URL_ROCI || ''
    console.log('Checking:', urlRoci)
    const healthData = await healthFetch(urlRoci)

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 4,
      ...healthData,
    }).returning().get()

    return { result: check }
  },
})
