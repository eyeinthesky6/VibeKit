# API Reference

This document lists all backend API endpoints, their methods, and a short description. Endpoints are implemented in `/backend/app/api/`. For usage examples and schemas, see [API_USAGE.md](./API_USAGE.md) and `/backend/types/app/`.

---

## Endpoints

| Endpoint                        | Method(s)         | Description                                 |
|---------------------------------|-------------------|---------------------------------------------|
| /api/auth/login                 | POST              | User login                                  |
| /api/auth/signup                | POST              | User signup                                 |
| /api/auth/forgot-password       | POST              | Request password reset                      |
| /api/auth/reset-password        | POST              | Reset password                              |
| /api/auth/session               | GET               | Get current session                         |
| /api/organizations              | GET, POST         | List/create organizations                   |
| /api/organizations/switch       | POST              | Switch active organization                  |
| /api/teams/invite               | POST              | Invite a team member                        |
| /api/feature-flags              | GET, POST         | List/update feature flags                   |
| /api/feature-flags/update       | POST              | Update a feature flag                       |
| /api/pages                      | GET, POST         | List/create pages                           |
| /api/pages/:id                  | PUT, DELETE       | Update/delete a page                        |
| /api/analytics/summary          | GET               | Get analytics summary                       |
| /api/analytics/export           | GET               | Export analytics data                       |
| /api/subscription               | GET               | Get subscription status                     |
| /api/checkout                   | POST              | Start Stripe checkout                       |
| /api/webhook/stripe             | POST              | Stripe webhook handler                      |
| /api/preferences                | GET, POST         | Get/update user preferences                 |
| /api/compliance                 | GET, POST         | Get/update compliance data                  |
| /api/email-templates            | GET, POST         | List/create email templates                 |
| /api/email-templates/:id        | DELETE            | Delete an email template                    |
| /api/notifications              | GET, POST         | List/mark notifications                     |
| /api/notifications/mark-all-read| POST              | Mark all notifications as read              |
| /api/audit-logs                 | GET               | Get audit logs                              |
| /api/seo                        | GET, POST         | Get/update SEO settings                     |
| /api/profile                    | GET, PUT, DELETE  | Get/update/delete user profile              |
| /api/usage                      | GET               | Get usage analytics                         |

---

- For request/response schemas, see `/backend/types/app/`.
- For usage, see [API_USAGE.md](./API_USAGE.md).
- For the full contract, see [frontend backend contract map.md](../frontend%20backend%20contract%20map.md). 