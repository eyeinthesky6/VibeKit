# Next.js SaaS Starter

This is a starter template for building a SaaS application using **Next.js** with support for authentication, Stripe integration for payments, and a dashboard for logged-in users.

**Demo: [https://next-saas-start.vercel.app/](https://next-saas-start.vercel.app/)**

## Features

- Magic Link (passwordless) login support via Supabase
- Role tier support: basic, premium, admin (stored in Supabase user_metadata and profiles table)
- <IfRole> helper component for RBAC in dashboard UI

- Usage analytics: `/api/usage` endpoint and `usage` table for tracking user/team activity (for dashboards, metering, and reporting)
- Marketing landing page (`/`) with animated Terminal element
- Pricing page (`/pricing`) which connects to Stripe Checkout
- Dashboard pages with CRUD operations on users/teams
- Basic RBAC with Owner and Member roles
- Subscription management with Stripe Customer Portal
- Email/password authentication with JWTs stored to cookies
- Global middleware to protect logged-in routes
- Local middleware to protect Server Actions or validate Zod schemas
- Activity logging system for any user events

## Feature Map

- **Authentication**: Passwordless magic link via Supabase, JWT sessions stored in cookies, global middleware for route protection.
- **Billing**: Stripe integration with Checkout, Customer Portal, webhook handling for `checkout.session.completed` and subscription updates.
- **Dashboard**: Role-based UI (basic, premium, admin), usage analytics endpoint (`/api/usage`) with Drizzle queries, activity logging.
- **Middleware**: Global Next.js middleware for auth, CORS preflight handling, in-memory rate limiting.
- **Database**: PostgreSQL with Drizzle ORM and schema definitions in `lib/db/schema.ts`.
- **Testing**: Jest unit tests covering webhook handler, middleware, and database queries.
- **Performance**: UI optimizations using `React.memo` and `useCallback` for heavy components.

![Architecture Diagram](./docs/architecture.png)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

### Magic Link Login

- On the sign-in page, click "Use magic link instead" to request a passwordless login link via email.
- After clicking the link in your email, you will be redirected back to `/auth-callback` and signed in automatically.

### Role Tiers

- By default, new users are assigned the `basic` role. You can specify `role` as `basic`, `premium`, or `admin` during registration or by updating the `profiles` table/user_metadata.
- The helper `getUserRole(userId)` in `lib/auth/role.ts` retrieves the user's current role.

### Role-based UI (RBAC)

- Use the `<IfRole role="admin">...</IfRole>` component in dashboard pages to show/hide UI for specific roles.
- Example:
  ```tsx
  import { IfRole } from './IfRole';
  // ...
  <IfRole role="admin">
    <Button>Admin Only Feature</Button>
  </IfRole>;
  ```

```bash
git clone https://github.com/nextjs/saas-starter
cd saas-starter
pnpm install
```

## Running Locally

[Install](https://docs.stripe.com/stripe-cli) and log in to your Stripe account:

```bash
stripe login
```

Use the included setup script to create your `.env.local` file:

```bash
pnpm db:setup  # generates .env.local from .env.example
```

Run the database migrations and seed the database with a default user and team, along with sample usage analytics:

```bash
pnpm db:migrate
pnpm db:seed
```

This will create the following user and team, and populate the `usage` table:

- User: `test@test.com`
- Password: `admin123`

You can also create new users through the `/sign-up` route.

### Usage Analytics Endpoint

- The `/api/usage` endpoint returns usage analytics for a user or team. Example:
  ```http
  GET /api/usage?userId=1
  GET /api/usage?teamId=1
  ```
- This is used for dashboard analytics, metering, and reporting.

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/) and deploy it.
3. Follow the Vercel deployment process, which will guide you through setting up your project.

### Add environment variables

In your Vercel project settings (or during deployment), add all the necessary environment variables (as defined in `.env.example`). For production, update values accordingly:

1. `BASE_URL`: Your production domain.
2. `STRIPE_PUBLIC_KEY`: Your live Stripe publishable key.
3. `STRIPE_SECRET_KEY`: Your live Stripe secret key.
4. `STRIPE_WEBHOOK_SECRET`: Your live Stripe webhook secret.
5. `POSTGRES_URL`: Your production database URL.
6. `AUTH_SECRET`: A random string, e.g. `openssl rand -base64 32`.

## Other Templates

While this template is intentionally minimal and to be used as a learning resource, there are other paid versions in the community which are more full-featured:

- https://achromatic.dev
- https://shipfa.st
- https://makerkit.dev
- https://zerotoshipped.com

## Environment Variables

| Variable                     | Description                                                                      |
|------------------------------|----------------------------------------------------------------------------------|
| NEXT_PUBLIC_SUPABASE_URL     | Supabase project URL for client SDK                                              |
| NEXT_PUBLIC_SUPABASE_ANON_KEY| Public anon key for Supabase authentication                                       |
| SUPABASE_SERVICE_ROLE_KEY    | Service role key for Supabase; use only in server environments                   |
| POSTGRES_URL                 | Postgres connection URL for database migrations and seeds                        |
| STRIPE_PUBLIC_KEY            | Stripe publishable key                                                           |
| STRIPE_SECRET_KEY            | Stripe secret key                                                                |
| STRIPE_WEBHOOK_SECRET        | Stripe webhook signing secret                                                    |
| BASE_URL                     | Base application URL                                                             |
| AUTH_SECRET                  | Secret used to sign cookies and tokens                                           |
| FEATURE_X_ENABLED            | Flag to enable experimental features                                             |
| REDIS_URL                    | Redis connection string for distributed rate limiting                             |
| SENTRY_DSN                   | Sentry DSN for error monitoring                                                 |

## Auth Guards
- Use the `requireAuth` utility in route handlers to protect endpoints and enforce authentication.

## Backend Integration Plan
- All endpoints scaffolded and typed
- Drizzle models and migrations stubbed
- Zod validation schemas present
- Service layer stubs created
- Jest unit test stubs present
- Environment validation and docs updated
- Ready for frontend integration

## EditorConfig

A `.editorconfig` file has been added to ensure consistent formatting across editors. Please install EditorConfig plugin in your IDE to apply these settings.

## API Error Response Schema
All API errors now return a standardized object:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message."
  }
}
```

## Rate Limiting
API responses include the following headers:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Requests left in current window
- `X-RateLimit-Reset`: Seconds until rate limit resets

For distributed deployments, use Redis for rate limiting (see `middleware.ts`).

## Logging & Monitoring
- Uses `pino` for logging. In production, integrate with a centralized system (e.g., Sentry, Datadog).
- To enable Sentry, add your DSN to the environment and initialize Sentry in your entrypoint.

## Database Migrations
- Migrations are tracked in `lib/db/migrations`.
- To apply migrations:
  ```sh
  npm run db:migrate
  ```
- Always test migrations in a staging environment before deploying to production.

## Environment Variables
- All secrets and sensitive configs must be set via environment variables (see `.env.example`).
- Do not hardcode secrets in the codebase.
- Use `config/env.ts` for validation and loading.

## Distributed Rate Limiting
- The default rate limiter is in-memory and suitable for single-instance deployments only.
- For multi-instance deployments, use Redis for distributed rate limiting.
- To enable Redis, set the `REDIS_URL` environment variable and update `middleware.ts` to use Redis logic.

### Redis-based Rate Limiting
- If you set the `REDIS_URL` environment variable, the middleware will use Redis for distributed rate limiting automatically.
- Make sure your Redis instance is accessible from all app instances.
- If `REDIS_URL` is not set, the middleware falls back to in-memory rate limiting (single-instance only).

## Type and Business Logic Structure

- **All business logic lives in the backend.**
- **All API request/response types (e.g., User, Page, Team, etc.) are defined in `shared/types.ts`.**
- **Frontend must only import types from `@/shared/types` and never from backend or its internals.**
- **Backend must also use `@/shared/types` for all API request/response types.**
- **No business logic or type definitions should live in the frontend.**
- This ensures the backend is the single source of truth for business logic and types, and the frontend can be swapped out or replaced easily.

When adding a new frontend, import all API types from `@/shared/types`.
