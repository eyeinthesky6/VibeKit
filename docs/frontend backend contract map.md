# VibeKit Frontend → Backend Data Contract Map

authentication:
  endpoints:
    - POST /api/auth/login
    - POST /api/auth/signup
    - POST /api/auth/forgot-password
    - POST /api/auth/reset-password
    - GET /api/auth/session

organization:
  - GET /api/organizations
  - POST /api/organizations/switch
  - POST /api/teams/invite

featureFlags:
  - GET /api/feature-flags
  - POST /api/feature-flags/update

documents:
  - GET /api/pages
  - POST /api/pages
  - PUT /api/pages/:id
  - DELETE /api/pages/:id

analytics:
  - GET /api/analytics/summary
  - GET /api/analytics/export

billing:
  - GET /api/subscription
  - POST /api/checkout
  - POST /api/webhook/stripe

preferences:
  - GET /api/user/preferences
  - POST /api/user/preferences

compliance:
  - GET /api/compliance
  - POST /api/compliance

emailTemplates:
  - GET /api/email-templates
  - POST /api/email-templates
  - DELETE /api/email-templates/:id

notifications:
  - GET /api/notifications
  - POST /api/notifications/mark-all-read

auditLogs:
  - GET /api/audit-logs

seo:
  - GET /api/seo
  - POST /api/seo
