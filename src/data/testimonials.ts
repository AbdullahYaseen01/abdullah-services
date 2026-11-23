export type Testimonial = {
  id: string
  /** Design placeholder. Not a real client, review, or permission. */
  sample: true
  quote: string
  /** Role label only. Not a genuine person or company. */
  attribution: string
}

/**
 * SAMPLE TESTIMONIALS — design placeholders only.
 * Do not treat these quotes, labels, or companies as real clients.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sample-operations',
    sample: true,
    quote: 'The first release covered the workflow we actually use, and the handover made it clear how to run it.',
    attribution: 'Sample · Operations',
  },
  {
    id: 'sample-product',
    sample: true,
    quote: 'We could review the product in working pieces instead of waiting for one large reveal at the end.',
    attribution: 'Sample · Product',
  },
  {
    id: 'sample-customer-team',
    sample: true,
    quote: 'The conversation flow and the internal record stayed connected, which is what the team needed day to day.',
    attribution: 'Sample · Customer team',
  },
]
