export default defineTask({
  meta: {
    name: 'check:sct-app',
    description: 'Health check for Stoneybatter Cross Training App',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const healthData = await healthFetch('https://app.stoneybattercrosstraining.ie/health')

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 7,
      ...healthData,
    }).returning().get()

    if (!healthData.success) {
      sendEmail('Stoneybatter Cross Training App', healthData)
    }

    return { result: check }
  },
})
