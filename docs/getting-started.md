# Getting Started (Backend)

Welcome to the VibeKit backend! The backend code is now located in `/backend`. This guide will help you get up and running quickly with the backend only.

---

## Prerequisites
- Node.js (see `.nvmrc` or `package.json` for version)
- PostgreSQL database
- (Optional) Redis for distributed rate limiting

---

## 1. Install Dependencies
```sh
npm install
```

---

## 2. Environment Setup
- Copy `/backend/.env.example` to `/backend/.env.local` and fill in required values.
- See [env-vars.md](./env-vars.md) for details on each variable.

---

## 3. Database Migration
- Run migrations to set up your database schema:
```sh
npm run db:migrate
```
- See [database.md](./database.md) for more info.

---

## 4. Running the Backend
```sh
npm run dev:backend
```
- The API will be available at `http://localhost:3000/api/`

---

## 5. Testing
- Run all backend tests:
```sh
npm run test:backend
```
- See [testing.md](./testing.md) for more info.

---

For more details, see the [Backend Overview](./BACKEND_OVERVIEW.md). 