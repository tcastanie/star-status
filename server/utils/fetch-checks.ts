import type { H3Event } from 'h3'
import { desc, gte } from 'drizzle-orm'

export default defineCachedFunction(async (event: H3Event, siteId: number, days: number) => {
  const xDaysAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  const snapshots = await useDrizzle()
    .select()
    .from(tables.check)
    .orderBy(desc(tables.check.createdAt))
    .where(and(
      gte(tables.check.createdAt, xDaysAgo),
      eq(tables.check.siteId, siteId),
    ))
  return snapshots
}, {
  maxAge: 15 * 60, // 15 minutes,
  name: 'fetch-checks',
  getKey(event, siteId, days) {
    return `${siteId}-${days}`
  },
})
