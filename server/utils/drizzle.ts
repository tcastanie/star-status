import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

export { and, eq, or, sql } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type Site = typeof schema.site.$inferSelect
export type Check = typeof schema.check.$inferSelect
