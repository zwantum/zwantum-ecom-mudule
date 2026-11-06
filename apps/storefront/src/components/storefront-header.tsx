'use client';

import React from 'react';
import { useTheme } from './theme-provider';

interface StorefrontHeaderProps {
  bagCount: number;
  onOpenBag: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function StorefrontHeader({
  bagCount,
  onOpenBag,
  searchQuery,
  onSearchChange,
}: StorefrontHeaderProps) {
  const { theme } = useTheme();

  return (
    <>
      {/* Top Announcement Bar - Uses Brand Primary (#FFCC00) with High-Contrast Dark Text - Never Black Bg */}
      <div
        className="text-xs py-2 px-4 text-center font-bold tracking-wide border-b transition-colors duration-200"
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.primaryForeground,
          borderColor: theme.colors.border,
        }}
      >
        <span>
          {theme.branding.announcementText ||
            '⚡ Pan-India Fast Dispatch • Printed Books 0% GST (HSN 4901) • Cash on Delivery & UPI Enabled'}
        </span>
      </div>

      {/* Main Header Bar - Clean White / Card Background */}
      <header
        className="border-b sticky top-0 z-40 transition-colors duration-200 shadow-xs"
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
          color: theme.colors.foreground,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-4">
            {/* Storefront Identity */}
            <div className="flex items-center space-x-3 cursor-pointer">
              <div
                className="h-11 w-11 rounded-lg flex items-center justify-center font-black text-xl shadow-xs border transition-transform hover:scale-105"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.primaryForeground,
                  borderColor: theme.colors.border,
                }}
              >
                ZW
              </div>
              <div>
                <span className="font-black text-xl tracking-tight block leading-tight">
                  {theme.branding.storeName}
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase block text-zinc-500">
                  {theme.branding.tagline || 'India-First Commerce Engine'}
                </span>
              </div>
            </div>

            {/* Book Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search titles, authors, genres, or ISBN..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-zinc-50 border rounded-full focus:outline-none focus:ring-2 focus:ring-black transition"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.foreground,
                  }}
                />
                <svg
                  className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400"
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

            {/* Actions: Admin Customizer Link & Interactive Bag Button */}
            <div className="flex items-center space-x-4 text-xs font-semibold">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 hover:border-black text-zinc-700 hover:text-black transition"
              >
                <span className="h-2 w-2 rounded-full bg-[#FFCC00] ring-1 ring-black/40" />
                <span>Admin Customizer</span>
              </a>

              <button
                onClick={onOpenBag}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-xs transition hover:opacity-90 border"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.primaryForeground,
                  borderColor: theme.colors.border,
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Bag</span>
                <span
                  className="text-[11px] font-black px-1.5 py-0.2 rounded-full"
                  style={{
                    backgroundColor: theme.colors.foreground,
                    color: theme.colors.background,
                  }}
                >
                  {bagCount}
                </span>
              </button>
            </div>
          </div>

          {/* Subnav: Book Categories */}
          <nav
            className="hidden sm:flex border-t py-2.5 text-xs font-semibold space-x-6 overflow-x-auto"
            style={{ borderColor: theme.colors.border }}
          >
            <span className="font-black border-b-2 border-black pb-0.5 cursor-pointer">
              National Bestsellers
            </span>
            <span className="text-zinc-600 hover:text-black cursor-pointer">
              Indian Classics &amp; Mythology
            </span>
            <span className="text-zinc-600 hover:text-black cursor-pointer">
              History &amp; Thought
            </span>
            <span className="text-zinc-600 hover:text-black cursor-pointer">
              Self-Growth &amp; Psychology
            </span>
            <span className="text-zinc-600 hover:text-black cursor-pointer">
              Award-Winning Fiction
            </span>
            <span className="text-zinc-600 hover:text-black cursor-pointer">
              Regional Translations
            </span>
            <span
              className="font-bold px-2 py-0.5 rounded text-[11px]"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.secondaryForeground,
              }}
            >
              HSN 4901: 0% GST Exempt
            </span>
          </nav>
        </div>
      </header>
    </>
  );
}
