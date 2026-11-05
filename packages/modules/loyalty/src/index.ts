import { defineCommerceModule, type CommerceModule } from '@zwantum/module-sdk';

export interface LoyaltyConfig {
  pointsPerRupee: number;
  redemptionRatePaisePerPoint: number;
  minimumPointsToRedeem: number;
}

export const loyaltyModule: CommerceModule<LoyaltyConfig> = defineCommerceModule<LoyaltyConfig>({
  manifest: {
    id: 'module-loyalty',
    name: 'Customer Loyalty & Rewards',
    version: '1.0.0',
    description: 'Points accumulation and redemption system for customer retention.',
    author: 'Zwantum Commerce Team',
    permissions: ['customer:loyalty:read', 'customer:loyalty:manage'],
  },
  getAdminNavigation() {
    return [
      {
        id: 'loyalty-programs',
        label: 'Loyalty & Rewards',
        path: '/admin/modules/loyalty',
        requiredPermission: 'customer:read',
      },
    ];
  },
});

export default loyaltyModule;
