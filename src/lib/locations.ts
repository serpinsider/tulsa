// Location data for Brooklyn Maids
export interface Location {
  name: string;
  slug: string;
  state: string;
  description?: string;
}

export const locations: Location[] = [
  // NYC Boroughs - Core Markets (5)
  { name: "Brooklyn", slug: "brooklyn", state: "NY" },
  { name: "Manhattan", slug: "manhattan", state: "NY" },
  { name: "Queens", slug: "queens", state: "NY" },
  { name: "Bronx", slug: "bronx", state: "NY" },
  { name: "Staten Island", slug: "staten-island", state: "NY" },
  
  // Top Brooklyn Neighborhoods by Traffic (16)
  // Based on GSC data - these neighborhoods get the most searches and clicks
  { name: "Bedford-Stuyvesant", slug: "bedford-stuyvesant", state: "NY", description: "Bed-Stuy" },
  { name: "Carroll Gardens", slug: "carroll-gardens", state: "NY", description: "Carroll Gardens" },
  { name: "Park Slope", slug: "park-slope", state: "NY", description: "Park Slope" },
  { name: "Williamsburg", slug: "williamsburg", state: "NY", description: "Williamsburg" },
  { name: "Downtown Brooklyn", slug: "downtown-brooklyn", state: "NY", description: "Downtown Brooklyn" },
  { name: "Coney Island", slug: "coney-island", state: "NY", description: "Coney Island" },
  { name: "Brighton Beach", slug: "brighton-beach", state: "NY", description: "Brighton Beach" },
  { name: "Crown Heights", slug: "crown-heights", state: "NY", description: "Crown Heights" },
  { name: "Fort Greene", slug: "fort-greene", state: "NY", description: "Fort Greene" },
  { name: "DUMBO", slug: "dumbo", state: "NY", description: "DUMBO" },
  { name: "Brooklyn Heights", slug: "brooklyn-heights", state: "NY", description: "Brooklyn Heights" },
  { name: "Prospect Heights", slug: "prospect-heights", state: "NY", description: "Prospect Heights" },
  { name: "Bushwick", slug: "bushwick", state: "NY", description: "Bushwick" },
  { name: "Greenpoint", slug: "greenpoint", state: "NY", description: "Greenpoint" },
  { name: "Cobble Hill", slug: "cobble-hill", state: "NY", description: "Cobble Hill" },
  { name: "Boerum Hill", slug: "boerum-hill", state: "NY", description: "Boerum Hill" },
  
  // NY Metro Expansion (2)
  { name: "Long Island", slug: "long-island", state: "NY" },
  { name: "Westchester", slug: "westchester", state: "NY" },
  
  // New Jersey - Core Markets (3)
  { name: "New Jersey", slug: "new-jersey", state: "NJ" },
  { name: "Jersey City", slug: "jersey-city", state: "NJ" },
  { name: "Hoboken", slug: "hoboken", state: "NJ" },
];

// Get location with state
export function getLocationWithState(locationName: string, locationSlug?: string): string {
  let location: Location | undefined;
  
  if (locationSlug) {
    location = locations.find(loc => loc.slug === locationSlug);
  } else {
    location = locations.find(loc => loc.name === locationName);
  }
  
  if (location) {
    return `${location.name}, ${location.state}`;
  }
  
  // Default fallback
  return `${locationName}, NY`;
}

// Get just the state for a location
export function getLocationState(locationSlug: string): string {
  const location = locations.find(loc => loc.slug === locationSlug);
  return location?.state || "NY";
}

// Get location by slug
export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find(loc => loc.slug === slug);
}

// Get popular locations for featured display
export const popularLocations = [
  "brooklyn", "manhattan", "queens", "new-jersey", "jersey-city", "hoboken",
  "long-island", "westchester"
];

// Get location path helper
export function getLocationPath(slug: string, service?: string): string {
  const basePath = `/locations/${slug}`;
  return service ? `${basePath}/${service}` : basePath;
}