import assert from 'node:assert/strict'
import test from 'node:test'
import { handleContact } from './contact-handler.mjs'
import { validateInquiry } from './inquiry.mjs'

const valid = {
  name: 'Amina Shah',
  email: 'amina@example.com',
  company: 'Northwind',
  service: 'saas-product',
  budget: 'unsure',
  description: 'We need a multi-tenant product with accounts and billing.',
  website: '',
  startedAt: 1_000,
}

test('accepts a complete inquiry', () => {
  const result = validateInquiry(valid, 5_000)
  assert.equal(result.ok, true)
  assert.equal(result.value?.email, 'amina@example.com')
  assert.equal(result.value?.company, 'Northwind')
})

test('requires a real email, a service, a budget, and a description', () => {
  const result = validateInquiry({ ...valid, email: 'not-an-email', service: '', budget: '', description: 'short' }, 5_000)
  assert.equal(result.ok, false)
  assert.match(result.errors.email, /valid email/)
  assert.match(result.errors.service, /service/)
  assert.match(result.errors.budget, /budget/)
  assert.match(result.errors.description, /20/)
})

test('company is optional', () => {
  const result = validateInquiry({ ...valid, company: '   ' }, 5_000)
  assert.equal(result.ok, true)
  assert.equal(result.value?.company, '')
})

test('rejects a filled honeypot and a too-fast submit', () => {
  const honeypot = validateInquiry({ ...valid, website: 'https://spam.example' }, 5_000)
  assert.equal(honeypot.ok, false)
  const rushed = validateInquiry(valid, 1_500)
  assert.match(rushed.errors.form, /wait/i)
})

test('does not report success when delivery is not configured', async () => {
  const result = await handleContact({
    method: 'POST',
    payload: valid,
    env: {},
    now: 5_000,
  })
  assert.equal(result.status, 503)
  assert.equal(result.body.ok, false)
  assert.equal(result.body.code, 'not_configured')
})

test('reports success only after the mail service accepts the message', async () => {
  const calls = []
  const result = await handleContact({
    method: 'POST',
    payload: valid,
    env: {
      RESEND_API_KEY: 'test-key',
      CONTACT_TO_EMAIL: 'inbox@example.com',
      CONTACT_FROM_EMAIL: 'studio@example.com',
    },
    now: 5_000,
    fetchImpl: async (url, init) => {
      calls.push({ url, body: JSON.parse(init.body) })
      return { ok: true }
    },
  })
  assert.equal(result.status, 200)
  assert.equal(result.body.ok, true)
  assert.equal(calls.length, 1)
  assert.match(calls[0].body.subject, /SaaS Product Development/)
  assert.match(calls[0].body.text, /Amina Shah/)
  assert.equal(calls[0].body.reply_to, 'amina@example.com')
})

test('keeps a failure when the mail service rejects the message', async () => {
  const result = await handleContact({
    method: 'POST',
    payload: valid,
    env: {
      RESEND_API_KEY: 'test-key',
      CONTACT_TO_EMAIL: 'inbox@example.com',
      CONTACT_FROM_EMAIL: 'studio@example.com',
    },
    now: 5_000,
    fetchImpl: async () => ({ ok: false }),
  })
  assert.equal(result.status, 502)
  assert.equal(result.body.ok, false)
  assert.equal(result.body.code, 'delivery_failed')
})

test('returns field errors and does not call the mail service', async () => {
  let called = false
  const result = await handleContact({
    method: 'POST',
    payload: { ...valid, email: 'bad' },
    env: {
      RESEND_API_KEY: 'test-key',
      CONTACT_TO_EMAIL: 'inbox@example.com',
      CONTACT_FROM_EMAIL: 'studio@example.com',
    },
    now: 5_000,
    fetchImpl: async () => {
      called = true
      return { ok: true }
    },
  })
  assert.equal(result.status, 400)
  assert.equal(called, false)
  assert.ok(result.body.errors.email)
})
