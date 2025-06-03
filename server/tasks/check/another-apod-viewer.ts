export default defineTask({
  meta: {
    name: 'check:another-apod-viewer',
    description: 'Health check for Another APOD viewer',
  },
  async run() {
    console.log('Running health check for Another APOD viewer...')
    console.log(import.meta.dev)
    // if (import.meta.dev) {
    //   return { error: 'dev server' }
    // }

    const healthData = await healthFetch('https://apod.tcastanie.dev')

    const check = await useDrizzle().insert(tables.check).values({
      siteId: 2,
      ...healthData,
    }).returning().get()

    console.log('Health check result:', check)

    return { result: check }
  },
})
