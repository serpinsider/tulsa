export type ServiceType = 'Standard Clean' | 'Deep Clean' | 'Super Clean' | 'Move Out' | 'Post Construction';

// Location-specific configuration
export const LOCATION_DETAILS = {
  'xjkoaljr': { name: 'SacTown Shine', domain: 'sactownshine.com', agent: 'Sarah' },
  'default': { name: 'SacTown Shine', domain: 'sactownshine.com', agent: 'Sarah' }
};

// Pricing configuration
export const BASE_PRICES = {
  bedrooms: {
    'Studio': 70, '1': 80, '2': 120, '3': 160, '4': 200, '5': 240, '5+': 240, '6': 280
  },
  bathrooms: {
    '1': 80, '1.5': 100, '2': 120, '2.5': 140, '3': 160, '3.5': 180, '4': 200, '4+': 200, '5': 240, '6': 280
  },
  squareFootage: {
    'Under 1,000 sqft': 20, '1,000-2,000 sqft': 60, '2,000+': 100, '3,000+ sqft': 100
  },
  services: {
    'Standard Clean': 0, 'Deep Clean': 100, 'Super Clean': 250, 'Move Out': 150, 'Post Construction': 0
  }
};

// Add-on pricing
export const ADDON_PRICES = {
  'organization': 40, 'insideFridge': 40, 'insideOven': 40, 'bedroomBathroomCabinets': 40,
  'insideKitchenCabinets': 40, 'interiorWindows': 30, 'microwave': 20, 'dishes': 40,
  'laundry': 30, 'hardwood': 40, 'basementCleaning': 100, 'petCleaning': 20,
  'wallStainRemoval': 20, 'baseboardCleaning': 40, 'officeCleaning': 50, 'townhouse': 100,
  'extraHour': 80, 'washerDryer': 80, 'movingServices': 150, 'handymanServices': 100,
  'deepCleaning': 0, 'moveInOut': 0, 'superCleaning': 0
};

export type BedroomType = keyof typeof BASE_PRICES.bedrooms;
export type BathroomType = keyof typeof BASE_PRICES.bathrooms;
export type CleanType = keyof typeof BASE_PRICES.services;

export function calculatePrice(bedrooms: BedroomType, bathrooms: BathroomType, cleanType: CleanType): number {
  const bedroomPrice = BASE_PRICES.bedrooms[bedrooms];
  const bathroomPrice = BASE_PRICES.bathrooms[bathrooms];

  if (bedroomPrice === undefined || bathroomPrice === undefined) {
    return 0; // Or throw new Error('Contact for pricing');
  }

  let total = bedroomPrice + bathroomPrice;

  if (cleanType !== 'Standard Clean') {
    total += BASE_PRICES.services[cleanType] || 0;
  }
  return total;
}

export function calculateDiscount(total: number, discountType: string): { finalPrice: number; percentage: number } {
  let percentage = 0;
  switch (discountType) {
    case 'WELCOME':
      percentage = 20;
      break;
    case 'WEEKLY':
      percentage = 10;
      break;
    case 'BIWEEKLY':
      percentage = 5;
      break;
    default:
      percentage = 0;
  }
  
  const finalPrice = Math.round(total * (1 - percentage / 100));
  return { finalPrice, percentage };
}