export default defineTask({
  meta: {
    name: 'check:another-apod-viewer',
    description: 'Health check for Another APOD viewer',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const healthData = await healthFetch('https://apod.tcastanie.dev')

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 2,
      ...healthData,
    }).returning().get()

    if (!healthData.success) {
      sendEmail('Another APOD viewer', healthData)
    }

    return { result: check }
  },
})
