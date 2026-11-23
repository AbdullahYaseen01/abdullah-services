export type Testimonial = {
  id: string
  /** Layout placeholder. Not a real client, review, or permission. */
  sample: true
  quote: string
  /** Role only. Not a real person. */
  role: string
  /** Short context only. Not a real company. */
  context: string
}

/**
 * ILLUSTRATIVE REVIEWS — design placeholders only.
 * Do not treat these quotes, roles, or contexts as real clients.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sample-operations',
    sample: true,
    quote: 'The first release covered the workflow we actually use. The handover was clear, and the team could run it without a walkthrough on every screen.',
    role: 'Operations lead',
    context: 'Internal tools',
  },
  {
    id: 'sample-product',
    sample: true,
    quote: 'We reviewed the product in working pieces instead of waiting for one large reveal. Decisions were easier because we could click through the real flow.',
    role: 'Product manager',
    context: 'SaaS build',
  },
  {
    id: 'sample-customer-team',
    sample: true,
    quote: 'The conversation flow and the customer record stayed connected. That is what the team needed for day-to-day follow-up.',
    role: 'Customer team lead',
    context: 'Support workflow',
  },
]
