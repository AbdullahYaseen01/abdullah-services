import { SOLUTIONS } from '../data/solutions'
import { useInquiry } from '../context/useInquiry'

const TONES = [
  { card: 'bg-[#d9f582] text-[#081f14]', label: 'text-[#3d5244]', rule: 'border-[#081f14]/12', button: 'btn btn-primary' },
  { card: 'bg-[#103d29] text-[#f5f2e8]', label: 'text-[#d9f582]', rule: 'border-white/15', button: 'btn btn-light' },
  { card: 'bg-[#fffdf7] text-[#081f14]', label: 'text-[#c74420]', rule: 'border-[#d5dccb]', button: 'btn btn-primary' },
  { card: 'bg-[#c74420] text-white', label: 'text-[#d9f582]', rule: 'border-white/25', button: 'btn btn-light' },
  { card: 'bg-[#164f35] text-[#f5f2e8]', label: 'text-[#d9f582]', rule: 'border-white/15', button: 'btn btn-light' },
  { card: 'bg-[#081f14] text-[#f5f2e8]', label: 'text-[#d9f582]', rule: 'border-white/15', button: 'btn btn-light' },
  { card: 'bg-[#e3e9d9] text-[#081f14]', label: 'text-[#164f35]', rule: 'border-[#081f14]/10', button: 'btn btn-primary' },
  { card: 'bg-[#be9659] text-[#081f14]', label: 'text-[#3d2a12]', rule: 'border-[#081f14]/12', button: 'btn btn-primary' },
]

export function Solutions() {
  const { goToContact } = useInquiry()

  return (
    <section id="solutions" className="bg-[#f5f2e8] py-16 md:py-24">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="kicker">Business systems</p>
          <h2 className="display mt-3 text-4xl leading-[1.05] sm:text-5xl">What I Can Build for Your Business</h2>
          <p className="prose-muted mt-4">
            Practical systems, described by the problem they take on. Benefits below are the intended outcome of using the system, not a guaranteed saving or accuracy figure.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 lg:grid-cols-2">
          {SOLUTIONS.map((solution, index) => {
            const tone = TONES[index % TONES.length]
            return (
              <li key={solution.title} className={`flex h-full flex-col rounded-[1.6rem] p-6 shadow-[0_16px_40px_rgb(8_31_20/8%)] sm:p-7 ${tone.card}`}>
                <p className={`text-sm font-extrabold tracking-[0.14em] uppercase ${tone.label}`}>0{index + 1}</p>
                <h3 className="display mt-3 text-3xl leading-none">{solution.title}</h3>
                <dl className="mt-5 grid gap-4 text-[0.98rem] leading-relaxed">
                  <div className={`border-t pt-3 ${tone.rule}`}>
                    <dt className={`text-xs font-extrabold tracking-[0.12em] uppercase ${tone.label}`}>The problem</dt>
                    <dd className="mt-1">{solution.problem}</dd>
                  </div>
                  <div className={`border-t pt-3 ${tone.rule}`}>
                    <dt className={`text-xs font-extrabold tracking-[0.12em] uppercase ${tone.label}`}>What it does</dt>
                    <dd className="mt-1">{solution.does}</dd>
                  </div>
                  <div className={`border-t pt-3 ${tone.rule}`}>
                    <dt className={`text-xs font-extrabold tracking-[0.12em] uppercase ${tone.label}`}>Practical benefit</dt>
                    <dd className="mt-1">{solution.benefit}</dd>
                  </div>
                </dl>
                <button type="button" className={`${tone.button} mt-6 w-fit`} onClick={() => goToContact(solution.inquiry)}>
                  Discuss this build
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
