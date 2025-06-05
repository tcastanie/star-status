export default async function (
  serviceId: number,
  healthData: {
    success: boolean
    responseTime: number
    error: any
    createdAt: Date
  },
) {
  return await useDrizzle()
    .insert(tables.check)
    .values({
      siteId: serviceId,
      ...healthData,
    })
    .returning()
    .get()
}
