'use client';

import React from 'react';
import { useTheme } from './theme-provider';
import { formatINR } from '@zwantum/commerce-core';
import { Lock } from './icons';

export interface CartItem {
  id: string;
  title: string;
  author: string;
  format: string;
  pricePaise: number;
  quantity: number;
  hsnCode: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const subtotalPaise = items.reduce(
    (sum, item) => sum + item.pricePaise * item.quantity,
    0,
  );
  const isFreeShipping = subtotalPaise >= 49900; // Free above ₹499
  const shippingPaise = isFreeShipping || items.length === 0 ? 0 : 4900; // ₹49.00
  const gstPaise = 0; // Printed books (HSN 4901) are 0% GST exempt
  const totalPaise = subtotalPaise + shippingPaise + gstPaise;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md shadow-2xl flex flex-col transition-colors duration-200"
          style={{
            backgroundColor: theme.colors.card || '#FFFFFF',
            color: theme.colors.foreground,
          }}
        >
          {/* Drawer Header */}
          <div
            className="p-5 border-b flex items-center justify-between"
            style={{ borderColor: theme.colors.border }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <h2 className="text-base font-black tracking-tight">Your Reading Bag</h2>
              <span className="text-xs bg-zinc-100 text-zinc-700 font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-black transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-zinc-50 p-3 text-xs border-b border-zinc-200">
            {isFreeShipping ? (
              <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                You qualified for Free Express Delivery across India!
              </span>
            ) : (
              <span className="text-zinc-600">
                Add{' '}
                <strong className="text-black">{formatINR(49900 - subtotalPaise)}</strong> more to
                unlock Free Pan-India Delivery!
              </span>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-zinc-400">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-sm font-bold text-zinc-600">Your bag is empty</p>
                <p className="text-xs text-zinc-400 mt-1">Explore our curated bookstore collection</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border flex items-center justify-between gap-3 shadow-2xs"
                  style={{ borderColor: theme.colors.border }}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black truncate">{item.title}</h4>
                    <p className="text-[11px] text-zinc-500 truncate">{item.author}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-zinc-100 font-bold px-1.5 py-0.2 rounded text-zinc-700">
                        {item.format}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        HSN: {item.hsnCode}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-black mt-1">
                      {formatINR(item.pricePaise)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-1 text-xs font-bold hover:bg-zinc-100 text-zinc-600"
                      >
                        -
                      </button>
                      <span className="px-2.5 text-xs font-bold text-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-1 text-xs font-bold hover:bg-zinc-100 text-zinc-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[10px] text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Calculations */}
          {items.length > 0 && (
            <div
              className="p-5 border-t space-y-3 bg-zinc-50"
              style={{ borderColor: theme.colors.border }}
            >
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-black">
                    {formatINR(subtotalPaise)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Shipping (Shiprocket Standard)</span>
                  <span className="font-mono font-medium">
                    {shippingPaise === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatINR(shippingPaise)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>GST (Printed Books HSN 4901)</span>
                  <span className="font-mono font-bold text-emerald-700">0% (Exempt)</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-2 border-t border-zinc-200 text-black">
                  <span>Total Payable</span>
                  <span className="font-mono text-base">{formatINR(totalPaise)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-sm transition hover:opacity-90 border flex items-center justify-center gap-2"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.primaryForeground,
                  borderColor: theme.colors.border,
                }}
              >
                <span>Proceed to Instant Checkout &bull; {formatINR(totalPaise)}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <p className="text-[10px] text-center text-zinc-500 font-medium flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3 text-zinc-500" />
                <span>256-Bit SSL Encrypted &bull; UPI &bull; NetBanking &bull; Cards &bull; Cash on Delivery</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

