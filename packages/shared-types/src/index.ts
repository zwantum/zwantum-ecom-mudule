/**
 * @zwantum/shared-types
 * Core domain types and contracts shared across all Zwantum commerce applications and packages.
 */

// --- Currency & Money (stored strictly as integer paise/smallest unit) ---
export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | string;

export interface Money {
  /** Amount in integer paise (e.g., ₹100.50 is represented as 10050) */
  amount: number;
  currency: CurrencyCode;
}

// --- Indian Geography & Address ---
export interface IndianAddress {
  fullName: string;
  /** Indian mobile number in E.164 (+91XXXXXXXXXX) or standard 10-digit format */
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  district?: string;
  /** 6-digit Indian Postal Identification Number */
  pincode: string;
  state: string;
  stateCode?: string; // 2-digit GST state code e.g., '07' for Delhi
  countryCode: 'IN' | string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}

// --- Indian Taxation & GST ---
export type GSTTaxType = 'CGST' | 'SGST' | 'IGST' | 'UTGST' | 'CESS';

export interface TaxComponent {
  type: GSTTaxType;
  ratePercent: number;
  amountPaise: number;
}

export interface TaxBreakdown {
  isInterState: boolean;
  totalTaxPaise: number;
  hsnCode?: string;
  components: TaxComponent[];
}

export interface GSTInvoiceDetails {
  invoiceNumber: string;
  invoiceDate: string;
  sellerGstin: string;
  buyerGstin?: string;
  placeOfSupply: string;
  reverseCharge: boolean;
  hsnCode: string;
  taxableAmountPaise: number;
  taxBreakdown: TaxBreakdown;
  totalAmountPaise: number;
}

// --- Roles & Identity ---
export type UserRole = 'SUPER_ADMIN' | 'STORE_ADMIN' | 'STORE_MANAGER' | 'STAFF' | 'CUSTOMER';

export interface BaseEntity {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  storeId?: string;
}

export interface Customer extends BaseEntity {
  storeId: string;
  email?: string;
  phone: string;
  firstName: string;
  lastName?: string;
  isGuest: boolean;
  defaultAddressId?: string;
}

// --- Catalog ---
export interface Product extends BaseEntity {
  storeId: string;
  title: string;
  slug: string;
  description?: string;
  hsnCode?: string;
  isActive: boolean;
  categoryId?: string;
  images: string[];
  variants: ProductVariant[];
}

export interface ProductVariant extends BaseEntity {
  productId: string;
  sku: string;
  title: string;
  pricePaise: number;
  compareAtPricePaise?: number;
  inventoryQuantity: number;
  weightGrams?: number;
  options: Record<string, string>;
}

export interface Category extends BaseEntity {
  storeId: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

// --- Cart & Checkout ---
export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  quantity: number;
  unitPricePaise: number;
  title: string;
  image?: string;
}

export interface Cart {
  id: string;
  storeId: string;
  customerId?: string;
  items: CartItem[];
  subtotalPaise: number;
  discountPaise: number;
  estimatedTaxPaise: number;
  estimatedShippingPaise: number;
  totalPaise: number;
}

// --- Orders & Statuses ---
export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURN_REQUESTED'
  | 'RETURNED'
  | 'REFUNDED';

export type PaymentMethodType = 'UPI' | 'NETBANKING' | 'CARD' | 'WALLET' | 'COD';

export type PaymentStatus =
  'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';

export interface OrderItem {
  id: string;
  orderId: string;
  variantId: string;
  productId: string;
  title: string;
  sku: string;
  hsnCode?: string;
  quantity: number;
  unitPricePaise: number;
  taxPaise: number;
  discountPaise: number;
  totalPaise: number;
}

export interface Order extends BaseEntity {
  storeId: string;
  orderNumber: string;
  customerId?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethodType;
  shippingAddress: IndianAddress;
  billingAddress: IndianAddress;
  subtotalPaise: number;
  discountPaise: number;
  shippingChargePaise: number;
  taxPaise: number;
  totalPaise: number;
  items: OrderItem[];
  notes?: string;
}

// --- Shipping & Logistics (India-First with Shiprocket/Manual) ---
export type ShipmentStatus =
  | 'MANIFESTED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'NDR' // Non-Delivery Report (customer unreachable/address issue)
  | 'RTO_INITIATED' // Return To Origin
  | 'RTO_DELIVERED'
  | 'CANCELLED';

export interface TrackingEvent {
  status: ShipmentStatus;
  statusText: string;
  location?: string;
  timestamp: string;
}

export interface ShipmentDetails {
  id: string;
  orderId: string;
  provider: 'SHIPROCKET' | 'MANUAL' | string;
  trackingNumber: string;
  awbCode?: string;
  courierName?: string;
  status: ShipmentStatus;
  events: TrackingEvent[];
}

// --- Module System Contracts ---
export interface ModuleManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  dependencies?: Record<string, string>;
  permissions?: string[];
  settingsSchema?: Record<string, unknown>;
}
