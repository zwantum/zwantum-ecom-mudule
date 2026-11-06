'use client';

import { useState } from 'react';
import { formatINR } from '@zwantum/commerce-core';
import { useTheme } from '../components/theme-provider';
import { StorefrontHeader } from '../components/storefront-header';
import { StorefrontFooter } from '../components/storefront-footer';
import { PinChecker } from '../components/pin-checker';
import { CartDrawer, type CartItem } from '../components/cart-drawer';
import { Star, Sparkles } from '../components/icons';

interface BookItem {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  reviewsCount: number;
  format: 'Paperback' | 'Hardcover' | 'Collector Edition';
  pricePaise: number;
  mrpPaise: number;
  isbn: string;
  hsnCode: string;
  tag?: string;
  synopsis: string;
}

const FEATURED_BOOK: BookItem = {
  id: 'book-palace-illusions',
  title: 'The Palace of Illusions',
  author: 'Chitra Banerjee Divakaruni',
  genre: 'Indian Mythology / Historical Fiction',
  rating: 4.8,
  reviewsCount: 3820,
  format: 'Hardcover',
  pricePaise: 44900, // ₹449.00
  mrpPaise: 69900, // ₹699.00
  isbn: '978-0385523363',
  hsnCode: '49011010',
  tag: 'National Bestseller & Book of the Month',
  synopsis:
    'A reimagining of the world-famous Indian epic, the Mahabharata—told from the perspective of an amazing woman, Panchaali, the wife of the five legendary Pandavas brothers. An unforgettable tale of love, destiny, and honor.',
};

const POPULAR_BOOKS: BookItem[] = [
  {
    id: 'book-malgudi-days',
    title: 'Malgudi Days',
    author: 'R.K. Narayan',
    genre: 'Indian Classics & Fiction',
    rating: 4.9,
    reviewsCount: 4210,
    format: 'Paperback',
    pricePaise: 27900, // ₹279.00
    mrpPaise: 35000,
    isbn: '978-8185986173',
    hsnCode: '49011010',
    tag: 'Classic Masterpiece',
    synopsis: 'Short stories portraying the vibrant life and innocence of South India.',
  },
  {
    id: 'book-discovery-india',
    title: 'The Discovery of India',
    author: 'Jawaharlal Nehru',
    genre: 'History & Civilization',
    rating: 4.7,
    reviewsCount: 1940,
    format: 'Paperback',
    pricePaise: 48900, // ₹489.00
    mrpPaise: 65000,
    isbn: '978-0143031031',
    hsnCode: '49011010',
    tag: 'Historical Monument',
    synopsis:
      'Written from Ahmednagar Fort prison, chronicling India from the Indus Valley to British Rule.',
  },
  {
    id: 'book-atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Personal Growth & Psychology',
    rating: 4.9,
    reviewsCount: 12500,
    format: 'Paperback',
    pricePaise: 54900, // ₹549.00
    mrpPaise: 79900,
    isbn: '978-1847941831',
    hsnCode: '49011010',
    tag: '#1 Global Non-Fiction',
    synopsis: 'Tiny changes, remarkable results: an easy and proven way to build good habits.',
  },
  {
    id: 'book-gitanjali',
    title: 'Gitanjali (Song Offerings)',
    author: 'Rabindranath Tagore',
    genre: 'Poetry & Spirituality',
    rating: 4.8,
    reviewsCount: 1620,
    format: 'Hardcover',
    pricePaise: 39900, // ₹399.00
    mrpPaise: 55000,
    isbn: '978-8129104595',
    hsnCode: '49011010',
    tag: 'Nobel Prize in Literature 1913',
    synopsis:
      'A collection of 103 prose poems translated from the Bengali by Tagore, revealing deep mystical devotion.',
  },
  {
    id: 'book-train-to-pakistan',
    title: 'Train to Pakistan',
    author: 'Khushwant Singh',
    genre: 'Historical Fiction',
    rating: 4.6,
    reviewsCount: 2890,
    format: 'Paperback',
    pricePaise: 24900, // ₹249.00
    mrpPaise: 35000,
    isbn: '978-0143065883',
    hsnCode: '49011010',
    tag: 'Partition Landmark',
    synopsis:
      'Set in the summer of 1947, portraying the tragic partition of Punjab in the fictional border village of Mano Majra.',
  },
  {
    id: 'book-god-small-things',
    title: 'The God of Small Things',
    author: 'Arundhati Roy',
    genre: 'Literary Fiction',
    rating: 4.5,
    reviewsCount: 5120,
    format: 'Paperback',
    pricePaise: 39900, // ₹399.00
    mrpPaise: 49900,
    isbn: '978-0143425120',
    hsnCode: '49011010',
    tag: 'Booker Prize Winner',
    synopsis:
      'A poignant story about childhood experiences of fraternal twins in Ayemenem, Kerala, whose lives are destroyed by the Love Laws.',
  },
];

export default function StorefrontHomePage() {
  const { theme } = useTheme();

  // Selected format for featured book
  const [featuredFormat, setFeaturedFormat] = useState<'Paperback' | 'Hardcover' | 'Collector Edition'>('Hardcover');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Cart state
  const initialBook = POPULAR_BOOKS[0] || FEATURED_BOOK;
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: FEATURED_BOOK.id,
      title: FEATURED_BOOK.title,
      author: FEATURED_BOOK.author,
      format: 'Hardcover',
      pricePaise: FEATURED_BOOK.pricePaise,
      quantity: 1,
      hsnCode: FEATURED_BOOK.hsnCode,
    },
    {
      id: initialBook.id,
      title: initialBook.title,
      author: initialBook.author,
      format: initialBook.format,
      pricePaise: initialBook.pricePaise,
      quantity: 1,
      hsnCode: initialBook.hsnCode,
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = (book: BookItem, format?: string) => {
    const chosenFormat = format || book.format;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === book.id && i.format === chosenFormat);
      if (existing) {
        return prev.map((i) =>
          i.id === book.id && i.format === chosenFormat ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: book.id,
          title: book.title,
          author: book.author,
          format: chosenFormat,
          pricePaise: book.pricePaise,
          quantity: 1,
          hsnCode: book.hsnCode,
        },
      ];
    });
    showNotification(`Added "${book.title}" to your reading bag!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[],
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showNotification('Item removed from reading bag.');
  };

  const filteredBooks = POPULAR_BOOKS.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q) ||
      b.isbn.includes(q)
    );
  });

  const bagCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
      }}
    >
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-[#FFCC00] px-4 py-2.5 rounded-xl shadow-lg border border-black/20 text-xs font-bold flex items-center gap-2 animate-bounce">
          <svg className="w-4 h-4 text-[#FFCC00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{notification}</span>
        </div>
      )}

      {/* Storefront Header */}
      <StorefrontHeader
        bagCount={bagCount}
        onOpenBag={() => setIsBagOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Showcase Section - Clean Canvas Background (NEVER #000 default!) */}
        <section
          className="rounded-2xl border p-6 sm:p-10 transition-colors duration-200 shadow-xs"
          style={{
            backgroundColor: theme.colors.card || '#FFFFFF',
            borderColor: theme.colors.border,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Book Visual Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className="w-full max-w-xs rounded-xl border p-6 flex flex-col justify-between shadow-md transition-transform hover:-translate-y-1"
                style={{
                  backgroundColor: theme.colors.secondary,
                  borderColor: theme.colors.border,
                  minHeight: '380px',
                }}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className="text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider"
                      style={{
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.primaryForeground,
                      }}
                    >
                      Bestseller
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      HSN: {FEATURED_BOOK.hsnCode}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-black text-zinc-900 leading-tight mb-1">
                    {FEATURED_BOOK.title}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-600 mb-4">
                    By {FEATURED_BOOK.author}
                  </p>
                  <p className="text-xs text-zinc-700 leading-relaxed italic">
                    &ldquo;{FEATURED_BOOK.synopsis}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-300/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-800">{FEATURED_BOOK.genre}</span>
                  <div className="flex items-center gap-1 font-mono text-zinc-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#FFCC00] text-[#FFCC00]" />
                    <span>4.8 / 5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Details & Actions */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-xs font-black px-2.5 py-1 rounded-md tracking-wider uppercase inline-flex items-center gap-1.5"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.primaryForeground,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book of the Month</span>
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  0% GST Exempt (Printed Books)
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
                  {FEATURED_BOOK.title}
                </h1>
                <p className="text-sm font-semibold text-zinc-600 mt-1">
                  Author: <span className="text-zinc-900 font-bold">{FEATURED_BOOK.author}</span> &bull;{' '}
                  {FEATURED_BOOK.genre}
                </p>
              </div>

              {/* Price Calculation (Integer Paise -> INR) */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black font-mono">
                  {formatINR(FEATURED_BOOK.pricePaise)}
                </span>
                <span className="text-sm line-through text-zinc-400 font-mono">
                  {formatINR(FEATURED_BOOK.mrpPaise)}
                </span>
                <span
                  className="text-xs font-black px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.primaryForeground,
                  }}
                >
                  Save{' '}
                  {Math.round(
                    ((FEATURED_BOOK.mrpPaise - FEATURED_BOOK.pricePaise) / FEATURED_BOOK.mrpPaise) * 100,
                  )}
                  %
                </span>
              </div>

              {/* Format Selector */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Select Edition &amp; Format:
                </label>
                <div className="flex gap-2">
                  {(['Paperback', 'Hardcover', 'Collector Edition'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFeaturedFormat(fmt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                        featuredFormat === fmt
                          ? 'border-black bg-black text-[#FFCC00]'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleAddToCart(FEATURED_BOOK, featuredFormat)}
                  className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-sm transition hover:opacity-90 border flex items-center gap-2"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.primaryForeground,
                    borderColor: theme.colors.border,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>Add to Bag &bull; {formatINR(FEATURED_BOOK.pricePaise)}</span>
                </button>

                <button
                  onClick={() => {
                    handleAddToCart(FEATURED_BOOK, featuredFormat);
                    setIsBagOpen(true);
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 transition shadow-sm"
                >
                  Instant Buy Now
                </button>
              </div>

              {/* Pan-India Trust Badges */}
              <div className="pt-4 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-600 font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>In Stock &bull; Dispatches in 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>COD &bull; Pay on Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>7-Day Hassle-Free Returns</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PIN Code Serviceability Checker */}
        <section>
          <PinChecker />
        </section>

        {/* Curated Bookstore Catalog Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950">
                  Curated Indian &amp; World Bestsellers
                </h2>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                Hand-picked literary masterworks, non-fiction bestsellers, and historical classics.
              </p>
            </div>

            <span className="text-xs font-semibold text-zinc-500">
              Showing {filteredBooks.length} titles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => {
              const discountPct = Math.round(
                ((book.mrpPaise - book.pricePaise) / book.mrpPaise) * 100,
              );

              return (
                <div
                  key={book.id}
                  className="rounded-xl border p-5 flex flex-col justify-between transition hover:shadow-md"
                  style={{
                    backgroundColor: theme.colors.card || '#FFFFFF',
                    borderColor: theme.colors.border,
                  }}
                >
                  <div className="space-y-3">
                    {/* Top Tag & HSN */}
                    <div className="flex items-center justify-between">
                      {book.tag ? (
                        <span
                          className="text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wide"
                          style={{
                            backgroundColor: theme.colors.primary,
                            color: theme.colors.primaryForeground,
                          }}
                        >
                          {book.tag}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">
                          {book.genre}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-zinc-400">
                        HSN {book.hsnCode}
                      </span>
                    </div>

                    {/* Book Spine Mockup */}
                    <div
                      className="h-32 rounded-lg border flex flex-col justify-center items-center p-4 text-center"
                      style={{
                        backgroundColor: theme.colors.secondary,
                        borderColor: theme.colors.border,
                      }}
                    >
                      <span className="font-serif font-black text-sm text-zinc-900 line-clamp-2">
                        {book.title}
                      </span>
                      <span className="text-[11px] text-zinc-600 mt-1">{book.author}</span>
                    </div>

                    {/* Details */}
                    <div>
                      <h3 className="font-black text-sm text-zinc-950 line-clamp-1">{book.title}</h3>
                      <p className="text-xs font-medium text-zinc-500">{book.author}</p>
                      <p className="text-[11px] text-zinc-600 line-clamp-2 mt-1.5 leading-relaxed">
                        {book.synopsis}
                      </p>
                    </div>

                    {/* Price in paise -> formatINR */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-base font-black font-mono">
                        {formatINR(book.pricePaise)}
                      </span>
                      <span className="text-xs line-through text-zinc-400 font-mono">
                        {formatINR(book.mrpPaise)}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                        {discountPct}% OFF
                      </span>
                    </div>
                  </div>

                  {/* Add to Bag Button */}
                  <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-zinc-500">{book.format}</span>
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition hover:opacity-90 border flex items-center gap-1.5"
                      style={{
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.primaryForeground,
                        borderColor: theme.colors.border,
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Storefront Footer */}
      <StorefrontFooter />
    </div>
  );
}
