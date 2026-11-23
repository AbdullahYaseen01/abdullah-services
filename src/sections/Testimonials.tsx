import { TESTIMONIALS } from '../data/testimonials'
import { useInquiry } from '../context/useInquiry'

export function Testimonials() {
  const { goToContact } = useInquiry()

  return (
    <section id="testimonials" className="bg-paper py-14 md:py-20">
      <div className="wrap max-w-3xl rounded-[1.6rem] border border-[#164f35]/25 bg-sand px-6 py-8 sm:px-8">
        <p className="kicker">Testimonials</p>
        <h2 className="display mt-3 text-4xl">Client words, only when they are real.</h2>
        {TESTIMONIALS.length === 0 ? (
          <div className="mt-5">
            <p className="text-lg leading-relaxed text-muted">
              No testimonials are published. I will add a quote only when I can name the person and they have agreed to be quoted. Nothing on this page is a stand-in review.
            </p>
            <button type="button" className="btn btn-secondary mt-5" onClick={() => goToContact()}>
              Discuss Your Project
            </button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4">
            {TESTIMONIALS.map((item) => (
              <li key={item.name} className="rounded-2xl border border-line bg-paper-2 p-5">
                <blockquote className="text-lg leading-relaxed">“{item.quote}”</blockquote>
                <p className="mt-3 text-sm font-semibold">
                  {item.name}, {item.role}
                  {item.company ? `, ${item.company}` : ''}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
