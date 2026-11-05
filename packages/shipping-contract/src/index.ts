import type { IndianAddress, ShipmentStatus, TrackingEvent } from '@zwantum/shared-types';

/**
 * @zwantum/shipping-contract
 * Standardized shipping provider contract supporting PIN-code serviceability,
 * rate computation, AWB assignment, tracking, and NDR/RTO handling.
 */

export interface ServiceabilityCheckInput {
  originPincode: string;
  deliveryPincode: string;
  isCod: boolean;
  weightGrams: number;
}

export interface ServiceabilityResult {
  isServiceable: boolean;
  estimatedDeliveryDays?: number;
  availableCouriers: {
    courierName: string;
    courierCompanyId: number | string;
    ratePaise: number;
    etdDays: number;
    codAvailable: boolean;
  }[];
}

export interface CreateShipmentInput {
  orderId: string;
  orderNumber: string;
  shippingAddress: IndianAddress;
  items: {
    title: string;
    sku: string;
    quantity: number;
    pricePaise: number;
  }[];
  isCod: boolean;
  codAmountPaise?: number;
  totalWeightGrams: number;
  originPincode: string;
}

export interface CreateShipmentResult {
  shipmentId: string;
  awbCode: string;
  courierName: string;
  labelUrl?: string;
  status: ShipmentStatus;
}

export interface TrackingResult {
  shipmentId: string;
  awbCode: string;
  currentStatus: ShipmentStatus;
  estimatedDeliveryDate?: string;
  history: TrackingEvent[];
}

export interface NDRResolutionInput {
  awbCode: string;
  action: 'REATTEMPT' | 'RETURN_TO_ORIGIN' | 'RESCHEDULE';
  nextAttemptDate?: string;
  updatedPhone?: string;
  comments?: string;
}

export interface ShippingProvider {
  readonly id: string;

  checkServiceability(input: ServiceabilityCheckInput): Promise<ServiceabilityResult>;
  createShipment(input: CreateShipmentInput): Promise<CreateShipmentResult>;
  trackShipment(awbCode: string): Promise<TrackingResult>;
  cancelShipment(awbCode: string): Promise<{ isCancelled: boolean; reason?: string }>;
  resolveNDR?(input: NDRResolutionInput): Promise<{ isSuccess: boolean }>;
}
