# Zwantum Commerce: Client Deployment Blueprint

## 1. Deployment Model & Tenancy Architecture

Based on the architectural review, Zwantum Commerce adopts the **Centrally Owned Monorepo with Independent Client Deployments** pattern:

- **Centralized Source Code:** All client storefronts, admin dashboards, and APIs run off versioned releases of the central monorepo. Clients do not receive code forks.
- **Client Configuration Package / Environment:** Client identity, themes, enabled modules, payment credentials, and shipping secrets are supplied via environment variables and configuration objects.
- **Physical Data Isolation:** Every client has an independent PostgreSQL database. No client shares database connections, table rows, or caching keys with another client.

---

## 2. Infrastructure Topology

For optimal latency for Indian consumers and merchants, all services should reside in the **Mumbai (`ap-south-1`) region**:

```
[Customer Browser]               [Merchant Browser]
        |                                |
        v                                v
[Vercel / CloudFront]            [Vercel / CloudFront]
apps/storefront (Next.js)        apps/admin (Next.js)
        \                                /
         \                              /
          v                            v
   [Load Balancer / Reverse Proxy (Caddy / Nginx)]
                        |
                        v
         apps/api (Persistent NestJS Node.js)
                        |
                        v
     [Managed PostgreSQL (Mumbai - ap-south-1)]
```

---

## 3. Database Migration Strategy

- Each client deployment runs Prisma migrations against its specific database connection string:
  ```bash
  DATABASE_URL=postgresql://... pnpm --filter @zwantum/database prisma:migrate
  ```
- In production environments using connection poolers (such as PgBouncer), specify `DIRECT_URL` for migration execution to avoid transaction pooler lock issues.
- Support policy: Only the current and immediately preceding minor versions are supported simultaneously.
