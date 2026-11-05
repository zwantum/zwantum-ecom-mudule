import { defineCommerceModule, type CommerceModule } from '@zwantum/module-sdk';

export interface ReviewsConfig {
  autoApprove: boolean;
  verifiedBuyerOnly: boolean;
}

export const reviewsModule: CommerceModule<ReviewsConfig> = defineCommerceModule<ReviewsConfig>({
  manifest: {
    id: 'module-reviews',
    name: 'Product Reviews & Ratings',
    version: '1.0.0',
    description: 'Allows verified buyers to submit star ratings and detailed reviews.',
    author: 'Zwantum Commerce Team',
    permissions: ['product:reviews:read', 'product:reviews:manage'],
  },
  getAdminNavigation() {
    return [
      {
        id: 'reviews-management',
        label: 'Reviews',
        path: '/admin/modules/reviews',
        requiredPermission: 'product:read',
      },
    ];
  },
});

export default reviewsModule;
