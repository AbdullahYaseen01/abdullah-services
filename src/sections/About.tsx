import { EXPERIENCE } from '../data/experience'
import { STACK } from '../data/pricing'

export function About() {
  return (
    <section id="about" className="wrap py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="kicker">About</p>
          <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">I build the product, not only the page.</h2>
          <div className="mt-5 grid gap-4 text-lg leading-relaxed text-muted">
            <p>
              I work across AI and full-stack engineering: real software products, SaaS, agents, automation, and the frontend, backend, APIs, and databases that hold them together. The aim is a system a business can run, with a clear handover rather than a demo that only works on my machine.
            </p>
            <p>
              RaahBan is my own education product for Pakistani students. I also work on SaaS platforms, computer-vision systems, and websites for other teams. I take international projects, including clients in the UK, the USA, and Europe.
            </p>
          </div>
        </div>
        <div className="rounded-[1.6rem] bg-night p-6 text-cream sm:p-8">
          <h3 className="text-sm font-semibold tracking-[0.14em] text-lime uppercase">Technologies in published work</h3>
          <div className="mt-4 grid gap-4">
            {STACK.map((group) => (
              <div key={group.label} className="border-t border-white/15 pt-3">
                <p className="text-sm font-semibold text-lime">{group.label}</p>
                <p className="mt-1 leading-relaxed text-[#d7e4d4]">{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#d7e4d4]">
            OpenAI, Claude, LangChain, n8n, Make.com, Stripe, and React Native are services I offer. They are not listed here as a proven personal stack, because I did not verify them in a public repository for this redesign.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="display text-3xl">Experience on record</h3>
        <ol className="mt-5 grid gap-4">
          {EXPERIENCE.map((entry) => (
            <li key={entry.id} className="grid gap-1 rounded-[1.3rem] border border-line bg-paper-2 px-5 py-4 md:grid-cols-[14rem_1fr] md:gap-8">
              <p className="text-sm font-semibold text-muted">
                {entry.startDate} – {entry.endDate ?? 'Present'}
              </p>
              <div>
                <p className="font-semibold">
                  {entry.role}, {entry.company}
                  <span className="font-medium text-muted"> · {entry.employmentType}</span>
                </p>
                {entry.description && <p className="mt-1 leading-relaxed text-muted">{entry.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>

    </section>
  )
}
