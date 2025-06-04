export default defineTask({
  meta: {
    name: 'check:tycho-station',
    description: 'Health check for Tycho station',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    // eslint-disable-next-line node/prefer-global/process
    const urlTycho = process.env.NUXT_URL_TYCHO || ''
    const healthData = await healthFetch(urlTycho)

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 3,
      ...healthData,
    }).returning().get()

    if (!healthData.success) {
      sendEmail('Tycho station', healthData)
    }

    return { result: check }
  },
})
