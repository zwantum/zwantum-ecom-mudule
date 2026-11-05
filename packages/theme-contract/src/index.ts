/**
 * @zwantum/theme-contract
 * Specifications and contracts for white-label themes.
 * Guarantees zero code drift across client storefronts.
 */

export interface ThemeColors {
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
}

export interface ThemeTypography {
  fontFamilySans: string;
  fontFamilyHeading?: string;
  baseFontSize: string;
}

export interface ThemeBranding {
  logoUrl?: string;
  faviconUrl?: string;
  storeName: string;
  tagline?: string;
  announcementText?: string;
}

export type StoreCategory =
  | 'books_publishing'
  | 'fashion_clothing'
  | 'food_grocery'
  | 'beauty_wellness'
  | 'electronics'
  | 'general_retail';

export interface ThemeConfig {
  id: string;
  name: string;
  version: string;
  category: StoreCategory;
  branding: ThemeBranding;
  colors: ThemeColors;
  typography: ThemeTypography;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  headerLayout: 'standard' | 'centered' | 'minimal';
  footerLayout: 'columns' | 'simple';
}
