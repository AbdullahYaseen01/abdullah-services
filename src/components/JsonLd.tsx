import { PROFILE, SITE_URL, SOCIALS } from '../data/profile'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: PROFILE.name,
        jobTitle: PROFILE.positioning,
        url: SITE_URL,
        email: PROFILE.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lahore',
          addressCountry: 'PK',
        },
        sameAs: [SOCIALS.linkedin, SOCIALS.github],
        knowsAbout: ['Artificial intelligence', 'SaaS', 'Web development', 'Computer vision', 'Automation'],
      },
      {
        '@type': 'WebSite',
        name: 'Even Better Services',
        url: SITE_URL,
        description:
          'From AI conversations to connected products, turn your next idea into software that works.',
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
