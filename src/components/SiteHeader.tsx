import { useEffect, useId, useRef, useState } from 'react'
import { NAV, PROFILE } from '../data/profile'
import { useInquiry, useSectionScroll } from '../context/useInquiry'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const goTo = useSectionScroll()
  const { goToContact } = useInquiry()

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    if (!open) return

    const panel = panelRef.current
    const focusable = panel?.querySelectorAll<HTMLElement>('a, button')
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

  const visit = (hash: string) => {
    setOpen(false)
    goTo(hash)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="wrap flex h-[4.25rem] items-center justify-between gap-4">
        <a
          href="/#top"
          aria-label={PROFILE.name}
          className="flex min-h-11 items-center gap-2.5 no-underline"
          onClick={(event) => {
            event.preventDefault()
            visit('top')
          }}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cobalt text-sm font-bold text-white" aria-hidden="true">
            AY
          </span>
          <span className="hidden text-[0.98rem] font-semibold tracking-tight sm:inline" aria-hidden="true">
            {PROFILE.name}
          </span>
        </a>

        <nav className="nav-desktop items-center gap-4 xl:gap-5" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.hash}
              href={`/#${item.hash}`}
              className="text-[0.92rem] font-medium text-muted no-underline hover:text-ink"
              onClick={(event) => {
                event.preventDefault()
                visit(item.hash)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className="btn btn-primary shrink-0 whitespace-nowrap px-3.5 sm:px-5" onClick={() => goToContact()}>
            Hire Me
          </button>
          <button
            ref={buttonRef}
            type="button"
            className="btn btn-secondary mobile-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-toggle fixed inset-0 top-[4.25rem] z-30 bg-ink/40" onClick={() => setOpen(false)}>
          <div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="max-h-[calc(100dvh-4.25rem)] overflow-auto border-t border-line bg-paper-2 px-4 py-5 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <p id={titleId} className="mb-3 text-sm font-semibold text-muted">
              Navigate
            </p>
            <div className="grid gap-1">
              {NAV.map((item) => (
                <a
                  key={item.hash}
                  href={`/#${item.hash}`}
                  className="rounded-xl px-3 py-3 text-lg font-medium no-underline hover:bg-sand"
                  onClick={(event) => {
                    event.preventDefault()
                    visit(item.hash)
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary mt-4 w-full"
              onClick={() => {
                setOpen(false)
                goToContact()
              }}
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
