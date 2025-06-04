export default defineTask({
  meta: {
    name: 'check:domaine-langelus',
    description: 'Health check for Domaine l\'Angélus',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const healthData = await healthFetch('https://www.domaine-langelus.fr')

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 6,
      ...healthData,
    }).returning().get()

    if (!healthData.success) {
      sendEmail('Domaine l\'Angélus', healthData)
    }

    return { result: check }
  },
})
