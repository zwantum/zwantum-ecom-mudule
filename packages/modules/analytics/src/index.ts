import { defineCommerceModule, type CommerceModule } from '@zwantum/module-sdk';

export interface AnalyticsConfig {
  trackPageViews: boolean;
  trackCartEvents: boolean;
  trackCheckoutEvents: boolean;
}

export const analyticsModule: CommerceModule<AnalyticsConfig> =
  defineCommerceModule<AnalyticsConfig>({
    manifest: {
      id: 'module-analytics',
      name: 'Commerce Analytics & Events',
      version: '1.0.0',
      description: 'Tracks storefront customer funnel events and sales conversion metrics.',
      author: 'Zwantum Commerce Team',
      permissions: ['analytics:read'],
    },
    getAdminNavigation() {
      return [
        {
          id: 'analytics-dashboard',
          label: 'Analytics',
          path: '/admin/modules/analytics',
          requiredPermission: 'audit:read',
        },
      ];
    },
  });

export default analyticsModule;
