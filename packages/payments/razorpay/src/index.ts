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

export interface RazorpayConfig {
  keyId: string;
  keySecret: string;
  webhookSecret?: string;
}

export class RazorpayPaymentProvider implements PaymentProvider {
  public readonly id = 'razorpay';
  public readonly capabilities: PaymentCapabilities = {
    supportsUPI: true,
    supportsNetbanking: true,
    supportsCards: true,
    supportsRefunds: true,
    supportsPartialRefunds: true,
    supportsWebhooks: true,
  };

  constructor(private readonly config: RazorpayConfig) {}

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    // Scaffold implementation conforming strictly to provider contract
    return {
      gatewayOrderId: `rzp_order_${input.orderId}`,
      amountPaise: input.amountPaise,
      currency: input.currency,
      metadata: { keyId: this.config.keyId },
    };
  }

  async verifyPayment(
    input: VerifyPaymentInput
  ): Promise<{ isValid: boolean; status: 'CAPTURED' | 'FAILED' }> {
    return {
      isValid: Boolean(input.paymentId && input.signature),
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
      eventType: 'payment.captured',
    };
  }

  async refundPayment(input: ProcessRefundInput): Promise<ProcessRefundResult> {
    return {
      refundId: `rfnd_${input.paymentId}`,
      amountPaise: input.amountPaise,
      status: 'PROCESSED',
    };
  }
}
