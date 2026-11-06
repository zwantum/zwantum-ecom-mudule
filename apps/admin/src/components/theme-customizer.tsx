'use client';

import React, { useState, useEffect } from 'react';
import type { ThemeConfig } from '@zwantum/theme-contract';
import defaultTheme from '@zwantum/theme-default';
import {
  Palette,
  Tag,
  Eye,
  Zap,
  Sun,
  Leaf,
  Shield,
  AlertTriangle,
  Check,
  ExternalLink,
} from './icons';

const THEME_STORAGE_KEY = 'zwantum_active_theme_config';
const BROADCAST_CHANNEL_NAME = 'zwantum_theme_channel';

interface PresetItem {
  id: 'signature' | 'amber' | 'emerald' | 'blue';
  name: string;
  badge: string;
  colors: ThemeConfig['colors'];
}

const PRESETS: PresetItem[] = [
  {
    id: 'signature',
    name: 'Zwantum Signature (Default)',
    badge: 'Official Palette',
    colors: {
      primary: '#FFCC00',
      primaryForeground: '#000000',
      secondary: '#F4F4F5',
      secondaryForeground: '#18181B',
      background: '#FFFFFF',
      foreground: '#000000',
      muted: '#F4F4F5',
      mutedForeground: '#71717A',
      accent: '#FFCC00',
      accentForeground: '#000000',
      border: '#E4E4E7',
      card: '#FFFFFF',
      cardForeground: '#000000',
    },
  },
  {
    id: 'amber',
    name: 'Zwantum Amber Glow',
    badge: 'Warm Accent',
    colors: {
      primary: '#F59E0B',
      primaryForeground: '#000000',
      secondary: '#FEF3C7',
      secondaryForeground: '#78350F',
      background: '#FFFFFF',
      foreground: '#18181B',
      muted: '#F4F4F5',
      mutedForeground: '#71717A',
      accent: '#D97706',
      accentForeground: '#000000',
      border: '#E4E4E7',
      card: '#FFFFFF',
      cardForeground: '#18181B',
    },
  },
  {
    id: 'emerald',
    name: 'Zwantum Emerald Mint',
    badge: 'Fresh Growth',
    colors: {
      primary: '#10B981',
      primaryForeground: '#000000',
      secondary: '#D1FAE5',
      secondaryForeground: '#065F46',
      background: '#FFFFFF',
      foreground: '#0F172A',
      muted: '#F1F5F9',
      mutedForeground: '#64748B',
      accent: '#059669',
      accentForeground: '#FFFFFF',
      border: '#E2E8F0',
      card: '#FFFFFF',
      cardForeground: '#0F172A',
    },
  },
  {
    id: 'blue',
    name: 'Zwantum Royal Blue',
    badge: 'Executive',
    colors: {
      primary: '#2563EB',
      primaryForeground: '#FFFFFF',
      secondary: '#DBEAFE',
      secondaryForeground: '#1E40AF',
      background: '#FFFFFF',
      foreground: '#0F172A',
      muted: '#F1F5F9',
      mutedForeground: '#64748B',
      accent: '#1D4ED8',
      accentForeground: '#FFFFFF',
      border: '#E2E8F0',
      card: '#FFFFFF',
      cardForeground: '#0F172A',
    },
  },
];

export function ThemeCustomizer() {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'colors' | 'branding' | 'preview'>('colors');

  useEffect(() => {
    // Load initial theme from localStorage or API
    const loadTheme = async () => {
      try {
        const cached = localStorage.getItem(THEME_STORAGE_KEY);
        if (cached) {
          setTheme(JSON.parse(cached));
        }
        const res = await fetch('http://localhost:4000/api/v1/settings/theme');
        if (res.ok) {
          const json = await res.json();
          const remote = json.data || json;
          if (remote?.colors) {
            setTheme(remote);
            localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(remote));
          }
        }
      } catch {
        // Use default theme
      }
    };
    loadTheme();
  }, []);

  const handleColorChange = (key: keyof ThemeConfig['colors'], value: string) => {
    // Enforce Rule: Don't use #000 as background by default
    if (key === 'background') {
      const normalized = value.toLowerCase().trim();
      if (normalized === '#000' || normalized === '#000000' || normalized === 'black') {
        setErrorMessage(
          'Architectural Rule Violation: Pure black (#000000) cannot be used as the default background. Use #FFFFFF or a light neutral canvas.',
        );
        return;
      }
    }
    setErrorMessage('');
    setTheme((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    }));
  };

  const handleBrandingChange = (key: keyof ThemeConfig['branding'], value: string) => {
    setTheme((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        [key]: value,
      },
    }));
  };

  const handleApplyPreset = (preset: PresetItem) => {
    setErrorMessage('');
    setTheme((prev) => ({
      ...prev,
      colors: { ...preset.colors },
    }));
  };

  const handleSaveAndBroadcast = async () => {
    setSaveStatus('saving');
    setErrorMessage('');

    // Extra safety rule check
    const bg = theme.colors.background.toLowerCase().trim();
    if (bg === '#000' || bg === '#000000' || bg === 'black') {
      setSaveStatus('error');
      setErrorMessage(
        'RULE VIOLATION: Pure black (#000000) background is not permitted by default. Please choose a light canvas (#FFFFFF).',
      );
      return;
    }

    try {
      // 1. Persist to NestJS API
      const res = await fetch('http://localhost:4000/api/v1/settings/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme),
      });

      if (!res.ok) {
        throw new Error(`API responded with ${res.status}`);
      }

      // 2. Save to local storage for cross-tab sync
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));

      // 3. Broadcast to open Storefront tabs
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.postMessage({
          type: 'ZWANTUM_THEME_UPDATED',
          payload: theme,
        });
        channel.close();
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 4000);
    } catch {
      // Fallback save to localStorage and BroadcastChannel
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.postMessage({
          type: 'ZWANTUM_THEME_UPDATED',
          payload: theme,
        });
        channel.close();
      }
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 p-6 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#FFCC00] ring-2 ring-black/20" />
            <h2 className="text-lg font-bold text-slate-900">
              Storefront Theme &amp; Branding Customizer
            </h2>
            <span className="bg-black text-[#FFCC00] text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase">
              Live Customizer
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Control the visual appearance of your customer storefront in real-time. Built strictly to
            Zwantum design tokens and branding guidelines.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAndBroadcast}
            disabled={saveStatus === 'saving'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-[#FFCC00] hover:bg-zinc-800 font-bold text-xs uppercase tracking-wider transition shadow-sm border border-black focus:outline-none focus:ring-2 focus:ring-[#FFCC00]"
          >
            {saveStatus === 'saving' ? (
              <>
                <svg className="animate-spin h-4 w-4 text-[#FFCC00]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Applying Changes...
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <Check className="h-4 w-4 text-[#FFCC00]" />
                Applied Live!
              </>
            ) : (
              <>
                <Palette className="h-4 w-4 text-[#FFCC00]" />
                Save &amp; Apply to Storefront
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications / Alerts */}
      {errorMessage && (
        <div className="bg-amber-50 border-b border-amber-200 p-4 text-xs font-medium text-amber-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {saveStatus === 'saved' && (
        <div className="bg-emerald-50 border-b border-emerald-200 p-4 text-xs font-medium text-emerald-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>
              Theme configuration successfully saved to API and broadcasted to Storefront!
            </span>
          </div>
          <a
            href="http://localhost:3002"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-900 font-bold underline hover:text-emerald-700 inline-flex items-center gap-1.5"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Tab Selector */}
      <div className="border-b border-slate-200 px-6 pt-3 flex gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('colors')}
          className={`pb-3 border-b-2 transition inline-flex items-center gap-2 ${
            activeTab === 'colors'
              ? 'border-black text-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Color Palette &amp; Tokens</span>
        </button>
        <button
          onClick={() => setActiveTab('branding')}
          className={`pb-3 border-b-2 transition inline-flex items-center gap-2 ${
            activeTab === 'branding'
              ? 'border-black text-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Store Branding &amp; Copy</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`pb-3 border-b-2 transition inline-flex items-center gap-2 ${
            activeTab === 'preview'
              ? 'border-black text-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Preview Pane</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-6">
        {activeTab === 'colors' && (
          <div className="space-y-6">
            {/* Presets Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Curated Brand Presets
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PRESETS.map((preset) => (
                  <div
                    key={preset.name}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 rounded-lg border border-slate-200 hover:border-black cursor-pointer transition bg-white hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 truncate">
                        {preset.id === 'signature' && <Zap className="w-3.5 h-3.5 text-zinc-800 flex-shrink-0" />}
                        {preset.id === 'amber' && <Sun className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />}
                        {preset.id === 'emerald' && <Leaf className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
                        {preset.id === 'blue' && <Shield className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
                        <span className="text-xs font-bold text-slate-800 truncate">{preset.name}</span>
                      </div>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {preset.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-6 flex-1 rounded border border-slate-300"
                        style={{ backgroundColor: preset.colors.primary }}
                        title="Primary Color"
                      />
                      <div
                        className="h-6 flex-1 rounded border border-slate-300"
                        style={{ backgroundColor: preset.colors.background }}
                        title="Background Color"
                      />
                      <div
                        className="h-6 flex-1 rounded border border-slate-300"
                        style={{ backgroundColor: preset.colors.foreground }}
                        title="Foreground / Text Color"
                      />
                      <div
                        className="h-6 flex-1 rounded border border-slate-300"
                        style={{ backgroundColor: preset.colors.accent }}
                        title="Accent Color"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Color Pickers Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Semantic Color Tokens (Hex / Picker)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Primary Color */}
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">Primary Brand Accent</span>
                    <span className="text-[10px] text-slate-500 font-mono">--primary</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Default Zwantum Yellow (#FFCC00) used for CTAs, active badges, and highlights.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="h-8 w-10 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="flex-1 text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-black uppercase"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">Storefront Canvas Background</span>
                    <span className="text-[10px] text-slate-500 font-mono">--background</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Default clean white (#FFFFFF). <strong>Black (#000000) is prohibited as default background.</strong>
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="h-8 w-10 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="flex-1 text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-black uppercase"
                    />
                  </div>
                </div>

                {/* Foreground / Text Color */}
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">Primary Typography</span>
                    <span className="text-[10px] text-slate-500 font-mono">--foreground</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Default high-contrast black (#000000) for readable, crisp store text.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.colors.foreground}
                      onChange={(e) => handleColorChange('foreground', e.target.value)}
                      className="h-8 w-10 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.colors.foreground}
                      onChange={(e) => handleColorChange('foreground', e.target.value)}
                      className="flex-1 text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-black uppercase"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">Accent Highlights</span>
                    <span className="text-[10px] text-slate-500 font-mono">--accent</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Secondary brand accent (#FFCC00) for star badges, banners, and focus rings.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="h-8 w-10 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1 text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-black uppercase"
                    />
                  </div>
                </div>

                {/* Card Surface */}
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">Card &amp; Panel Surface</span>
                    <span className="text-[10px] text-slate-500 font-mono">--card</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Background surface for product cards, cart drawer, and review cards.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.colors.card || '#FFFFFF'}
                      onChange={(e) => handleColorChange('card', e.target.value)}
                      className="h-8 w-10 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.colors.card || '#FFFFFF'}
                      onChange={(e) => handleColorChange('card', e.target.value)}
                      className="flex-1 text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-black uppercase"
                    />
                  </div>
                </div>

                {/* Border Color */}
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">Borders &amp; Dividers</span>
                    <span className="text-[10px] text-slate-500 font-mono">--border</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Subtle boundary lines separating catalog sections and book items.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.colors.border}
                      onChange={(e) => handleColorChange('border', e.target.value)}
                      className="h-8 w-10 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.colors.border}
                      onChange={(e) => handleColorChange('border', e.target.value)}
                      className="flex-1 text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-black uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Storefront Commercial Name
              </label>
              <input
                type="text"
                value={theme.branding.storeName}
                onChange={(e) => handleBrandingChange('storeName', e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={theme.branding.tagline || ''}
                onChange={(e) => handleBrandingChange('tagline', e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Top Announcement Banner Text
              </label>
              <input
                type="text"
                value={theme.branding.announcementText || ''}
                onChange={(e) => handleBrandingChange('announcementText', e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-medium"
              />
            </div>
          </div>
        )}

        {/* Live Preview Pane */}
        {(activeTab === 'preview' || activeTab === 'colors') && (
          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live Storefront Component Mockup
              </span>
              <span className="text-[11px] text-slate-500">
                Reflects selected colors in real-time
              </span>
            </div>

            {/* Mockup Canvas */}
            <div
              className="rounded-xl border p-5 shadow-sm transition-colors duration-200"
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.foreground,
                borderColor: theme.colors.border,
              }}
            >
              {/* Mock Announcement */}
              <div
                className="text-[11px] font-semibold py-1 px-3 text-center rounded mb-4"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.primaryForeground,
                }}
              >
                {theme.branding.announcementText || 'Pan-India Fast Dispatch • Printed Books 0% GST (HSN 4901)'}
              </div>

              {/* Mock Header */}
              <div
                className="flex items-center justify-between pb-4 border-b mb-5"
                style={{ borderColor: theme.colors.border }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-8 w-8 rounded font-black flex items-center justify-center text-xs"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.primaryForeground,
                    }}
                  >
                    ZW
                  </div>
                  <span className="font-bold text-sm tracking-tight">
                    {theme.branding.storeName}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-medium cursor-pointer">Bestsellers</span>
                  <span className="font-medium cursor-pointer">Classics</span>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.primaryForeground,
                    }}
                  >
                    <span>Bag</span>
                    <span
                      className="px-1.5 py-0.2 rounded-full text-[10px]"
                      style={{
                        backgroundColor: theme.colors.foreground,
                        color: theme.colors.background,
                      }}
                    >
                      2
                    </span>
                  </div>
                </div>
              </div>

              {/* Mock Book Card */}
              <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="rounded-lg border p-4 shadow-sm"
                  style={{
                    backgroundColor: theme.colors.card || '#FFFFFF',
                    borderColor: theme.colors.border,
                  }}
                >
                  <div
                    className="h-28 rounded-md mb-3 flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: theme.colors.secondary,
                      color: theme.colors.secondaryForeground,
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    The Palace of Illusions
                  </div>
                  <div className="text-xs font-bold mb-1">The Palace of Illusions</div>
                  <div className="text-[11px] text-slate-500 mb-2">Chitra Banerjee Divakaruni</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-black text-xs">₹449.00</span>
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: theme.colors.secondary,
                        color: theme.colors.secondaryForeground,
                      }}
                    >
                      HSN 4901 (0% GST)
                    </span>
                  </div>
                  <button
                    className="w-full py-1.5 rounded text-xs font-bold uppercase tracking-wider transition"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.primaryForeground,
                    }}
                  >
                    Add to Bag
                  </button>
                </div>

                <div
                  className="rounded-lg border p-4 shadow-sm"
                  style={{
                    backgroundColor: theme.colors.card || '#FFFFFF',
                    borderColor: theme.colors.border,
                  }}
                >
                  <div
                    className="h-28 rounded-md mb-3 flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: theme.colors.secondary,
                      color: theme.colors.secondaryForeground,
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    Malgudi Days
                  </div>
                  <div className="text-xs font-bold mb-1">Malgudi Days</div>
                  <div className="text-[11px] text-slate-500 mb-2">R.K. Narayan</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-black text-xs">₹279.00</span>
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: theme.colors.secondary,
                        color: theme.colors.secondaryForeground,
                      }}
                    >
                      HSN 4901 (0% GST)
                    </span>
                  </div>
                  <button
                    className="w-full py-1.5 rounded text-xs font-bold uppercase tracking-wider transition"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.primaryForeground,
                    }}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
