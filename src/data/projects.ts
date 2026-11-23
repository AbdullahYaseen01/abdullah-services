export type Project = {
  slug: string
  name: string
  kicker: string
  summary: string
  problem: string
  does: string
  role?: string
  stack: string[]
  stackNote?: string
  url?: string
  urlLabel?: string
  github?: string
  image?: string
  imageAlt?: string
  width?: number
  height?: number
  group: 'featured' | 'previous' | 'vision'
}

export const PROJECTS: Project[] = [
  {
    slug: 'raahban',
    name: 'RaahBan',
    kicker: 'Owned product · Education',
    summary:
      'My own AI-powered education guidance platform for Pakistani students planning university admissions.',
    problem:
      'Students comparing universities, merit, scholarships, and test deadlines often have to piece that together from scattered advice.',
    does:
      'RaahBan brings university discovery and comparison, merit calculators, scholarship matching, admission and entry-test deadline tracking, and an AI education counselor into one student-facing product. The public site covers MDCAT, ECAT, and FSc admissions guidance, including Urdu and English support.',
    role: 'Founder & Developer',
    stack: [],
    stackNote:
      'A public technology stack was not confirmed from the live site or an accessible repository, so none is listed.',
    url: 'https://raahban.com',
    urlLabel: 'raahban.com',
    image: '/projects/raahban.webp',
    imageAlt: 'RaahBan homepage for Pakistani students planning MDCAT, ECAT, and university admissions.',
    width: 1440,
    height: 900,
    group: 'featured',
  },
  {
    slug: 'clipzy',
    name: 'Clipzy',
    kicker: 'SaaS · Video and podcasts',
    summary: 'A video and podcast recording and editing SaaS platform.',
    problem:
      'Creators often split recording, editing, packaging, and publishing across separate tools for every episode.',
    does:
      'The public product records live sessions with guests, edits video, generates thumbnails, writes titles and descriptions, and includes social publishing workflows.',
    stack: [],
    stackNote:
      'My role and the implementation stack are not stated on the public site, so they are not listed here.',
    url: 'https://clipzy.xynovix.com',
    urlLabel: 'clipzy.xynovix.com',
    image: '/projects/clipzy.webp',
    imageAlt:
      'Clipzy homepage describing live podcast recording, video editing, thumbnails, titles, and social publishing.',
    width: 1440,
    height: 900,
    group: 'featured',
  },
  {
    slug: 'autozy',
    name: 'Autozy',
    kicker: 'SaaS · Podcasts',
    summary: 'A podcast platform for recording, editing, publishing, and distribution.',
    problem:
      'A podcast workflow can sprawl across a recorder, an editor, a host, and separate distribution tools.',
    does:
      'The public site describes one platform to record, edit, publish, repurpose, and distribute a podcast. Editing covers audio, video, transcript, and a timeline, with podcast hosting and publishing included.',
    role: 'Full Stack Developer, December 2025 – June 2026, as recorded in this portfolio.',
    stack: ['Next.js'],
    stackNote:
      'The live site is a Next.js application on Vercel. A fuller personal technology list was not verified, and this page does not claim ownership of Autozy.',
    url: 'https://autozy.co',
    urlLabel: 'autozy.co',
    image: '/projects/autozy.webp',
    imageAlt: 'Autozy homepage for a podcast platform covering recording, editing, publishing, and distribution.',
    width: 1440,
    height: 900,
    group: 'featured',
  },
  {
    slug: 'westora',
    name: 'Westora Style',
    kicker: 'Previous work · E-commerce',
    summary: 'A fashion storefront for sneakers, bags, outerwear, jewelry, and watches.',
    problem: 'The shop needed a public catalog where people can browse categories and open individual products.',
    does:
      'The live site presents category browsing and product pages for shoes, handbags, wallets, jackets, jewelry, and watches, with prices shown on products. Payment, shipping, and platform details are not described here because they were not verified.',
    role: 'Previous e-commerce website work.',
    stack: [],
    stackNote: 'The site is hosted on Vercel. Shopify usage was not verified, so it is not claimed.',
    url: 'https://westorastyle.com',
    urlLabel: 'westorastyle.com',
    image: '/projects/westora.webp',
    imageAlt: 'Westora Style homepage with sneakers, a handbag, outerwear, and watches.',
    width: 1440,
    height: 900,
    group: 'previous',
  },
  {
    slug: 'same-streets',
    name: 'Same Streets Presents',
    kicker: 'Previous work · Live music',
    summary: 'A live-music website for a project born in Cleveland, Tennessee.',
    problem: 'The project needed a public home for shows, sessions, artist features, and a way for people to get involved.',
    does:
      'The site introduces Same Streets Presents, lists live shows and sessions, and includes pages for artist features, contact, and getting involved. It is a music site, not an online shop.',
    role: 'Website implementation.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://www.samestreetspresents.com',
    urlLabel: 'samestreetspresents.com',
    image: '/projects/same-streets.webp',
    imageAlt: 'Same Streets Presents homepage for live music in Cleveland, Tennessee.',
    width: 1440,
    height: 900,
    group: 'previous',
  },
  {
    slug: 'alpr',
    name: 'Vehicle Number Plate Detection',
    kicker: 'Computer vision',
    summary: 'A YOLO and OpenCV system for reading vehicle number plates at an automated gate.',
    problem:
      'Gate access needs a way to detect a vehicle plate and pass that reading into the entry workflow.',
    does:
      'The system detects a plate in the camera view and recognizes the plate text so a gate workflow can use that reading. The repository is private. Recognition accuracy, camera hardware, and deployment scale are not published.',
    role: 'Computer-vision development for automated gate access.',
    stack: ['Python', 'YOLO', 'OpenCV'],
    stackNote: 'The picture is an illustration of a gate setting, not a captured detection frame. Recognition accuracy, camera hardware, and deployment scale are not published.',
    image: '/projects/alpr.webp',
    imageAlt: 'Illustration of a car at a private gate with a highlighted plate area. Not a captured detection result.',
    width: 1280,
    height: 720,
    group: 'vision',
  },
  {
    slug: 'tracking',
    name: 'Multi-Person Tracking',
    kicker: 'Computer vision',
    summary: 'A public real-time system for detecting people and keeping identities across a scene.',
    problem: 'A single detection per frame loses track of who is who when people overlap or briefly leave the frame.',
    does:
      'The public repository describes YOLOv8 for detection and DeepSORT for tracking, so several people can be followed in the same video while IDs stay consistent through overlap.',
    role: 'Computer-vision project.',
    stack: ['Python', 'YOLOv8', 'DeepSORT'],
    stackNote: 'The picture is an illustration of a tracking scene, not a captured result. Frame rate and identity-switch figures are not published.',
    image: '/projects/tracking.webp',
    imageAlt: 'Illustration of people in a lobby with tracking boxes. Not a captured tracking result.',
    width: 1280,
    height: 720,
    group: 'vision',
  },
]

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug)
}
