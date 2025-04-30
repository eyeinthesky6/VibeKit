# Backend Architecture

The VibeKit backend is designed for modularity, scalability, and contract-driven development.

---

## High-Level Design
- **Framework:** Next.js API routes
- **ORM:** Drizzle (PostgreSQL)
- **Validation:** Zod (TypeScript)
- **Service Layer:** Modular, per-domain services
- **Testing:** Jest (unit), Playwright (E2E, optional)
- **Rate Limiting:** In-memory and Redis-based
- **Monitoring:** Sentry (optional)

---

## Main Components
- `app/api/` — API route handlers (RESTful, typed, validated)
- `modules/` — Service layer for business logic
- `lib/db/schema/` — Drizzle ORM models
- `lib/db/migrations/` — Migration scripts
- `types/app/` — TypeScript interfaces for contracts
- `config/` — Environment validation
- `tests/` — Jest unit tests

---

## Diagram
```
[Client/Frontend]
      |
      v
[Next.js API Routes] ---> [requireAuth] ---> [Service Layer (modules/)] ---> [Drizzle ORM] ---> [Postgres]
      |                        |                    |
      |                        |                    v
      |                        |                [Zod Validation]
      |                        |
      |                        v
      |                  [Stripe, Redis, Sentry, etc.]
```

---

For more details, see [BACKEND_OVERVIEW.md](./BACKEND_OVERVIEW.md). 