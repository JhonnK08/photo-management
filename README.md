# Photo Management

First, you need to have:
```
- Node.js 18+
- pnpm
- Fill .env files in frontend and backend
```

- To run the repository:

```bash
## Database steps
docker compose up

## Prisma tables
cd ./packages/prisma
pnpm generate
pnpm migrate-dev

## Backend
pnpm -F backend start

## Frontend
pnpm -F frontend dev
```
