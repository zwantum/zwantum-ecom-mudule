'use client';

import React from 'react';
import { useTheme } from './theme-provider';

export function StorefrontFooter() {
  const { theme } = useTheme();

  return (
    <footer
      className="border-t pt-12 pb-8 transition-colors duration-200"
      style={{
        backgroundColor: theme.colors.secondary || '#FAFAFA',
        color: theme.colors.foreground,
        borderColor: theme.colors.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b"
          style={{ borderColor: theme.colors.border }}
        >
          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center font-black text-xs border"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.primaryForeground,
                  borderColor: theme.colors.border,
                }}
              >
                ZW
              </div>
              <span className="font-black text-lg tracking-tight">
                {theme.branding.storeName}
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Engineered on the Zwantum Commerce Modular Monolith architecture. Purpose-built
              for modern Indian commerce with multi-state GST, Shiprocket logistics, and instant UPI.
            </p>
            <div
              className="inline-block px-2.5 py-1 rounded text-[10px] font-bold border"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.primaryForeground,
                borderColor: theme.colors.border,
              }}
            >
              India-First White-Label Engine
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-zinc-900">
              Literary Categories
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li className="hover:text-black cursor-pointer font-medium">National Bestsellers</li>
              <li className="hover:text-black cursor-pointer font-medium">Sahitya Akademi Awardees</li>
              <li className="hover:text-black cursor-pointer font-medium">Ancient Epics &amp; Philosophy</li>
              <li className="hover:text-black cursor-pointer font-medium">Contemporary Indian Fiction</li>
              <li className="hover:text-black cursor-pointer font-medium">Collector Hardcover Editions</li>
            </ul>
          </div>

          {/* India Fulfillment */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-zinc-900">
              Pan-India Fulfillment
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>&bull; Shiprocket Aggregation (19,000+ PIN Codes)</li>
              <li>&bull; Cash on Delivery (COD) Verified</li>
              <li>&bull; Printed Books (HSN 4901): 0% GST Exempt</li>
              <li>&bull; Integer Paise Exact Calculation Engine</li>
              <li>&bull; Dispatch within 24 Hours from Delhi &amp; Mumbai</li>
            </ul>
          </div>

          {/* Business & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-zinc-900">
              Regulatory Disclosures
            </h4>
            <p className="text-xs text-zinc-600 mb-3">
              Compliant with the Digital Personal Data Protection (DPDP) Act 2023, Consumer Protection
              (E-Commerce) Rules 2020, and GST invoicing norms.
            </p>
            <div className="flex gap-2">
              <span className="text-[11px] font-mono bg-zinc-200 text-zinc-800 px-2 py-1 rounded font-bold">
                HSN 4901
              </span>
              <span className="text-[11px] font-mono bg-zinc-200 text-zinc-800 px-2 py-1 rounded font-bold">
                INR (₹)
              </span>
              <span className="text-[11px] font-mono bg-zinc-200 text-zinc-800 px-2 py-1 rounded font-bold">
                COD
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {theme.branding.storeName}. Powered by{' '}
            <span className="font-black text-black">Zwantum Commerce Engine</span>.
          </div>
          <div className="flex space-x-6 text-zinc-600 font-medium">
            <span className="hover:text-black cursor-pointer">DPDP Act Compliance</span>
            <span className="hover:text-black cursor-pointer">Return &amp; Refund Policy</span>
            <span className="hover:text-black cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
