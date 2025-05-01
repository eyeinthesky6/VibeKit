# Backend Architecture

The VibeKit backend is designed for modularity, scalability, and contract-driven development. The codebase is now split into `/backend` (server, API, business logic) and `/frontend` (UI, app shell, client logic).

---

## High-Level Design
- **Framework:** Next.js API routes (in `/backend/app/api/`)
- **ORM:** Drizzle (PostgreSQL)
- **Validation:** Zod (TypeScript)
- **Service Layer:** Modular, per-domain services
- **Testing:** Jest (unit), Playwright (E2E, optional)
- **Rate Limiting:** In-memory and Redis-based
- **Monitoring:** Sentry (optional)

---

## Main Backend Components
- `app/api/` — API route handlers (RESTful, typed, validated)
- `modules/` — Service layer for business logic
- `lib/db/schema/` — Drizzle ORM models
- `lib/db/migrations/` — Migration scripts
- `types/app/` — TypeScript interfaces for contracts
- `config/` — Environment validation
- `tests/` — Jest unit tests

---

## Folder Structure (Post-Move)
```
VibeKit/
├── backend/
│   ├── app/api/                # API routes (all endpoints scaffolded, typed, validated)
│   ├── config/                 # Environment validation, config loading
│   ├── lib/
│   │   ├── auth/               # Auth/session logic, requireAuth utility
│   │   ├── db/
│   │   │   ├── schema/         # Drizzle ORM models
│   │   │   └── migrations/     # Migration scripts
│   │   ├── payments/           # Stripe integration
│   │   └── utils/              # Shared backend utilities
│   ├── modules/                # Service layer for each domain
│   ├── tests/                  # Jest unit tests (stubs included)
│   ├── types/app/              # TypeScript interfaces for all request/response payloads
│   └── ...
├── frontend/                   # UI, app shell, client logic
│   └── ...
└── docs/                       # Backend documentation (this folder)
```

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