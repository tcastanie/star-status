import { z } from 'zod/v4'

export default defineEventHandler(async (event) => {
  const allSites = await fetchSites(event)
  const onlyProjects = Array.from(new Set(allSites.map(site => site.project)))

  const querySchema = z.strictObject({
    days: z.coerce.number().min(1).max(365).default(30),
    project: z.enum(onlyProjects).optional(),
  })
  const query = await getValidatedQuery(event, q => querySchema.safeParse(q))
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid query parameters',
    })
  }
  const { days, project } = query.data
  // console.info('Fetching snapshots for', { days, project })

  const projectIds = allSites
    .filter(site => site.project === project || !project)
    .map(site => site.id)
  const checks = await Promise.all(projectIds.map((id) => {
    return fetchChecks(event, id, days)
  }))

  // add service name to each group of checks
  const groupedSnapshots = checks.flat().reduce((acc, check) => {
    const serviceName = allSites.find(site => site.id === check.siteId)?.name || 'Unknown'
    if (!acc[serviceName]) {
      acc[serviceName] = []
    }
    // TODO: transform array of checks into 90 snapshots (mean)
    acc[serviceName].push(check)
    return acc
  }, {} as Record<string, Check[]>)

  return groupedSnapshots
})
