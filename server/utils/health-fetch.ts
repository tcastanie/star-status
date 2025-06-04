export default async function (checkUrl: string) {
  const DEFAULT_TIMEOUT = 10000 // 10 seconds

  let status = 0
  let err: any = null
  // checkUrl = 'https://httpstat.us/504?sleep=60000' // test timeout

  const timeBegin = performance.now()
  await $fetch(checkUrl, {
    method: 'HEAD',
    timeout: DEFAULT_TIMEOUT,
    retry: 0,
    headers: {
      'User-Agent': 'StarStatus-HealthCheck/1.0',
      'Accept': '*/*',
    },
    async onRequestError({ error }) {
      console.warn(`[${checkUrl}] Request failed:`, error.message)
      err = error
    },
    async onResponse({ response }) {
      status = response.status
      if (status >= 400) {
        console.warn(`[${checkUrl}] Unhealthy response:`, status)
      }
    },
  }).catch(error => error)
  const timeEnd = performance.now()

  const responseTime = Math.round(timeEnd - timeBegin)
  const success = !err && status >= 200 && status < 300

  return {
    success,
    responseTime,
    error: err ? err.message : null,
    createdAt: new Date(),
  }
}
