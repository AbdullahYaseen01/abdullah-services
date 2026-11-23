import { useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { InquiryContext, scrollToId } from './inquiry-context'

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const value = useMemo(
    () => ({
      service,
      setService,
      goToContact: (next?: string) => {
        if (next) setService(next)
        if (location.pathname !== '/') {
          navigate({ pathname: '/', hash: 'contact' })
          return
        }
        scrollToId('contact')
      },
    }),
    [location.pathname, navigate, service],
  )

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
}
