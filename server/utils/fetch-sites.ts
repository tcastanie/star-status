import type { H3Event } from 'h3'

// eslint-disable-next-line unused-imports/no-unused-vars
export default defineCachedFunction(async (event: H3Event) => {
  const sites = await useDrizzle()
    .select()
    .from(tables.site)
    .all()

  return sites.sort((a, b) => {
    return (a.sort ?? 0) - (b.sort ?? 0)
  })
}, {
  maxAge: 60 * 60, // 1 hour
  name: 'fetch-sites',
})
