<div align="center">

# Bulong

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?logo=prisma)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169e1?logo=postgresql&logoColor=white)](https://neon.tech)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1-8b5cf6)](https://www.better-auth.com)
[![License](https://img.shields.io/badge/license-educational/portfolio-green)](#license)

</div>

Bulong is a full-stack anonymous messaging platform. The idea is simple: you claim a handle, share your link, and people can send you honest messages without revealing who they are. Everything around that idea — the inbox, the dashboard, the abuse protection — is built to make anonymous feedback feel safe and useful rather than messy.

The interface is drawn in a hand-sketched neo-brutalist style: paper backgrounds, ink borders, hard shadows, and a lime accent that carries through every page, email, and downloaded image.

## Features

**Account and inbox**

- Email and password accounts with email verification (Brevo transactional email)
- Claim a handle on the landing page with live availability checking — handles are profanity-filtered on both client and server
- Personal anonymous link at `your-domain/@handle` — no login required to send
- Message inbox with search, unread states, and a spoiler setting that hides previews of unread messages
- Download any message as a shareable image card, branded and stamped with your link

**Dashboard**

- Weekly message chart, recent messages, and KPI stats (total, today, this week, average)
- Interactive world map showing which countries your messages came from — zoom, pan, and hover any country
- Daily message limits, link on/off toggle, and inbox pause controls in settings

**Abuse protection**

- Bilingual profanity filter (Filipino and English lists, with leetspeak and spacing evasion handling) applied to messages and handle claims
- IP rate limiting with escalating blocks, per-inbox cooldowns, bot user-agent rejection, honeypot fields, and payload size limits
- Message senders are never identified — only approximate country, region, device, OS, and browser are stored

**Platform**

- Responsive from mobile to desktop, with touch-optimized navigation
- Privacy policy page written in plain language
- Custom glove cursor and floating 3D decorations on the landing page (desktop only)

## Tech Stack

- Next.js (App Router) with React and TypeScript
- Tailwind CSS for the design system
- Prisma ORM on PostgreSQL (Neon)
- Better Auth for authentication
- react-simple-maps and react-zoom-pan-pinch for the dashboard map
- Three.js (react-three-fiber) for the landing page decorations
- Brevo for transactional email

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://..."

BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Optional — email verification falls back to console logging without these
BREVO_API_KEY="xkeysib-..."
EMAIL_FROM="Bulong <you@yourdomain.com>"
```

## Getting Started

```bash
git clone https://github.com/rainndev/Bulong.git
cd Bulong
pnpm install
pnpm dev
```

The app runs at `http://localhost:3000`. Push the Prisma schema with `npx prisma db push` before creating an account.

## Privacy

Bulong stores no trackers, no ad pixels, and no sender identities. The full details — what is collected, which services process it, and the honest limits of anonymity — are on the [privacy policy page](/privacy) of the app.

## License

Educational and portfolio use.
