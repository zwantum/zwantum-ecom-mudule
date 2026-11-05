'use client';

import { useState } from 'react';
import { formatINR } from '@zwantum/commerce-core';

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
  coverBg: string;
  accentColor: string;
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
  coverBg: 'from-amber-900 via-yellow-950 to-stone-900',
  accentColor: '#d97706',
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
    coverBg: 'from-emerald-950 via-teal-900 to-stone-900',
    accentColor: '#0d9488',
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
    coverBg: 'from-amber-950 via-stone-900 to-stone-950',
    accentColor: '#b45309',
    tag: 'Historical Monument',
    synopsis:
      'Written from Ahmednagar Fort prison, chronicling India from Indus Valley to British Rule.',
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
    coverBg: 'from-orange-950 via-amber-900 to-stone-900',
    accentColor: '#f97316',
    tag: '#1 Global Non-Fiction',
    synopsis: 'Tiny changes, remarkable results: an easy and proven way to build good habits.',
  },
  {
    id: 'book-gitanjali',
    title: 'Gitanjali (Song Offerings)',
    author: 'Rabindranath Tagore',
    genre: 'Poetry & Spirituality',
    rating: 4.9,
    reviewsCount: 2890,
    format: 'Collector Edition',
    pricePaise: 32000, // ₹320.00
    mrpPaise: 45000,
    isbn: '978-8171675203',
    hsnCode: '49011010',
    coverBg: 'from-indigo-950 via-slate-900 to-stone-900',
    accentColor: '#6366f1',
    tag: 'Nobel Prize Winner',
    synopsis: 'Lyrical devotional verses of pure illumination and divine longing.',
  },
  {
    id: 'book-the-guide',
    title: 'The Guide',
    author: 'R.K. Narayan',
    genre: 'Literary Fiction',
    rating: 4.7,
    reviewsCount: 1650,
    format: 'Paperback',
    pricePaise: 29900, // ₹299.00
    mrpPaise: 39900,
    isbn: '978-8185986074',
    hsnCode: '49011010',
    coverBg: 'from-rose-950 via-stone-900 to-stone-950',
    accentColor: '#f43f5e',
    tag: 'Sahitya Akademi Award',
    synopsis: 'A rogue tour guide transformed unexpectedly into a holy spiritual sage.',
  },
  {
    id: 'book-kamasutra-vatsyayana',
    title: 'The Arthashastra',
    author: 'Kautilya (Chanakya)',
    genre: 'Statecraft & Strategy',
    rating: 4.8,
    reviewsCount: 3120,
    format: 'Hardcover',
    pricePaise: 59900, // ₹599.00
    mrpPaise: 89900,
    isbn: '978-0140446036',
    hsnCode: '49011010',
    coverBg: 'from-yellow-950 via-amber-900 to-stone-900',
    accentColor: '#eab308',
    tag: 'Ancient Strategy',
    synopsis:
      'The foundational Indian treatise on politics, military strategy, and state economics.',
  },
];

export default function BookstoreHomePage() {
  const [selectedFormat, setSelectedFormat] = useState<'Hardcover' | 'Paperback'>('Hardcover');
  const [_bagCount, setBagCount] = useState(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (bookTitle: string) => {
    setBagCount((prev) => prev + 1);
    setToastMessage(`✓ Added "${bookTitle}" to your reading bag!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-16 py-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-950 text-amber-100 text-sm px-5 py-3 rounded-xl shadow-xl border border-amber-800 flex items-center space-x-3 transition-all animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero: Book of the Month Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white shadow-2xl border border-amber-900/60 p-8 sm:p-12 lg:p-16">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Book Metadata & Synopsis */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-semibold text-amber-300 ring-1 ring-inset ring-amber-400/30">
                <span>✦ {FEATURED_BOOK.tag}</span>
              </div>

              <div>
                <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  {FEATURED_BOOK.title}
                </h1>
                <p className="mt-2 text-xl font-medium text-amber-200/90 font-serif">
                  by{' '}
                  <span className="underline decoration-amber-500/50 underline-offset-4">
                    {FEATURED_BOOK.author}
                  </span>
                </p>
              </div>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                {FEATURED_BOOK.synopsis}
              </p>

              {/* Format Switcher */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Select Edition Format:
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedFormat('Hardcover')}
                    className={`px-4 py-2 rounded-lg text-xs font-medium border transition ${
                      selectedFormat === 'Hardcover'
                        ? 'bg-amber-100 text-amber-950 border-amber-200 font-bold shadow-sm'
                        : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-800'
                    }`}
                  >
                    Hardcover Edition • {formatINR(FEATURED_BOOK.pricePaise)}
                  </button>
                  <button
                    onClick={() => setSelectedFormat('Paperback')}
                    className={`px-4 py-2 rounded-lg text-xs font-medium border transition ${
                      selectedFormat === 'Paperback'
                        ? 'bg-amber-100 text-amber-950 border-amber-200 font-bold shadow-sm'
                        : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-800'
                    }`}
                  >
                    Paperback Edition • {formatINR(32000)}
                  </button>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-6">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-white">
                      {formatINR(selectedFormat === 'Hardcover' ? FEATURED_BOOK.pricePaise : 32000)}
                    </span>
                    <span className="text-sm text-stone-400 line-through">
                      {formatINR(selectedFormat === 'Hardcover' ? FEATURED_BOOK.mrpPaise : 49900)}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">36% OFF</span>
                  </div>
                  <span className="text-[11px] text-stone-400 block mt-0.5">
                    GST 0% Exempt (HSN: {FEATURED_BOOK.hsnCode}) • Inclusive of all taxes
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(FEATURED_BOOK.title)}
                    className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-7 py-3 rounded-full text-sm shadow-lg hover:shadow-amber-500/25 transition active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Add to Reading Bag
                  </button>
                  <button className="border border-stone-700 hover:border-amber-400/50 text-stone-200 px-5 py-3 rounded-full text-sm font-medium transition cursor-pointer">
                    Read Sample Excerpt
                  </button>
                </div>
              </div>
            </div>

            {/* Book Cover Visual Simulation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group perspective-1000">
                <div className="w-64 sm:w-72 h-96 sm:h-[420px] rounded-r-xl rounded-l-sm bg-gradient-to-br from-amber-900 via-yellow-950 to-stone-900 p-6 flex flex-col justify-between shadow-[25px_20px_50px_rgba(0,0,0,0.6)] border-l-4 border-amber-950 border-r-2 border-amber-700/40 relative transform rotate-1 group-hover:rotate-0 transition duration-500">
                  <div className="border border-amber-500/30 p-4 h-full flex flex-col justify-between rounded">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-amber-400/90 font-mono block text-center">
                        Acclaimed Indian Classic
                      </span>
                      <h3 className="font-serif-heading text-2xl font-bold text-white text-center mt-6 leading-snug">
                        {FEATURED_BOOK.title}
                      </h3>
                      <div className="w-12 h-0.5 bg-amber-400 mx-auto my-3" />
                      <p className="font-serif text-xs text-amber-200 text-center italic">
                        {FEATURED_BOOK.author}
                      </p>
                    </div>

                    <div className="text-center pt-8">
                      <span className="text-[10px] text-amber-300 font-serif block">
                        Winner of the American Book Award
                      </span>
                      <span className="text-[9px] text-stone-400 tracking-wider font-mono block mt-1">
                        ISBN: {FEATURED_BOOK.isbn}
                      </span>
                    </div>
                  </div>

                  {/* Bookmark Ribbon */}
                  <div className="absolute -top-3 right-8 w-6 h-12 bg-amber-600 rounded-b shadow-md border border-amber-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Strip (India-First Commerce Perks) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-amber-50/60 border border-amber-200/70 rounded-2xl p-6">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg bg-amber-900/10 text-amber-900">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                100% Genuine Editions
              </h4>
              <p className="text-xs text-stone-600">Directly from verified publishers</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg bg-amber-900/10 text-amber-900">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Free Pan-India Delivery
              </h4>
              <p className="text-xs text-stone-600">On all book orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg bg-amber-900/10 text-amber-900">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Cash On Delivery (COD)
              </h4>
              <p className="text-xs text-stone-600">19,000+ PIN codes serviceable</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg bg-amber-900/10 text-amber-900">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Complimentary Bookmark
              </h4>
              <p className="text-xs text-stone-600">Included with every packaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Books Shelf: Bestselling Literature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">
              Curated Shelf
            </span>
            <h2 className="font-serif-heading text-3xl font-extrabold text-amber-950 tracking-tight mt-1">
              Bestsellers & Timeless Classics
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-2 sm:mt-0 font-medium">
            Showing 6 popular titles in stock • Tax-exempt under HSN 4901
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {POPULAR_BOOKS.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col justify-between"
            >
              <div>
                {/* Book Cover Header Simulation */}
                <div
                  className={`h-48 bg-gradient-to-br ${book.coverBg} p-5 flex flex-col justify-between relative`}
                >
                  <div className="flex justify-between items-start">
                    <span className="inline-block bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {book.genre}
                    </span>
                    <span className="text-white text-xs font-bold bg-amber-700/80 px-2 py-0.5 rounded">
                      ★ {book.rating}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-heading text-xl font-bold text-white leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs text-amber-200/90 font-serif italic mt-0.5">
                      by {book.author}
                    </p>
                  </div>

                  {/* Bookmark Tag */}
                  <span className="absolute bottom-2 right-4 text-[10px] text-stone-300 font-mono">
                    {book.format}
                  </span>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {book.synopsis}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                    <span>ISBN: {book.isbn}</span>
                    <span className="text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                      GST 0%
                    </span>
                  </div>
                </div>
              </div>

              {/* Price and Cart Footer */}
              <div className="p-5 pt-0 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-lg font-bold text-stone-900">
                      {formatINR(book.pricePaise)}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      {formatINR(book.mrpPaise)}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold block">
                    Save {Math.round(((book.mrpPaise - book.pricePaise) / book.mrpPaise) * 100)}%
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(book.title)}
                  className="bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition active:scale-95 cursor-pointer"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Literary Quote Break */}
      <section className="bg-amber-100/60 border-y border-amber-200/80 py-12 text-center px-4">
        <blockquote className="max-w-3xl mx-auto font-serif text-lg sm:text-xl text-amber-950 italic leading-relaxed">
          &ldquo;Books are the quietest and most constant of friends; they are the most accessible
          and wisest of counselors, and the most patient of teachers.&rdquo;
        </blockquote>
        <p className="mt-2 text-xs font-bold text-amber-800 uppercase tracking-widest">
          — Charles William Eliot
        </p>
      </section>
    </div>
  );
}
