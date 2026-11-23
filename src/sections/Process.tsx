import { PROCESS } from '../data/pricing'

export function Process() {
  return (
    <section id="process" className="bg-sand/60 py-16 md:py-20">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="kicker">Working process</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">How an engagement can proceed.</h2>
          <p className="prose-muted mt-4">
            This is the approach I propose. It is not a promise of a fixed timeline, a revision count, or ongoing support.
          </p>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {PROCESS.map((step) => (
            <li key={step.step} className="rounded-2xl bg-paper-2 p-5">
              <p className="display text-3xl text-cobalt">{step.step}</p>
              <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
