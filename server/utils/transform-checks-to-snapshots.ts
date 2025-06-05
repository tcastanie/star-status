export default function transformChecksToSnapshots(
  groupedChecks: { [serviceName: string]: Check[] },
  days: number,
) {
  // depending on days, split duration in 90 snapshots and fill each one with data based on checks in that period
  const nbMinutes = days * 24 * 60
  const snapshotsDuration = Math.ceil(nbMinutes / 90)

  const snapshotsItems = Object.entries(groupedChecks).map(([serviceName, checks]) => {
    const snapshots: {
      status: string
      start: Date
      end: Date
      uptime?: number
      responseTime?: number
      errors?: { message: string, date: Date }[]
    }[] = []
    for (let i = 0; i < 90; i++) {
      const end = new Date(Date.now() - (i * snapshotsDuration * 60 * 1000))
      const start = new Date(end.getTime() - (snapshotsDuration * 60 * 1000))

      const snapshotChecks = checks.filter((check) => {
        const checkDate = new Date(check.createdAt)
        return checkDate >= start && checkDate < end
      })

      if (!snapshotChecks.length) {
        snapshots.push({ status: 'off', start, end })
      }
      else {
        const successfullChecks = snapshotChecks.filter(check => check.success).length
        const responseTime = snapshotChecks.filter(check => check.success).reduce((acc, check) => acc + (check.responseTime || 0), 0) / successfullChecks
        if (snapshotChecks.every(check => check.success)) {
          snapshots.push({ status: 'up', start, end, uptime: 100, responseTime })
        }
        else if (snapshotChecks.some(check => !check.success)) {
          const totalChecks = snapshotChecks.length
          const uptime = (successfullChecks / totalChecks) * 100
          snapshots.push({
            status: 'down',
            start,
            end,
            uptime,
            responseTime,
            errors: snapshotChecks.filter(check => !check.success)
              .map(check => ({
                message: check.error || '',
                date: check.createdAt,
              })),
          })
        }
      }
    }

    const lastCheckSuccess = checks[0]?.success
    return {
      name: serviceName,
      snapshots,
      last: lastCheckSuccess,
    }
  })

  return snapshotsItems
}
