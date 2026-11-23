import { budgetLabel, serviceLabel, validateInquiry } from './inquiry.mjs'

export function deliveryConfigured(env) {
  return Boolean(env.RESEND_API_KEY && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL)
}

/**
 * @param {{
 *   method: string
 *   payload?: unknown
 *   env: Record<string, string | undefined>
 *   fetchImpl?: typeof fetch
 *   now?: number
 * }} args
 */
export async function handleContact({ method, payload, env, fetchImpl = fetch, now = Date.now() }) {
  if (method === 'GET') {
    return { status: 200, body: { configured: deliveryConfigured(env) } }
  }

  if (method !== 'POST') {
    return { status: 405, body: { ok: false, code: 'method', error: 'Use the inquiry form to send a message.' } }
  }

  if (!deliveryConfigured(env)) {
    return {
      status: 503,
      body: {
        ok: false,
        code: 'not_configured',
        error: 'Email delivery is not configured yet.',
      },
    }
  }

  const parsed = validateInquiry(payload, now)
  if (!parsed.ok || !parsed.value) {
    return { status: 400, body: { ok: false, code: 'invalid', errors: parsed.errors } }
  }

  const inquiry = parsed.value
  const text = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Company: ${inquiry.company || 'Not provided'}`,
    `Service: ${serviceLabel(inquiry.service)}`,
    `Estimated budget: ${budgetLabel(inquiry.budget)}`,
    '',
    inquiry.description,
  ].join('\n')

  let response
  try {
    response = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: inquiry.email,
        subject: `Portfolio inquiry — ${serviceLabel(inquiry.service)}`,
        text,
      }),
    })
  } catch {
    return {
      status: 502,
      body: {
        ok: false,
        code: 'delivery_failed',
        error: 'The inquiry could not be delivered. Please email directly.',
      },
    }
  }

  if (!response.ok) {
    return {
      status: 502,
      body: {
        ok: false,
        code: 'delivery_failed',
        error: 'The mail service did not accept the inquiry. Please email directly.',
      },
    }
  }

  return {
    status: 200,
    body: {
      ok: true,
      message: 'Your inquiry was accepted for delivery. I will reply by email.',
    },
  }
}
