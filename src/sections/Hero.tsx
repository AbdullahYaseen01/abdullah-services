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

const SIDEBAR = [
  { label: 'Workspace', icon: 'layers' },
  { label: 'Conversations', icon: 'chat' },
  { label: 'Automations', icon: 'workflow' },
  { label: 'CRM & ERP', icon: 'database' },
  { label: 'Products', icon: 'cloud' },
  { label: 'Settings', icon: 'chip' },
]

const WAVE = [10, 18, 28, 16, 36, 24, 14, 30, 20]

export function Hero() {
  const { goToContact } = useInquiry()
  const goTo = useSectionScroll()

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
            className="h-full w-full object-cover object-[center_58%]"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(6_22_14/58%),rgb(6_22_14/28%)_34%,rgb(6_22_14/12%)_58%,rgb(6_22_14/72%))]" />

        <div className="relative mx-auto max-w-4xl px-4 pb-6 pt-28 text-center md:pt-32">
          <p className="text-xs font-bold tracking-[0.18em] text-[#d9f582] sm:text-[0.8rem]">AI SOLUTIONS • CUSTOM SOFTWARE • AUTOMATION</p>
          <h1 className="mt-4 text-[clamp(2.6rem,6.4vw,5.15rem)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            Smarter software.
            <span className="mt-1 block text-[#d9f582]">Real business possibilities.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#f5f2e8]">
            From AI conversations to connected products, turn your next idea into software that works.
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button type="button" className="btn btn-primary" onClick={() => goToContact()}>
              Let's Work Together <span aria-hidden="true">↗</span>
            </button>
            <button type="button" className="btn border-2 border-[#f5f2e8] bg-[#081f14]/40 text-[#f5f2e8]" onClick={() => goTo('work')}>
              Explore My Work <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        <div className="relative mx-auto grid w-[min(1080px,calc(100%-2rem))] items-end gap-4 pb-8 lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-6">
          <div>
            <div className="rounded-[1.35rem] border-[6px] border-[#d7d3c2] bg-[#1c241c] p-2 shadow-[0_28px_60px_rgb(0_0_0/35%)] md:p-2.5">
              <div className="overflow-hidden rounded-[0.9rem] bg-[#f6f3ea] text-[#081f14] md:grid md:min-h-[390px] md:grid-cols-[150px_minmax(0,1fr)]">
                <aside className="hidden bg-[#103d29] p-3 text-[12px] text-[#eaf0de] md:block" aria-hidden="true">
                  <img src="/assets/forest/logo-mark.svg" alt="" width={36} height={28} className="mb-4" />
                  {SIDEBAR.map((item, index) => (
                    <p key={item.label} className={`my-1 flex items-center gap-2 rounded-lg px-2 py-2 ${index === 0 ? 'bg-[#bdf5a5] font-bold text-[#081f14]' : ''}`}>
                      <img src={`/assets/forest/icons/${item.icon}.svg`} alt="" width={14} height={14} className={index === 0 ? '' : 'brightness-0 invert'} />
                      {item.label}
                    </p>
                  ))}
                </aside>
                <div className="p-3 sm:p-4">
                  <span className="inline-block rounded-full bg-[#e2e6cc] px-2.5 py-1 text-[11px] font-bold text-[#23432b]">Solution preview</span>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">Your connected business</h2>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-[#e1dfd2] bg-white p-3">
                      <p className="flex items-center gap-2 font-bold">
                        <img src="/assets/forest/icons/microphone.svg" alt="" width={16} height={16} />
                        AI Voice Agent
                      </p>
                      <div className="my-3 flex h-12 items-end justify-center gap-1" aria-hidden="true">
                        {WAVE.map((height, index) => (
                          <span key={index} className="w-1 rounded-full bg-[#c74420]" style={{ height }} />
                        ))}
                      </div>
                      <p className="flex items-center gap-2 text-xs font-semibold text-[#1d4b2c]">
                        <span className="h-2 w-2 rounded-full bg-[#3d9a45]" aria-hidden="true" />
                        Conversation preview
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#e1dfd2] bg-white p-3">
                      <p className="flex items-center gap-2 font-bold">
                        <img src="/assets/forest/icons/message-phone.svg" alt="" width={16} height={16} />
                        WhatsApp AI
                      </p>
                      <p className="mt-3 max-w-[15rem] rounded-xl bg-[#e9ebdf] px-3 py-2 text-sm">I'd like to schedule a call.</p>
                      <p className="mt-2 ml-auto max-w-[15rem] rounded-xl bg-[#d9f582] px-3 py-2 text-sm">Happy to help. Choose a time.</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <p className="rounded-xl border border-[#e1dfd2] bg-white px-3 py-2">
                      <strong className="flex items-center gap-2"><img src="/assets/forest/icons/chat.svg" alt="" width={14} height={14} /> AI Chatbot</strong>
                      Business knowledge
                    </p>
                    <p className="rounded-xl border border-[#e1dfd2] bg-white px-3 py-2">
                      <strong className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2"><img src="/assets/forest/icons/database.svg" alt="" width={14} height={14} /> CRM & ERP</span>
                      </strong>
                      <span className="mt-1 inline-block rounded-full bg-[#d9f582] px-2 py-0.5 text-xs font-bold">Workflow ready</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto hidden h-8 w-[22%] bg-[linear-gradient(180deg,#c8c6b6,#8d9084)] md:block" aria-hidden="true" />
            <div className="mx-auto hidden h-3 w-[34%] rounded-b-md bg-[#d5d3c4] shadow-md md:block" aria-hidden="true" />
          </div>

          <button
            type="button"
            className="mx-auto hidden w-[176px] rounded-[1.8rem] border-[3px] border-[#c5c6ad] bg-[#132019] p-2 text-left text-[#081f14] shadow-xl lg:mb-8 lg:block"
            onClick={() => goToContact()}
            aria-label="Book a Call preview. Opens the contact form. No appointment is booked."
          >
            <span className="block rounded-[1.25rem] bg-[#f5f2e8] px-3 py-4">
              <span className="mx-auto mb-3 block h-3 w-12 rounded-full bg-[#142019]" aria-hidden="true" />
              <img src="/assets/forest/icons/layers.svg" alt="" width={18} height={18} className="mx-auto" />
              <span className="mt-2 block text-center text-base font-extrabold">Book a Call</span>
              <span className="mt-3 block rounded-lg bg-[#e9ecdf] px-2 py-2 text-center text-xs">Tue, 10:00 AM</span>
              <span className="mt-2 block rounded-lg bg-[#d9f582] px-2 py-2 text-center text-xs font-bold">Tue, 2:00 PM</span>
              <span className="mt-2 block rounded-lg bg-[#e9ecdf] px-2 py-2 text-center text-xs">Wed, 11:00 AM</span>
              <span className="mt-3 block rounded-lg bg-[#103d29] px-2 py-2 text-center text-xs font-bold text-white">Confirm Booking</span>
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
