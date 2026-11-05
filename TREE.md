ZWANTUM-ECOM-NEW/
├── .github/
│ └── workflows/
│ ├── ci.yml
│ └── lint.yml
├── apps/
│ ├── admin/
│ │ ├── src/
│ │ │ └── app/
│ │ │ ├── globals.css
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── next.config.mjs
│ │ ├── package.json
│ │ ├── postcss.config.mjs
│ │ ├── tailwind.config.ts
│ │ └── tsconfig.json
│ ├── api/
│ │ ├── src/
│ │ │ ├── common/
│ │ │ │ ├── decorators/ (roles.decorator.ts)
│ │ │ │ ├── filters/ (http-exception.filter.ts)
│ │ │ │ ├── guards/ (roles.guard.ts)
│ │ │ │ ├── interceptors/ (transform.interceptor.ts)
│ │ │ │ ├── middleware/ (request-id.middleware.ts)
│ │ │ │ └── pipes/ (zod-validation.pipe.ts)
│ │ │ ├── config/ (configuration.ts)
│ │ │ ├── health/ (health.controller.ts, health.module.ts)
│ │ │ ├── modules/ (21 feature modules: auth, users, customers, products,
│ │ │ │ categories, collections, inventory, cart, checkout,
│ │ │ │ orders, payments, shipping, discounts, tax, returns,
│ │ │ │ reviews, wishlist, notifications, media, search, settings)
│ │ │ ├── app.module.ts
│ │ │ └── main.ts
│ │ ├── package.json
│ │ ├── tsconfig.build.json
│ │ └── tsconfig.json
│ └── storefront/
│ ├── src/
│ │ └── app/
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── next.config.mjs
│ ├── package.json
│ ├── postcss.config.mjs
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── docs/
│ ├── API_CONVENTIONS.md
│ ├── ARCHITECTURE.md
│ ├── CLIENT_DEPLOYMENT.md
│ ├── CONTRIBUTING.md
│ ├── MODULE_DEVELOPMENT.md
│ ├── ROADMAP.md
│ ├── SECURITY.md
│ └── THEME_DEVELOPMENT.md
├── packages/
│ ├── auth/ (@zwantum/auth)
│ ├── commerce-core/ (@zwantum/commerce-core)
│ ├── database/ (@zwantum/database - Prisma schema & client)
│ ├── module-sdk/ (@zwantum/module-sdk)
│ ├── modules/
│ │ ├── analytics/ (@zwantum/module-analytics)
│ │ ├── chatbot/ (@zwantum/module-chatbot)
│ │ ├── loyalty/ (@zwantum/module-loyalty)
│ │ ├── reviews/ (@zwantum/module-reviews)
│ │ └── wishlist/ (@zwantum/module-wishlist)
│ ├── payment-contract/ (@zwantum/payment-contract)
│ ├── payments/
│ │ ├── cashfree/ (@zwantum/payment-cashfree)
│ │ └── razorpay/ (@zwantum/payment-razorpay)
│ ├── shared-types/ (@zwantum/shared-types)
│ ├── shipping-contract/ (@zwantum/shipping-contract)
│ ├── shipping/
│ │ ├── manual/ (@zwantum/shipping-manual)
│ │ └── shiprocket/ (@zwantum/shipping-shiprocket)
│ ├── storefront-core/ (@zwantum/storefront-core)
│ ├── theme-contract/ (@zwantum/theme-contract)
│ ├── themes/
│ │ └── default/ (@zwantum/theme-default)
│ ├── ui/ (@zwantum/ui)
│ └── validation/ (@zwantum/validation)
├── tooling/
│ └── scripts/
│ └── check-workspaces.mjs
├── zwantum-ecom-mudule/ (Preserved original repository reference)
├── .env.example
├── .gitignore
├── .npmrc
├── .prettierrc
├── eslint.config.mjs
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── ROADMAP.md
├── tsconfig.base.json
└── turbo.json

Package Manager: pnpm 11.8.0 with workspace linking and built-dependency authorizations.
Monorepo Engine: turbo 2.11.10.
Runtime Frameworks:
@nestjs/core, @nestjs/common, @nestjs/config, @nestjs/platform-express, @nestjs/terminus (v11.x)
next (v15.5.x), react & react-dom (v19.0.x)
@prisma/client & prisma (v6.19.x)
zod (v3.24.x)
tailwindcss (v3.4.x), postcss, autoprefixer, clsx, tailwind-merge
Developer Tooling: typescript (v5.9.x), prettier (v3.9.x), eslint (v9.x), @eslint/js, typescript-eslint.

# 1. Install all dependencies across the monorepo

pnpm install

# 2. Generate Prisma Client for PostgreSQL

pnpm --filter @zwantum/database prisma:generate

# 3. Typecheck all 24 packages and applications

pnpm turbo typecheck

# 4. Build all packages and applications via Turborepo

pnpm turbo build

# 5. Start all applications concurrently in development mode

pnpm dev

Starting Applications Individually:
Commerce API: pnpm --filter @zwantum/api dev (Listening on http://localhost:4000/api/v1, Health: /api/v1/health)
Storefront: pnpm --filter @zwantum/storefront dev (Listening on http://localhost:3000)
Merchant Admin: pnpm --filter @zwantum/admin dev (Listening on http://localhost:3001)
