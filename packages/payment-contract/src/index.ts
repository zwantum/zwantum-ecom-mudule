import type { PaymentStatus } from '@zwantum/shared-types';

/**
 * @zwantum/payment-contract
 * Standardized payment provider interface supporting India-first methods
 * (UPI, Netbanking, Cards, Wallets, COD) with status reconciliation & webhook handling.
 */

export interface PaymentCapabilities {
  supportsUPI: boolean;
  supportsNetbanking: boolean;
  supportsCards: boolean;
  supportsRefunds: boolean;
  supportsPartialRefunds: boolean;
  supportsWebhooks: boolean;
}

export interface InitiatePaymentInput {
  orderId: string;
  orderNumber: string;
  amountPaise: number;
  currency: string;
  customer: {
    name: string;
    email?: string;
    phone: string;
  };
  notes?: Record<string, string>;
}

export interface InitiatePaymentResult {
  gatewayOrderId: string;
  paymentSessionId?: string;
  amountPaise: number;
  currency: string;
  paymentUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface VerifyPaymentInput {
  orderId: string;
  gatewayOrderId: string;
  paymentId: string;
  signature?: string;
}

export interface PaymentReconciliationResult {
  gatewayOrderId: string;
  paymentId?: string;
  status: PaymentStatus;
  amountPaidPaise: number;
  method?: string;
  errorMessage?: string;
  rawResponse?: unknown;
}

export interface ProcessRefundInput {
  orderId: string;
  paymentId: string;
  amountPaise: number;
  reason?: string;
}

export interface ProcessRefundResult {
  refundId: string;
  amountPaise: number;
  status: 'PENDING' | 'PROCESSED' | 'FAILED';
}

export interface WebhookEventResult {
  isAuthentic: boolean;
  eventType: string;
  orderId?: string;
  gatewayOrderId?: string;
  paymentId?: string;
  status?: PaymentStatus;
  amountPaise?: number;
}

export interface PaymentProvider {
  readonly id: string;
  readonly capabilities: PaymentCapabilities;

  initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentResult>;
  verifyPayment(input: VerifyPaymentInput): Promise<{ isValid: boolean; status: PaymentStatus }>;
  getPaymentStatus(gatewayOrderId: string): Promise<PaymentReconciliationResult>;
  handleWebhook(payload: string | Buffer, signature: string): Promise<WebhookEventResult>;
  refundPayment(input: ProcessRefundInput): Promise<ProcessRefundResult>;
}
