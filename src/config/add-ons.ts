// Add-ons/Extras Configuration
// Based on BookingKoala data analysis

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number; // Base price in USD
  estimatedMinutes: number; // Additional time added to job
  category: 'cleaning' | 'special' | 'fee';
  popular: boolean; // Show in "popular" section
}

export const ADD_ONS: AddOn[] = [
  // Most popular add-ons
  {
    id: 'inside_fridge',
    name: 'Inside Fridge',
    description: 'Deep clean inside refrigerator, remove shelves and drawers',
    price: 40,
    estimatedMinutes: 20,
    category: 'cleaning',
    popular: true,
  },
  {
    id: 'inside_oven',
    name: 'Inside Oven',
    description: 'Deep clean inside oven, remove racks and scrub',
    price: 40,
    estimatedMinutes: 25,
    category: 'cleaning',
    popular: true,
  },
  {
    id: 'microwave',
    name: 'Microwave',
    description: 'Deep clean inside and outside microwave',
    price: 20,
    estimatedMinutes: 10,
    category: 'cleaning',
    popular: true,
  },
  {
    id: 'pet_cleaning',
    name: 'Pet Cleaning',
    description: 'Extra attention to pet hair removal from furniture and floors',
    price: 20,
    estimatedMinutes: 15,
    category: 'special',
    popular: true,
  },
  {
    id: 'laundry',
    name: 'Laundry',
    description: 'Wash, dry, and fold laundry',
    price: 30,
    estimatedMinutes: 30,
    category: 'special',
    popular: true,
  },
  {
    id: 'interior_windows',
    name: 'Interior Windows',
    description: 'Clean inside of all windows and window sills',
    price: 30,
    estimatedMinutes: 30,
    category: 'cleaning',
    popular: true,
  },
  
  // Regular add-ons (matching bot exactly)
  {
    id: 'dishes',
    name: 'Dishes',
    description: 'Wash and put away dishes',
    price: 40,
    estimatedMinutes: 15,
    category: 'special',
    popular: false,
  },
  {
    id: 'hardwood',
    name: 'Hardwood',
    description: 'Special care for hardwood floors',
    price: 40,
    estimatedMinutes: 20,
    category: 'cleaning',
    popular: false,
  },
  {
    id: 'organization',
    name: 'Organization',
    description: 'Help organize closets, drawers, or specific areas',
    price: 40,
    estimatedMinutes: 45,
    category: 'special',
    popular: false,
  },
  {
    id: 'baseboard_cleaning',
    name: 'Baseboard Cleaning',
    description: 'Detailed cleaning of all baseboards',
    price: 40,
    estimatedMinutes: 20,
    category: 'cleaning',
    popular: false,
  },
  {
    id: 'inside_kitchen_cabinets',
    name: 'Inside Kitchen Cabinets',
    description: 'Clean inside kitchen cabinets',
    price: 40,
    estimatedMinutes: 25,
    category: 'cleaning',
    popular: false,
  },
  {
    id: 'bedroom_bathroom_cabinets',
    name: 'Bedroom & Bathroom Cabinets',
    description: 'Clean inside bedroom and bathroom cabinets',
    price: 40,
    estimatedMinutes: 25,
    category: 'cleaning',
    popular: false,
  },
  {
    id: 'tile_and_grout',
    name: 'Tile & Grout',
    description: 'Deep clean tile and grout',
    price: 40,
    estimatedMinutes: 30,
    category: 'cleaning',
    popular: false,
  },
  {
    id: 'wall_stain_removal',
    name: 'Wall Stain Removal',
    description: 'Remove stains from walls',
    price: 20,
    estimatedMinutes: 20,
    category: 'cleaning',
    popular: false,
  },
  {
    id: 'washer_dryer',
    name: 'Washer/Dryer',
    description: 'Clean inside washer and dryer, remove lint',
    price: 80,
    estimatedMinutes: 20,
    category: 'cleaning',
    popular: false,
  },
  {
    id: 'office_cleaning',
    name: 'Office Cleaning',
    description: 'Clean home office including desk organization',
    price: 50,
    estimatedMinutes: 20,
    category: 'special',
    popular: false,
  },
  {
    id: 'basement_cleaning',
    name: 'Basement Cleaning',
    description: 'Clean basement area',
    price: 100,
    estimatedMinutes: 60,
    category: 'special',
    popular: false,
  },
  {
    id: 'extra_hour',
    name: 'Extra Hour',
    description: 'Add an extra hour of cleaning',
    price: 80,
    estimatedMinutes: 60,
    category: 'special',
    popular: false,
  },
  {
    id: 'townhouse',
    name: 'Townhouse',
    description: 'Additional fee for multi-level townhouse',
    price: 100,
    estimatedMinutes: 0,
    category: 'fee',
    popular: false,
  },
];

// Helper function to get add-on by ID
export function getAddOn(id: string): AddOn | undefined {
  return ADD_ONS.find(addon => addon.id === id);
}

// Helper function to calculate total add-ons price
export function calculateAddOnsTotal(selectedIds: string[]): number {
  return selectedIds.reduce((total, id) => {
    const addon = getAddOn(id);
    return total + (addon?.price || 0);
  }, 0);
}

// Helper function to calculate total estimated time
export function calculateTotalTime(baseMinutes: number, selectedIds: string[]): number {
  const addOnTime = selectedIds.reduce((total, id) => {
    const addon = getAddOn(id);
    return total + (addon?.estimatedMinutes || 0);
  }, 0);
  return baseMinutes + addOnTime;
}

// Helper to format add-ons as comma-separated string for HubSpot
export function formatAddOnsForHubSpot(selectedIds: string[]): string {
  return selectedIds
    .map(id => {
      const addon = getAddOn(id);
      return addon?.name || id;
    })
    .join(', ');
}

// Helper to parse HubSpot comma-separated string back to IDs
export function parseAddOnsFromHubSpot(addOnsString: string): string[] {
  if (!addOnsString) return [];
  
  // Split by comma and clean up each name
  const names = addOnsString.split(',').map(s => s.trim().toLowerCase());
  
  const matchedIds = names
    .map(name => {
      if (!name) return undefined;
      
      // Try exact match first (case insensitive)
      let addon = ADD_ONS.find(a => a.name.toLowerCase() === name);
      
      // Try matching common variations
      if (!addon) {
        // Handle variations like "fridge cleaning" -> "inside fridge"
        if (name.includes('fridge')) {
          addon = ADD_ONS.find(a => a.id === 'inside_fridge');
        } else if (name.includes('oven')) {
          addon = ADD_ONS.find(a => a.id === 'inside_oven');
        } else if (name.includes('microwave')) {
          addon = ADD_ONS.find(a => a.id === 'microwave');
        } else if (name.includes('pet')) {
          addon = ADD_ONS.find(a => a.id === 'pet_cleaning');
        } else if (name.includes('window')) {
          addon = ADD_ONS.find(a => a.id === 'interior_windows');
        } else if (name.includes('laundry')) {
          addon = ADD_ONS.find(a => a.id === 'laundry');
        } else if (name.includes('dish')) {
          addon = ADD_ONS.find(a => a.id === 'dishes');
        } else if (name.includes('baseboard')) {
          addon = ADD_ONS.find(a => a.id === 'baseboard_cleaning');
        } else if (name.includes('wall')) {
          addon = ADD_ONS.find(a => a.id === 'wall_stain_removal');
        } else if (name.includes('washer') || name.includes('dryer')) {
          addon = ADD_ONS.find(a => a.id === 'washer_dryer');
        } else if (name.includes('kitchen') && name.includes('cabinet')) {
          addon = ADD_ONS.find(a => a.id === 'inside_kitchen_cabinets');
        } else if (name.includes('bedroom') || name.includes('bathroom') && name.includes('cabinet')) {
          addon = ADD_ONS.find(a => a.id === 'bedroom_bathroom_cabinets');
        } else if (name.includes('tile') || name.includes('grout')) {
          addon = ADD_ONS.find(a => a.id === 'tile_and_grout');
        } else if (name.includes('hardwood')) {
          addon = ADD_ONS.find(a => a.id === 'hardwood');
        } else if (name.includes('organization')) {
          addon = ADD_ONS.find(a => a.id === 'organization');
        } else if (name.includes('office')) {
          addon = ADD_ONS.find(a => a.id === 'office_cleaning');
        } else if (name.includes('basement')) {
          addon = ADD_ONS.find(a => a.id === 'basement_cleaning');
        } else if (name.includes('extra hour')) {
          addon = ADD_ONS.find(a => a.id === 'extra_hour');
        } else if (name.includes('townhouse')) {
          addon = ADD_ONS.find(a => a.id === 'townhouse');
        }
      }
      
      // Try partial match as last resort
      if (!addon) {
        addon = ADD_ONS.find(a => 
          a.name.toLowerCase().includes(name) || 
          name.includes(a.name.toLowerCase())
        );
      }
      
      if (addon) {
        console.log(`Matched "${name}" to addon: ${addon.name} (${addon.id})`);
      } else {
        console.warn(`Could not match add-on: "${name}"`);
      }
      
      return addon?.id;
    })
    .filter((id): id is string => id !== undefined);
  
  console.log(`Parsed ${matchedIds.length} add-ons from: "${addOnsString}"`);
  return matchedIds;
}

// Get popular add-ons for quick selection
export function getPopularAddOns(): AddOn[] {
  return ADD_ONS.filter(addon => addon.popular);
}

// Get add-ons by category
export function getAddOnsByCategory(category: AddOn['category']): AddOn[] {
  return ADD_ONS.filter(addon => addon.category === category);
}

