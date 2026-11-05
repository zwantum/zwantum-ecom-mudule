import { z } from 'zod';

/**
 * @zwantum/validation
 * Production-ready Zod validation schemas for commerce operations,
 * specifically tailored for Indian commerce patterns and extensible globally.
 */

// --- Indian Regex Standards ---
export const INDIAN_PHONE_REGEX = /^(?:(?:\+|00)91[\s-]?)?[6789]\d{9}$/;
export const INDIAN_PINCODE_REGEX = /^[1-9][0-9]{5}$/;
export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const HSN_SAC_REGEX = /^[0-9]{4,8}$/;

// --- Phone and Address Validation ---
export const indianPhoneSchema = z
  .string()
  .trim()
  .regex(INDIAN_PHONE_REGEX, { message: 'Invalid Indian mobile phone number (+91)' });

export const indianPincodeSchema = z
  .string()
  .trim()
  .regex(INDIAN_PINCODE_REGEX, { message: 'PIN code must be a valid 6-digit Indian postal code' });

export const gstinSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(GSTIN_REGEX, { message: 'Invalid 15-character GSTIN format' });

export const hsnCodeSchema = z
  .string()
  .trim()
  .regex(HSN_SAC_REGEX, { message: 'HSN/SAC code must be 4, 6, or 8 digits' });

export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  phone: indianPhoneSchema,
  addressLine1: z.string().min(5, 'Address line 1 must be at least 5 characters').max(200),
  addressLine2: z.string().max(200).optional(),
  landmark: z.string().max(100).optional(),
  city: z.string().min(2, 'City must be specified').max(100),
  district: z.string().max(100).optional(),
  pincode: indianPincodeSchema,
  state: z.string().min(2, 'State must be specified').max(100),
  stateCode: z.string().length(2, 'State code must be 2 digits (e.g. 07, 27)').optional(),
  countryCode: z.string().default('IN'),
  isDefaultShipping: z.boolean().default(false),
  isDefaultBilling: z.boolean().default(false),
});

// --- Customer Schemas ---
export const customerRegistrationSchema = z.object({
  phone: indianPhoneSchema,
  email: z.string().email('Invalid email address').optional(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().max(50).optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
});

export const customerLoginSchema = z.object({
  identifier: z.string().min(1, 'Phone or email is required'),
  password: z.string().min(1, 'Password is required'),
});

// --- Catalog Schemas ---
export const productVariantSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  title: z.string().min(1, 'Variant title is required'),
  pricePaise: z.number().int().nonnegative('Price must be non-negative integer paise'),
  compareAtPricePaise: z.number().int().nonnegative().optional(),
  inventoryQuantity: z.number().int().nonnegative().default(0),
  weightGrams: z.number().int().nonnegative().optional(),
  options: z.record(z.string()).default({}),
});

export const createProductSchema = z.object({
  title: z.string().min(2, 'Product title is required').max(255),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid URL slug'),
  description: z.string().optional(),
  hsnCode: hsnCodeSchema.optional(),
  categoryId: z.string().uuid().optional(),
  isActive: z.boolean().default(true),
  images: z.array(z.string().url()).default([]),
  variants: z.array(productVariantSchema).min(1, 'At least one variant is required'),
});

// --- Cart & Checkout Schemas ---
export const addToCartSchema = z.object({
  variantId: z.string().min(1, 'Variant ID is required'),
  quantity: z.number().int().positive('Quantity must be greater than 0').max(100),
});

export const checkoutSessionSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  paymentMethod: z.enum(['UPI', 'NETBANKING', 'CARD', 'WALLET', 'COD']),
  customerGstin: gstinSchema.optional(),
  orderNotes: z.string().max(500).optional(),
});

// --- Inferred Types ---
export type AddressInput = z.infer<typeof addressSchema>;
export type CustomerRegistrationInput = z.infer<typeof customerRegistrationSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type CheckoutSessionInput = z.infer<typeof checkoutSessionSchema>;
