import type { Metadata } from 'next';
import defaultTheme from '@zwantum/theme-default';
import { ThemeProvider } from '../components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: `${defaultTheme.branding.storeName} — ${defaultTheme.branding.tagline}`,
  description:
    'Modular White-Label Online Bookstore built on Zwantum Commerce Engine. Curated Indian literature, classics, and global bestsellers with Pan-India fast shipping.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider initialTheme={defaultTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
