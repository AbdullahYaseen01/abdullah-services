import { SITE_URL } from '../data/profile'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Even Better Services',
    url: SITE_URL,
    description: 'From AI conversations to connected products, turn your next idea into software that works.',
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
