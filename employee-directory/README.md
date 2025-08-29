# Employee Directory

A simple Next.js + Tailwind employee directory where HR can add employee profiles.

- Public listing with search: `/`
- HR admin add form: `/admin`
- API: `GET /api/employees`, `POST /api/employees`

## Setup

1. Install deps

```bash
npm install
```

1. Configure env

Create `.env` (already created) and set:

```bash
DATABASE_URL="<your Neon connection string>"
```

Create `.env.local` and set Stack Auth keys:

```bash
NEXT_PUBLIC_STACK_PROJECT_ID="<project id>"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="<publishable client key>"
STACK_SECRET_SERVER_KEY="<secret server key>"
```

1. Generate Prisma client and migrate

```bash
npm run prisma:generate
npm run prisma:migrate
```

1. Seed sample employees (optional)

```bash
npm run db:seed
```

1. Start dev server

```bash
npm run dev
```

Open <http://localhost:3000>

## Notes

- Database: Neon Postgres is configured via `DATABASE_URL`.
- Auth: `/admin` requires sign-in via Stack Auth. You can access auth routes at `/handler/sign-in` and `/handler/sign-up`.
- Neon Launchpad docs: <https://neon.com/docs/reference/neon-launchpad>.
