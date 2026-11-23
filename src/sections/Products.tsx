import { PROJECTS } from '../data/projects'

export function Products() {
  const products = PROJECTS.filter((project) => project.group === 'featured')

  return (
    <section id="products" className="bg-night py-16 text-cream md:py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="kicker">SaaS products</p>
          <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">Three products, three different relationships.</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#d9d0e4]">
            RaahBan is mine. Clipzy and Autozy are shown as product work, with only the role I can actually support.
          </p>
        </div>
        <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
          {products.map((product) => (
            <article key={product.slug} className="grid gap-3 py-6 md:grid-cols-[12rem_1fr_auto] md:items-start md:gap-8">
              <h3 className="display text-3xl">{product.name}</h3>
              <div>
                <p className="leading-relaxed text-[#ddd4ea]">{product.summary}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#c8bed6]">
                  {product.role ? `Role: ${product.role}` : 'Role: not stated. No ownership is claimed.'}
                </p>
              </div>
              <div className="flex gap-4 text-sm font-semibold md:flex-col md:items-end">
                {product.url && <a href={product.url}>Live site</a>}
                <a href={`/#work`}>On this page</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
