import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Contact } from '../sections/Contact'
import { Hero } from '../sections/Hero'
import { Pricing } from '../sections/Pricing'
import { Process } from '../sections/Process'
import { Services } from '../sections/Services'
import { Solutions } from '../sections/Solutions'
import { Testimonials } from '../sections/Testimonials'
import { Work } from '../sections/Work'

export function HomePage() {
  const location = useLocation()

  useEffect(() => {
    document.title = 'Even Better Services — AI / Software'
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }, [location.hash])

  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Solutions />
      <Process />
      <Pricing />
      <Testimonials />
      <Contact />
    </>
  )
}
