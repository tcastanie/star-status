export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    const sites = [
      {
        name: 'tcastanie.dev',
        project: 'tcastanie',
        sort: 1,
      },
      {
        name: 'Another APOD viewer',
        project: 'tcastanie',
        sort: 2,
      },
      {
        name: 'Tycho station',
        project: 'tcastanie',
        sort: 3,
      },
      {
        name: 'Rocinante spaceship',
        project: 'tcastanie',
        sort: 4,
      },
      {
        name: 'Space platform',
        project: 'tcastanie',
        sort: 5,
      },
      {
        name: 'Domaine l\'Angélus',
        project: 'domaine-langelus',
        sort: 10,
      },
      {
        name: 'Stoneybatter Cross Training App',
        project: 'stoneybatter-cross-training',
        sort: 20,
      },
      {
        name: 'Stoneybatter Cross Training server',
        project: 'stoneybatter-cross-training',
        sort: 21,
      },
    ]
    await useDrizzle().insert(tables.site).values(sites)
    return { result: 'success' }
  },
})
