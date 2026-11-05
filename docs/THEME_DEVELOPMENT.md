# Zwantum Commerce: Theme Development Guide

## 1. Theme Contract Architecture

Zwantum Commerce implements a **contract-driven theme engine** via `@zwantum/theme-contract`. Storefront applications do not fork code; instead, they consume theme configurations and token values to alter presentation dynamically.

---

## 2. Theme Configuration Schema

Every theme implements the `ThemeConfig` interface:

```typescript
export interface ThemeConfig {
  id: string;
  name: string;
  version: string;
  branding: {
    storeName: string;
    tagline?: string;
    logoUrl?: string;
    faviconUrl?: string;
  };
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
  };
  typography: {
    fontFamilySans: string;
    fontFamilyHeading?: string;
    baseFontSize: string;
  };
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  headerLayout: 'standard' | 'centered' | 'minimal';
  footerLayout: 'columns' | 'simple';
}
```

---

## 3. Styling & Token Injection

- Storefront apps map theme colors to CSS variables (`--primary`, `--background`, `--foreground`) in the root HTML layout.
- Tailwind CSS consumes these variables, enabling real-time branding changes without recompilation.
- When branding is updated in Merchant Admin, Next.js on-demand revalidation (`revalidatePath('/')`) purges stale static caches.
