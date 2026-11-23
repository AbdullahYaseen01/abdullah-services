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
  { title: 'AI & Automation', ids: ['ai-agents', 'voice-whatsapp', 'automation'], mark: 'bg-[#d9f582]' },
  { title: 'Software & Products', ids: ['crm-erp', 'saas', 'web', 'ecommerce', 'mobile'], mark: 'bg-[#c74420]' },
  { title: 'Design & Connected Systems', ids: ['design', 'computer-vision', 'embedded'], mark: 'bg-[#164f35]' },
]

const TONES: Record<string, { shell: string; icon: string; invert: boolean; plus: string; line: string; summary: string; button: string }> = {
  'ai-agents': { shell: 'bg-[#081f14] text-[#f5f2e8]', icon: 'bg-[#d9f582]', invert: false, plus: 'bg-[#d9f582] text-[#081f14]', line: 'border-white/15', summary: 'text-[#d7e4d4]', button: 'btn btn-light' },
  'voice-whatsapp': { shell: 'bg-[#d9f582] text-[#081f14]', icon: 'bg-[#081f14]', invert: true, plus: 'bg-[#081f14] text-[#d9f582]', line: 'border-[#081f14]/15', summary: 'text-[#244232]', button: 'btn btn-primary' },
  automation: { shell: 'bg-[#164f35] text-[#f5f2e8]', icon: 'bg-[#d9f582]', invert: false, plus: 'bg-[#d9f582] text-[#081f14]', line: 'border-white/15', summary: 'text-[#d7e4d4]', button: 'btn btn-light' },
  'crm-erp': { shell: 'bg-[#fffdf7] text-[#081f14]', icon: 'bg-[#c74420]', invert: true, plus: 'bg-[#c74420] text-white', line: 'border-[#d5dccb]', summary: 'text-muted', button: 'btn btn-primary' },
  saas: { shell: 'bg-[#103d29] text-[#f5f2e8]', icon: 'bg-[#d9f582]', invert: false, plus: 'bg-[#d9f582] text-[#081f14]', line: 'border-white/15', summary: 'text-[#d7e4d4]', button: 'btn btn-light' },
  web: { shell: 'bg-[#fffdf7] text-[#081f14]', icon: 'bg-[#164f35]', invert: true, plus: 'bg-[#164f35] text-[#d9f582]', line: 'border-[#d5dccb]', summary: 'text-muted', button: 'btn btn-primary' },
  ecommerce: { shell: 'bg-[#e7f6c8] text-[#081f14]', icon: 'bg-[#081f14]', invert: true, plus: 'bg-[#081f14] text-[#d9f582]', line: 'border-[#081f14]/10', summary: 'text-[#3d5244]', button: 'btn btn-primary' },
  mobile: { shell: 'bg-[#fffdf7] text-[#081f14]', icon: 'bg-[#be9659]', invert: false, plus: 'bg-[#be9659] text-[#081f14]', line: 'border-[#d5dccb]', summary: 'text-muted', button: 'btn btn-primary' },
  design: { shell: 'bg-[#c74420] text-white', icon: 'bg-[#d9f582]', invert: false, plus: 'bg-[#d9f582] text-[#081f14]', line: 'border-white/25', summary: 'text-white/90', button: 'btn btn-light' },
  'computer-vision': { shell: 'bg-[#081f14] text-[#f5f2e8]', icon: 'bg-[#d9f582]', invert: false, plus: 'bg-[#d9f582] text-[#081f14]', line: 'border-white/15', summary: 'text-[#d7e4d4]', button: 'btn btn-light' },
  embedded: { shell: 'bg-[#164f35] text-[#f5f2e8]', icon: 'bg-white', invert: false, plus: 'bg-[#d9f582] text-[#081f14]', line: 'border-white/15', summary: 'text-[#d7e4d4]', button: 'btn btn-light' },
}

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
              <h3 className="flex items-center gap-3 text-sm font-extrabold tracking-[0.14em] text-ink uppercase">
                <span className={`h-2.5 w-2.5 rounded-full ${group.mark}`} aria-hidden="true" />
                {group.title}
              </h3>
              <div className="mt-4 grid gap-4">
                {group.ids.map((id) => {
                  const category = SERVICE_CATEGORIES.find((item) => item.id === id)
                  if (!category) return null
                  const tone = TONES[category.id]
                  const expanded = open === category.id
                  const panelId = `${category.id}-panel`
                  return (
                    <article key={category.id} id={category.id} className={`overflow-hidden rounded-[1.4rem] shadow-[0_14px_34px_rgb(8_31_20/8%)] ${tone.shell}`}>
                      <h4>
                        <button
                          type="button"
                          className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-6"
                          aria-expanded={expanded}
                          aria-controls={panelId}
                          onClick={() => setOpen(expanded ? '' : category.id)}
                        >
                          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tone.icon}`}>
                            <img
                              src={`/assets/forest/icons/${ICONS[category.id]}.svg`}
                              alt=""
                              width={22}
                              height={22}
                              className={tone.invert ? 'brightness-0 invert' : undefined}
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="display block text-2xl sm:text-[1.65rem]">{category.title}</span>
                            <span className={`mt-1 block text-[0.98rem] leading-relaxed ${tone.summary}`}>{category.summary}</span>
                          </span>
                          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg leading-none font-bold ${tone.plus}`} aria-hidden="true">
                            {expanded ? '–' : '+'}
                          </span>
                        </button>
                      </h4>
                      {expanded && (
                        <div id={panelId} className="px-5 pb-6 sm:px-6 sm:pl-[4.75rem]">
                          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                            {category.items.map((item) => (
                              <li key={item} className={`border-t py-2 text-[0.98rem] leading-snug ${tone.line}`}>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <button type="button" className={`${tone.button} mt-5`} onClick={() => goToContact(category.inquiry)}>
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
