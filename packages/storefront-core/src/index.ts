import type { Cart, CartItem, Product } from '@zwantum/shared-types';

/**
 * @zwantum/storefront-core
 * State contracts and API client interfaces for Next.js storefront applications.
 */

export interface StorefrontCartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
}

export interface StorefrontApiClient {
  getProducts(params?: { categorySlug?: string; limit?: number; page?: number }): Promise<{
    items: Product[];
    total: number;
  }>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getCart(): Promise<Cart>;
  addToCart(variantId: string, quantity: number): Promise<Cart>;
  checkout(sessionData: unknown): Promise<{ orderId: string; redirectUrl?: string }>;
}
