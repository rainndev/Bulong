# Bulong

Bulong is a full-stack anonymous messaging web application inspired by NGL. It allows users to receive anonymous messages through a shareable link while providing strong control over message flow, analytics, and content management.

## Tech Stack

- Next.js
- Tailwind CSS
- Prisma ORM
- shadcn/ui components
- PostgreSQL (Neon serverless database)

## Key Features

- User account creation and authentication
- Daily message limit management
- Enable or disable anonymous message links
- Shareable anonymous message links
- Dashboard analytics for message insights
- Export and share received messages as images
- Message inbox with search functionality

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://example"

BETTER_AUTH_SECRET=f2b7940example
BETTER_AUTH_URL=http://localhost:3000
```

## Getting Started

```bash
git clone https://github.com/rainndev/Bulong.git
cd Bulong
npm install
npm run dev
```

## Purpose

This project is built to demonstrate full-stack web development using modern tools, focusing on authentication, database management, anonymous data handling, and dashboard-driven features.

## License

Educational and portfolio use.
