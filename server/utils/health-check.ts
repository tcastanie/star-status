export default async function (serviceUrl: string, serviceId: number) {
  const service = await useDrizzle()
    .select({
      name: tables.site.name,
    })
    .from(tables.site)
    .where(eq(tables.site.id, serviceId))
  const serviceName = service[0]?.name

  const healthData = await healthFetch(serviceUrl)
  const lastCheck = await healthLast(serviceId)
  const check = await healthSave(serviceId, healthData)

  if (lastCheck.length > 0) {
    if (lastCheck[0].success !== healthData.success) {
      sendEmail(serviceName, healthData)

      // if (serviceId === 4 && healthData.success === false) {
      //   // eslint-disable-next-line node/prefer-global/process
      //   const testAction = process.env.NUXT_TEST_ACTION || ''
      //   // eslint-disable-next-line node/prefer-global/process
      //   const testKey = process.env.NUXT_TEST_KEY || ''
      //   await $fetch(testAction, {
      //     method: 'GET',
      //     headers: {
      //       'Authorization': `Bearer ${testKey}`,
      //       'Content-Type': 'application/json',
      //     },
      //   }).catch((error) => {
      //     console.error('Error sending test action:', error)
      //   })
      // }
    }
  }

  return check
}
