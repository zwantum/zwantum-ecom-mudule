import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zwantum Merchant Portal — Commerce Operations & Theme Engine',
  description:
    'Modular white-label merchant operations console for Indian commerce, featuring dynamic theme controls and logistics management.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        {/* Merchant Admin Header */}
        <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Brand Logo & Name */}
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-lg bg-[#FFCC00] text-black font-black flex items-center justify-center text-sm shadow-xs border border-black/10">
                ZW
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-950 block leading-tight">
                  Zwantum Merchant Portal
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">
                  Commerce Engine v2.0 • India-First
                </span>
              </div>
            </div>

            {/* Quick Action & Storefront Link */}
            <div className="flex items-center gap-4">
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:text-black hover:border-black transition"
              >
                <span>Preview Storefront</span>
                <span className="text-[10px] bg-slate-100 px-1 py-0.2 rounded font-mono">:3002</span>
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700">Production Ready</span>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Content Canvas */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Admin Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
          Zwantum Commerce Engine &bull; White-Label Multi-Client Architecture &bull; Designed to RULE.md Standards
        </footer>
      </body>
    </html>
  );
}
