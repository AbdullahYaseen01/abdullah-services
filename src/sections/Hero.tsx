import { useState } from 'react'
import { useInquiry, useSectionScroll } from '../context/useInquiry'

const DIRECTORY = [
  {
    title: 'AI & Automation',
    items: [
      { label: 'AI Voice Agents', icon: 'microphone', hash: 'voice-whatsapp' },
      { label: 'WhatsApp AI Agents', icon: 'message-phone', hash: 'voice-whatsapp' },
      { label: 'AI Chatbots', icon: 'chat', hash: 'ai-agents' },
      { label: 'Business Automation', icon: 'workflow', hash: 'automation' },
    ],
  },
  {
    title: 'Software & Products',
    items: [
      { label: 'CRM & ERP Systems', icon: 'database', hash: 'crm-erp' },
      { label: 'SaaS Products', icon: 'cloud', hash: 'saas' },
      { label: 'Web Applications', icon: 'monitor', hash: 'web' },
      { label: 'Android & iOS Applications', icon: 'phone', hash: 'mobile' },
    ],
  },
  {
    title: 'Design & Connected Systems',
    items: [
      { label: 'Computer Vision Solutions', icon: 'vision', hash: 'computer-vision' },
      { label: 'Embedded Systems & IoT', icon: 'chip', hash: 'embedded' },
      { label: 'UI/UX & Frontend Development', icon: 'layers', hash: 'design' },
    ],
  },
]

const TABS = [
  { id: 'voice', label: 'Voice AI' },
  { id: 'chat', label: 'WhatsApp AI' },
  { id: 'crm', label: 'CRM' },
] as const

export function Hero() {
  const { goToContact } = useInquiry()
  const goTo = useSectionScroll()
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('voice')

  return (
    <section className="bg-[#06160e] text-[#f5f2e8]">
      <div className="relative isolate overflow-hidden">
      <picture className="pointer-events-none absolute inset-0">
        <source
          type="image/avif"
          srcSet="/assets/forest/hero-workspace-640.avif 640w, /assets/forest/hero-workspace-960.avif 960w, /assets/forest/hero-workspace-1280.avif 1280w, /assets/forest/hero-workspace-1672.avif 1672w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/assets/forest/hero-workspace-640.webp 640w, /assets/forest/hero-workspace-960.webp 960w, /assets/forest/hero-workspace-1280.webp 1280w, /assets/forest/hero-workspace-1672.webp 1672w"
          sizes="100vw"
        />
        <img
          src="/assets/forest/hero-workspace-fallback.jpg"
          alt=""
          width={1672}
          height={941}
          fetchPriority="high"
          className="h-full w-full object-cover object-[center_62%]"
        />
      </picture>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(6_22_14/70%),rgb(6_22_14/36%)_40%,rgb(6_22_14/18%)_68%,rgb(6_22_14/76%))]" />

      <div className="relative mx-auto max-w-4xl px-4 pb-8 pt-28 text-center md:pt-32">
        <p className="text-xs font-bold tracking-[0.18em] text-[#d9f582]">AI SOLUTIONS • CUSTOM SOFTWARE • AUTOMATION</p>
        <h1 className="mt-4 text-[clamp(2.6rem,6.4vw,5.1rem)] leading-[1.02] font-extrabold tracking-[-0.045em]">
          Smarter software.
          <span className="mt-1 block text-[#d9f582]">Real business possibilities.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#f5f2e8]">
          From AI conversations to connected products, turn your next idea into software that works.
        </p>
        <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button type="button" className="btn btn-primary" onClick={() => goToContact()}>
            Let's Work Together
          </button>
          <button type="button" className="btn border-2 border-[#f5f2e8] bg-[#081f14]/45 text-[#f5f2e8]" onClick={() => goTo('work')}>
            Explore My Work
          </button>
        </div>
      </div>

      <div className="relative mx-auto grid w-[min(1080px,calc(100%-2rem))] items-end gap-5 pb-10 lg:grid-cols-[minmax(0,1fr)_180px]">
        <div>
          <div className="rounded-[1.4rem] border-2 border-[#c7c6af] bg-[linear-gradient(115deg,#d9d3bd,#6a695e_8%,#2d342c_14%,#353c33_86%,#b7b4a2)] p-2.5 pb-5 shadow-[0_24px_55px_rgb(0_0_0/30%)] md:p-3">
            <div className="overflow-hidden rounded-xl bg-[#f5f2e8] text-[#081f14] md:grid md:min-h-[360px] md:grid-cols-[132px_minmax(0,1fr)]">
              <aside className="hidden bg-[#103d29] p-4 text-xs text-[#eaf0de] md:block" aria-hidden="true">
                <img src="/assets/forest/logo-mark.svg" alt="" width={40} height={32} className="mb-4" />
                {['Workspace', 'Conversations', 'Automations', 'CRM & ERP', 'Products', 'Settings'].map((item, index) => (
                  <p key={item} className={`my-1 rounded-lg px-2 py-2 ${index === 0 ? 'bg-[#bdf5a5] font-bold text-[#081f14]' : ''}`}>
                    {item}
                  </p>
                ))}
              </aside>
              <div className="p-4 sm:p-5">
                <span className="inline-block rounded-full bg-[#e2e6cc] px-2.5 py-1 text-[11px] font-bold text-[#23432b]">Solution preview</span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">Your connected business</h2>
                <div className="mt-3 flex flex-wrap gap-1 rounded-full bg-white/70 p-1" role="tablist" aria-label="Solution preview">
                  {TABS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={tab === item.id}
                      className={`min-h-10 rounded-full px-3 text-sm font-semibold ${tab === item.id ? 'bg-[#103d29] text-white' : 'text-[#163c25]'}`}
                      onClick={() => setTab(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-2xl border border-[#e1dfd2] bg-[#fffcf4] p-4">
                  {tab === 'voice' && (
                    <div>
                      <h3 className="font-bold">AI Voice Agent</h3>
                      <p className="mt-1 text-sm text-[#435644]">A sample conversation layout. No call is placed.</p>
                      <div className="my-3 flex h-14 items-end justify-center gap-1" aria-hidden="true">
                        {[12, 22, 34, 18, 42, 28, 16].map((height) => (
                          <span key={height} className="w-1 rounded-full bg-[#c74420]" style={{ height }} />
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-[#1d4b2c]">Conversation preview</p>
                    </div>
                  )}
                  {tab === 'chat' && (
                    <div>
                      <h3 className="font-bold">WhatsApp AI</h3>
                      <p className="mt-3 max-w-[16rem] rounded-xl bg-[#e9ebdf] px-3 py-2 text-sm">I'd like to schedule a call.</p>
                      <p className="mt-2 ml-auto max-w-[16rem] rounded-xl bg-[#d9f582] px-3 py-2 text-sm">Happy to help. Choose a time.</p>
                    </div>
                  )}
                  {tab === 'crm' && (
                    <div>
                      <h3 className="font-bold">CRM & ERP</h3>
                      <ul className="mt-3 grid gap-2 text-sm">
                        {['New inquiry', 'Contact created', 'Follow-up ready'].map((row) => (
                          <li key={row} className="flex justify-between rounded-lg bg-[#eef0e4] px-3 py-2">
                            {row}
                            <span aria-hidden="true">✓</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <p className="rounded-xl border border-[#e1dfd2] bg-white px-3 py-2"><strong className="block">AI Chatbot</strong>Business knowledge</p>
                  <p className="rounded-xl border border-[#e1dfd2] bg-white px-3 py-2"><strong className="block">CRM & ERP</strong>Workflow ready</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto hidden h-10 w-[18%] bg-[linear-gradient(90deg,#6e7264,#d4d3c4_48%,#6e7163)] [clip-path:polygon(24%_0,76%_0,100%_100%,0_100%)] md:block" aria-hidden="true" />
        </div>

        <button
          type="button"
          className="mx-auto hidden w-[170px] rounded-[1.7rem] border-[3px] border-[#c5c6ad] bg-[#132019] p-2 text-left text-[#081f14] shadow-xl lg:block"
          onClick={() => goToContact()}
        >
          <span className="block rounded-[1.1rem] bg-[#f5f2e8] px-3 py-4">
            <span className="mx-auto mb-4 block h-3 w-12 rounded-full bg-[#142019]" aria-hidden="true" />
            <span className="block text-center text-base font-extrabold">Book a Call</span>
            <span className="mt-1 block text-center text-[11px] text-[#49604e]">Opens the contact form. No appointment is booked here.</span>
            <span className="mt-3 block rounded-lg bg-[#e9ecdf] px-2 py-2 text-xs">Discovery call</span>
            <span className="mt-2 block rounded-lg bg-[#e9ecdf] px-2 py-2 text-xs">Project planning</span>
          </span>
        </button>
      </div>
      </div>

      <div className="relative bg-[#06160e] px-4 py-8 text-[#f5f2e8]">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {DIRECTORY.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-extrabold tracking-[0.14em] text-[#d9f582] uppercase">{group.title}</h2>
              <ul className="mt-3 divide-y divide-white/15 border-y border-white/15">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a href={`/#${item.hash}`} className="flex min-h-11 items-center gap-3 py-2.5 text-[0.98rem] font-semibold no-underline" onClick={(event) => { event.preventDefault(); goTo(item.hash) }}>
                      <img src={`/assets/forest/icons/${item.icon}.svg`} alt="" width={22} height={22} className="brightness-0 invert" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
