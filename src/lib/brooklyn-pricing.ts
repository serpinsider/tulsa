/**
 * Brooklyn Maids Pricing Logic
 * Matches OpenPhone Bot exactly - DO NOT MODIFY without updating bot
 */

// Bedroom Pricing
export const BEDROOM_PRICES: Record<string, number> = {
  'Studio': 70,
  '1': 80,
  '2': 120,
  '3': 160,
  '4': 200,
  '5': 240,
};

// Bathroom Pricing
export const BATHROOM_PRICES: Record<string, number> = {
  '1': 80,
  '1.5': 100,
  '2': 120,
  '2.5': 140,
  '3': 160,
  '3.5': 180,
  '4': 200,
};

// Square Footage Pricing
export const SQUARE_FOOTAGE_PRICES: Record<string, number> = {
  'Under 1,000 sqft': 20,
  '1,000-2,000 sqft': 60,
  '3,000+ sqft': 100,
};

// Service Types
export const CLEANING_TYPES = [
  { id: 'standard', name: 'Standard Clean', description: 'Regular maintenance cleaning', serviceCharge: 0 },
  { id: 'deep', name: 'Deep Clean', description: 'Thorough deep cleaning', serviceCharge: 100 },
  { id: 'super', name: 'Super Clean', description: 'Ultimate deep clean', serviceCharge: 250 },
  { id: 'moveout', name: 'Move Out Clean', description: 'Complete move-out cleaning', serviceCharge: 150 },
];

// Add-on Prices (matches OpenPhone bot exactly)
export const ADDON_PRICES: Record<string, number> = {
  basementCleaning: 100,
  bedroomBathroomCabinets: 40,
  baseboardCleaning: 40,
  wallStainRemoval: 20,
  dishes: 40,
  hardwood: 40,
  insideFridge: 40,
  insideOven: 40,
  insideKitchenCabinets: 40,
  interiorWindows: 40,
  laundry: 40,
  petCleaning: 40,
  tileAndGrout: 40,
  washerDryer: 40,
  extraHour: 60,
};

// Add-on Labels
export const ADDON_LABELS: Record<string, string> = {
  insideFridge: 'Inside Fridge',
  insideOven: 'Inside Oven',
  insideKitchenCabinets: 'Inside Kitchen Cabinets',
  bedroomBathroomCabinets: 'Bedroom/Bathroom Cabinets',
  interiorWindows: 'Interior Windows',
  dishes: 'Dishes',
  laundry: 'Laundry',
  baseboardCleaning: 'Baseboard Cleaning',
  wallStainRemoval: 'Wall Stain Removal',
  tileAndGrout: 'Tile & Grout',
  washerDryer: 'Washer/Dryer',
  basementCleaning: 'Basement Cleaning',
  petCleaning: 'Pet Cleaning',
  hardwood: 'Hardwood Floor Polish',
  extraHour: 'Extra Hour',
};

// Frequency Discounts
export const FREQUENCY_DISCOUNTS: Record<string, number> = {
  'one_time': 0,
  'One Time': 0,
  'weekly': 0.15,
  'Weekly': 0.15,
  'bi_weekly': 0.10,
  'Bi-Weekly': 0.10,
  'monthly': 0.05,
  'Monthly': 0.05,
};

export interface PricingResult {
  basePrice: number;
  addonTotal: number;
  subtotal: number;
  discount: number;
  total: number;
}

/**
 * Calculate price based on selections
 */
export function calculateBrooklynPrice(
  bedrooms: string,
  bathrooms: string,
  squareFootage: string,
  serviceType: string,
  addons: Record<string, boolean>,
  frequency: string = 'one_time'
): PricingResult {
  // Base price calculation
  const bedroomPrice = BEDROOM_PRICES[bedrooms] || 0;
  const bathroomPrice = BATHROOM_PRICES[bathrooms] || 0;
  const squareFootagePrice = SQUARE_FOOTAGE_PRICES[squareFootage] || 0;
  
  const serviceTypeObj = CLEANING_TYPES.find(type => type.id === serviceType);
  const serviceCharge = serviceTypeObj?.serviceCharge || 0;

  const basePrice = bedroomPrice + bathroomPrice + squareFootagePrice + serviceCharge;

  // Add-ons total
  let addonTotal = 0;
  Object.entries(addons).forEach(([key, value]) => {
    if (value && ADDON_PRICES[key]) {
      addonTotal += ADDON_PRICES[key];
    }
  });

  const subtotal = basePrice + addonTotal;

  // Frequency discount
  const discountRate = FREQUENCY_DISCOUNTS[frequency] || 0;
  const discount = Math.round(subtotal * discountRate);
  const total = subtotal - discount;

  return {
    basePrice,
    addonTotal,
    subtotal,
    discount,
    total,
  };
}


