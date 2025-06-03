export default defineTask({
  meta: {
    name: 'check:rocinante-spaceship',
    description: 'Health check for Rocinante spaceship',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const event = useEvent()
    const { urlRoci } = useRuntimeConfig(event)
    console.log('Checking:', urlRoci)
    const healthData = await healthFetch(urlRoci)

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 4,
      ...healthData,
    }).returning().get()

    return { result: check }
  },
})
