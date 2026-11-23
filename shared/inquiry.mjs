/** Shared inquiry rules for the browser form, the API, and tests. */

export const SERVICE_OPTIONS = [
  { value: 'ai-agents', label: 'AI Agents & Artificial Intelligence', group: 'AI & automation' },
  { value: 'voice-whatsapp', label: 'Voice AI & WhatsApp Automation', group: 'AI & automation' },
  { value: 'voice-agent', label: 'AI Voice Agent', group: 'AI & automation' },
  { value: 'whatsapp-agent', label: 'WhatsApp AI Agent', group: 'AI & automation' },
  { value: 'ai-chatbot', label: 'AI Chatbot Development', group: 'AI & automation' },
  { value: 'sales-support-agent', label: 'AI Sales & Support Agent', group: 'AI & automation' },
  { value: 'automation', label: 'Business Automation & Workflow Systems', group: 'AI & automation' },
  { value: 'n8n', label: 'n8n Workflow Automation', group: 'AI & automation' },
  { value: 'python-automation', label: 'Python Automation', group: 'AI & automation' },
  { value: 'crm-erp', label: 'CRM & Enterprise Software', group: 'Business systems' },
  { value: 'crm', label: 'CRM Development', group: 'Business systems' },
  { value: 'erp', label: 'ERP Development', group: 'Business systems' },
  { value: 'saas', label: 'SaaS Product Development', group: 'Business systems' },
  { value: 'saas-product', label: 'SaaS Product Development (scoped)', group: 'Business systems' },
  { value: 'web', label: 'Website & Full-Stack Development', group: 'Web, commerce, and mobile' },
  { value: 'website-complete', label: 'Complete Website Development', group: 'Web, commerce, and mobile' },
  { value: 'website-frontend', label: 'Frontend Website Development', group: 'Web, commerce, and mobile' },
  { value: 'landing-page', label: 'Landing Page Development', group: 'Web, commerce, and mobile' },
  { value: 'ecommerce', label: 'E-commerce & Shopify Solutions', group: 'Web, commerce, and mobile' },
  { value: 'shopify', label: 'Shopify Development', group: 'Web, commerce, and mobile' },
  { value: 'mobile', label: 'Mobile App Development', group: 'Web, commerce, and mobile' },
  { value: 'android', label: 'Android Application', group: 'Web, commerce, and mobile' },
  { value: 'ios', label: 'iOS Application', group: 'Web, commerce, and mobile' },
  { value: 'design', label: 'UI/UX & Frontend Design', group: 'Design, vision, and hardware' },
  { value: 'uiux', label: 'UI/UX Design', group: 'Design, vision, and hardware' },
  { value: 'computer-vision', label: 'Computer Vision & Machine Learning', group: 'Design, vision, and hardware' },
  { value: 'computer-vision-project', label: 'Computer Vision Project', group: 'Design, vision, and hardware' },
  { value: 'embedded', label: 'Embedded Systems & IoT', group: 'Design, vision, and hardware' },
  { value: 'embedded-project', label: 'Embedded Systems Project', group: 'Design, vision, and hardware' },
  { value: 'iot', label: 'IoT Development', group: 'Design, vision, and hardware' },
  { value: 'other', label: 'Something else', group: 'General' },
]

export const BUDGET_OPTIONS = [
  { value: 'under-200', label: 'Under £200' },
  { value: '200-500', label: '£200 – £500' },
  { value: '500-1500', label: '£500 – £1,500' },
  { value: '1500-5000', label: '£1,500 – £5,000' },
  { value: '5000-plus', label: '£5,000+' },
  { value: 'unsure', label: 'Not sure yet' },
]

const SERVICE_VALUES = new Set(SERVICE_OPTIONS.map((option) => option.value))
const BUDGET_VALUES = new Set(BUDGET_OPTIONS.map((option) => option.value))

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_FILL_MS = 2000
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

export function serviceLabel(value) {
  return SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value
}

export function budgetLabel(value) {
  return BUDGET_OPTIONS.find((option) => option.value === value)?.label ?? value
}

function text(value, max) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

/**
 * @param {unknown} input
 * @param {number} [now]
 */
export function validateInquiry(input, now = Date.now()) {
  /** @type {Record<string, string>} */
  const errors = {}
  const source = input && typeof input === 'object' ? /** @type {Record<string, unknown>} */ (input) : {}

  if (typeof source.website === 'string' && source.website.trim() !== '') {
    errors.form = 'This submission could not be accepted.'
  }

  const name = text(source.name, 80)
  const email = text(source.email, 120)
  const company = text(source.company, 120)
  const service = text(source.service, 80)
  const budget = text(source.budget, 40)
  const description = text(source.description, 4000)

  if (name.length < 2) errors.name = 'Enter your name.'
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.'
  if (company.length > 120) errors.company = 'Company names need to be 120 characters or fewer.'
  if (!SERVICE_VALUES.has(service)) errors.service = 'Choose a service.'
  if (!BUDGET_VALUES.has(budget)) errors.budget = 'Choose an estimated budget.'
  if (description.length < 20) errors.description = 'Describe the project in at least 20 characters.'

  const startedAt = Number(source.startedAt)
  if (!Number.isFinite(startedAt)) {
    errors.form = 'This submission could not be accepted.'
  } else if (now - startedAt < MIN_FILL_MS) {
    errors.form = 'Please wait a moment and send it again.'
  } else if (now - startedAt > MAX_AGE_MS) {
    errors.form = 'This form expired. Refresh the page and send it again.'
  }

  const ok = Object.keys(errors).length === 0
  return {
    ok,
    errors,
    value: ok
      ? { name, email, company, service, budget, description }
      : null,
  }
}
