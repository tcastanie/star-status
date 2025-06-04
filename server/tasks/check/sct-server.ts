export default defineTask({
  meta: {
    name: 'check:sct-server',
    description: 'Health check for Stoneybatter Cross Training server',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    // eslint-disable-next-line node/prefer-global/process
    const urlSct = process.env.NUXT_URL_SCT || ''
    const healthData = await healthFetch(urlSct)

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 8,
      ...healthData,
    }).returning().get()

    if (!healthData.success) {
      sendEmail('Stoneybatter Cross Training server', healthData)
    }

    return { result: check }
  },
})
