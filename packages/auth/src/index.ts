import type { UserRole } from '@zwantum/shared-types';

/**
 * @zwantum/auth
 * Role-Based Access Control (RBAC), Permission Matrix,
 * and Token Payload definitions.
 */

export const Permissions = {
  // Storefront & Customer
  CUSTOMER_READ: 'customer:read',
  CUSTOMER_WRITE: 'customer:write',
  ORDER_READ: 'order:read',
  ORDER_WRITE: 'order:write',

  // Catalog
  PRODUCT_READ: 'product:read',
  PRODUCT_WRITE: 'product:write',
  CATEGORY_READ: 'category:read',
  CATEGORY_WRITE: 'category:write',
  INVENTORY_READ: 'inventory:read',
  INVENTORY_WRITE: 'inventory:write',

  // Operations
  PAYMENT_MANAGE: 'payment:manage',
  SHIPPING_MANAGE: 'shipping:manage',
  RETURN_MANAGE: 'return:manage',
  DISCOUNT_MANAGE: 'discount:manage',

  // Settings & Administration
  SETTINGS_READ: 'settings:read',
  SETTINGS_WRITE: 'settings:write',
  STAFF_MANAGE: 'staff:manage',
  AUDIT_READ: 'audit:read',
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];

const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  SUPER_ADMIN: Object.values(Permissions),
  STORE_ADMIN: [
    Permissions.CUSTOMER_READ,
    Permissions.CUSTOMER_WRITE,
    Permissions.ORDER_READ,
    Permissions.ORDER_WRITE,
    Permissions.PRODUCT_READ,
    Permissions.PRODUCT_WRITE,
    Permissions.CATEGORY_READ,
    Permissions.CATEGORY_WRITE,
    Permissions.INVENTORY_READ,
    Permissions.INVENTORY_WRITE,
    Permissions.PAYMENT_MANAGE,
    Permissions.SHIPPING_MANAGE,
    Permissions.RETURN_MANAGE,
    Permissions.DISCOUNT_MANAGE,
    Permissions.SETTINGS_READ,
    Permissions.SETTINGS_WRITE,
    Permissions.STAFF_MANAGE,
    Permissions.AUDIT_READ,
  ],
  STORE_MANAGER: [
    Permissions.CUSTOMER_READ,
    Permissions.ORDER_READ,
    Permissions.ORDER_WRITE,
    Permissions.PRODUCT_READ,
    Permissions.PRODUCT_WRITE,
    Permissions.CATEGORY_READ,
    Permissions.INVENTORY_READ,
    Permissions.INVENTORY_WRITE,
    Permissions.RETURN_MANAGE,
    Permissions.DISCOUNT_MANAGE,
    Permissions.SETTINGS_READ,
  ],
  STAFF: [
    Permissions.CUSTOMER_READ,
    Permissions.ORDER_READ,
    Permissions.PRODUCT_READ,
    Permissions.INVENTORY_READ,
  ],
  CUSTOMER: [Permissions.CUSTOMER_READ, Permissions.ORDER_READ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  storeId?: string;
  iat?: number;
  exp?: number;
}
