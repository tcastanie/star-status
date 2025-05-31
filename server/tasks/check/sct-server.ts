export default defineTask({
  meta: {
    name: 'check:sct-server',
    description: 'Health check for Stoneybatter Cross Training server',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const { urlSct } = useRuntimeConfig()
    const healthData = await healthFetch(urlSct)

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 8,
      ...healthData,
    }).returning().get()

    return { result: check }
  },
})
