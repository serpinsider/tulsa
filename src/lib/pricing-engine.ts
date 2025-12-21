// Comprehensive Pricing Engine
// Replicates BookingKoala pricing logic
// Now pulls pricing from centralized API

import { calculateAddOnsTotal, calculateTotalTime } from '@/config/add-ons';
import { getSalesTaxRate, getFrequencyDiscount } from '@/config/service-config';
import { getPricing } from './pricing-client';

export interface PricingInput {
  // Base service info
  bedrooms: number;
  bathrooms: number;
  squareFeet: string; // e.g., "1 - 999 Sq Ft"
  serviceType: string;
  frequency: string;
  siteLocation: string; // "brooklyn" or "philadelphia"
  
  // Add-ons
  selectedAddOns: string[]; // array of add-on IDs
  
  // Discounts
  promoCode?: string;
  referralDiscount?: number;
  
  // Additional fees
  tipAmount?: number;
  parkingFee?: number;
  bonusAmount?: number;
  rescheduleFee?: number;
  expeditedFee?: number;
  serviceFee?: number;
  
  // Manual adjustment
  priceAdjustment?: number;
  priceAdjustmentComment?: string;
}

export interface PricingBreakdown {
  // Base pricing
  basePrice: number;
  
  // Add-ons
  addOnsTotal: number;
  addOnsDetails: Array<{ name: string; price: number }>;
  
  // Subtotal before discounts
  subtotalBeforeDiscounts: number;
  
  // Discounts
  discountFromCode: number;
  discountFromFrequency: number;
  discountFromReferral: number;
  totalDiscount: number;
  
  // Subtotal after discounts, before tax
  subtotalAfterDiscounts: number;
  
  // Tax
  salesTax: number;
  salesTaxRate: number;
  
  // Additional fees
  tipAmount: number;
  parkingFee: number;
  bonusAmount: number;
  rescheduleFee: number;
  expeditedFee: number;
  serviceFee: number;
  
  // Manual adjustment
  priceAdjustment: number;
  priceAdjustmentComment: string;
  
  // Final total
  finalAmount: number;
  
  // For provider
  providerPaymentBase: number; // Base amount provider gets (typically 50-70% of subtotal)
  
  // Time estimate
  estimatedMinutes: number;
  estimatedHours: number;
}

/**
 * Calculate base price based on bedrooms, bathrooms, sqft, and service type
 * Now uses centralized pricing from API
 */
async function calculateBasePrice(
  bedrooms: number,
  bathrooms: number,
  squareFeet: string,
  serviceType: string,
  businessName: string = 'brooklyn_maids'
): Promise<number> {
  // Get pricing from API
  const pricing = await getPricing(businessName);
  
  // Bedroom pricing
  const bedroomPrices: Record<number, number> = {
    0: pricing.studioPrice,
    1: pricing.bed1Price,
    2: pricing.bed2Price,
    3: pricing.bed3Price,
    4: pricing.bed4Price,
    5: pricing.bed5Price,
    6: pricing.bed6Price,
  };
  const bedroomPrice = bedroomPrices[bedrooms] || pricing.bed6Price;
  
  // Bathroom pricing (handle decimals for 1.5, 2.5, etc.)
  const bathroomPrices: Record<string, number> = {
    '1': pricing.bath1Price,
    '1.5': pricing.bath15Price,
    '2': pricing.bath2Price,
    '2.5': pricing.bath25Price,
    '3': pricing.bath3Price,
    '4': pricing.bath4Price,
    '5': pricing.bath5Price,
    '6': pricing.bath6Price,
  };
  const bathroomPrice = bathroomPrices[bathrooms.toString()] || 
                        bathroomPrices[Math.ceil(bathrooms).toString()] || 
                        pricing.bath1Price;
  
  // Square footage pricing
  const sqftPrices: Record<string, number> = {
    '1 - 999 Sq Ft': pricing.sqftUnder1000,
    'Under 1,000 sqft': pricing.sqftUnder1000,
    '1,000-2,000 sqft': pricing.sqft1000to2000,
    '2,000+': pricing.sqft2000Plus,
    'Studio': 0,
  };
  const sqftPrice = sqftPrices[squareFeet] || 0;
  
  // Service type upgrade pricing
  const servicePrices: Record<string, number> = {
    'Standard Cleaning': 0,
    'Residential Cleaning Services': 0,
    'House Cleaning': 0,
    'Deep Cleaning': pricing.deepCleanUpgrade,
    'One-Time/Deep Cleaning 1-999 sq ft': pricing.deepCleanUpgrade,
    'Move In / Out Cleaning Package': pricing.moveOutUpgrade,
    'Spring Deep Clean': pricing.deepCleanUpgrade,
    'Super Clean': pricing.superCleanUpgrade,
  };
  const serviceUpgrade = servicePrices[serviceType] || 0;
  
  // Base calculation: Bedroom + Bathroom + SqFt + Service Upgrade
  const totalBase = bedroomPrice + bathroomPrice + sqftPrice + serviceUpgrade;
  
  return totalBase;
}

/**
 * Calculate estimated time in minutes
 */
function calculateEstimatedTime(
  bedrooms: number,
  bathrooms: number,
  squareFeet: string,
  serviceType: string,
  selectedAddOns: string[]
): number {
  // Base time: 30 min per bedroom, 20 min per bathroom
  const baseTime = (bedrooms * 30) + (bathrooms * 20);
  
  // Square footage time addition
  const sqftTime: Record<string, number> = {
    '1 - 999 Sq Ft': 0,
    'Under 1,000 sqft': 0,
    '1,000-2,000 sqft': 30,
    '2,000+': 60,
    'Studio': -15,
  };
  
  const additionalSqftTime = sqftTime[squareFeet] || 0;
  
  // Service type time modifier
  const serviceTime: Record<string, number> = {
    'Standard Cleaning': 0,
    'Residential Cleaning Services': 0,
    'Deep Cleaning': 60,
    'Move In / Out Cleaning Package': 120,
    'Spring Deep Clean': 90,
    'Hourly Service - Specific Areas': -30,
  };
  
  const additionalServiceTime = serviceTime[serviceType] || 0;
  
  // Add-ons time
  const totalTime = calculateTotalTime(
    baseTime + additionalSqftTime + additionalServiceTime,
    selectedAddOns
  );
  
  return totalTime;
}

/**
 * Validate and apply promo code
 * This is a placeholder - implement actual promo code validation
 */
async function validatePromoCode(
  code: string,
  subtotal: number
): Promise<number> {
  // Common promo codes
  const promoCodes: Record<string, { type: 'percent' | 'fixed'; value: number }> = {
    'FTP25': { type: 'percent', value: 0.25 }, // First time person 25% off
    'WELCOME20': { type: 'percent', value: 0.20 },
    'SAVE10': { type: 'fixed', value: 10 },
    'SPRING15': { type: 'percent', value: 0.15 },
  };
  
  const promo = promoCodes[code.toUpperCase()];
  if (!promo) return 0;
  
  if (promo.type === 'percent') {
    return subtotal * promo.value;
  } else {
    return promo.value;
  }
}

/**
 * Calculate provider payment (typically 50-70% of service total)
 * Now uses centralized provider rate from API
 */
async function calculateProviderPayment(
  subtotalAfterDiscounts: number,
  addOnsTotal: number,
  businessName: string = 'brooklyn_maids'
): Promise<number> {
  // Get provider rate from pricing API
  const pricing = await getPricing(businessName);
  return subtotalAfterDiscounts * pricing.providerRate;
}

/**
 * Main pricing calculation function
 */
export async function calculatePricing(input: PricingInput, businessName: string = 'brooklyn_maids'): Promise<PricingBreakdown> {
  // 1. Calculate base price from centralized pricing API
  const basePrice = await calculateBasePrice(
    input.bedrooms,
    input.bathrooms,
    input.squareFeet,
    input.serviceType,
    businessName
  );
  
  // 2. Calculate add-ons
  const addOnsTotal = calculateAddOnsTotal(input.selectedAddOns);
  const { getAddOn } = await import('@/config/add-ons');
  const addOnsDetails = input.selectedAddOns.map(id => {
    const addon = getAddOn(id);
    return {
      name: addon?.name || id,
      price: addon?.price || 0,
    };
  });
  
  // 3. Subtotal before discounts
  const subtotalBeforeDiscounts = basePrice + addOnsTotal;
  
  // 4. Calculate discounts
  let discountFromCode = 0;
  if (input.promoCode) {
    discountFromCode = await validatePromoCode(input.promoCode, subtotalBeforeDiscounts);
  }
  
  const frequencyDiscountRate = getFrequencyDiscount(input.frequency);
  const discountFromFrequency = subtotalBeforeDiscounts * frequencyDiscountRate;
  
  const discountFromReferral = input.referralDiscount || 0;
  
  const totalDiscount = discountFromCode + discountFromFrequency + discountFromReferral;
  
  // 5. Subtotal after discounts
  const subtotalAfterDiscounts = subtotalBeforeDiscounts - totalDiscount;
  
  // 6. Calculate sales tax from centralized pricing
  const pricing = await getPricing(businessName);
  const salesTaxRate = pricing.salesTaxRate;
  const salesTax = subtotalAfterDiscounts * salesTaxRate;
  
  // 7. Additional fees
  const tipAmount = input.tipAmount || 0;
  const parkingFee = input.parkingFee || 0;
  const bonusAmount = input.bonusAmount || 0;
  const rescheduleFee = input.rescheduleFee || 0;
  const expeditedFee = input.expeditedFee || 0;
  const serviceFee = input.serviceFee || 0;
  
  // 8. Manual price adjustment
  const priceAdjustment = input.priceAdjustment || 0;
  const priceAdjustmentComment = input.priceAdjustmentComment || '';
  
  // 9. Final amount
  const finalAmount = 
    subtotalAfterDiscounts +
    salesTax +
    tipAmount +
    parkingFee +
    bonusAmount +
    rescheduleFee +
    expeditedFee +
    serviceFee +
    priceAdjustment;
  
  // 10. Provider payment from centralized pricing
  const providerPaymentBase = await calculateProviderPayment(subtotalAfterDiscounts, addOnsTotal, businessName);
  
  // 11. Time estimate
  const estimatedMinutes = calculateEstimatedTime(
    input.bedrooms,
    input.bathrooms,
    input.squareFeet,
    input.serviceType,
    input.selectedAddOns
  );
  const estimatedHours = Math.round((estimatedMinutes / 60) * 10) / 10; // Round to 1 decimal
  
  return {
    basePrice,
    addOnsTotal,
    addOnsDetails,
    subtotalBeforeDiscounts,
    discountFromCode,
    discountFromFrequency,
    discountFromReferral,
    totalDiscount,
    subtotalAfterDiscounts,
    salesTax,
    salesTaxRate,
    tipAmount,
    parkingFee,
    bonusAmount,
    rescheduleFee,
    expeditedFee,
    serviceFee,
    priceAdjustment,
    priceAdjustmentComment,
    finalAmount,
    providerPaymentBase,
    estimatedMinutes,
    estimatedHours,
  };
}

/**
 * Format pricing breakdown for display
 */
export function formatPricingBreakdown(breakdown: PricingBreakdown): string {
  const lines = [];
  
  lines.push(`Base Service: $${breakdown.basePrice.toFixed(2)}`);
  
  if (breakdown.addOnsTotal > 0) {
    lines.push(`Add-ons:`);
    breakdown.addOnsDetails.forEach(addon => {
      lines.push(`  - ${addon.name}: $${addon.price.toFixed(2)}`);
    });
    lines.push(`Add-ons Total: $${breakdown.addOnsTotal.toFixed(2)}`);
  }
  
  lines.push(`Subtotal: $${breakdown.subtotalBeforeDiscounts.toFixed(2)}`);
  
  if (breakdown.totalDiscount > 0) {
    lines.push(`Discounts:`);
    if (breakdown.discountFromCode > 0) {
      lines.push(`  - Promo Code: -$${breakdown.discountFromCode.toFixed(2)}`);
    }
    if (breakdown.discountFromFrequency > 0) {
      lines.push(`  - Frequency Discount: -$${breakdown.discountFromFrequency.toFixed(2)}`);
    }
    if (breakdown.discountFromReferral > 0) {
      lines.push(`  - Referral Discount: -$${breakdown.discountFromReferral.toFixed(2)}`);
    }
    lines.push(`Total Discount: -$${breakdown.totalDiscount.toFixed(2)}`);
  }
  
  lines.push(`Subtotal After Discounts: $${breakdown.subtotalAfterDiscounts.toFixed(2)}`);
  lines.push(`Sales Tax (${(breakdown.salesTaxRate * 100).toFixed(2)}%): $${breakdown.salesTax.toFixed(2)}`);
  
  if (breakdown.tipAmount > 0) lines.push(`Tip: $${breakdown.tipAmount.toFixed(2)}`);
  if (breakdown.parkingFee > 0) lines.push(`Parking: $${breakdown.parkingFee.toFixed(2)}`);
  if (breakdown.bonusAmount > 0) lines.push(`Bonus: $${breakdown.bonusAmount.toFixed(2)}`);
  if (breakdown.rescheduleFee > 0) lines.push(`Reschedule Fee: $${breakdown.rescheduleFee.toFixed(2)}`);
  if (breakdown.expeditedFee > 0) lines.push(`Expedited Fee: $${breakdown.expeditedFee.toFixed(2)}`);
  if (breakdown.serviceFee > 0) lines.push(`Service Fee: $${breakdown.serviceFee.toFixed(2)}`);
  if (breakdown.priceAdjustment !== 0) {
    lines.push(`Price Adjustment: ${breakdown.priceAdjustment > 0 ? '+' : ''}$${breakdown.priceAdjustment.toFixed(2)}`);
    if (breakdown.priceAdjustmentComment) {
      lines.push(`  (${breakdown.priceAdjustmentComment})`);
    }
  }
  
  lines.push(`\n**TOTAL: $${breakdown.finalAmount.toFixed(2)}**`);
  lines.push(`\nEstimated Time: ${Math.floor(breakdown.estimatedMinutes / 60)}h ${breakdown.estimatedMinutes % 60}m`);
  lines.push(`Provider Payment: $${breakdown.providerPaymentBase.toFixed(2)}`);
  
  return lines.join('\n');
}

