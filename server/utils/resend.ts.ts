import { Resend } from 'resend'

export async function sendEmail(service: string, healthData: {
  success: boolean
  responseTime: number
  error: any
  createdAt: Date
}) {
  // eslint-disable-next-line node/prefer-global/process
  const resendApiKey = process.env.NUXT_RESEND_API_KEY || ''
  const resend = new Resend(resendApiKey)

  const html = `<p><strong>${service} is ${healthData.success ? 'up' : 'down'}!</strong><p>
  <ul>
    <li>Success: ${healthData.success}</li>
    <li>Response Time: ${healthData.responseTime} ms</li>
    <li>Error: ${healthData.error || 'None'}</li>
    <li>Created At: ${healthData.createdAt.toISOString()}</li>
  </ul>`

  const { error } = await resend.emails.send({
    from: 'Star Status <status@tycho.tcastanie.dev>',
    to: ['thibaut.castanie@gmail.com'],
    subject: `${service} is ${healthData.success ? 'up' : 'down'}!`,
    html,
  })

  if (error) {
    return console.error({ error })
  }
}
