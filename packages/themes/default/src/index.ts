import type { ThemeConfig } from '@zwantum/theme-contract';

/**
 * @zwantum/theme-default
 * Production-ready Bookstore Theme for Zwantum Commerce Engine.
 * Tailored for literary stores, publishing houses, and independent book retailers in India.
 */

export const defaultTheme: ThemeConfig = {
  id: 'theme-books-default',
  name: 'Granth & Quill - Literary Bookstore',
  version: '1.0.0',
  category: 'books_publishing',
  branding: {
    storeName: 'Granth & Quill Books',
    tagline: 'Curated Indian & World Literature, Delivered to Your Doorstep',
    announcementText:
      '📚 Free Express Pan-India Delivery on orders above ₹499 • COD Available Nationwide',
  },
  colors: {
    primary: '#451a03', // Deep mahogany book leather
    primaryForeground: '#ffffff',
    secondary: '#fef3c7', // Warm literary parchment
    secondaryForeground: '#78350f',
    background: '#fffdfa', // Warm ivory reading paper
    foreground: '#1c1917', // Rich warm printer ink
    muted: '#f5f5f4', // Stone reader neutral
    mutedForeground: '#78716c',
    accent: '#b45309', // Terracotta bookmark ribbon
    accentForeground: '#ffffff',
    border: '#e7e5e4',
  },
  typography: {
    fontFamilySans: 'Inter, system-ui, -apple-system, sans-serif',
    fontFamilyHeading: 'Georgia, Cambria, "Times New Roman", Times, serif',
    baseFontSize: '16px',
  },
  borderRadius: 'md',
  headerLayout: 'standard',
  footerLayout: 'columns',
};

export default defaultTheme;
