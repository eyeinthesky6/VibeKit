# Database & Migrations

The VibeKit backend uses Drizzle ORM with PostgreSQL. The backend is now located in `/backend`. This guide covers schema location, migrations, and best practices.

---

## ORM & Schema
- **ORM:** Drizzle (see [architecture.md](./architecture.md))
- **Schema location:** `/backend/lib/db/schema/`
- **Migrations:** `/backend/lib/db/migrations/`

---

## Running Migrations
- To apply migrations:
```sh
npm run db:migrate
```
- Always test migrations in a staging environment before deploying to production.

---

## Best Practices
- Keep schema and migrations in sync.
- Use descriptive migration names.
- Review and test migrations before production.

---

For more, see [BACKEND_OVERVIEW.md](./BACKEND_OVERVIEW.md). 