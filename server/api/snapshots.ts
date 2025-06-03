import type { H3Event } from 'h3'
import { z } from 'zod/v4'

export default defineCachedEventHandler(async (event: H3Event) => {
  const allSites = await fetchSites(event)

  const querySchema = z.strictObject({
    days: z.coerce.number().min(1).max(365).default(30),
    project: z.enum(['tcastanie', 'domaine-langelus', 'stoneybatter-cross-training']).optional(),
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

  const projectIds = allSites
    .filter(site => site.project === project || !project)
    .map(site => site.id)
  const checks = await Promise.all(projectIds.map((id) => {
    return fetchChecks(event, id, days)
  }))

  // add service name to each group of checks
  const groupedChecks = checks.flat().reduce((acc, check) => {
    const serviceName = allSites.find(site => site.id === check.siteId)?.name || 'Unknown'
    if (!acc[serviceName]) {
      acc[serviceName] = []
    }
    acc[serviceName].push(check)
    return acc
  }, {} as Record<string, Check[]>)

  const groupedSnapshots = transformChecksToSnapshots(groupedChecks, days)

  return groupedSnapshots
}, {
  maxAge: 15 * 60, // 15 minutes
  name: 'snapshots',
  getKey: (event: H3Event) => event.node.req.url || 'snapshots',
})
