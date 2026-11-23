export type Testimonial = {
  quote: string
  name: string
  role: string
  company?: string
}

/**
 * Add a testimonial only when the quote, name, and role are real
 * and the person has agreed to be named. Do not add ratings.
 */
export const TESTIMONIALS: Testimonial[] = []
