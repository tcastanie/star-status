export default defineTask({
  meta: {
    name: 'check:space-platform',
    description: 'Health check for Space platform',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    // eslint-disable-next-line node/prefer-global/process
    const urlSpace = process.env.NUXT_URL_SPACE || ''

    const check = await healthCheck(urlSpace, 5)

    return { result: check }
  },
})
