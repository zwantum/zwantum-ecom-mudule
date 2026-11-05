import type {
  ShippingProvider,
  ServiceabilityCheckInput,
  ServiceabilityResult,
  CreateShipmentInput,
  CreateShipmentResult,
  TrackingResult,
  NDRResolutionInput,
} from '@zwantum/shipping-contract';

export interface ShiprocketConfig {
  apiEmail: string;
  apiPassword: string;
  pickupLocation?: string;
}

export class ShiprocketShippingProvider implements ShippingProvider {
  public readonly id = 'shiprocket';

  constructor(private readonly config: ShiprocketConfig) {}

  async checkServiceability(input: ServiceabilityCheckInput): Promise<ServiceabilityResult> {
    return {
      isServiceable: true,
      estimatedDeliveryDays: 3,
      availableCouriers: [
        {
          courierName: 'Delhivery Surface',
          courierCompanyId: 10,
          ratePaise: 4500, // ₹45.00
          etdDays: 3,
          codAvailable: input.isCod,
        },
      ],
    };
  }

  async createShipment(input: CreateShipmentInput): Promise<CreateShipmentResult> {
    return {
      shipmentId: `sr_ship_${input.orderId}`,
      awbCode: `AWB_${Date.now()}`,
      courierName: 'Delhivery Surface',
      status: 'MANIFESTED',
    };
  }

  async trackShipment(awbCode: string): Promise<TrackingResult> {
    return {
      shipmentId: `sr_track_${awbCode}`,
      awbCode,
      currentStatus: 'IN_TRANSIT',
      history: [
        {
          status: 'MANIFESTED',
          statusText: 'Shipment info received',
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }

  async cancelShipment(awbCode: string): Promise<{ isCancelled: boolean; reason?: string }> {
    return {
      isCancelled: true,
    };
  }

  async resolveNDR(input: NDRResolutionInput): Promise<{ isSuccess: boolean }> {
    return {
      isSuccess: true,
    };
  }
}
