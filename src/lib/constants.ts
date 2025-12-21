// Location-specific configuration
export const LOCATION_DETAILS = {
  'xjkoaljr': { name: 'Brooklyn Maids', domain: 'brooklynmaids.com', agent: 'Brooklyn Team' },
  'default': { name: 'Brooklyn Maids', domain: 'brooklynmaids.com', agent: 'Brooklyn Team' }
};

// Pricing configuration
export const BASE_PRICES = {
  bedrooms: {
    'Studio': 70,
    '1': 80,
    '2': 120,
    '3': 160,
    '4': 200,
    '5': 240,
    '5+': 240,
    '6': 280
  },
  bathrooms: {
    '1': 80,
    '1.5': 100,
    '2': 120,
    '2.5': 140,
    '3': 160,
    '3.5': 180,
    '4': 200,
    '4+': 200,
    '5': 240,
    '6': 280
  },
  squareFootage: {
    'Under 1,000 sqft': 20,
    '1,000-2,000 sqft': 60,
    '2,000+': 100,
    '3,000+ sqft': 100
  },
  services: {
    'standard': 0,
    'deep': 100,
    'super': 250,
    'move-out': 150,
    'post-construction': 0
  }
};

// Add-on pricing with included services
export const ADDON_PRICES: Record<string, number | { price: number; included: string[] }> = {
  'organization': { price: 40, included: [] },
  'insideFridge': { price: 40, included: [] },
  'insideOven': { price: 40, included: [] },
  'bedroomBathroomCabinets': { price: 40, included: ['move-out'] },
  'insideKitchenCabinets': { price: 40, included: [] },
  'interiorWindows': { price: 30, included: ['move-out'] },
  'microwave': { price: 20, included: [] },
  'dishes': { price: 40, included: [] },
  'laundry': { price: 30, included: [] },
  'hardwood': { price: 40, included: [] },
  'basementCleaning': { price: 100, included: [] },
  'petCleaning': { price: 20, included: [] },
  'wallStainRemoval': { price: 20, included: ['deep', 'move-out'] },
  'baseboardCleaning': { price: 40, included: ['deep', 'move-out'] },
  'officeCleaning': { price: 50, included: [] },
  'townhouse': { price: 100, included: [] },
  'extraHour': { price: 80, included: [] },
  'washerDryer': { price: 80, included: [] },
  'movingServices': { price: 150, included: [] },
  'handymanServices': { price: 100, included: [] }
};

// Message templates
export const MESSAGE_TEMPLATES = {
  standardInclusions: 'This includes all bedroom(s), bathroom(s), common areas and kitchen, but appliance cleaning like inside the fridge or oven is not included.',
  deepCleanDescription: '',
  superCleanDescription: 'Our super deep clean is extremely comprehensive, it includes more time to clean dirt, stains, wipe down doors, frames, windowsills and baseboards, plus removes smells of smoke and dust.',
  recurringDeepCleanAdvice: 'If you want our recurring service, we recommend a deep clean the first time, and then follow-up standard cleans.',
  moveOutInclusions: 'This includes cleaning the bedroom(s), bathroom(s), common areas and kitchen surfaces, inside cabinets, stain removal, window and baseboard cleaning but does not include appliance cleaning like inside the fridge or oven.',
};

// Phone numbers configuration
export const PHONE_NUMBERS = {
  'xjkoaljr': '+13477504380',  // Brooklyn Maids form
  'default': '+13477504380'    // Default to Brooklyn Maids number
};
