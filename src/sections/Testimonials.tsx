import { TESTIMONIALS } from '../data/testimonials'
import { useInquiry } from '../context/useInquiry'

export function Testimonials() {
  const { goToContact } = useInquiry()

  return (
    <section id="testimonials" className="bg-paper py-16 md:py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="kicker">Testimonials</p>
          <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">Sample words for the layout.</h2>
          <p className="prose-muted mt-4">
            These cards are design samples. They are not client reviews, and the labels are not real people or companies.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li key={item.id} className="flex h-full flex-col rounded-[1.4rem] border border-[#164f35]/20 bg-sand p-5">
              <p className="w-fit rounded-full bg-lime px-3 py-1 text-xs font-extrabold tracking-wide text-ink uppercase">Sample</p>
              <blockquote className="mt-4 text-lg leading-relaxed">“{item.quote}”</blockquote>
              <p className="mt-4 text-sm font-semibold text-muted">{item.attribution}</p>
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn-secondary mt-6" onClick={() => goToContact()}>
          Discuss Your Project
        </button>
      </div>
    </section>
  )
}
