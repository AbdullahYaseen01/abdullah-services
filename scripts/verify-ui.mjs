import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const base = 'http://127.0.0.1:5173'
mkdirSync('tmp-preview', { recursive: true })

const browser = await chromium.launch()
const widths = [360, 390, 768, 1024, 1440]
const problems = []

function note(message) {
  problems.push(message)
  console.log('ISSUE', message)
}

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 800 ? 800 : 900 } })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  const failed = []
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().startsWith(base)) failed.push(`${response.status()} ${response.url()}`)
  })

  await page.goto(base, { waitUntil: 'networkidle' })
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  if (overflow > 1) note(`${width}px overflow ${overflow}`)
  const h1 = await page.locator('h1').count()
  if (h1 !== 1) note(`${width}px h1 count ${h1}`)

  if (width === 1440) {
    await page.screenshot({ path: 'tmp-preview/home-1440-hero.png' })
    for (const id of ['work', 'services', 'solutions', 'products', 'pricing', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await page.screenshot({ path: `tmp-preview/home-1440-${id}.png` })
    }
    await page.getByRole('button', { name: 'Discuss this service' }).click()
    await page.waitForTimeout(400)
    const contactText = await page.locator('#contact').innerText()
    if (!/not configured|Email me directly/i.test(contactText)) note('service CTA did not reach the honest contact state')
    const selected = await page.locator('#contact').innerText()
    if (!/AI Agents/.test(selected) && !/not configured/i.test(selected)) note('service context missing from contact')

    await page.locator('#services button').first().click()
    const expanded = await page.locator('#services button').first().getAttribute('aria-expanded')
    if (expanded !== 'false') note('accordion did not collapse')

    await page.getByRole('link', { name: 'Project details' }).first().click()
    await page.waitForURL('**/work/**')
    if (!(await page.locator('h1').innerText()).includes('RaahBan')) note('project page title')
    await page.screenshot({ path: 'tmp-preview/project-1440.png' })
  }

  if (width === 390) {
    await page.screenshot({ path: 'tmp-preview/home-390-hero.png' })
    await page.getByRole('button', { name: 'Menu' }).click()
    const dialog = page.getByRole('dialog')
    if (!(await dialog.isVisible())) note('mobile menu did not open')
    await page.keyboard.press('Escape')
    if (await dialog.isVisible().catch(() => false)) note('escape did not close menu')
    await page.locator('#pricing').scrollIntoViewIfNeeded()
    await page.screenshot({ path: 'tmp-preview/home-390-pricing.png' })
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.screenshot({ path: 'tmp-preview/home-390-contact.png' })
    const overflowAfter = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    if (overflowAfter > 1) note(`390px overflow after interaction ${overflowAfter}`)
  }

  if (width === 360) await page.screenshot({ path: 'tmp-preview/home-360-hero.png' })
  if (width === 768) {
    await page.screenshot({ path: 'tmp-preview/home-768-hero.png' })
    await page.locator('#work').scrollIntoViewIfNeeded()
    await page.screenshot({ path: 'tmp-preview/home-768-work.png' })
  }

  if (errors.length) note(`${width}px console ${errors.join(' | ')}`)
  if (failed.length) note(`${width}px failed assets ${failed.join(' | ')}`)
  await page.close()
}

const reduced = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' })
await reduced.goto(base, { waitUntil: 'networkidle' })
await reduced.screenshot({ path: 'tmp-preview/home-reduced.png' })
await reduced.close()

const api = await fetch(`${base}/api/contact`)
const body = await api.json()
console.log('api', api.status, JSON.stringify(body))
if (body.configured !== false) note('local form unexpectedly configured')

const badPost = await fetch(`${base}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'A', email: 'a@b.com', service: 'web', budget: 'unsure', description: 'A long enough project description.', startedAt: Date.now() - 5000 }),
})
const badBody = await badPost.json()
console.log('post', badPost.status, JSON.stringify(badBody))
if (badPost.ok || badBody.ok) note('unconfigured form reported success')

await browser.close()
console.log(problems.length ? `PROBLEMS ${problems.length}` : 'VERIFICATION_OK')
