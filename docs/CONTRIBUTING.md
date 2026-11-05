# Zwantum Commerce: Contributing Guide

## 1. Two-Developer Team Workflow

With a focused two-developer engineering team, overhead is minimized while preserving high code quality and architectural integrity:

1. **Short-Lived Feature Branches:**
   - Prefix branches by type: `feat/order-checkout`, `fix/gst-rounding`, `chore/turbo-cache`.
   - Keep branch lifetimes under 2 days.
2. **Mandatory Peer Review:**
   - Every Pull Request requires review and approval from the peer engineer before merging into `main`.
3. **Continuous Integration (CI):**
   - GitHub Actions validates linting, formatting, typecheck, and unit tests on every pull request.

---

## 2. Commit Message Standards

Adhere to the **Conventional Commits** specification:

- `feat(api): add gst calculation to order preview`
- `fix(storefront): correct inr currency symbol rendering`
- `refactor(database): index order items by orderId and variantId`
- `docs(roadmap): update phase 1 deliverables`
- `test(core): add inter-state igst calculation test cases`

---

## 3. Pre-Commit Checklist

Before submitting a PR, verify locally:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
