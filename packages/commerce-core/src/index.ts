import type { OrderStatus, TaxBreakdown, TaxComponent } from '@zwantum/shared-types';

/**
 * @zwantum/commerce-core
 * Core domain algorithms, GST tax engine, currency formatters,
 * and order state machines for Zwantum Commerce.
 */

// --- Currency & Paise Formatter ---
export function formatINR(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rupees);
}

export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

export function paiseToRupees(paise: number): number {
  return paise / 100;
}

// --- Indian GST Calculation Engine ---
export interface GSTCalculationInput {
  amountPaise: number;
  ratePercent: number; // e.g. 5, 12, 18, 28
  sellerStateCode: string; // 2-digit Indian State code e.g. '07' (Delhi)
  buyerStateCode: string; // 2-digit Indian State code e.g. '27' (Maharashtra)
  isPriceInclusiveOfTax?: boolean;
  hsnCode?: string;
}

export interface GSTCalculationResult {
  taxableAmountPaise: number;
  taxBreakdown: TaxBreakdown;
  totalAmountPaise: number;
}

export function calculateIndianGST(input: GSTCalculationInput): GSTCalculationResult {
  const {
    amountPaise,
    ratePercent,
    sellerStateCode,
    buyerStateCode,
    isPriceInclusiveOfTax = true,
    hsnCode,
  } = input;

  const isInterState = sellerStateCode.trim() !== buyerStateCode.trim();

  let taxableAmountPaise: number;
  let totalTaxPaise: number;

  if (isPriceInclusiveOfTax) {
    // Formula: Taxable = Total / (1 + Rate / 100)
    taxableAmountPaise = Math.round((amountPaise * 100) / (100 + ratePercent));
    totalTaxPaise = amountPaise - taxableAmountPaise;
  } else {
    taxableAmountPaise = amountPaise;
    totalTaxPaise = Math.round((amountPaise * ratePercent) / 100);
  }

  const components: TaxComponent[] = [];

  if (isInterState) {
    // Inter-state supply: IGST applied
    components.push({
      type: 'IGST',
      ratePercent,
      amountPaise: totalTaxPaise,
    });
  } else {
    // Intra-state supply: Split equally between CGST and SGST
    const halfRate = ratePercent / 2;
    const halfTaxPaise = Math.floor(totalTaxPaise / 2);
    const remainder = totalTaxPaise - halfTaxPaise * 2;

    components.push({
      type: 'CGST',
      ratePercent: halfRate,
      amountPaise: halfTaxPaise + remainder,
    });
    components.push({
      type: 'SGST',
      ratePercent: halfRate,
      amountPaise: halfTaxPaise,
    });
  }

  return {
    taxableAmountPaise,
    taxBreakdown: {
      isInterState,
      totalTaxPaise,
      hsnCode,
      components,
    },
    totalAmountPaise: taxableAmountPaise + totalTaxPaise,
  };
}

// --- Order State Machine ---
const VALID_ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['OUT_FOR_DELIVERY', 'DELIVERED', 'RETURN_REQUESTED'],
  OUT_FOR_DELIVERY: ['DELIVERED', 'SHIPPED'],
  DELIVERED: ['RETURN_REQUESTED'],
  RETURN_REQUESTED: ['RETURNED', 'DELIVERED'],
  RETURNED: ['REFUNDED'],
  REFUNDED: [],
  CANCELLED: [],
};

export function canTransitionOrderStatus(current: OrderStatus, target: OrderStatus): boolean {
  const allowed = VALID_ORDER_TRANSITIONS[current];
  return allowed ? allowed.includes(target) : false;
}

// --- COD Feasibility Engine ---
export interface CODPolicy {
  maxOrderAmountPaise: number;
  codFeePaise: number;
  blockedPincodes?: string[];
}

export function evaluateCODFreight(
  orderTotalPaise: number,
  shippingPincode: string,
  policy: CODPolicy
): { eligible: boolean; feePaise: number; reason?: string } {
  if (policy.blockedPincodes?.includes(shippingPincode)) {
    return {
      eligible: false,
      feePaise: 0,
      reason: 'Cash on Delivery is unserviceable in this PIN code area',
    };
  }

  if (orderTotalPaise > policy.maxOrderAmountPaise) {
    return {
      eligible: false,
      feePaise: 0,
      reason: `Cash on Delivery is limited to orders up to ${formatINR(policy.maxOrderAmountPaise)}`,
    };
  }

  return {
    eligible: true,
    feePaise: policy.codFeePaise,
  };
}
