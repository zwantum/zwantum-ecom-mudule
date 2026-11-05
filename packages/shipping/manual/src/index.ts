import type {
  ShippingProvider,
  ServiceabilityCheckInput,
  ServiceabilityResult,
  CreateShipmentInput,
  CreateShipmentResult,
  TrackingResult,
} from '@zwantum/shipping-contract';

export class ManualShippingProvider implements ShippingProvider {
  public readonly id = 'manual';

  async checkServiceability(_input: ServiceabilityCheckInput): Promise<ServiceabilityResult> {
    return {
      isServiceable: true,
      estimatedDeliveryDays: 2,
      availableCouriers: [
        {
          courierName: 'Store Self Delivery / Local Courier',
          courierCompanyId: 'manual',
          ratePaise: 0,
          etdDays: 2,
          codAvailable: true,
        },
      ],
    };
  }

  async createShipment(input: CreateShipmentInput): Promise<CreateShipmentResult> {
    return {
      shipmentId: `manual_${input.orderId}`,
      awbCode: `LOCAL_${Date.now()}`,
      courierName: 'Merchant Local Fleet',
      status: 'MANIFESTED',
    };
  }

  async trackShipment(awbCode: string): Promise<TrackingResult> {
    return {
      shipmentId: `manual_${awbCode}`,
      awbCode,
      currentStatus: 'MANIFESTED',
      history: [
        {
          status: 'MANIFESTED',
          statusText: 'Manual shipment scheduled by store staff',
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }

  async cancelShipment(_awbCode: string): Promise<{ isCancelled: boolean; reason?: string }> {
    return {
      isCancelled: true,
    };
  }
}
