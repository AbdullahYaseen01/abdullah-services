import { NAV, PROFILE, SOCIALS } from '../data/profile'
import { useSectionScroll } from '../context/useInquiry'

export function SiteFooter() {
  const goTo = useSectionScroll()

  return (
    <footer className="border-t border-white/10 bg-night text-cream">
      <div className="wrap flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-lg font-extrabold">
            <img src="/assets/forest/logo-mark.svg" alt="" width={36} height={28} />
            AI / SOFTWARE
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#d7e4d4]">Independent software for AI, automation, and products.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {NAV.map((item) => (
            <a
              key={item.hash}
              href={`/#${item.hash}`}
              className="text-cream no-underline"
              onClick={(event) => {
                event.preventDefault()
                goTo(item.hash)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="text-sm leading-7">
          <a className="block text-cream" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          <a className="block" href={SOCIALS.whatsapp}>
            WhatsApp
          </a>
          <a className="block" href={SOCIALS.linkedin}>
            LinkedIn
          </a>
          <a className="block" href={SOCIALS.github}>
            GitHub
          </a>
        </div>
      </div>
      <div className="wrap border-t border-white/10 py-4 text-sm text-[#d7e4d4]">
        © {new Date().getFullYear()} {PROFILE.name}
      </div>
    </footer>
  )
}
