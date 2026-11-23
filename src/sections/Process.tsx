import { PROCESS } from '../data/pricing'
import { useInquiry } from '../context/useInquiry'

const TONES = [
  { card: 'bg-[#d9f582] text-[#081f14]', mark: 'text-[#081f14]/40' },
  { card: 'bg-[#164f35] text-[#f5f2e8]', mark: 'text-[#d9f582]' },
  { card: 'bg-[#fffdf7] text-[#081f14]', mark: 'text-[#c74420]' },
  { card: 'bg-[#c74420] text-white', mark: 'text-[#d9f582]' },
]

export function Process() {
  const { goToContact } = useInquiry()

  return (
    <section id="process" className="relative overflow-hidden bg-[#06160e] py-16 text-[#f5f2e8] md:py-24">
      <div className="pointer-events-none absolute -top-28 right-[-4rem] h-72 w-72 rounded-full bg-[#164f35]/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-5rem] left-[-3rem] h-64 w-64 rounded-full bg-[#c74420]/25 blur-3xl" />
      <div className="wrap relative">
        <div className="grid items-end gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="kicker">Working process</p>
            <h2 className="display mt-3 text-4xl leading-[1.05] sm:text-5xl">How an engagement can proceed.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#d7e4d4] lg:pb-1">
            This is the approach I propose. It is not a promise of a fixed timeline, a revision count, or ongoing support.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PROCESS.map((step, index) => {
            const tone = TONES[index] ?? TONES[0]
            return (
              <li key={step.step} className={`flex h-full flex-col rounded-[1.6rem] p-6 shadow-[0_18px_40px_rgb(0_0_0/18%)] ${tone.card}`}>
                <p className={`text-4xl leading-none font-extrabold tracking-[-0.04em] ${tone.mark}`}>{step.step}</p>
                <h3 className="display mt-8 text-[1.7rem] leading-none">{step.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed opacity-90">{step.body}</p>
              </li>
            )
          })}
        </ol>

        <div className="mt-6 flex flex-col gap-4 rounded-[1.4rem] border border-white/10 bg-white/5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="max-w-xl text-sm leading-relaxed text-[#d7e4d4]">
            The first conversation covers the problem and the first release. Nothing is booked from this page.
          </p>
          <button type="button" className="btn btn-primary shrink-0 whitespace-nowrap" onClick={() => goToContact()}>
            Start a project <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  )
}
