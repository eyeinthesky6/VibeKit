# Backend Deployment

This guide covers how to deploy the VibeKit backend to production.

---

## 1. Environment Setup
- Set all required environment variables (see [env-vars.md](./env-vars.md))
- Use `.env.example` as a template

---

## 2. Database Migration
- Run all migrations before starting the app:
```sh
npm run db:migrate
```
- See [database.md](./database.md) for more info

---

## 3. Build & Start
- Build the app:
```sh
npm run build
```
- Start the app:
```sh
npm start
```

---

## 4. Production Tips
- Use a secure, production-ready database and Redis instance
- Set `NODE_ENV=production`
- Monitor logs and errors (see Sentry integration)
- Test all flows in a staging environment before going live

---

For a full deployment guide, see [README.md](../README.md). 