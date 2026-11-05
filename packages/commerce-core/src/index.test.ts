import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatINR,
  rupeesToPaise,
  paiseToRupees,
  calculateIndianGST,
  canTransitionOrderStatus,
  evaluateCODFreight,
} from './index.js';

describe('@zwantum/commerce-core', () => {
  it('converts rupees to paise and vice-versa accurately', () => {
    assert.equal(rupeesToPaise(499.5), 49950);
    assert.equal(paiseToRupees(49950), 499.5);
    assert.match(formatINR(49950), /₹\s*499\.50/);
  });

  it('calculates intra-state GST (CGST + SGST split equally)', () => {
    // Seller in Delhi (07), Buyer in Delhi (07)
    const result = calculateIndianGST({
      amountPaise: 11800, // ₹118.00 inclusive of 18% GST
      ratePercent: 18,
      sellerStateCode: '07',
      buyerStateCode: '07',
      isPriceInclusiveOfTax: true,
    });

    assert.equal(result.taxBreakdown.isInterState, false);
    assert.equal(result.taxableAmountPaise, 10000); // ₹100.00
    assert.equal(result.taxBreakdown.totalTaxPaise, 1800); // ₹18.00
    assert.equal(result.taxBreakdown.components.length, 2);

    const cgst = result.taxBreakdown.components.find((c) => c.type === 'CGST');
    const sgst = result.taxBreakdown.components.find((c) => c.type === 'SGST');

    assert.ok(cgst && sgst);
    assert.equal(cgst.ratePercent, 9);
    assert.equal(cgst.amountPaise, 900);
    assert.equal(sgst.ratePercent, 9);
    assert.equal(sgst.amountPaise, 900);
  });

  it('calculates inter-state GST (100% IGST)', () => {
    // Seller in Delhi (07), Buyer in Maharashtra (27)
    const result = calculateIndianGST({
      amountPaise: 11800,
      ratePercent: 18,
      sellerStateCode: '07',
      buyerStateCode: '27',
      isPriceInclusiveOfTax: true,
    });

    assert.equal(result.taxBreakdown.isInterState, true);
    assert.equal(result.taxableAmountPaise, 10000);
    assert.equal(result.taxBreakdown.totalTaxPaise, 1800);
    assert.equal(result.taxBreakdown.components.length, 1);

    const igst = result.taxBreakdown.components[0];
    assert.equal(igst?.type, 'IGST');
    assert.equal(igst?.ratePercent, 18);
    assert.equal(igst?.amountPaise, 1800);
  });

  it('validates order status state machine transitions', () => {
    // Allowed transitions
    assert.equal(canTransitionOrderStatus('PENDING', 'CONFIRMED'), true);
    assert.equal(canTransitionOrderStatus('CONFIRMED', 'PROCESSING'), true);
    assert.equal(canTransitionOrderStatus('PROCESSING', 'SHIPPED'), true);
    assert.equal(canTransitionOrderStatus('SHIPPED', 'DELIVERED'), true);

    // Disallowed illegal transitions
    assert.equal(canTransitionOrderStatus('DELIVERED', 'PENDING'), false);
    assert.equal(canTransitionOrderStatus('CANCELLED', 'SHIPPED'), false);
    assert.equal(canTransitionOrderStatus('REFUNDED', 'CONFIRMED'), false);
  });

  it('evaluates COD eligibility and fee rules correctly', () => {
    const policy = {
      maxOrderAmountPaise: 500000, // ₹5,000 max limit
      codFeePaise: 5000, // ₹50 convenience fee
      blockedPincodes: ['110099'],
    };

    // Standard eligible order
    const eligibleResult = evaluateCODFreight(200000, '110001', policy);
    assert.equal(eligibleResult.eligible, true);
    assert.equal(eligibleResult.feePaise, 5000);

    // Exceeds max ceiling (₹6,000 > ₹5,000)
    const exceedResult = evaluateCODFreight(600000, '110001', policy);
    assert.equal(exceedResult.eligible, false);

    // Blocked unserviceable PIN code
    const blockedResult = evaluateCODFreight(200000, '110099', policy);
    assert.equal(blockedResult.eligible, false);
  });
});
