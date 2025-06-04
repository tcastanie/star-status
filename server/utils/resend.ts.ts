import { Resend } from 'resend'

// eslint-disable-next-line node/prefer-global/process
const resend = new Resend(process.env.NUXT_RESEND_API_KEY || '')

export async function sendEmail(service: string, healthData: {
  success: boolean
  responseTime: number
  error: any
  createdAt: Date
}) {
  const html = `<p><strong>${service} is down!</strong><p>
  <ul>
    <li>Success: ${healthData.success}</li>
    <li>Response Time: ${healthData.responseTime} ms</li>
    <li>Error: ${healthData.error || 'None'}</li>
    <li>Created At: ${healthData.createdAt.toISOString()}</li>
  </ul>`
  const { error } = await resend.emails.send({
    from: 'Star Status <status@tycho.tcastanie.dev>',
    to: ['thibaut.castanie@gmail.com'],
    subject: `${service} is down!`,
    html,
  })

  if (error) {
    return console.error({ error })
  }
}
