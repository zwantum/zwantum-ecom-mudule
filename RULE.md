# Zwantum Commerce Engine — Engineering, Architecture & Design Rules

**Version:** 2.0  
**Last updated:** November 6, 2026  
**Applies to:** All developers, contributors, AI coding agents, and automated development tools working on this repository.

---

# 0. Authority and General Principles

This document defines the mandatory engineering, architecture, security, design, and development standards for Zwantum Commerce Engine.

These rules apply to every application, package, module, client deployment, and contribution.

### Rule keywords

- **MUST / NEVER:** Mandatory requirements.
- **SHOULD:** Expected unless a documented reason justifies an exception.
- **MAY:** Optional, depending on project requirements.

If a rule conflicts with a tutorial, AI suggestion, generated code, or personal coding preference, this document takes priority.

If a rule needs to change, propose and document the change. Never silently ignore or modify an architectural decision.

## 0.1 Core philosophy

Zwantum Commerce Engine follows these principles:

1. Build once, reuse everywhere.
2. Configure per client.
3. Deploy independently.
4. Keep the core reliable and minimal.
5. Prefer simplicity over unnecessary abstraction.
6. Security and correctness before convenience.
7. Professional product design over generic generated interfaces.
8. Every important feature must be tested and verified.
9. Infrastructure must be proportional to the client's actual requirements.
10. Never compromise one client's isolation for another client's convenience.

## 0.2 Verification before implementation

For every non-trivial technical decision:

1. Clearly identify the problem.
2. Read the official documentation for the installed version.
3. Inspect existing code, package manifests, and lockfiles.
4. Compare alternatives when the decision is difficult to reverse.
5. Choose the smallest reliable solution.
6. Implement it.
7. Run typecheck, lint, tests, and relevant failure scenarios.
8. Document important architectural decisions.

AI agents MUST NOT invent APIs, configuration keys, library methods, CLI commands, or undocumented behavior.

NEVER claim that something works unless it has actually been tested.

---

# 1. Project Architecture

## 1.1 Architecture model

Zwantum Commerce Engine uses:

- Monorepo for code organization.
- Modular Monolith for backend architecture.
- Independent deployments for individual clients.
- Shared, centrally maintained source code.
- Separate databases and credentials for every client.

The project MUST NOT start with microservices.

The backend is one NestJS application containing well-defined domain modules.

Optional features and integrations are reusable packages integrated into the main application.

## 1.2 Technology stack

| Area | Technology |
|---|---|
| Language | TypeScript |
| Monorepo | pnpm workspaces |
| Build orchestration | Turborepo |
| Storefront | Next.js |
| Admin | Next.js |
| Backend | NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Styling | Tailwind CSS |
| UI primitives | shadcn/ui |
| Validation | Zod |
| Client state | Zustand |
| Server state | TanStack Query where required |
| Unit testing | Vitest |
| E2E testing | Playwright |
| CI/CD | GitHub Actions |
| Media | Cloudinary or S3-compatible storage |
| Private packages | GitHub Packages when publishing is needed |

Use current stable, compatible versions and verify their official documentation before installation.

## 1.3 Approved repository organization

The repository is organized around:

- `apps/storefront`
- `apps/admin`
- `apps/api`
- `packages/commerce-core`
- `packages/module-sdk`
- `packages/shared-types`
- `packages/validation`
- `packages/database`
- `packages/auth`
- `packages/ui`
- `packages/storefront-core`
- `packages/theme-contract`
- `packages/themes`
- `packages/payment-contract`
- `packages/payments`
- `packages/shipping-contract`
- `packages/shipping`
- `packages/modules`

Documentation belongs in `docs/`.

New packages MUST have a clear purpose and ownership. Do not create packages merely to make the repository appear more modular.

## 1.4 Backend boundaries

The NestJS backend follows:

**Controller → Service → Repository → Database**

- Controllers handle HTTP concerns.
- Services contain business rules.
- Repositories handle persistence.
- DTOs and schemas validate external input.
- Domain events handle important cross-module side effects.

Controllers MUST NOT directly execute Prisma queries.

Business rules MUST NOT depend on Express request objects.

Modules MUST NOT access another module's internal repository or database tables directly.

## 1.5 Architecture decision records

Important architectural choices MUST be documented in `docs/decisions/`.

Each decision should explain:

- Context and problem.
- Available options.
- Selected approach.
- Reasons for the decision.
- Consequences and trade-offs.
- Official references where applicable.

---

# 2. Multi-Client Architecture

## 2.1 Independent client deployments

Each client receives an independently configured deployment.

Every client MUST have:

- Its own storefront deployment.
- Its own admin deployment.
- Its own API deployment.
- Its own PostgreSQL database.
- Its own database credentials.
- Its own authentication secrets.
- Its own payment credentials.
- Its own shipping credentials.
- Its own domain and environment configuration.
- Its own media storage configuration or isolated storage namespace.

Sharing source code does not mean sharing customer data or runtime infrastructure.

## 2.2 No accidental cross-client access

A client deployment MUST NOT access another client's:

- Customers.
- Orders.
- Products.
- Inventory.
- Payment records.
- Authentication sessions.
- Secrets.
- Uploaded private files.

Isolation MUST be tested automatically.

A client-specific configuration MUST NOT require modifying shared core source code.

## 2.3 Provisioning

Initially, client deployments MAY be provisioned manually using documented repeatable steps.

Automated provisioning and a central control plane can be introduced later.

Do not build a complicated provisioning platform before the first complete client store is working.

---

# 3. Optional Infrastructure and Redis Policy

## 3.1 Redis is optional

Redis is NOT a mandatory dependency of Zwantum Commerce Engine.

The default infrastructure MUST work without Redis.

PostgreSQL is the primary database and the initial source of truth for commerce data.

Redis MAY be introduced:

- Globally for a specific deployment where justified.
- For an individual client that requires it.
- For a particular optional module or workload.
- For a future deployment with measurable performance or operational requirements.

One client's Redis requirement MUST NOT force every client to use Redis.

## 3.2 Client-specific infrastructure

Every client deployment must have an explicit infrastructure profile.

Example:

| Infrastructure | Client A | Client B |
|---|---|---|
| PostgreSQL | Required | Required |
| Redis | Not required | Enabled |
| Background worker | Basic worker | Queue worker |
| Payment integration | Razorpay | Cashfree |
| Shipping | Shiprocket | Custom provider |

Each client pays for and operates only the infrastructure required by its configuration.

## 3.3 Redis adoption criteria

Introduce Redis only when there is a justified need, such as:

- Distributed rate limiting.
- High-volume caching.
- BullMQ or another Redis-backed queue.
- Distributed coordination.
- Workloads that cannot be handled reliably by the existing database-backed approach.

Do not add Redis merely because it is commonly used in modern applications.

## 3.4 Infrastructure abstraction

Redis-dependent functionality MUST be isolated behind interfaces or infrastructure adapters.

Core commerce business logic MUST NOT directly depend on Redis commands.

A Redis-dependent optional feature must:

- Declare Redis as an infrastructure requirement.
- Validate its configuration.
- Have documented startup and failure behavior.
- Be independently enabled or disabled per client.
- Never silently pretend to work when its required infrastructure is unavailable.

If a feature cannot operate safely without Redis, fail clearly rather than silently falling back to unreliable in-memory behavior.

## 3.5 Initial infrastructure

Start with:

- PostgreSQL.
- Prisma.
- A persistent NestJS API.
- Database-backed sessions.
- Database-backed idempotency.
- Transactional outbox.
- A simple database-backed worker when background processing is required.
- PostgreSQL full-text search.

Do not introduce Redis, Kafka, RabbitMQ, Elasticsearch, or microservices without a documented reason.

---

# 4. Professional UI/UX Design Standards

**The interface must look intentionally designed by an experienced product designer, not automatically assembled by an AI coding tool.**

Visual quality is a product requirement, not a finishing task.

## 4.1 Design before coding

Before building a new page or major component:

1. Understand the business and user.
2. Identify the page's primary purpose.
3. Review the client's brand and visual identity.
4. Define typography, color, spacing, and layout.
5. Review relevant design references when provided.
6. Create a rough layout or wireframe.
7. Implement only after the direction is clear.

Do not immediately generate JSX from a vague instruction.

## 4.2 Avoid generic AI-generated UI

The following patterns are prohibited as default design choices:

- Generic hero sections followed by three feature cards.
- Identical rounded cards repeated throughout every page.
- Purple-to-blue gradient backgrounds.
- Decorative gradient text.
- Aurora backgrounds and mesh gradients.
- Random blurred glowing circles.
- Excessive glassmorphism.
- Excessive floating shadows.
- Emoji used as interface icons.
- Decorative sparkle or magic-wand icons.
- Random floating badges.
- Excessive pill-shaped labels.
- Unnecessary uppercase eyebrow text.
- Arbitrary large empty spaces.
- Centering every heading and paragraph.
- Repetitive fade-and-slide animations.
- Random decorative lines, dots, and shapes.
- Generic illustrations unrelated to the business.
- Fake charts, fabricated statistics, and invented testimonials.

These techniques MAY be used only when they serve a clearly justified design concept and the client explicitly requires them.

## 4.3 Design originality

Every storefront must reflect its client's identity.

A saree store, electronics store, furniture business, cosmetics brand, and grocery store MUST NOT share the same visual layout merely because they use the same engine.

Reuse the underlying components and design system, not the entire visual identity.

Different clients may have different:

- Typography.
- Color systems.
- Product presentation.
- Navigation patterns.
- Homepage layouts.
- Photography direction.
- Brand personality.
- Component variants.

The result should feel like a purpose-built online store rather than a reskinned template.

## 4.4 Typography

- Use one or two carefully selected font families.
- Establish a consistent type scale.
- Define heading, body, caption, label, and price styles.
- Avoid excessive font weights.
- Avoid decorative fonts for important information.
- Keep text readable on mobile.
- Use tabular figures for prices and numerical tables.
- Support Devanagari and other Indic scripts when the client enables those languages.

Typography must establish a clear hierarchy.

## 4.5 Color system

All visual colors MUST come from design tokens.

Use three levels:

1. Primitive tokens.
2. Semantic tokens.
3. Component tokens when required.

Example semantic tokens:

- Background.
- Surface.
- Primary text.
- Secondary text.
- Border.
- Brand accent.
- Success.
- Warning.
- Danger.
- Information.

Do not scatter raw hex values across components.

Do not assume every client needs a white background, black text, and one colored button.

Maintain sufficient contrast and test every client theme.

## 4.6 Layout and spacing

- Follow a consistent spacing scale.
- Use alignment intentionally.
- Prefer meaningful whitespace over decorative boxes.
- Use grid and flex layouts according to content needs.
- Avoid making every section a card.
- Use borders and shadows only where they communicate hierarchy.
- Maintain consistent content widths.
- Design mobile layouts deliberately rather than shrinking desktop layouts.

## 4.7 Components

Before creating a component:

1. Search the shared UI package.
2. Search the current module.
3. Reuse or extend existing components if appropriate.
4. Create a new component only when its purpose is distinct.

Never create `ButtonV2`, `CardNew`, `ProductCardCopy`, or similar duplicate components.

Shared components MUST NOT contain business-specific data fetching or domain logic.

Every interactive component must implement appropriate:

- Default state.
- Hover state.
- Focus-visible state.
- Active state.
- Disabled state.
- Loading state.
- Error state.
- Empty or selected state where relevant.

## 4.8 Icons

- Use Lucide icons consistently unless the design system requires another icon family.
- Maintain consistent icon sizing and stroke weight.
- Never use emoji as interface icons.
- Icon-only controls must have accessible labels.
- Do not place icons everywhere simply for decoration.

## 4.9 Imagery

- Use genuine, relevant product and brand photography.
- Maintain consistent image aspect ratios.
- Prevent image layout shifts.
- Use meaningful alt text.
- Use `next/image` appropriately.
- Avoid random stock images that do not match the brand.
- Never fabricate product imagery or claim that a placeholder is real product photography.

## 4.10 Motion and interaction

Motion must communicate a meaningful state change.

Allowed examples:

- Opening a drawer.
- Adding an item to cart.
- Switching tabs.
- Expanding product details.
- Confirming a successful action.
- Showing validation feedback.

Avoid unnecessary animations on every component.

Respect `prefers-reduced-motion`.

Do not use autoplay carousels without pause controls.

## 4.11 Design references

When the user provides screenshots, websites, videos, or design references:

- Study the actual reference.
- Identify its layout, typography, spacing, interactions, and motion.
- Recreate the requested characteristics accurately.
- Do not copy unrelated sections.
- Do not change existing content unless requested.
- Do not substitute a generic interpretation for a specific reference.

## 4.12 Final UI quality

Before completing a page, inspect it at:

- 360px mobile.
- 768px tablet.
- 1280px desktop.
- Larger desktop widths where relevant.

Check:

- Alignment.
- Typography.
- Spacing.
- Responsive behavior.
- Image quality.
- Loading states.
- Empty states.
- Error states.
- Keyboard navigation.
- Visual consistency.

The page is not complete merely because it compiles.

---

# 5. Responsive Design and Accessibility

- Mobile-first design is mandatory.
- No horizontal page scrolling.
- Primary touch targets should be at least 44px where practical.
- All controls must be keyboard accessible.
- Use semantic HTML.
- Provide visible focus indicators.
- Use correct heading hierarchy.
- Every form field needs a programmatic label.
- Images need appropriate alt text.
- Dynamic updates must be announced accessibly.
- Support 200% zoom and narrow screens.
- Do not rely on color alone to communicate state.
- Target WCAG 2.2 AA.

Accessibility checks must be included in critical Playwright flows.

---

# 6. Storefront Commerce UX

## 6.1 Product pages

Every product page should support the relevant combination of:

- Product gallery.
- Product variants.
- SKU.
- Price and MRP.
- Real discount calculation.
- Stock availability.
- Delivery estimate.
- PIN-code serviceability.
- Shipping cost.
- COD availability.
- Return policy.
- Specifications.
- Size guides or product-specific information.

Never display invented stock, discounts, ratings, or availability.

## 6.2 Cart

- Editable quantities.
- Remove and restore where practical.
- Subtotal.
- Discounts.
- Shipping.
- Taxes.
- Final total.
- Clear stock and price change messages.

The server is the authority for all financial calculations.

## 6.3 Checkout

- Guest checkout should be supported.
- Keep checkout fields minimal.
- Preserve customer input after validation errors.
- Support Indian addresses.
- Display available payment methods accurately.
- Explain COD fees and limitations.
- Preserve the cart after payment failure.
- Allow safe retry and alternate payment methods.
- Show a complete order confirmation.

## 6.4 Post-purchase

Support appropriate flows for:

- Order tracking.
- Cancellation.
- Return eligibility.
- Refunds.
- Exchanges.
- Partial fulfilment.
- Customer notifications.

Do not use dark patterns or hide important charges and policies.

---

# 7. India-First Commerce Requirements

Zwantum Commerce Engine is India-first, but must remain extensible for international markets.

## 7.1 Currency and money

- INR is the default currency for Indian client stores.
- Store money using integer minor units (paise) or an explicitly documented exact decimal representation.
- NEVER use floating-point arithmetic for financial calculations.
- Always store the currency code.
- Use locale-aware formatting such as `en-IN`.
- Keep calculation and rounding rules consistent.

## 7.2 GST and taxation

The taxation system must support:

- GSTIN.
- HSN and SAC.
- CGST.
- SGST.
- IGST.
- Place of supply.
- Tax-inclusive and tax-exclusive pricing.
- Tax exemptions where legally applicable.
- GST invoices.
- Credit notes.
- Debit notes.
- Configurable tax rates and rules.

Tax rules must be data-driven, versioned where necessary, and verified against current applicable regulations.

Do not hardcode legal thresholds or assume every client has identical tax obligations.

## 7.3 Indian addresses

Support:

- Full name.
- Indian mobile number.
- PIN code.
- State.
- District where required.
- City.
- Address lines.
- Locality.
- Optional landmark.

PIN-code lookup may assist address completion, but users must be able to correct their address.

## 7.4 Payments

Provider integrations may include:

- Razorpay.
- Cashfree.
- UPI.
- Cards.
- Net banking.
- Wallets where supported.
- COD.
- Refunds.
- Partial refunds.

Never collect UPI PINs, card CVVs, or full card numbers.

Payment provider capabilities and current terms must be verified before implementation.

## 7.5 Shipping

Shipping architecture must allow:

- PIN-code serviceability.
- Rate calculation.
- Shipment creation.
- Shipping labels.
- Tracking.
- NDR.
- RTO.
- Cancellation.
- Reverse pickup.
- COD handling.

Provider adapters must implement shared contracts.

## 7.6 Indian business compliance

Consider applicable requirements for:

- Consumer protection.
- DPDP Act.
- GST.
- E-invoicing and e-way bills where applicable.
- Product-specific legal requirements.
- Business policies and disclosures.

Obtain qualified legal or tax advice for compliance decisions. Engineering rules do not replace legal review.

---

# 8. Frontend Engineering

## 8.1 Next.js

- Use App Router.
- React Server Components by default.
- Use client components only where interactivity requires them.
- Keep client components small.
- Use `next/image` and `next/font`.
- Use server-side data fetching appropriately.
- Never expose private environment variables to browser code.

## 8.2 State management

- TanStack Query or server-side fetching for server data.
- Zustand for genuine client-side UI state.
- Never duplicate server state unnecessarily in Zustand.
- Never trust client state for prices, stock, permissions, or discounts.

## 8.3 Forms and validation

- Use Zod schemas.
- Establish one consistent form approach.
- Validate on the client for usability.
- Validate again on the server.
- Preserve entered values after errors.
- Display clear, actionable validation messages.

## 8.4 Performance

Set measurable budgets and test on representative mid-range devices.

Initial Core Web Vitals targets:

- LCP: 2.5 seconds or better.
- INP: 200 milliseconds or better.
- CLS: 0.1 or better.

Optimize based on measurement rather than unnecessary premature optimization.

---

# 9. Reuse and Package Boundaries

## 9.1 Three component levels

**Shared UI:** Buttons, inputs, dialogs, tables, form fields and other generic components.

**Module UI:** Product cards, order timelines, inventory tables and module-specific components.

**Local UI:** Components used by one route or page.

Do not put business-specific components into the shared UI package.

## 9.2 Module independence

Each optional module must have:

- A manifest.
- Version information.
- Configuration schema.
- Required permissions.
- Public entry point.
- Backend registration.
- Admin integration where required.
- Database migrations where required.
- Tests.
- Compatibility information.

Optional modules must not be mandatory imports of the core engine.

## 9.3 Development lifecycle

1. Develop inside the monorepo.
2. Use `workspace:*` dependencies.
3. Integrate into the host API.
4. Test backend and frontend integration.
5. Verify permissions and configuration.
6. Build the package.
7. Test a packed `.tgz` outside the workspace.
8. Publish stable packages to GitHub Packages when necessary.
9. Pin client package versions.
10. Use controlled upgrades and documented recovery procedures.

Not every module needs to be published.

Client-specific modules may remain internal.

## 9.4 Avoid premature SDK development

Do not build an elaborate module SDK before a real optional module demonstrates what the SDK needs.

Use the first optional module, such as Wishlist, to validate the module lifecycle.

---

# 10. Backend and API Standards

## 10.1 API conventions

- REST API under `/v1`.
- Resource-oriented routes.
- Explicit request and response DTOs.
- Consistent error format.
- Stable machine-readable error codes.
- Request IDs.
- Server-side pagination.
- Allowlisted sorting and filtering.
- OpenAPI documentation.

Never return Prisma entities directly.

## 10.2 Business logic

Business rules belong in services or domain logic.

Controllers must not contain complicated commerce calculations.

Never trust client-provided:

- Prices.
- Discounts.
- Tax totals.
- Stock quantities.
- Permissions.
- Store ownership.
- Payment status.

## 10.3 Domain events

Important side effects should use domain events and an outbox pattern where reliable delivery is needed.

Examples:

- Order placed.
- Payment confirmed.
- Inventory reserved.
- Shipment created.
- Refund completed.

Avoid making unrelated modules tightly dependent on each other.

---

# 11. Authentication and Authorization

## 11.1 Authentication

Customers and administrative users must use separate authentication realms and policies.

Admin authentication must support MFA.

Choose a well-maintained authentication approach and verify its security properties before implementation.

Do not write cryptography from memory.

## 11.2 Sessions

For first-party web applications, prefer secure server-side sessions where appropriate.

- Use high-entropy session identifiers.
- Store only hashed identifiers.
- Use HttpOnly and Secure cookies.
- Apply appropriate SameSite policies.
- Enforce idle and absolute expiration.
- Revoke sessions server-side.
- Rotate sessions after privilege changes.
- Never store authentication tokens in localStorage.
- Protect cookie-authenticated mutations against CSRF.

## 11.3 Authorization

- Deny by default.
- Use permission-based RBAC.
- Check authorization in the backend.
- Verify ownership in database queries.
- Enforce store isolation.
- Do not rely on frontend hiding or Next.js middleware alone.
- Log sensitive administrative actions.

---

# 12. Application and Data Security

## 12.1 Input validation

Validate:

- Request bodies.
- Query parameters.
- Route parameters.
- Headers.
- Cookies.
- Webhook payloads.
- Environment variables.
- Third-party API responses.

Reject unexpected fields where appropriate.

Never pass unvalidated request bodies directly into Prisma.

## 12.2 Database security

- Use parameterized queries.
- Avoid unsafe raw SQL.
- Use least-privilege database credentials.
- Enforce uniqueness and referential integrity in the database.
- Use transactions for multi-step financial and inventory operations.
- Index real production query patterns.
- Avoid N+1 queries.

## 12.3 Secrets

- No credentials in source code.
- No secrets in browser bundles.
- No secrets in logs.
- Use secret managers or secure deployment environment variables.
- Separate credentials per client.
- Rotate exposed credentials immediately.
- Encrypt sensitive third-party credentials at rest.

## 12.4 Uploads

- Validate actual file content.
- Restrict file sizes and types.
- Generate random storage names.
- Store files outside the application filesystem.
- Use signed URLs for private files.
- Sanitize images and documents where appropriate.
- Prevent SSRF through remote image or URL imports.

## 12.5 Data privacy

- Collect only necessary personal information.
- Establish retention policies.
- Support applicable data access, correction, export and deletion requirements.
- Redact personal information from logs.
- Maintain administrative audit trails.
- Design with applicable Indian DPDP obligations in mind.

---

# 13. Commerce Correctness

## 13.1 Money and pricing

- Server calculates all totals.
- Use exact arithmetic.
- Define rounding rules.
- Recalculate at checkout.
- Record the price and tax snapshot needed for historical order accuracy.
- Never silently change a customer's payable total.

## 13.2 Inventory

- Prevent overselling through atomic database operations.
- Use transactions where necessary.
- Reserve stock with explicit expiration.
- Release expired reservations.
- Record inventory movements.
- Make concurrent checkout a tested scenario.

## 13.3 Order state

Orders, payments, shipments and returns must have explicit state machines.

Illegal state transitions must be rejected.

Payment status and order status must remain separate.

Every important transition must be recorded.

## 13.4 Discounts

- Validate coupons on the server.
- Define stacking rules.
- Define usage limits.
- Define eligibility.
- Define validity periods.
- Never show a discount unless it is real and applicable.

## 13.5 Payments and webhooks

- Verify provider signatures.
- Use raw request bodies where required by the provider.
- Validate amount, currency and order reference.
- Handle duplicate and out-of-order webhooks.
- Store provider event IDs with unique constraints.
- Use idempotent processing.
- Reconcile uncertain payment states.
- Never mark an order paid from a browser redirect alone.

## 13.6 Idempotency

Retryable mutations must support idempotency.

Store the idempotency key, request hash and result under a unique constraint.

A reused key with a different payload must be rejected.

---

# 14. Background Processing and Queues

## 14.1 Initial approach

Start with PostgreSQL transactions and a transactional outbox.

A database-backed worker may handle initial tasks such as:

- Email notifications.
- Payment reconciliation.
- Reservation expiration.
- Shipment synchronization.
- Scheduled maintenance.

## 14.2 Queue adoption

Use Redis-backed queues such as BullMQ only when the operational requirements justify them.

A queue must have:

- Retry limits.
- Exponential backoff.
- Idempotent jobs.
- Failure handling.
- Dead-letter or equivalent recovery.
- Monitoring.
- Per-client configuration.

Do not make queue infrastructure mandatory for clients who do not need it.

---

# 15. Testing Standards

Testing is part of implementation, not a final phase.

## 15.1 Unit testing

Test:

- Money calculations.
- Tax calculations.
- Discounts.
- Permissions.
- State transitions.
- Inventory rules.
- Provider adapters.

## 15.2 Integration testing

Use real PostgreSQL test environments where appropriate.

Test:

- Transactions.
- Database constraints.
- Migrations.
- Webhook processing.
- Inventory concurrency.
- Authentication and authorization.

## 15.3 End-to-end testing

Use Playwright for critical flows:

- Product browsing.
- Product selection.
- Cart.
- Checkout.
- Payment success.
- Payment failure and retry.
- Order tracking.
- Admin product management.
- Refunds and cancellations where implemented.

Test mobile and desktop layouts.

## 15.4 Multi-client testing

Tests must verify that one client's credentials cannot access another client's data or APIs.

## 15.5 Negative testing

Test:

- Invalid inputs.
- Missing permissions.
- Expired sessions.
- Duplicate requests.
- Replayed webhooks.
- Insufficient stock.
- Simultaneous purchases.
- Failed payments.
- Missing optional infrastructure.
- Provider downtime.

---

# 16. Dependency Management

Before adding a dependency, verify:

- Is it actually needed?
- Does the platform already provide this functionality?
- Is it maintained?
- Does it have unresolved security issues?
- Is the license compatible with commercial white-label distribution?
- Does it introduce unnecessary dependencies?
- Does it increase frontend bundle size?
- Is there a simpler alternative?

Rules:

- Commit the lockfile.
- Use workspace dependencies where appropriate.
- Review dependency installation scripts.
- Keep versions compatible.
- Use automated dependency update tools.
- Wrap third-party integrations behind internal contracts.

Do not add dependencies just because an AI agent recommends them.

---

# 17. Performance and Operations

Every production client deployment must have:

- Health checks.
- Error monitoring.
- Structured logging.
- Database backups.
- Tested restore procedures.
- Uptime monitoring.
- Secure environment configuration.
- Migration management.
- Deployment rollback or forward-recovery procedures.
- Resource monitoring.

Use separate development, staging and production environments.

Production migrations MUST use the approved migration deployment process.

Never use `prisma migrate dev` or `prisma db push` as the production migration strategy.

Migrations should be backward-compatible wherever practical.

API and database should ideally operate in the same geographic region to reduce latency.

---

# 18. UI Copy and Content Quality

- Use clear, human language.
- Avoid generic marketing copy.
- Avoid exaggerated claims.
- Never fabricate customer reviews or testimonials.
- Never fabricate sales numbers.
- Never invent product specifications.
- Never invent stock availability.
- Never use fake countdowns or fake scarcity.
- Keep terminology consistent.
- Use sentence case.
- Write error messages that explain what happened and how to resolve it.
- Localize currency, dates and numbers correctly.

The UI should communicate the actual product and business, not generic marketing language.

---

# 19. AI Coding Agent Rules

These rules apply to Antigravity, Claude Code, Cursor, and any other AI coding agent.

## 19.1 Before making changes

The agent MUST:

1. Inspect the repository.
2. Read `RULES.md`.
3. Read relevant architecture documentation.
4. Inspect existing implementations.
5. Understand the affected module and its dependencies.
6. Identify possible breaking changes.
7. Create a short implementation plan for significant tasks.

## 19.2 During implementation

The agent MUST:

- Follow the approved architecture.
- Reuse existing components and utilities.
- Make targeted changes.
- Preserve working functionality.
- Follow established naming conventions.
- Verify library APIs against official documentation.
- Use real integrations rather than fabricated implementations.
- Keep code readable and maintainable.
- Avoid unnecessary abstractions.
- Avoid unrelated changes.

The agent MUST NEVER:

- Rewrite an entire file unnecessarily.
- Delete existing functionality without approval.
- Change the architecture silently.
- Introduce fake API responses as real integrations.
- Hardcode credentials.
- Add insecure temporary implementations.
- Create unnecessary dependencies.
- Add dummy data to production functionality.
- Mark unverified tasks as complete.
- Modify `RULES.md` without explicit approval.

## 19.3 After implementation

The agent must report:

1. Files created.
2. Files modified.
3. Dependencies added or removed.
4. Architectural decisions made.
5. Tests executed.
6. Tests not executed.
7. Known issues.
8. Any remaining work.

Documentation must be updated when implementation changes architecture or established behavior.

---

# 20. Pull Request and Definition of Done

A feature is complete only when all applicable requirements are satisfied.

### Architecture
- [ ] Existing architecture followed.
- [ ] No unnecessary abstractions.
- [ ] Module boundaries respected.
- [ ] No circular dependencies.
- [ ] Client isolation preserved.

### UI/UX
- [ ] Design direction reviewed.
- [ ] No generic generated UI patterns.
- [ ] Design tokens used.
- [ ] Responsive layouts checked.
- [ ] All interactive states implemented.
- [ ] Accessibility checked.
- [ ] Empty, loading and error states implemented.
- [ ] Real content and accurate information used.

### Backend
- [ ] Input validation implemented.
- [ ] Business logic stays in appropriate services.
- [ ] Authorization implemented.
- [ ] Ownership and client isolation enforced.
- [ ] Explicit response DTOs used.
- [ ] Errors handled consistently.

### Commerce
- [ ] Financial calculations are exact.
- [ ] Inventory concurrency considered.
- [ ] Payment state transitions validated.
- [ ] Webhooks verified.
- [ ] Retry behavior is safe.
- [ ] Audit records added where required.

### Security
- [ ] No secrets committed.
- [ ] No sensitive data exposed.
- [ ] Negative scenarios tested.
- [ ] Permissions verified.
- [ ] Dependencies reviewed.

### Verification
- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Relevant tests pass.
- [ ] Build succeeds.
- [ ] Documentation updated.
- [ ] Actual verification results reported.

---

# 21. Architecture Authority and Conflict Resolution

The project's documents have the following responsibilities:

| Document | Authority |
|---|---|
| `RULES.md` | Engineering, security, design and development standards |
| `README.md` | Project overview and approved high-level architecture |
| `docs/ARCHITECTURE.md` | Detailed technical architecture |
| `docs/ROADMAP.md` | Approved implementation sequence |
| `docs/decisions/` | Recorded architectural decisions |
| Module documentation | Module-specific behavior and requirements |

If documents conflict:

1. Stop the affected implementation.
2. Identify the conflicting statements.
3. Explain the technical consequences.
4. Ask for clarification if the conflict changes architecture or behavior.
5. Update the appropriate documentation after approval.

Never silently choose a new architecture.

---

# 22. Final Guiding Principle

Zwantum Commerce Engine is intended to become a reliable, professional, extensible commerce platform.

The objective is not to create the largest architecture, the most dependencies, or the most visually complicated interface.

The objective is to create a platform that:

- Works reliably.
- Looks professionally designed.
- Protects client and customer data.
- Handles commerce transactions correctly.
- Supports Indian business requirements.
- Remains maintainable for a small engineering team.
- Allows each client to use only the infrastructure it needs.
- Can grow without unnecessary architectural rewrites.

**Build with discipline. Design with intention. Engineer for reliability. Reuse with purpose.**

**Build once. Reuse everywhere. Configure per client. Deploy independently.**