import { TESTIMONIALS } from '../data/testimonials'
import { useInquiry } from '../context/useInquiry'

export function Testimonials() {
  const { goToContact } = useInquiry()

  return (
    <section id="testimonials" className="bg-[#06160e] py-16 text-cream md:py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="kicker">Reviews</p>
          <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">What the work feels like in practice.</h2>
        </div>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li key={item.id} className="flex h-full flex-col rounded-[1.5rem] bg-[#103d29] p-6">
              <p className="font-serif text-5xl leading-none text-lime" aria-hidden="true">“</p>
              <blockquote className="mt-3 text-lg leading-relaxed">{item.quote}</blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-lime text-sm font-extrabold text-ink">
                  {item.role.slice(0, 1)}
                </span>
                <p>
                  <span className="block font-semibold">{item.role}</span>
                  <span className="block text-sm text-[#d7e4d4]">{item.context}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn-primary mt-8" onClick={() => goToContact()}>
          Discuss Your Project
        </button>
      </div>
    </section>
  )
}
