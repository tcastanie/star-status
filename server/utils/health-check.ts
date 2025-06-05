export default async function (serviceUrl: string, serviceId: number) {
  const service = await useDrizzle()
    .select({
      name: tables.site.name,
    })
    .from(tables.site)
    .where(eq(tables.site.id, serviceId))
  const serviceName = service[0]?.name

  const healthData = await healthFetch(serviceUrl)
  const check = await healthSave(serviceId, healthData)
  const lastCheck = await healthLast(serviceId)

  if (lastCheck.length > 0) {
    if (lastCheck[0].success !== healthData.success) {
      sendEmail(serviceName, healthData)
    }
  }

  return check
}
