import { useState } from 'react'
import { SERVICE_CATEGORIES } from '../data/services'
import { useInquiry } from '../context/useInquiry'

const ICONS: Record<string, string> = {
  'ai-agents': 'chat',
  'voice-whatsapp': 'microphone',
  automation: 'workflow',
  'crm-erp': 'database',
  saas: 'cloud',
  web: 'monitor',
  ecommerce: 'layers',
  mobile: 'phone',
  design: 'layers',
  'computer-vision': 'vision',
  embedded: 'chip',
}

const GROUPS = [
  { title: 'AI & Automation', ids: ['ai-agents', 'voice-whatsapp', 'automation'] },
  { title: 'Software & Products', ids: ['crm-erp', 'saas', 'web', 'ecommerce', 'mobile'] },
  { title: 'Design & Connected Systems', ids: ['design', 'computer-vision', 'embedded'] },
]

export function Services() {
  const [open, setOpen] = useState(SERVICE_CATEGORIES[0].id)
  const { goToContact } = useInquiry()

  return (
    <section id="services" className="bg-sand py-16 md:py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="kicker">Services</p>
          <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">What I can take on.</h2>
          <p className="prose-muted mt-4">
            These are services I offer. Open a category for the full list. A service here is not a claim that a public client project already demonstrates it.
          </p>
        </div>

        <div className="mt-10 grid gap-10">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-mint uppercase">{group.title}</h3>
              <div className="mt-4 grid gap-4">
                {group.ids.map((id) => {
                  const category = SERVICE_CATEGORIES.find((item) => item.id === id)
                  if (!category) return null
                  const expanded = open === category.id
                  const panelId = `${category.id}-panel`
                  const featured = category.id === 'ai-agents'
                  return (
                    <article
                      key={category.id}
                      id={category.id}
                      className={`overflow-hidden rounded-[1.4rem] border ${featured ? 'border-transparent bg-night text-cream' : 'border-line bg-paper-2 text-ink'}`}
                    >
                      <h4>
                        <button
                          type="button"
                          className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-6"
                          aria-expanded={expanded}
                          aria-controls={panelId}
                          onClick={() => setOpen(expanded ? '' : category.id)}
                        >
                          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${featured ? 'bg-lime' : 'bg-sand'}`}>
                            <img src={`/assets/forest/icons/${ICONS[category.id]}.svg`} alt="" width={22} height={22} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="display block text-2xl sm:text-[1.65rem]">{category.title}</span>
                            <span className={`mt-1 block text-[0.98rem] leading-relaxed ${featured ? 'text-[#d7e4d4]' : 'text-muted'}`}>
                              {category.summary}
                            </span>
                          </span>
                          <span className={`mt-1 text-xl ${featured ? 'text-lime' : 'text-mint'}`} aria-hidden="true">
                            {expanded ? '–' : '+'}
                          </span>
                        </button>
                      </h4>
                      {expanded && (
                        <div id={panelId} className="px-5 pb-6 sm:px-6 sm:pl-[4.75rem]">
                          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                            {category.items.map((item) => (
                              <li key={item} className={`border-t py-2 text-[0.98rem] leading-snug ${featured ? 'border-white/15' : 'border-line'}`}>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <button type="button" className="btn btn-primary mt-5" onClick={() => goToContact(category.inquiry)}>
                            Discuss this service
                          </button>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
