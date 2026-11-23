import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { JsonLd } from './components/JsonLd'
import { InquiryProvider } from './context/InquiryContext'
import { HomePage } from './pages/HomePage'
import { NotFound } from './pages/NotFound'
import { ProjectPage } from './pages/ProjectPage'

function Shell() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) return
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <SiteHeader />
      <main id="top">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <InquiryProvider>
        <JsonLd />
        <Analytics />
        <Shell />
      </InquiryProvider>
    </BrowserRouter>
  )
}
