# Zwantum Commerce: Security & Compliance Blueprint

## 1. Authentication & Session Management

- **Stateless Tokens:** JWTs issued with short expirations (e.g. 7 days for users, 15 minutes for access tokens with refresh rotation).
- **Password Security:** Salted Argon2id or bcrypt hashing with adequate work factors. Raw passwords are never logged or stored.
- **RBAC Enforcement:** NestJS guards inspect user roles (`RolesGuard`) and permissions before routing requests to handlers.

---

## 2. Webhook Authentication & Idempotency

Payment (Razorpay, Cashfree) and logistics (Shiprocket) webhooks must be verified before processing:

1. **HMAC Signature Verification:** Raw request buffer is validated against configured provider secret.
2. **Idempotency Strategy:** Every inbound webhook event ID is recorded in the database. Duplicate event deliveries are acknowledged with HTTP 200 without re-executing state changes.

---

## 3. Inventory Concurrency & Stock Overselling Protection

- Checkout processes must utilize database-level transactions with stock reservation timeouts.
- Concurrency locks prevent double-spending or overselling of limited inventory items during peak sales flash events.

---

## 4. Indian DPDP Act (Digital Personal Data Protection) Compliance

1. **Purpose Limitation:** Customer mobile numbers and addresses are used strictly for order fulfillment, tax invoicing, and logistics.
2. **Data Erasure & Anonymization:** Customers can request account deletion; past tax invoices are retained only for the legally mandated statutory period under GST regulations while PII is masked.
3. **No Unencrypted Storage:** All database backups, credential stores, and communication channels must enforce TLS 1.3 in transit and AES-256 at rest.
