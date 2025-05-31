export default defineTask({
  meta: {
    name: 'check:tycho-station',
    description: 'Health check for Tycho station',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const { urlTycho } = useRuntimeConfig()
    const healthData = await healthFetch(urlTycho)

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 3,
      ...healthData,
    }).returning().get()

    return { result: check }
  },
})
