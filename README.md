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
  </IfRole>
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
2. `NEXTAUTH_URL`: Your production auth callback URL.
3. `STRIPE_PUBLIC_KEY`: Your live Stripe publishable key.
4. `STRIPE_SECRET_KEY`: Your live Stripe secret key.
5. `STRIPE_WEBHOOK_SECRET`: Your live Stripe webhook secret.
6. `POSTGRES_URL`: Your production database URL.
7. `AUTH_SECRET`: A random string, e.g. `openssl rand -base64 32`.

## Other Templates

While this template is intentionally minimal and to be used as a learning resource, there are other paid versions in the community which are more full-featured:

- https://achromatic.dev
- https://shipfa.st
- https://makerkit.dev
- https://zerotoshipped.com
