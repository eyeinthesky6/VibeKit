Component: FeatureMatrix
- expects: list of feature flags (id, name, enabled)

Component: PageBuilder
- expects: page object (title, slug, blocks), support create/edit/delete

Component: AnalyticsDashboard
- expects: metrics (visits, conversions, users) over time

Component: FormBuilder
- expects: form schema, field rules, and conditional logic

Component: TeamManagement
- expects: team members (name, email, role), invite flow

Component: BillingPlan
- expects: active subscription status, Stripe session link

Component: ProfilePage
- expects: current user profile data (name, email, avatar)

Component: NotificationsDropdown
- expects: list of unread messages with title and timestamp

Component: AuditLogTable
- expects: action logs (user, action type, timestamp)

Component: SEOSettings
- expects: meta tags, sitemap config, robots.txt config
