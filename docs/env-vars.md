# Environment Variables

All backend configuration is managed via environment variables. This file lists all required and optional variables, their purpose, and where to find more info.

---

## Variable Reference

| Variable                     | Description                                                      | Required | Example Value                  |
|------------------------------|------------------------------------------------------------------|----------|-------------------------------|
| POSTGRES_URL                 | PostgreSQL connection string                                     | Yes      | postgres://user:pass@host/db  |
| REDIS_URL                    | Redis connection string for distributed rate limiting            | No       | redis://localhost:6379        |
| SENTRY_DSN                   | Sentry DSN for error monitoring                                  | No       | https://...                   |
| STRIPE_PUBLIC_KEY            | Stripe publishable key                                           | Yes      | pk_test_...                   |
| STRIPE_SECRET_KEY            | Stripe secret key                                                | Yes      | sk_test_...                   |
| STRIPE_WEBHOOK_SECRET        | Stripe webhook signing secret                                    | Yes      | whsec_...                     |
| NEXT_PUBLIC_SUPABASE_URL     | Supabase project URL for client SDK                              | Yes      | https://...                   |
| NEXT_PUBLIC_SUPABASE_ANON_KEY| Public anon key for Supabase authentication                      | Yes      | ...                           |
| SUPABASE_SERVICE_ROLE_KEY    | Service role key for Supabase (server only)                      | Yes      | ...                           |
| AUTH_SECRET                  | Secret used to sign cookies and tokens                           | Yes      | ...                           |
| FEATURE_X_ENABLED            | Feature flag for experimental features                           | No       | true/false                    |
| BASE_URL                     | Base application URL                                             | Yes      | http://localhost:3000         |

---

- See `.env.example` for a template.
- All variables are validated in [`config/env.ts`](../config/env.ts).
- For more, see [README.md](../README.md) and [BACKEND_OVERVIEW.md](./BACKEND_OVERVIEW.md). 