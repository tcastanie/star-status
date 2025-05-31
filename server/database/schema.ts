import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const site = sqliteTable('site', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  project: text('project'),
  sort: integer('sort'),
})

export const check = sqliteTable('check', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  siteId: integer('site_id').notNull().references(() => site.id),
  success: integer('success', { mode: 'boolean' }),
  responseTime: integer('response_time').notNull(),
  error: text('error'),
})
