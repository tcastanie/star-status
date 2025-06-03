export default defineTask({
  meta: {
    name: 'check:space-platform',
    description: 'Health check for Space platform',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const event = useEvent()
    const { urlSpace } = useRuntimeConfig(event)
    const healthData = await healthFetch(urlSpace)

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 5,
      ...healthData,
    }).returning().get()

    return { result: check }
  },
})
