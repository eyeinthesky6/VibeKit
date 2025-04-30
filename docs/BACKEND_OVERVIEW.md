# VibeKit Backend Documentation

## 1. Overview
VibeKit's backend is a production-grade, contract-driven, modular boilerplate for SaaS and app development. It is designed for rapid extension, AI agent-led development, and seamless frontend integration.

---

## 2. Architecture
- **Framework:** Next.js API routes
- **ORM:** Drizzle (PostgreSQL)
- **Validation:** Zod (TypeScript)
- **Service Layer:** Modular, per-domain services
- **Testing:** Jest (unit), Playwright (E2E, optional)
- **Rate Limiting:** In-memory and Redis-based
- **Monitoring:** Sentry (optional)

---

## 3. Folder Structure
```
VibeKit/
├── app/api/                # API routes (all endpoints scaffolded, typed, validated)
├── config/                 # Environment validation, config loading
├── lib/
│   ├── auth/               # Auth/session logic, requireAuth utility
│   ├── db/
│   │   ├── schema/         # Drizzle ORM models
│   │   └── migrations/     # Migration scripts
│   ├── payments/           # Stripe integration
│   └── utils/              # Shared backend utilities
├── modules/                # Service layer for each domain
├── tests/                  # Jest unit tests (stubs included)
├── types/app/              # TypeScript interfaces for all request/response payloads
├── .env.example            # Environment variables
├── README.md               # Main project documentation
├── backend_integration_plan.md # Integration checklist
├── BACKEND_STATE.md        # State and onboarding
└── docs/                   # (This folder)
```

---

## 4. API Conventions
- **RESTful endpoints** under `/api/` (see `frontend backend contract map.md`)
- **Request/response types** defined in `types/app/`
- **Validation:** All inputs/outputs validated with Zod
- **Standardized error schema:**
  ```json
  { "error": { "code": "ERROR_CODE", "message": "Human-readable error message." } }
  ```
- **Rate limit headers:**
  - `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## 5. Auth & Session
- Use `requireAuth` from `lib/auth/requireAuth.ts` in protected endpoints
- Session is checked via `getSession()`
- 401/403 returned if not authenticated

---

## 6. Error Handling
- All errors use the standardized error object (see above)
- Use appropriate HTTP status codes (400, 401, 403, 404, 500, etc.)
- Log critical errors (optionally to Sentry)

---

## 7. Environment Variables
- All required/optional variables listed in `.env.example` and validated in `config/env.ts`
- Key variables: `POSTGRES_URL`, `REDIS_URL`, `SENTRY_DSN`, `STRIPE_*`, `AUTH_SECRET`, etc.

---

## 8. Database & Migrations
- **Drizzle ORM** models in `lib/db/schema/`
- **Migrations** in `lib/db/migrations/`
- Run migrations with `npm run db:migrate`
- Test migrations in staging before production

---

## 9. Testing
- **Unit tests:** Jest, in `tests/` (stubs for all services)
- **E2E tests:** Playwright (optional, recommended post-frontend integration)
- Run tests with `npm test`

---

## 10. Extending the Backend
- Add new endpoints in `app/api/`, following contract and Zod validation
- Add/extend models in `lib/db/schema/`
- Add business logic in `modules/` service classes
- Add/extend types in `types/app/`
- Add/extend tests in `tests/`
- Update docs and environment as needed

---

## 11. FAQ
**Q: How do I add a new API endpoint?**
A: Scaffold a new file in `app/api/`, define request/response types in `types/app/`, add Zod validation, and wire to a service in `modules/`.

**Q: How do I protect an endpoint?**
A: Use `requireAuth` in your handler.

**Q: How do I add a new model?**
A: Add a new file in `lib/db/schema/`, update migrations, and reference in your service.

**Q: How do I update environment variables?**
A: Edit `.env.example` and update `config/env.ts` for validation.

---

## 12. References
- `README.md` — Main project guide
- `BACKEND_STATE.md` — State, onboarding, and checklists
- `backend_integration_plan.md` — Integration progress
- `.env.example` — Environment variables
- `frontend backend contract map.md` — API contract
- `component level interface summary.md` — Component data contracts 