export default defineTask({
  meta: {
    name: 'check:tcastanie-dev',
    description: 'Health check for tcastanie.dev',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const check = await healthCheck('https://tcastanie.dev', 1)

    return { result: check }
  },
})
