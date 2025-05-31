export default defineTask({
  meta: {
    name: 'check:tcastanie-dev',
    description: 'Health check for tcastanie.dev',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const healthData = await healthFetch('https://tcastanie.dev')

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 1,
      ...healthData,
    }).returning().get()

    return { result: check }
  },
})
