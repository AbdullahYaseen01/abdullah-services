import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { InquiryContext, scrollToId } from './inquiry-context'

export function useInquiry() {
  const value = useContext(InquiryContext)
  if (!value) throw new Error('useInquiry must be used within InquiryProvider')
  return value
}

export function useSectionScroll() {
  const location = useLocation()
  const navigate = useNavigate()

  return (hash: string) => {
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash })
      return
    }
    scrollToId(hash)
  }
}
