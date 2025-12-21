/**
 * Zip Code to Business Mapping
 * Maps zip code prefixes to business names for automatic business detection
 */

export type BusinessName = 
  | 'Brooklyn Maids'
  | 'Philly Maids'
  | 'St Louis Maids'
  | 'Asheville Maids'
  | 'Durham Maids'
  | 'Mesa Maids'
  | 'Neat Corner'
  | 'San Jose Maids'
  | 'Concord Maids'
  | 'Pine Maids'
  | 'Berkeley Maids'
  | 'Santa Monica Maids'
  | 'Santa Cruz Maids';

/**
 * Zip code prefix to business mapping
 * Key: First 3 digits of zip code
 * Value: Business name
 */
export const ZIP_TO_BUSINESS_MAP: Record<string, BusinessName> = {
  // NEW YORK - Brooklyn Maids
  // Manhattan: 100xx-104xx
  '100': 'Brooklyn Maids',
  '101': 'Brooklyn Maids',
  '102': 'Brooklyn Maids',
  '103': 'Brooklyn Maids',
  '104': 'Brooklyn Maids',
  
  // Bronx: 104xx
  '104': 'Brooklyn Maids',
  
  // Brooklyn: 112xx
  '112': 'Brooklyn Maids',
  
  // Queens: 110xx-114xx
  '110': 'Brooklyn Maids',
  '111': 'Brooklyn Maids',
  '113': 'Brooklyn Maids',
  '114': 'Brooklyn Maids',
  
  // Staten Island: 103xx
  '103': 'Brooklyn Maids',
  
  // Westchester County
  '105': 'Brooklyn Maids',
  '106': 'Brooklyn Maids',
  '107': 'Brooklyn Maids',
  '108': 'Brooklyn Maids',
  
  // Long Island: 115xx-119xx
  '115': 'Brooklyn Maids',
  '116': 'Brooklyn Maids',
  '117': 'Brooklyn Maids',
  '118': 'Brooklyn Maids',
  '119': 'Brooklyn Maids',
  
  // PENNSYLVANIA - Philly Maids
  // Philadelphia: 190xx-191xx
  '190': 'Philly Maids',
  '191': 'Philly Maids',
  
  // Bucks County: 189xx, 180xx
  '189': 'Philly Maids',
  '180': 'Philly Maids',
  '181': 'Philly Maids',
  
  // Montgomery County: 194xx
  '194': 'Philly Maids',
  
  // Delaware County: 193xx
  '193': 'Philly Maids',
  
  // Chester County: 193xx
  '192': 'Philly Maids',
  
  // MISSOURI - St Louis Maids
  // St Louis: 630xx-641xx
  '630': 'St Louis Maids',
  '631': 'St Louis Maids',
  '632': 'St Louis Maids',
  '633': 'St Louis Maids',
  '634': 'St Louis Maids',
  '635': 'St Louis Maids',
  '636': 'St Louis Maids',
  '637': 'St Louis Maids',
  '638': 'St Louis Maids',
  '639': 'St Louis Maids',
  '640': 'St Louis Maids',
  '641': 'St Louis Maids',
  
  // NORTH CAROLINA - Asheville Maids & Durham Maids
  // Asheville: 288xx
  '288': 'Asheville Maids',
  
  // Durham: 277xx
  '277': 'Durham Maids',
  
  // Raleigh area: 276xx
  '276': 'Durham Maids',
  
  // Chapel Hill: 275xx
  '275': 'Durham Maids',
  
  // ARIZONA - Mesa Maids
  // Phoenix Metro (Mesa, Phoenix, Scottsdale, Tempe, Chandler, Gilbert): 850xx-853xx
  '850': 'Mesa Maids',
  '851': 'Mesa Maids',
  '852': 'Mesa Maids',
  '853': 'Mesa Maids',
  
  // Greater Phoenix Area: 854xx-856xx
  '854': 'Mesa Maids',
  '855': 'Mesa Maids',
  '856': 'Mesa Maids',
  
  // Tucson: 857xx
  '857': 'Mesa Maids',
  
  // NEVADA, TEXAS - Neat Corner
  // Las Vegas: 890xx-891xx
  '890': 'Neat Corner',
  '891': 'Neat Corner',
  '889': 'Neat Corner',
  
  // Texas major cities
  // Austin: 787xx
  '787': 'Neat Corner',
  
  // Dallas: 750xx-753xx
  '750': 'Neat Corner',
  '751': 'Neat Corner',
  '752': 'Neat Corner',
  '753': 'Neat Corner',
  
  // Houston: 770xx-772xx
  '770': 'Neat Corner',
  '771': 'Neat Corner',
  '772': 'Neat Corner',
  
  // San Antonio: 782xx
  '782': 'Neat Corner',
  
  // CALIFORNIA - Multiple Businesses
  
  // San Jose Maids: 951xx
  '951': 'San Jose Maids',
  
  // Concord Maids: 945xx
  '945': 'Concord Maids',
  
  // Berkeley Maids: 947xx
  '947': 'Berkeley Maids',
  
  // Santa Monica Maids: 904xx
  '904': 'Santa Monica Maids',
  
  // Santa Cruz Maids: 950xx
  '950': 'Santa Cruz Maids',
  
  // Pine Maids (assuming Bay Area/Peninsula): 940xx-943xx
  '940': 'Pine Maids',
  '941': 'Pine Maids',
  '942': 'Pine Maids',
  '943': 'Pine Maids',
};

/**
 * Get business name from zip code
 * @param zip - Full zip code (5 digits)
 * @returns Business name or null if not found
 */
export function getBusinessFromZip(zip: string): BusinessName | null {
  if (!zip || zip.length < 3) return null;
  
  // Get first 3 digits
  const prefix = zip.substring(0, 3);
  
  return ZIP_TO_BUSINESS_MAP[prefix] || null;
}

/**
 * Get all zip prefixes for a business
 * @param business - Business name
 * @returns Array of zip code prefixes
 */
export function getZipPrefixesForBusiness(business: BusinessName): string[] {
  return Object.entries(ZIP_TO_BUSINESS_MAP)
    .filter(([_, bizName]) => bizName === business)
    .map(([prefix, _]) => prefix);
}

/**
 * All supported businesses
 */
export const ALL_BUSINESSES: BusinessName[] = [
  'Brooklyn Maids',
  'Philly Maids',
  'St Louis Maids',
  'Asheville Maids',
  'Durham Maids',
  'Mesa Maids',
  'Neat Corner',
  'San Jose Maids',
  'Concord Maids',
  'Pine Maids',
  'Berkeley Maids',
  'Santa Monica Maids',
  'Santa Cruz Maids',
];

