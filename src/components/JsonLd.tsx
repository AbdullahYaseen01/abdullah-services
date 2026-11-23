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
        name: `${PROFILE.name} — Portfolio`,
        url: SITE_URL,
        description:
          'Portfolio of Abdullah Yaseen, an AI and full-stack engineer who builds AI applications, agents, automation, and SaaS products.',
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
