# Backend Testing

This guide covers how to run, write, and extend backend tests for VibeKit.

---

## Running Tests
- All backend tests use Jest.
- To run all tests:
```sh
npm test
```

---

## Test Location
- Unit tests: `tests/` (one file per service/module)
- E2E tests: (optional, Playwright, add in `e2e/`)

---

## Adding New Tests
- Add a new `.spec.ts` file in `tests/` for each new service or handler.
- Use Jest's `describe` and `it` blocks.
- Mock dependencies as needed.

---

## Best Practices
- Cover all business logic and error cases.
- Use mocks for external services (e.g., Stripe, Supabase).
- Keep tests fast and isolated.

---

For more, see [BACKEND_OVERVIEW.md](./BACKEND_OVERVIEW.md). 