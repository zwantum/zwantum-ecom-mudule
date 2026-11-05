# Zwantum Commerce: Module Development Guide

## 1. Module Architecture Overview

Optional features in Zwantum Commerce Engine (such as Wishlist, Reviews, Loyalty, and AI Chatbot) are structured as **isolated, installable modules** using `@zwantum/module-sdk`.

### Principles

- **Loose Coupling:** Modules must not depend directly on other optional modules.
- **Contract-Based Registration:** Modules define a strict manifest and implement lifecycle hooks.
- **Admin Navigation Injection:** Modules declare their own navigation items and permission requirements for the Admin dashboard.
- **Configuration Isolation:** Module-specific settings are validated via schemas and stored in the store configuration.

---

## 2. Creating a New Module

Every module lives under `packages/modules/<module-name>` and exports a module definition conforming to `CommerceModule<TConfig>` from `@zwantum/module-sdk`.

### Module Manifest Example

```typescript
import { defineCommerceModule, type CommerceModule } from '@zwantum/module-sdk';

export interface MyModuleConfig {
  enabled: boolean;
  featureFlag: string;
}

export const myModule: CommerceModule<MyModuleConfig> = defineCommerceModule<MyModuleConfig>({
  manifest: {
    id: 'module-my-feature',
    name: 'My Custom Feature',
    version: '1.0.0',
    description: 'Provides specialized commerce capabilities.',
    author: 'Zwantum Engineering',
    permissions: ['feature:read', 'feature:write'],
    dependencies: {},
  },

  async onInit({ storeId, config }) {
    // Initialization logic when mounted into API runtime
  },

  getAdminNavigation() {
    return [
      {
        id: 'my-feature-nav',
        label: 'My Feature',
        path: '/admin/modules/my-feature',
        requiredPermission: 'feature:read',
      },
    ];
  },
});
```

---

## 3. Database Conventions for Modules

- For core-adjacent modules, models may be added to `packages/database/prisma/schema.prisma` with optional foreign keys.
- For third-party or isolated modules, prefix table names with `mod_<module_id>_`.
- All tables must reference `storeId` with `onDelete: Cascade` to guarantee data isolation.
