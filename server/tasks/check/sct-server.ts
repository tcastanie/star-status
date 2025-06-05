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

    const check = await healthCheck(urlSct, 8)

    return { result: check }
  },
})
