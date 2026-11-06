import type { ThemeConfig } from '@zwantum/theme-contract';

/**
 * @zwantum/theme-default
 * Production-ready Zwantum Commerce Brand Theme.
 * Palette: #FFCC00 (Zwantum Yellow), #000000 (Black), #FFFFFF (White).
 * Background is white (#FFFFFF) by default and must NOT be #000000 by default.
 * All colors are dynamically configurable via the Merchant Admin dashboard.
 */

export const defaultTheme: ThemeConfig = {
  id: 'theme-zwantum-default',
  name: 'Zwantum Signature - Flagship Commerce Theme',
  version: '2.0.0',
  category: 'books_publishing',
  branding: {
    storeName: 'Zwantum Books & Commerce',
    tagline: 'Curated Indian & World Literature, Delivered Across India',
    announcementText:
      '⚡ Pan-India Fast Dispatch • Printed Books 0% GST (HSN 4901) • Cash on Delivery & UPI Enabled',
  },
  colors: {
    primary: '#FFCC00', // Signature Zwantum Yellow / Gold
    primaryForeground: '#000000', // Crisp black text on yellow (AAA contrast ratio ~ 14.1:1)
    secondary: '#F4F4F5', // Light clean neutral surface
    secondaryForeground: '#18181B',
    background: '#FFFFFF', // Clean white background (NEVER #000 by default)
    foreground: '#000000', // Crisp black typography
    muted: '#F4F4F5', // Soft gray
    mutedForeground: '#71717A',
    accent: '#FFCC00', // Zwantum Yellow highlight accent
    accentForeground: '#000000',
    border: '#E4E4E7', // Crisp subtle border
    card: '#FFFFFF', // Clean card surface
    cardForeground: '#000000',
  },
  typography: {
    fontFamilySans: 'Inter, system-ui, -apple-system, sans-serif',
    fontFamilyHeading: 'system-ui, -apple-system, sans-serif',
    baseFontSize: '16px',
  },
  borderRadius: 'md',
  headerLayout: 'standard',
  footerLayout: 'columns',
};

export default defaultTheme;
