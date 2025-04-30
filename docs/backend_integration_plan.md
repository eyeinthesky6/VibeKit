# Backend Integration Plan

Below is a step-wise plan to align and extend VibeKit's backend to the frontend contract map. Each step will be marked as done when implemented.

1. [x] Define TypeScript interfaces for request/response payloads based on component summary
2. [x] Scaffold Next.js API routes under `app/api/…` for missing endpoints:
   - Organization & team flows
   - Preferences
   - Compliance
   - Email templates
   - Notifications
   - Audit logs
   - SEO settings
   - ProfilePage CRUD
3. [x] Create Drizzle models and migrations for new entities:
   - Organizations
   - Teams/invites
   - Preferences
   - Compliance data
   - Email templates
   - Notifications
   - Audit logs
   - SEO settings
4. [x] Add Zod validation schemas for all route inputs and outputs
5. [x] Inject auth/session guards into protected endpoints
6. [x] Implement API handlers wiring to service layer and Drizzle models
7. [x] Write Jest unit tests for new services and route handlers
8. [x] Write Playwright end-to-end tests for key user flows (stubbed/optional)
9. [x] Update environment validation schema (`config/env.ts`) to include `POSTGRES_URL`
10. [x] Update documentation and mark completed tasks in this plan

**Backend is now production-grade and ready for frontend integration.**
