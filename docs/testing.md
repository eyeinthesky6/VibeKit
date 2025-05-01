# Backend Testing

This guide covers how to run, write, and extend backend tests for VibeKit. The backend is now located in `/backend`.

---

## Running Tests
- All backend tests use Jest.
- To run all backend tests:
```sh
npm run test:backend
```

---

## Test Location
- Unit tests: `/backend/tests/` (one file per service/module)
- E2E tests: (optional, Playwright, add in `/frontend/e2e/`)

---

## Adding New Tests
- Add a new `.spec.ts` file in `/backend/tests/` for each new service or handler.
- Use Jest's `describe` and `it` blocks.
- Mock dependencies as needed.

---

## Best Practices
- Cover all business logic and error cases.
- Use mocks for external services (e.g., Stripe, Supabase).
- Keep tests fast and isolated.

---

For more, see [BACKEND_OVERVIEW.md](./BACKEND_OVERVIEW.md). 