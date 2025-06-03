export default function transformChecksToSnapshots(
  groupedChecks: { [serviceName: string]: Check[] },
  days: number,
) {
  // depending on days, split duration in 90 snapshots and fill each one with data based on checks in that period
  const nbMinutes = days * 24 * 60
  const snapshotsDuration = Math.ceil(nbMinutes / 90)

  const snapshotsItems = Object.fromEntries(
    Object.entries(groupedChecks).map(([serviceName, checks]) => {
      const snapshots: {
        status: string
        start: Date
        end: Date
        uptime?: number
        errors?: { message: string, date: Date }[]
      }[] = []
      for (let i = 0; i < 90; i++) {
        const start = new Date(Date.now() - (i * snapshotsDuration * 60 * 1000))
        const end = new Date(start.getTime() + (snapshotsDuration * 60 * 1000))

        const snapshotChecks = checks.filter((check) => {
          const checkDate = new Date(check.createdAt)
          return checkDate >= start && checkDate < end
        })

        if (!snapshotChecks.length) {
          snapshots.push({ status: 'off', start, end })
        }
        else {
          if (snapshotChecks.every(check => check.success)) {
            snapshots.push({ status: 'up', start, end, uptime: 100 })
          }
          else if (snapshotChecks.some(check => !check.success)) {
            const totalChecks = snapshotChecks.length
            const successfulChecks = snapshotChecks.filter(check => check.success).length
            const uptime = (successfulChecks / totalChecks) * 100
            snapshots.push({
              status: 'down',
              start,
              end,
              uptime,
              errors: snapshotChecks.filter(check => !check.success)
                .map(check => ({
                  message: check.error || '',
                  date: check.createdAt,
                })),
            })
          }
        }
      }
      return [serviceName, snapshots]
    }),
  )

  return snapshotsItems
}
