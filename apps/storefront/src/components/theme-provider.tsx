'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeConfig } from '@zwantum/theme-contract';
import defaultTheme from '@zwantum/theme-default';

interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
  isLoading: false,
});

export const useTheme = () => useContext(ThemeContext);

const THEME_STORAGE_KEY = 'zwantum_active_theme_config';
const BROADCAST_CHANNEL_NAME = 'zwantum_theme_channel';

export function ThemeProvider({
  initialTheme = defaultTheme,
  children,
}: {
  initialTheme?: ThemeConfig;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);
  const [isLoading, setIsLoading] = useState(true);

  const applyColorsToDOM = (colors: ThemeConfig['colors']) => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;

    if (colors.primary) root.style.setProperty('--primary', colors.primary);
    if (colors.primaryForeground)
      root.style.setProperty('--primary-foreground', colors.primaryForeground);
    if (colors.background) root.style.setProperty('--background', colors.background);
    if (colors.foreground) root.style.setProperty('--foreground', colors.foreground);
    if (colors.accent) root.style.setProperty('--accent', colors.accent);
    if (colors.accentForeground)
      root.style.setProperty('--accent-foreground', colors.accentForeground);
    if (colors.border) root.style.setProperty('--border', colors.border);
    if (colors.card) root.style.setProperty('--card', colors.card);
    if (colors.cardForeground)
      root.style.setProperty('--card-foreground', colors.cardForeground);
  };

  useEffect(() => {
    // 1. Initial color application
    applyColorsToDOM(theme.colors);

    // 2. Fetch latest saved theme from API or LocalStorage
    const fetchLatestTheme = async () => {
      try {
        // Try local storage first for instant cached response
        const cached = localStorage.getItem(THEME_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          setTheme(parsed);
          applyColorsToDOM(parsed.colors);
        }

        // Try API
        const res = await fetch('http://localhost:4000/api/v1/settings/theme');
        if (res.ok) {
          const json = await res.json();
          const remoteTheme = json.data || json;
          if (remoteTheme && remoteTheme.colors) {
            setTheme(remoteTheme);
            applyColorsToDOM(remoteTheme.colors);
            localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(remoteTheme));
          }
        }
      } catch {
        // Fallback to default Zwantum theme
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestTheme();

    // 3. Listen to cross-window BroadcastChannel from Admin customizer
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.onmessage = (event) => {
          if (event.data && event.data.type === 'ZWANTUM_THEME_UPDATED') {
            const updatedTheme = event.data.payload as ThemeConfig;
            setTheme(updatedTheme);
            applyColorsToDOM(updatedTheme.colors);
            localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updatedTheme));
          }
        };
      }
    } catch {
      // BroadcastChannel optional fallback
    }

    // 4. Listen to localStorage storage events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setTheme(parsed);
          applyColorsToDOM(parsed.colors);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

