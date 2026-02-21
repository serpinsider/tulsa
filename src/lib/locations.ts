// Location data for Tulsa Maids
export interface Location {
  name: string;
  slug: string;
  state: string;
  description?: string;
}

export const locations: Location[] = [
  // Tulsa Metro
  { 
    name: "Tulsa", 
    slug: "tulsa", 
    state: "OK",
    description: "Professional house cleaning services in Tulsa, OK. Serving all Tulsa neighborhoods."
  },
  { 
    name: "Broken Arrow", 
    slug: "broken-arrow", 
    state: "OK",
    description: "Quality maid services in Broken Arrow, OK. Covering all Broken Arrow communities."
  },
  { 
    name: "Owasso", 
    slug: "owasso", 
    state: "OK",
    description: "Premium cleaning services in Owasso, OK. Serving all Owasso neighborhoods."
  },
  { 
    name: "Jenks", 
    slug: "jenks", 
    state: "OK",
    description: "Reliable house cleaning in Jenks, OK. Covering all Jenks areas."
  },
  { 
    name: "Bixby", 
    slug: "bixby", 
    state: "OK",
    description: "Professional cleaning in Bixby, OK. Serving all Bixby communities."
  },
  { 
    name: "Sand Springs", 
    slug: "sand-springs", 
    state: "OK",
    description: "Trusted maid services in Sand Springs, OK. Covering all Sand Springs neighborhoods."
  },
  { 
    name: "Sapulpa", 
    slug: "sapulpa", 
    state: "OK",
    description: "Quality house cleaning in Sapulpa, OK. Serving all Sapulpa areas."
  },
  { 
    name: "Glenpool", 
    slug: "glenpool", 
    state: "OK",
    description: "Professional cleaning services in Glenpool, OK. Covering all Glenpool communities."
  },
  { 
    name: "Claremore", 
    slug: "claremore", 
    state: "OK",
    description: "Reliable maid services in Claremore, OK. Serving all Claremore neighborhoods."
  },
  { 
    name: "Catoosa", 
    slug: "catoosa", 
    state: "OK",
    description: "Quality house cleaning in Catoosa, OK. Covering all Catoosa areas."
  },
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
  return `${locationName}, OK`;
}

// Get just the state for a location
export function getLocationState(locationSlug: string): string {
  const location = locations.find(loc => loc.slug === locationSlug);
  return location?.state || "OK";
}

// Get location by slug
export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find(loc => loc.slug === slug);
}

// Get popular locations for featured display
export const popularLocations = [
  "tulsa", "broken-arrow", "owasso", "jenks", "bixby"
];

// Get location path helper
export function getLocationPath(slug: string, service?: string): string {
  const basePath = `/locations/${slug}`;
  return service ? `${basePath}/${service}` : basePath;
}
