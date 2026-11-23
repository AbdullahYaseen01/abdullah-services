import { useState } from 'react'
import { PROFILE, SOCIALS } from '../data/profile'
import { useInquiry, useSectionScroll } from '../context/useInquiry'

export function Hero() {
  const { goToContact } = useInquiry()
  const goTo = useSectionScroll()
  const [shotOk, setShotOk] = useState(true)

  return (
    <section className="wrap grid items-end gap-10 py-12 md:py-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:py-20">
      <div className="hero-copy">
        <p className="text-sm font-semibold text-mint">
          {PROFILE.name} · {PROFILE.positioning}
        </p>
        <h1 className="display mt-4 text-[clamp(2.5rem,6.4vw,4.8rem)] leading-[1.02] text-ink">
          Building <em className="text-cobalt">Intelligent</em> Digital Products That Move Businesses Forward.
        </h1>
        <p className="prose-muted mt-5 max-w-xl text-lg">
          I help startups and businesses build AI-powered applications, intelligent agents, automation systems, and scalable SaaS products—from idea to production.
        </p>
        <p className="mt-3 max-w-xl text-[1.02rem] text-muted">
          Based in {PROFILE.location}. I work with international clients, including teams in the UK, the USA, and Europe.
        </p>
        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button type="button" className="btn btn-primary" onClick={() => goToContact()}>
            Hire Me
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => goToContact()}>
            Let’s Build Something
          </button>
          <button type="button" className="btn btn-ghost sm:ml-1" onClick={() => goTo('work')}>
            Explore My Work
          </button>
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <li>
            <a href={SOCIALS.github}>GitHub</a>
          </li>
          <li>
            <a href={SOCIALS.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={SOCIALS.whatsapp}>WhatsApp</a>
          </li>
          <li>
            <a href={`mailto:${PROFILE.email}`}>Email</a>
          </li>
        </ul>
      </div>

      <div className="relative mx-auto mb-14 w-full max-w-md lg:mb-0 lg:max-w-none">
        <div className="overflow-hidden rounded-[1.6rem] bg-[#355c6b] shadow-[0_20px_50px_rgba(28,20,34,0.12)]">
          <img
            src="/abdullah.webp"
            alt="Portrait of Abdullah Yaseen, arms crossed, in a navy suit."
            width={768}
            height={1024}
            fetchPriority="high"
            className="aspect-[4/5] w-full object-cover object-[center_18%]"
          />
        </div>
        {shotOk && (
          <a
            href="https://raahban.com"
            className="absolute -bottom-6 -left-2 block w-[72%] overflow-hidden rounded-2xl border-4 border-paper-2 shadow-xl no-underline sm:left-[-8%]"
          >
            <img
              src="/projects/raahban.webp"
              alt="RaahBan homepage for Pakistani students planning university admissions."
              width={1440}
              height={900}
              className="aspect-[16/10] w-full object-cover object-top"
              onError={() => setShotOk(false)}
            />
            <span className="block bg-night px-3 py-2 text-xs font-semibold tracking-wide text-cream">
              RaahBan · Founder & Developer
            </span>
          </a>
        )}
      </div>
    </section>
  )
}
