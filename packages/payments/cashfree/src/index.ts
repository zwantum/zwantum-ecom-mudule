import type {
  PaymentProvider,
  PaymentCapabilities,
  InitiatePaymentInput,
  InitiatePaymentResult,
  VerifyPaymentInput,
  PaymentReconciliationResult,
  WebhookEventResult,
  ProcessRefundInput,
  ProcessRefundResult,
} from '@zwantum/payment-contract';

export interface CashfreeConfig {
  appId: string;
  secretKey: string;
  apiVersion?: string;
  environment?: 'TEST' | 'PRODUCTION';
}

export class CashfreePaymentProvider implements PaymentProvider {
  public readonly id = 'cashfree';
  public readonly capabilities: PaymentCapabilities = {
    supportsUPI: true,
    supportsNetbanking: true,
    supportsCards: true,
    supportsRefunds: true,
    supportsPartialRefunds: true,
    supportsWebhooks: true,
  };

  constructor(private readonly config: CashfreeConfig) {}

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    return {
      gatewayOrderId: `cf_order_${input.orderId}`,
      amountPaise: input.amountPaise,
      currency: input.currency,
      metadata: { appId: this.config.appId },
    };
  }

  async verifyPayment(
    input: VerifyPaymentInput
  ): Promise<{ isValid: boolean; status: 'CAPTURED' | 'FAILED' }> {
    return {
      isValid: Boolean(input.paymentId),
      status: 'CAPTURED',
    };
  }

  async getPaymentStatus(gatewayOrderId: string): Promise<PaymentReconciliationResult> {
    return {
      gatewayOrderId,
      status: 'CAPTURED',
      amountPaidPaise: 0,
    };
  }

  async handleWebhook(_payload: string | Buffer, _signature: string): Promise<WebhookEventResult> {
    return {
      isAuthentic: true,
      eventType: 'PAYMENT_SUCCESS_WEBHOOK',
    };
  }

  async refundPayment(input: ProcessRefundInput): Promise<ProcessRefundResult> {
    return {
      refundId: `cf_refund_${input.paymentId}`,
      amountPaise: input.amountPaise,
      status: 'PROCESSED',
    };
  }
}
