export type PriceItem = {
  service: string
  price: string
  inquiry: string
  numeric: boolean
}

export const STARTING_PRICES: PriceItem[] = [
  { service: 'Complete Website Development', price: '£200', inquiry: 'website-complete', numeric: true },
  { service: 'Frontend Website Development', price: '£100', inquiry: 'website-frontend', numeric: true },
  { service: 'Android Application', price: '£200', inquiry: 'android', numeric: true },
  { service: 'iOS Application', price: '£250', inquiry: 'ios', numeric: true },
  { service: 'UI/UX Design', price: '£100', inquiry: 'uiux', numeric: true },
  { service: 'Landing Page Development', price: '£80', inquiry: 'landing-page', numeric: true },
  { service: 'AI Chatbot Development', price: '£150', inquiry: 'ai-chatbot', numeric: true },
  { service: 'Python Automation', price: '£100', inquiry: 'python-automation', numeric: true },
  { service: 'n8n Workflow Automation', price: '£100', inquiry: 'n8n', numeric: true },
]

export const CUSTOM_PRICES: PriceItem[] = [
  { service: 'WhatsApp AI Agent', price: 'Custom Quote', inquiry: 'whatsapp-agent', numeric: false },
  { service: 'AI Voice Agent', price: 'Custom Quote', inquiry: 'voice-agent', numeric: false },
  { service: 'AI Sales & Support Agent', price: 'Custom Quote', inquiry: 'sales-support-agent', numeric: false },
  { service: 'CRM Development', price: 'Custom Quote', inquiry: 'crm', numeric: false },
  { service: 'ERP Development', price: 'Custom Quote', inquiry: 'erp', numeric: false },
  { service: 'SaaS Product Development', price: 'Custom Quote', inquiry: 'saas-product', numeric: false },
  { service: 'Shopify & E-commerce', price: 'Custom Quote', inquiry: 'shopify', numeric: false },
  { service: 'Computer Vision Projects', price: 'Custom Quote', inquiry: 'computer-vision-project', numeric: false },
  { service: 'Embedded Systems Projects', price: 'Custom Quote', inquiry: 'embedded-project', numeric: false },
  { service: 'IoT Development', price: 'Custom Quote', inquiry: 'iot', numeric: false },
]

export const PROCESS = [
  {
    step: '01',
    title: 'Understand',
    body: 'We start with the business problem, who will use the system, and what the first release needs to do.',
  },
  {
    step: '02',
    title: 'Define',
    body: 'Scope, architecture, and the interface direction are set before the build spreads into extra features.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'The product is built in reviewable pieces so decisions can be checked against the working software.',
  },
  {
    step: '04',
    title: 'Launch',
    body: 'We test, launch, and hand the project over with the access and context needed to run it.',
  },
]
