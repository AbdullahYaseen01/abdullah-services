import { SOLUTIONS } from '../data/solutions'
import { useInquiry } from '../context/useInquiry'

export function Solutions() {
  const { goToContact } = useInquiry()

  return (
    <section id="solutions" className="wrap py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="kicker">Business systems</p>
        <h2 className="display mt-3 text-4xl leading-[1.05] sm:text-5xl">What I Can Build for Your Business</h2>
        <p className="prose-muted mt-4">
          Practical systems, described by the problem they take on. Benefits below are the intended outcome of using the system, not a guaranteed saving or accuracy figure.
        </p>
      </div>

      <ol className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {SOLUTIONS.map((solution, index) => (
          <li key={solution.title} className="border-t border-ink pt-5">
            <p className="text-sm font-semibold text-cobalt">0{index + 1}</p>
            <h3 className="display mt-2 text-3xl">{solution.title}</h3>
            <dl className="mt-4 grid gap-3 text-[0.98rem] leading-relaxed">
              <div>
                <dt className="font-semibold">The problem</dt>
                <dd className="text-muted">{solution.problem}</dd>
              </div>
              <div>
                <dt className="font-semibold">What it does</dt>
                <dd className="text-muted">{solution.does}</dd>
              </div>
              <div>
                <dt className="font-semibold">Practical benefit</dt>
                <dd className="text-muted">{solution.benefit}</dd>
              </div>
            </dl>
            <button type="button" className="btn btn-ghost mt-3 px-0" onClick={() => goToContact(solution.inquiry)}>
              Discuss this build
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
