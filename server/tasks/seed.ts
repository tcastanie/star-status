export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    const sites = [
      {
        id: 1,
        name: 'tcastanie.dev',
        project: 'tcastanie',
        sort: 1,
      },
      {
        id: 2,
        name: 'Another APOD viewer',
        project: 'tcastanie',
        sort: 2,
      },
      {
        id: 3,
        name: 'Tycho station',
        project: 'tcastanie',
        sort: 3,
      },
      {
        id: 4,
        name: 'Rocinante spaceship',
        project: 'tcastanie',
        sort: 4,
      },
      {
        id: 5,
        name: 'Space platform',
        project: 'tcastanie',
        sort: 5,
      },
      {
        id: 6,
        name: 'Domaine l\'Angélus',
        project: 'domaine-langelus',
        sort: 10,
      },
      {
        id: 7,
        name: 'Stoneybatter Cross Training App',
        project: 'stoneybatter-cross-training',
        sort: 20,
      },
      {
        id: 8,
        name: 'Stoneybatter Cross Training server',
        project: 'stoneybatter-cross-training',
        sort: 21,
      },
    ]
    await useDrizzle().insert(tables.site).values(sites)

    const checks = [
      { id: 1, siteId: 1, createdAt: new Date('2025-06-02T14:00:00'), success: true, responseTime: 100, error: null },
      { id: 2, siteId: 1, createdAt: new Date('2025-06-02T14:30:00'), success: true, responseTime: 106, error: null },
      { id: 3, siteId: 1, createdAt: new Date('2025-06-02T15:00:00'), success: false, responseTime: 10052, error: 'Timeout' },
      { id: 4, siteId: 1, createdAt: new Date('2025-06-02T15:30:00'), success: false, responseTime: 10023, error: 'Timeout' },
      { id: 5, siteId: 1, createdAt: new Date('2025-06-02T16:00:00'), success: true, responseTime: 104, error: null },
      { id: 6, siteId: 2, createdAt: new Date('2025-06-02T15:24:00'), success: true, responseTime: 186, error: null },
    ]
    await useDrizzle().insert(tables.check).values(checks)
    return { result: 'success' }
  },
})
