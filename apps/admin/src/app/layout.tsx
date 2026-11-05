import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zwantum Commerce Merchant Admin',
  description: 'Merchant dashboard for Zwantum Commerce Engine',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 antialiased">
        <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Zwantum Merchant Portal
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                Admin
              </span>
            </div>
            <nav className="flex items-center space-x-6 text-sm font-medium text-slate-600">
              <span className="hover:text-slate-900 cursor-pointer">Catalog</span>
              <span className="hover:text-slate-900 cursor-pointer">Orders</span>
              <span className="hover:text-slate-900 cursor-pointer">Shipments</span>
              <span className="hover:text-slate-900 cursor-pointer">Settings</span>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
