# Contributing Guide

Thank you for considering contributing to the VibeKit backend! This guide explains how to propose changes, follow code style, and ensure quality.

---

## 1. Proposing Changes
- Open an issue or discussion for major features or bugfixes
- Fork the repo and create a feature branch

---

## 2. Code Style & Patterns
- Follow the established folder structure and modular patterns (see [architecture.md](./architecture.md))
- Use TypeScript and Zod for all new code
- Add/extend types in `types/app/`
- Use `requireAuth` for protected endpoints

---

## 3. Pull Request Process
- Ensure all tests pass (`npm test`)
- Add/extend tests for new features (see [testing.md](./testing.md))
- Update or add documentation as needed
- Reference related issues in your PR description

---

## 4. Documentation
- Add or update docs in `docs/` for any new features or changes
- Cross-link to existing docs where relevant

---

## 5. Onboarding
- New contributors: start with [getting-started.md](./getting-started.md) and [BACKEND_STATE.md](./BACKEND_STATE.md)

---

For more, see [BACKEND_OVERVIEW.md](./BACKEND_OVERVIEW.md) and [README.md](../README.md). 