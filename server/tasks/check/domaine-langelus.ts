export default defineTask({
  meta: {
    name: 'check:domaine-langelus',
    description: 'Health check for Domaine l\'Angélus',
  },
  async run() {
    if (import.meta.dev) {
      return { error: 'dev server' }
    }

    const check = await healthCheck('https://www.domaine-langelus.fr', 6)

    return { result: check }
  },
})
