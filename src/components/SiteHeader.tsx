import { useEffect, useId, useRef, useState } from 'react'
import { NAV } from '../data/profile'
import { useInquiry, useSectionScroll } from '../context/useInquiry'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('top')
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const goTo = useSectionScroll()
  const { goToContact } = useInquiry()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.15, 0.4] },
    )
    NAV.forEach((item) => {
      const element = document.getElementById(item.hash)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    if (!open) return
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a, button')
    focusable?.[0]?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('nav-open')
    }
  }, [open])

  const pendingHash = useRef<string | null>(null)

  useEffect(() => {
    if (open || !pendingHash.current) return
    const hash = pendingHash.current
    pendingHash.current = null
    goTo(hash)
  }, [open, goTo])

  const visit = (hash: string) => {
    if (open) {
      pendingHash.current = hash
      setOpen(false)
      return
    }
    goTo(hash)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border border-white/70 bg-[#f5f2e8]/90 px-3 shadow-[0_16px_40px_rgb(8_31_20/16%)] backdrop-blur-md">
        <a
          href="/#top"
          className="flex min-h-11 items-center gap-2 pl-1 no-underline"
          onClick={(event) => {
            event.preventDefault()
            visit('top')
          }}
        >
          <img src="/assets/forest/logo-mark.svg" alt="" width={36} height={28} />
          <span className="whitespace-nowrap text-sm font-extrabold tracking-wide text-ink">evenbetterservice</span>
        </a>

        <nav className="nav-desktop items-center gap-1" aria-label="Primary">
          {NAV.map((item) => {
            const current = active === item.hash
            return (
              <a
                key={item.hash}
                href={`/#${item.hash}`}
                aria-current={current ? 'true' : undefined}
                className={`rounded-full px-2.5 py-1.5 text-sm font-semibold no-underline ${current ? 'bg-[#d7eccf] text-ink underline decoration-[#164f35] decoration-2 underline-offset-4' : 'text-[#234233]'}`}
                onClick={(event) => {
                  event.preventDefault()
                  visit(item.hash)
                }}
              >
                {item.label}
                {item.hash === 'services' ? <span aria-hidden="true"> ▾</span> : null}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className="btn btn-primary talk-desktop shrink-0" onClick={() => goToContact()}>
            Let's Talk <span aria-hidden="true">↗</span>
          </button>
          <button
            ref={buttonRef}
            type="button"
            className="btn btn-secondary mobile-toggle px-3"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-toggle fixed inset-0 top-0 z-30 bg-[#06160e]/45" onClick={() => setOpen(false)}>
          <div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="mx-3 mt-20 max-h-[calc(100dvh-6rem)] overflow-auto rounded-3xl bg-[#f5f2e8] p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p id={titleId} className="px-2 pb-2 text-sm font-semibold text-muted">
              Navigate
            </p>
            {NAV.map((item) => (
              <a
                key={item.hash}
                href={`/#${item.hash}`}
                className="block rounded-xl px-3 py-3 text-lg font-semibold no-underline"
                onClick={(event) => {
                  event.preventDefault()
                  visit(item.hash)
                }}
              >
                {item.label}
              </a>
            ))}
            <button type="button" className="btn btn-primary mt-3 w-full" onClick={() => { setOpen(false); goToContact() }}>
              Let's Talk <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
