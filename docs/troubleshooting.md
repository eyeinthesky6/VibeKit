# Troubleshooting Guide

This guide lists common backend issues, error messages, and how to resolve them.

---

## 1. Environment Variable Errors
- **Symptom:** App fails to start, or throws "Invalid or missing environment variables"
- **Solution:**
  - Check `.env.local` and [env-vars.md](./env-vars.md)
  - Ensure all required variables are set and valid

---

## 2. Database Migration Issues
- **Symptom:** Migration errors, missing tables, or schema mismatch
- **Solution:**
  - Run `npm run db:migrate`
  - Check [database.md](./database.md)
  - Review migration scripts in `lib/db/migrations/`

---

## 3. Auth/Session Problems
- **Symptom:** 401/403 errors from protected endpoints
- **Solution:**
  - Ensure you are authenticated (see [API_USAGE.md](./API_USAGE.md))
  - Check cookies/session setup

---

## 4. Rate Limiting
- **Symptom:** 429 errors, "Too many requests"
- **Solution:**
  - Wait for rate limit reset
  - Check Redis connection if using distributed rate limiting

---

## 5. Stripe/Supabase Integration
- **Symptom:** API errors related to payments or storage
- **Solution:**
  - Check relevant env vars
  - Review integration code in `lib/payments/` or `lib/db/supabase`

---

## 6. Test Failures
- **Symptom:** Jest or E2E tests fail
- **Solution:**
  - Check [testing.md](./testing.md)
  - Ensure test env vars are set
  - Review test mocks and setup

---

## 7. Where to Get Help
- Review logs and error messages
- Check all referenced docs ([BACKEND_OVERVIEW.md](./BACKEND_OVERVIEW.md), [README.md](../README.md))
- Ask in your team's support channel or open an issue 