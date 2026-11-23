import { CUSTOM_PRICES, STARTING_PRICES, type PriceItem } from '../data/pricing'
import { useInquiry } from '../context/useInquiry'

export function Pricing() {
  const { goToContact } = useInquiry()
  const website = STARTING_PRICES[0]
  const chatbot = STARTING_PRICES.find((item) => item.inquiry === 'ai-chatbot')!
  const saas = CUSTOM_PRICES.find((item) => item.inquiry === 'saas-product')!

  return (
    <section id="pricing" className="wrap py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="kicker">Pricing</p>
        <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">Starting points in British pounds.</h2>
        <p className="prose-muted mt-4">
          A figure marked “From” is a starting price for a small, clearly bounded piece of work. Final pricing depends on scope, complexity, integrations, and requirements. Not every project fits the starting price.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <PriceCard item={website} action="Request an Estimate" onSelect={goToContact} tone="night" />
        <PriceCard item={chatbot} action="Request an Estimate" onSelect={goToContact} tone="paper" />
        <PriceCard item={saas} action="Get a Custom Quote" onSelect={goToContact} tone="paper" note="CRM, ERP, voice, and vision projects are quoted the same way." />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <PriceTable title="Published starting prices" items={STARTING_PRICES} onSelect={goToContact} />
        <PriceTable title="Quoted from the scope" items={CUSTOM_PRICES} onSelect={goToContact} />
      </div>
    </section>
  )
}

function PriceCard({
  item,
  action,
  onSelect,
  tone,
  note,
}: {
  item: PriceItem
  action: string
  onSelect: (service: string) => void
  tone: 'night' | 'paper'
  note?: string
}) {
  const night = tone === 'night'
  return (
    <article className={`flex h-full flex-col rounded-[1.4rem] p-6 ${night ? 'bg-night text-cream' : 'border border-line bg-paper-2'}`}>
      <h3 className="text-xl font-semibold leading-snug">{item.service}</h3>
      <p className={`display mt-4 text-4xl ${night ? 'text-cream' : 'text-ink'}`}>
        {item.numeric ? `From ${item.price}` : item.price}
      </p>
      {note && <p className="mt-3 text-sm leading-relaxed text-muted">{note}</p>}
      <button type="button" className={`btn mt-auto ${night ? 'btn-light' : 'btn-primary'}`} onClick={() => onSelect(item.inquiry)}>
        {action}
      </button>
    </article>
  )
}

function PriceTable({
  title,
  items,
  onSelect,
}: {
  title: string
  items: PriceItem[]
  onSelect: (service: string) => void
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.inquiry} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span>{item.service}</span>
            <span className="flex items-center justify-between gap-4 sm:justify-end">
              <strong className="font-semibold">{item.numeric ? `From ${item.price}` : item.price}</strong>
              <button type="button" className="text-sm font-semibold text-cobalt underline underline-offset-4" onClick={() => onSelect(item.inquiry)}>
                {item.numeric ? 'Request an Estimate' : 'Get a Custom Quote'}
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
