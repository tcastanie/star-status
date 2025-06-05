export default defineTask({
  meta: {
    name: 'check:sct-app',
    description: 'Health check for Stoneybatter Cross Training App',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const check = await healthCheck('https://app.stoneybattercrosstraining.ie/health', 7)

    return { result: check }
  },
})
