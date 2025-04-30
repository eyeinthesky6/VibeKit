dotenv imported in bundled code

Reason: Files like lib/db/drizzle.ts and config/env.ts import dotenv, pulling in Node core modules (os, fs) into the Edge/App bundle, causing build failures under Webpack/Edge.

Suggested Fix: Remove all import 'dotenv' calls from any file in app/ or lib/; instead call require('dotenv').config() at the very top of next.config.js so Next.js injects your .env.local automatically.

Duplicate billing routes under /api/billing/* and /api/stripe/*

Reason: Two sets of handlers for checkout, webhook, portal, etc. leads to conflicting logic and uncertainty over which route actually runs.

Suggested Fix: Delete or consolidate the legacy /api/billing folder entirely; keep only /api/stripe routes for billing logic.
✅ Done

Using GET for checkout creation (/api/billing/checkout)

Reason: The checkout-creation endpoint is defined as GET, but clients expect to POST a plan ID to create a session.

Suggested Fix: Remove the GET-based handler and ensure /api/stripe/checkout is a POST route that accepts { planId } in the body and returns the session URL.

Multiple new Stripe(...) instantiations instead of singleton

Reason: Even though lib/payments/stripe.ts exports a singleton, many routes still do new Stripe(...), risking inconsistent key usage and extra overhead.

Suggested Fix: Refactor all routes to import the singleton from lib/payments/stripe.ts only, removing any direct new Stripe(...) calls.
✅ Done

Stubbed /api/usage endpoint

Reason: The usage endpoint exists but has no real logic or defined response shape, so front-end calls get empty or 404 responses.

Suggested Fix: Implement the handler to query your usage table (via Drizzle or Supabase) and return a JSON summary of the user’s current usage.
✅ Done

Webhook signature verification failing

Reason: If STRIPE_WEBHOOK_SECRET is missing or invalid, the /api/stripe/webhook handler rejects all events, so subscriptions never get recorded.

Suggested Fix: Validate that STRIPE_WEBHOOK_SECRET is correctly loaded in config/env.ts; add a clear startup error if it’s missing, and ensure the webhook route reads it to verify signatures.
✅ Done

POSTGRES_URL schema validation rejects valid URIs

Reason: Zod’s .url() check only allows http(s)/ws(s) schemes, so postgres://… URIs fail validation and crash the app.

Suggested Fix: Change the Zod rule for POSTGRES_URL to z.string().min(1) or a custom regex/refinement that accepts postgres:// URLs.
✅ Done

Missing auth guards on some routes

Reason: Not all API handlers import or wrap with the session-checking middleware, leaving endpoints open to unauthenticated access.

Suggested Fix: Apply your existing withAuth or validatedActionWithUser wrapper to every sensitive route (e.g. /api/stripe/checkout, /api/stripe/portal).
✅ Done

TypeScript interface mismatches

Reason: Route handlers return ad-hoc JSON objects that don’t conform to any shared TS interfaces, causing front-end TS errors when importing types.

Suggested Fix: Define shared request/response interfaces in a types/ folder, import them in both your route handlers and front-end components, and adjust the code to match those shapes.
✅ Done

CI tests failing due to the above issues

Reason: Jest and Playwright jobs error out because of build failures (dotenv, Zod), missing routes, or unhandled exceptions.

Suggested Fix: After applying the fixes above, update your test suite to cover the corrected routes, re-enable the CI build, and ensure all smoke tests and unit tests pass before merging.
