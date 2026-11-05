import { defineCommerceModule, type CommerceModule } from '@zwantum/module-sdk';

export interface WishlistConfig {
  maxItemsPerCustomer: number;
  allowGuestWishlist: boolean;
}

export const wishlistModule: CommerceModule<WishlistConfig> = defineCommerceModule<WishlistConfig>({
  manifest: {
    id: 'module-wishlist',
    name: 'Customer Wishlist',
    version: '1.0.0',
    description: 'Enables customers to save products to a persistent wishlist.',
    author: 'Zwantum Commerce Team',
    permissions: ['customer:wishlist:read', 'customer:wishlist:write'],
  },
  getAdminNavigation() {
    return [
      {
        id: 'wishlist-settings',
        label: 'Wishlists',
        path: '/admin/modules/wishlist',
        requiredPermission: 'customer:read',
      },
    ];
  },
});

export default wishlistModule;
