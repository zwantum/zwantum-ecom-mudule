# Zwantum Commerce Engine: Architecture Blueprint

## 1. Architectural Philosophy

Zwantum Commerce Engine is engineered as a **reusable, white-label commerce platform** built from scratch without reliance on third-party commerce engines (such as Medusa or Vendure).

### Core Pillars

1. **Modular Monolith over Microservices:** All backend capabilities execute within a single, highly performant NestJS runtime. Modules communicate via clear internal interfaces without network hops, distributed transactions, or RPC overhead.
2. **Independent Client Deployments:** Rather than multi-tenant row isolation in a shared database, each merchant deployment runs against an isolated PostgreSQL instance. Client data, API credentials, and billing remain physically separated.
3. **India-First, Globally Extensible:** The engine is optimized out of the box for Indian tax laws (GST, HSN), local currencies (integer paise), address conventions (PIN code, state codes), payment ecosystems (UPI, Netbanking, COD), and courier aggregation (Shiprocket, NDR, RTO).
4. **Strict Monorepo Dependency Boundaries:** Workspace packages adhere to strict unidirectional dependencies, eliminating circular references and accidental couplings.

---

## 2. Monorepo Organization & Dependency Boundaries

```
[apps/storefront]    [apps/admin]        [apps/api]
       \                  |                 /
        \                 v                /
     [@zwantum/storefront-core]   [@zwantum/auth]
                 \        |        /
                  v       v       v
               [@zwantum/commerce-core]
                          |
                          v
               [@zwantum/validation]
                          |
                          v
              [@zwantum/shared-types]
```

### Workspace Layers

- **Domain Primitives (`@zwantum/shared-types`):** Zero runtime dependencies. Contains all cross-cutting interfaces, enums, and data contracts.
- **Validation (`@zwantum/validation`):** Zod runtime validation schemas for phone numbers (+91), PIN codes, GSTINs, and checkout objects.
- **Commerce Core (`@zwantum/commerce-core`):** Pure deterministic domain algorithms: paise arithmetic, GST tax engine, order status transitions, and COD eligibility checks.
- **Database (`@zwantum/database`):** Prisma ORM models, migration history, and pooled client management.
- **Contract Packages (`payment-contract`, `shipping-contract`, `theme-contract`, `module-sdk`):** Strict abstract interfaces defining how providers and modules plug into the engine.
- **Provider Adapters (`payments/razorpay`, `payments/cashfree`, `shipping/shiprocket`, `shipping/manual`):** Concrete implementations of provider contracts.
- **Applications (`apps/`):** Deployable runtimes consuming packages.

---

## 3. India-First Commerce Architecture

### 3.1 Money Representation: Integer Paise

All monetary values across the database, APIs, and client applications are represented strictly as **integer paise** (1 Rupee = 100 paise).

- Example: ₹499.00 is stored and transmitted as `49900`.
- Floating-point calculations are prohibited to prevent cumulative rounding discrepancies.

### 3.2 Goods & Services Tax (GST) Engine

Indian taxation requires distinct handling based on supply location:

- **Intra-state Supply (Seller State Code == Buyer State Code):**
  - CGST (Central GST) = 50% of applicable GST rate
  - SGST (State GST) = 50% of applicable GST rate
- **Inter-state Supply (Seller State Code != Buyer State Code):**
  - IGST (Integrated GST) = 100% of applicable GST rate
- **HSN/SAC Codes:** Goods (HSN) and Services (SAC) codes are attached to every catalog item and recorded in order item pricing snapshots for GST-compliant invoicing.

### 3.3 Cash on Delivery (COD) & Risk Mitigation

- Cash on Delivery accounts for a substantial volume of Indian retail orders.
- The engine implements configurable COD rules:
  - Maximum order ceiling (e.g., COD disallowed for orders above ₹5,000)
  - Optional COD convenience surcharge
  - PIN-code serviceability checks preventing COD orders to non-serviceable postal codes

### 3.4 Logistics, NDR, and RTO Handling

Integration with courier aggregators (such as Shiprocket) involves complex fulfillment states:

- **NDR (Non-Delivery Report):** Triggered when a delivery attempt fails (customer unavailable, incomplete address). The merchant dashboard surfaces NDR workflows for reattempt scheduling or address corrections.
- **RTO (Return to Origin):** Triggered when an NDR fails repeatedly or the customer refuses a COD package. Inventory state is updated upon physical warehouse receipt.

---

## 4. Extensibility for International Markets

While India is the first-class deployment target, the engine abstracts:

- Currency via ISO 4217 currency codes (`CurrencyCode`).
- Addresses via international address normalization schemas.
- Payment providers through `@zwantum/payment-contract`.
- Tax via extensible tax calculation strategies.
