import { PROJECTS } from '../data/projects'
import { Link } from 'react-router-dom'

export function Products() {
  const products = PROJECTS.filter((project) => project.group === 'featured')

  return (
    <section id="products" className="bg-[#06160e] py-16 text-cream md:py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="kicker">SaaS products</p>
          <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">Three products, three different relationships.</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#d7e4d4]">
            RaahBan is mine. Clipzy and Autozy are shown as product work, with only the role I can actually support.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-night">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  width={product.width}
                  height={product.height}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="display text-3xl">{product.name}</h3>
                <p className="mt-3 leading-relaxed text-[#d7e4d4]">{product.summary}</p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                  {product.url && (
                    <a href={product.url}>
                      Live site <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  <Link to={`/work/${product.slug}`}>Project details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
