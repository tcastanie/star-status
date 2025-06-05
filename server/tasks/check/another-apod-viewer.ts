export default defineTask({
  meta: {
    name: 'check:another-apod-viewer',
    description: 'Health check for Another APOD viewer',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const check = await healthCheck('https://apod.tcastanie.dev', 2)

    return { result: check }
  },
})
