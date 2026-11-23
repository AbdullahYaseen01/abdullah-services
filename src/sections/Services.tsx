import { useState } from 'react'
import { SERVICE_CATEGORIES } from '../data/services'
import { useInquiry } from '../context/useInquiry'

export function Services() {
  const [open, setOpen] = useState(SERVICE_CATEGORIES[0].id)
  const { goToContact } = useInquiry()

  return (
    <section id="services" className="bg-sand/70 py-16 md:py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="kicker">Services</p>
          <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">What I can take on.</h2>
          <p className="prose-muted mt-4">
            These are services I offer. Open a category for the full list. A service here is not a claim that a public client project already demonstrates it.
          </p>
        </div>

        <div className="mt-8 divide-y divide-line overflow-hidden rounded-[1.5rem] border border-line bg-paper-2">
          {SERVICE_CATEGORIES.map((category) => {
            const expanded = open === category.id
            const panelId = `${category.id}-panel`
            return (
              <div key={category.id}>
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? '' : category.id)}
                  >
                    <span>
                      <span className="display block text-2xl sm:text-[1.7rem]">{category.title}</span>
                      <span className="mt-1 block text-[0.98rem] leading-relaxed text-muted">{category.summary}</span>
                    </span>
                    <span className="mt-1 text-xl text-cobalt" aria-hidden="true">
                      {expanded ? '–' : '+'}
                    </span>
                  </button>
                </h3>
                {expanded && (
                  <div id={panelId} className="px-5 pb-6 sm:px-6">
                    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {category.items.map((item) => (
                        <li key={item} className="border-t border-line/80 py-2 text-[0.98rem] leading-snug">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="btn btn-primary mt-5" onClick={() => goToContact(category.inquiry)}>
                      Discuss this service
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
