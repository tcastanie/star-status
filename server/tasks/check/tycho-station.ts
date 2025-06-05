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

    const check = await healthCheck(urlTycho, 3)

    return { result: check }
  },
})
