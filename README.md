# Abdullah Yaseen — Portfolio

Portfolio for Abdullah Yaseen, an AI and full-stack engineer. Vite, React, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

```bash
npm test
npm run lint
npm run build
```

## Inquiry form

The form posts to `/api/contact`. In local development, Vite serves that route. On Vercel, `api/contact.ts` handles it.

Delivery uses [Resend](https://resend.com). The form stays unavailable, and email plus WhatsApp remain the contact paths, until these server variables are set:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=abdullahyaseen6500@gmail.com
CONTACT_FROM_EMAIL=
```

`CONTACT_FROM_EMAIL` must be an address Resend is allowed to send from. Do not commit real keys. Copy `.env.example` to `.env` for local delivery tests.

A successful message is shown only after Resend accepts the email.

## Content

| File | Edit |
| --- | --- |
| `src/data/profile.ts` | Name, email, and profile links |
| `src/data/projects.ts` | Projects |
| `src/data/services.ts` | Service categories |
| `src/data/solutions.ts` | Business solutions |
| `src/data/pricing.ts` | Prices, process, and technology groups |
| `src/data/testimonials.ts` | Real testimonials only |
| `src/data/experience.ts` | Experience already on record |
| `src/data/certificates.ts` | Certificates already on record |

## Deploy

The Vercel project builds with `npm run build`. Pushing `main` deploys production when the Git integration is connected. Set the Resend variables in the Vercel project before expecting the form to deliver mail.
