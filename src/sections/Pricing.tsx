import { CUSTOM_PRICES, STARTING_PRICES, type PriceItem } from '../data/pricing'
import { useInquiry } from '../context/useInquiry'

const SPOTLIGHTS: { inquiry: string; tone: 'forest' | 'lime' | 'emerald'; note: string }[] = [
  {
    inquiry: 'website-complete',
    tone: 'forest',
    note: 'A small, clearly bounded website. The figure is a starting point.',
  },
  {
    inquiry: 'ai-chatbot',
    tone: 'lime',
    note: 'A chatbot with a defined job. Integrations change the quote.',
  },
  {
    inquiry: 'saas-product',
    tone: 'emerald',
    note: 'CRM, ERP, voice, and vision projects are quoted the same way.',
  },
]

export function Pricing() {
  const { goToContact } = useInquiry()
  const spotlights = SPOTLIGHTS.map((spot) => {
    const item = [...STARTING_PRICES, ...CUSTOM_PRICES].find((entry) => entry.inquiry === spot.inquiry)
    return item ? { ...spot, item } : null
  }).filter((spot) => spot !== null)

  return (
    <section id="pricing" className="bg-sand py-16 md:py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="kicker">Pricing</p>
          <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">Starting points in British pounds.</h2>
          <p className="prose-muted mt-4">
            A figure marked “From” is a starting price for a small, clearly bounded piece of work. Final pricing depends on scope, complexity, integrations, and requirements. Not every project fits the starting price.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {spotlights.map((spot) => (
            <Spotlight key={spot.item.inquiry} item={spot.item} note={spot.note} tone={spot.tone} onSelect={goToContact} />
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <PricePanel title="Published starting prices" kicker="From" items={STARTING_PRICES} onSelect={goToContact} />
          <PricePanel title="Quoted from the scope" kicker="Scope" items={CUSTOM_PRICES} onSelect={goToContact} />
        </div>
      </div>
    </section>
  )
}

function Spotlight({
  item,
  note,
  tone,
  onSelect,
}: {
  item: PriceItem
  note: string
  tone: 'forest' | 'lime' | 'emerald'
  onSelect: (service: string) => void
}) {
  const styles = {
    forest: 'bg-night text-cream',
    lime: 'bg-lime text-ink',
    emerald: 'bg-[#164f35] text-cream',
  }[tone]
  const price = tone === 'lime' ? 'text-ink' : 'text-lime'
  const button = tone === 'lime' ? 'btn-primary' : 'btn-light'
  const action = item.numeric ? 'Request an Estimate' : 'Get a Custom Quote'

  return (
    <article className={`flex h-full flex-col rounded-[1.6rem] p-6 shadow-[0_18px_40px_rgb(8_31_20/10%)] ${styles}`}>
      <p className={`text-xs font-extrabold tracking-[0.14em] uppercase ${tone === 'lime' ? 'text-[#8a3a16]' : 'text-[#ffb199]'}`}>
        {item.numeric ? 'Starting price' : 'Custom scope'}
      </p>
      <h3 className="mt-3 text-2xl font-extrabold leading-snug">{item.service}</h3>
      <p className={`display mt-4 text-5xl ${price}`}>{item.numeric ? `From ${item.price}` : item.price}</p>
      <p className={`mt-3 text-sm leading-relaxed ${tone === 'lime' ? 'text-[#234233]' : 'text-[#d7e4d4]'}`}>{note}</p>
      <button type="button" className={`btn mt-6 w-full sm:w-auto ${button}`} onClick={() => onSelect(item.inquiry)}>
        {action}
      </button>
    </article>
  )
}

function PricePanel({
  title,
  kicker,
  items,
  onSelect,
}: {
  title: string
  kicker: string
  items: PriceItem[]
  onSelect: (service: string) => void
}) {
  return (
    <div className="rounded-[1.5rem] border border-line bg-paper-2 p-5 sm:p-6">
      <p className="text-xs font-extrabold tracking-[0.14em] text-mint uppercase">{kicker}</p>
      <h3 className="display mt-2 text-2xl">{title}</h3>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item.inquiry} className="rounded-2xl border border-line bg-paper px-4 py-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold leading-snug">{item.service}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="inline-flex w-fit whitespace-nowrap rounded-full bg-lime px-3 py-1 text-sm font-extrabold text-ink">
                  {item.numeric ? `From ${item.price}` : item.price}
                </span>
                <button
                  type="button"
                  className="whitespace-nowrap text-left text-sm font-semibold text-[#164f35] underline decoration-[#164f35] underline-offset-4"
                  onClick={() => onSelect(item.inquiry)}
                >
                  {item.numeric ? 'Request an Estimate' : 'Get a Custom Quote'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
