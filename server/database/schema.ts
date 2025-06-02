import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const site = sqliteTable('site', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  project: text('project').notNull(),
  sort: integer('sort'),
})

export const check = sqliteTable('check', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  siteId: integer('site_id').notNull().references(() => site.id),
  success: integer('success', { mode: 'boolean' }),
  responseTime: integer('response_time').notNull(),
  error: text('error'),
})
