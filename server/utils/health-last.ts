import { desc } from 'drizzle-orm'

export default async function (serviceId: number) {
  return await useDrizzle()
    .select()
    .from(tables.check)
    .orderBy(desc(tables.check.createdAt))
    .where(eq(tables.check.siteId, serviceId))
    .limit(1)
}
