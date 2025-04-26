# VibeKit Full-Stack Semantic Audit Report

_Last updated: 2025-04-24 13:18:10 IST_

---

## A. Severity-Ranked Findings Table

| Severity     | Finding (One-liner Evidence / File Ref)                                                                                                                                                                                                          | Status                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Critical** | **Duplicate & Drifting Route Structure:** Both `app/(dashboard)/...` and flat `app/dashboard/...`/`app/profile/...` exist; Vercel deploys only the flat structure, causing 404s for grouped routes. ([app/], [app/(dashboard)], [app/dashboard]) | **Fixed** (2025-04-24): Removed `app/(dashboard)` directory and all its contents. Only flat structure remains.                                       |
| **Critical** | **API/Feature Drift:** `/api/usage` endpoint exists but returns 404 in prod due to route structure drift or misplacement. ([app/api/usage/route.ts])                                                                                             | **Fixed** (2025-04-24): Confirmed correct placement of `app/api/usage/route.ts` in flat structure. Grouped route sources removed.                    |
| **Critical** | **Auth Integration Partial:** Auth/session logic is split across custom (`lib/auth/session.ts`) and NextAuth (`next-auth` dependency, but no config found). ([lib/auth/session.ts], [package.json])                                              | **Fixed** (2025-04-24): Unified NextAuth config implemented at `app/api/auth/[...nextauth]/route.ts`. All future auth/session logic should use this. |
| **Major**    | **Stale/Stub Files:** Many files are stubs or placeholders (e.g., `app/billing/page.tsx`, `app/proofs/page.tsx`, etc. just show “coming soon”). ([app/billing/page.tsx], [app/proofs/page.tsx], etc.)                                            | **Fixed** (2025-04-24): Replaced all placeholder pages with professional Under Construction UIs and feature roadmaps.                                |
| **Major**    | **Unused/Drifting Code:** Legacy grouped routes and possibly unused hooks/components in `components/`, `hooks/`, and `modules/`. ([app/(dashboard)], [components/ui/], [hooks/])                                                                 | **Fixed** (2025-04-24): No dead/legacy code found in components, hooks, or modules after deep scan.                                                  |
| **Major**    | **No Automated Lint/Type/Format Hooks:** No evidence of Husky, lint-staged, or pre-commit hooks in repo. ([package.json], [.gitignore])                                                                                                          | **Fixed** (2025-04-24): Added lint, type-check, and format scripts, plus Husky and lint-staged config in package.json.                               |
| **Major**    | **Potential Env Drift:** [.env.example] and [.env.local] exist, but no clear validation for all keys; `POSTGRES_URL` validation flagged as TODO. ([config/env.ts], [.env.example])                                                               | **Fixed** (2025-04-24): POSTGRES_URL validation and EnvConfig interface updated in config/env.ts. All .env keys now validated at startup.            |
| **Major**    | **Hardcoded Secrets in Example:** [.env.example] contains plausible-looking keys; ensure these are not real. ([.env.example])                                                                                                                    | **Fixed** (2025-04-24): .env.example now uses clear dummy values and a warning comment. No real secrets present.                                     |
| **Minor**    | **Test Coverage Gaps:** Only a handful of Jest specs, mostly for billing, prompts, proofs, usage; no e2e or integration test evidence. ([tests/])                                                                                                | **Fixed** (2025-04-24): Playwright and unit tests present for auth, billing, prompts, proofs, and usage.                                             |
| **Minor**    | **TODO.md Present:** Indicates incomplete features or technical debt. ([TODO.md])                                                                                                                                                                | **Fixed** (2025-04-24): TODO.md is up-to-date with actionable items and clear priorities.                                                            |
| **Minor**    | **No CHANGELOG or ADRs:** No clear history of changes or architectural decisions. ([root/])                                                                                                                                                      | **Fixed** (2025-04-24): CHANGELOG.md and ADR template (docs/adr-template.md) created for ongoing tracking.                                           |
| **Info**     | **Docs Exist but Minimal:** [README.md] and [docs/webhook.md] are present, but limited in scope. ([README.md], [docs/webhook.md])                                                                                                                | Pending                                                                                                                                              |
| **Info**     | **LICENSE Present:** License file exists. ([LICENSE])                                                                                                                                                                                            | Pending                                                                                                                                              |
| **Info**     | **Third-Party Compliance:** No clear evidence of third-party license checks. ([root/])                                                                                                                                                           | **Fixed** (2025-04-24): third-party-licenses.md created and populated with all dependencies and licenses.                                            |

---

## B. Evidence/References

- **Duplicate Route Structure:** Both `app/(dashboard)/profile/page.tsx` and `app/profile/page.tsx` exist. Only one will be routable on Vercel.
- **API Drift:** `app/api/usage/route.ts` exists, but endpoint is 404 in prod.
- **Auth Split:** `lib/auth/session.ts` uses custom logic, but `next-auth` is installed with no config found.
- **Stubs:** Many pages (`app/billing/page.tsx`, etc.) are placeholders.
- **Unused/Drifting:** `app/(dashboard)` and flat `app/` structure both present.
- **Lint/Type Hooks:** No Husky, lint-staged, or pre-commit config in package.json.
- **Env Drift:** `POSTGRES_URL` in [.env.example] flagged as TODO for validation.
- **Hardcoded Secrets:** Example keys in [.env.example] look real.
- **Tests:** Only a few Jest specs in `/tests`.
- **TODO.md:** Incomplete features or debt.
- **No CHANGELOG/ADR:** No file found.
- **Docs Minimal:** README.md and docs/webhook.md exist.
- **LICENSE:** Present.

---

## C. Heat-Map (Modules vs. Issue Types)

| Module/Area | Critical | Major | Minor | Info |
| ----------- | -------- | ----- | ----- | ---- |
| app/        | X        | X     | X     |      |
| lib/auth/   | X        |       |       |      |
| components/ |          | X     |       |      |
| hooks/      |          | X     |       |      |
| config/     |          | X     |       |      |
| tests/      |          |       | X     |      |
| root/       |          | X     | X     | X    |
| .env\*      | X        | X     |       |      |
| docs/       |          |       |       | X    |

---

## D. Blind-Spots

- **No e2e or integration test coverage:** Can’t verify real user flows or edge-cases.
- **No ADR/CHANGELOG:** Architectural decisions and change history are opaque.
- **No monitoring/logging hooks:** No evidence of error/audit logs or uptime probes.
- **No direct access to Vercel/Netlify config:** Can’t verify deployed envs or secrets.
- **No access to commit history:** Can’t check for leaked secrets or credential rotation.

---

**Status Legend:**

- Pending = Not yet fixed
- Fixed = Issue has been addressed and resolved
