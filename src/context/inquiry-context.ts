import { createContext } from 'react'

export type InquiryContextValue = {
  service: string
  setService: (service: string) => void
  goToContact: (service?: string) => void
}

export const InquiryContext = createContext<InquiryContextValue | null>(null)

export function scrollToId(id: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`)
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}
