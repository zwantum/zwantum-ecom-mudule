import type { Metadata } from 'next';
import defaultTheme from '@zwantum/theme-default';
import './globals.css';

export const metadata: Metadata = {
  title: `${defaultTheme.branding.storeName} — ${defaultTheme.branding.tagline}`,
  description:
    'An independent online bookstore built on Zwantum Commerce Engine. Curated Indian literature, classics, and global bestsellers with nationwide fast shipping.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-[#fffdfa] text-stone-900">
        {/* Top Announcement Bar */}
        <div className="bg-amber-950 text-amber-100 text-xs py-2 px-4 text-center font-medium tracking-wide border-b border-amber-900/40">
          <span>{defaultTheme.branding.announcementText}</span>
        </div>

        {/* Main Bookstore Header */}
        <header className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-20 flex items-center justify-between gap-4">
              {/* Store Identity */}
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="h-11 w-11 rounded-lg bg-amber-900 text-amber-100 flex items-center justify-center font-serif text-2xl font-bold shadow-sm">
                  GQ
                </div>
                <div>
                  <span className="font-serif-heading font-bold text-2xl tracking-tight text-amber-950 block leading-tight">
                    {defaultTheme.branding.storeName}
                  </span>
                  <span className="text-xs text-amber-800/80 font-medium tracking-wider uppercase block">
                    Curated Books • Est. 2026
                  </span>
                </div>
              </div>

              {/* Book Search Bar */}
              <div className="hidden md:flex flex-1 max-w-md mx-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search titles, authors, genres, or ISBN..."
                    className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition"
                  />
                  <svg
                    className="absolute left-3.5 top-2.5 h-4 w-4 text-stone-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Actions & Reader Bag */}
              <div className="flex items-center space-x-5 text-sm">
                <span className="hidden lg:inline text-stone-600 hover:text-amber-900 cursor-pointer font-medium">
                  Track Shipment
                </span>
                <span className="hidden sm:inline text-stone-600 hover:text-amber-900 cursor-pointer font-medium">
                  Reading List
                </span>
                <div className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 px-4 py-2 rounded-full border border-amber-200 cursor-pointer transition">
                  <svg
                    className="w-5 h-5 text-amber-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span className="font-semibold text-xs">Book Bag</span>
                  <span className="bg-amber-900 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                    2
                  </span>
                </div>
              </div>
            </div>

            {/* Subnav: Book Categories */}
            <nav className="hidden sm:flex border-t border-stone-100 py-2.5 text-xs font-medium text-stone-600 space-x-8 overflow-x-auto">
              <span className="text-amber-900 font-semibold cursor-pointer">Bestsellers</span>
              <span className="hover:text-amber-900 cursor-pointer">Indian Classics</span>
              <span className="hover:text-amber-900 cursor-pointer">Fiction & Literature</span>
              <span className="hover:text-amber-900 cursor-pointer">Philosophy & Thought</span>
              <span className="hover:text-amber-900 cursor-pointer">Biographies & History</span>
              <span className="hover:text-amber-900 cursor-pointer">Self-Growth & Business</span>
              <span className="hover:text-amber-900 cursor-pointer">Regional Translations</span>
              <span className="text-amber-800 hover:text-amber-950 font-semibold cursor-pointer">
                Special Editions ✦
              </span>
            </nav>
          </div>
        </header>

        {/* Main Storefront Content */}
        <main className="flex-1">{children}</main>

        {/* Bookstore Literary Footer */}
        <footer className="border-t border-stone-200 bg-stone-900 text-stone-300 pt-12 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded bg-amber-700 text-white flex items-center justify-center font-serif text-lg font-bold">
                    GQ
                  </div>
                  <span className="font-serif-heading font-bold text-xl text-white">
                    Granth & Quill
                  </span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  A premier digital bookstore engineered for passionate readers. Celebrating the
                  rich tapestry of Indian and world literature.
                </p>
                <p className="text-xs italic text-amber-300/80 font-serif">
                  &ldquo;A room without books is like a body without a soul.&rdquo; — Cicero
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
                  Literary Collections
                </h4>
                <ul className="space-y-2 text-xs text-stone-400">
                  <li className="hover:text-white cursor-pointer">Indian National Bestsellers</li>
                  <li className="hover:text-white cursor-pointer">Sahitya Akademi Awardees</li>
                  <li className="hover:text-white cursor-pointer">Ancient Epics & Philosophy</li>
                  <li className="hover:text-white cursor-pointer">Contemporary Indian Fiction</li>
                  <li className="hover:text-white cursor-pointer">Rare Hardcover Editions</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
                  India-First Fulfillment
                </h4>
                <ul className="space-y-2 text-xs text-stone-400">
                  <li>Shiprocket Courier Aggregation</li>
                  <li>19,000+ PIN Codes Covered</li>
                  <li>Cash on Delivery (COD) Enabled</li>
                  <li>Printed Books (HSN 4901): 0% GST</li>
                  <li>Fast Dispatch from Delhi & Mumbai Warehouses</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
                  Reader Newsletter
                </h4>
                <p className="text-xs text-stone-400 mb-3">
                  Receive author interviews, literary essays, and curated book recommendations
                  weekly.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="bg-stone-800 border border-stone-700 text-xs px-3 py-2 rounded flex-1 focus:outline-none focus:border-amber-600 text-white"
                  />
                  <button className="bg-amber-700 hover:bg-amber-600 text-white text-xs px-3 py-2 rounded font-medium transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
              <div>
                &copy; {new Date().getFullYear()} Granth & Quill Books. Powered by{' '}
                <span className="text-amber-400 font-semibold">Zwantum Commerce Engine</span>.
              </div>
              <div className="flex space-x-6 text-stone-400">
                <span className="hover:text-white cursor-pointer">Privacy & DPDP Compliance</span>
                <span className="hover:text-white cursor-pointer">Refund & Return Policy</span>
                <span className="hover:text-white cursor-pointer">Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
