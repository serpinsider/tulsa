export interface Location {
  name: string;
  slug: string;
  state: string;
  description?: string;
}

export const locations: Location[] = [
  { name: "Tulsa", slug: "tulsa", state: "OK", description: "Professional house cleaning services in Tulsa, OK." },
  { name: "Broken Arrow", slug: "broken-arrow", state: "OK", description: "Quality maid services in Broken Arrow, OK." },
  { name: "Owasso", slug: "owasso", state: "OK", description: "Premium cleaning services in Owasso, OK." },
  { name: "Jenks", slug: "jenks", state: "OK", description: "Reliable house cleaning in Jenks, OK." },
  { name: "Bixby", slug: "bixby", state: "OK", description: "Professional cleaning in Bixby, OK." },
  { name: "Sand Springs", slug: "sand-springs", state: "OK", description: "Trusted maid services in Sand Springs, OK." },
  { name: "Sapulpa", slug: "sapulpa", state: "OK", description: "Quality house cleaning in Sapulpa, OK." },
  { name: "Glenpool", slug: "glenpool", state: "OK", description: "Professional cleaning services in Glenpool, OK." },
  { name: "Claremore", slug: "claremore", state: "OK", description: "Reliable maid services in Claremore, OK." },
  { name: "Catoosa", slug: "catoosa", state: "OK", description: "Quality house cleaning in Catoosa, OK." },
];

export function getLocationWithState(locationName: string, locationSlug?: string): string {
  let location: Location | undefined;
  if (locationSlug) {
    location = locations.find(loc => loc.slug === locationSlug);
  } else {
    location = locations.find(loc => loc.name === locationName);
  }
  if (location) return `${location.name}, ${location.state}`;
  return `${locationName}, OK`;
}

export function getLocationState(locationSlug: string): string {
  const location = locations.find(loc => loc.slug === locationSlug);
  return location?.state || "OK";
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find(loc => loc.slug === slug);
}

export const popularLocations = ["tulsa", "broken-arrow", "owasso", "jenks", "bixby"];

export function getLocationPath(slug: string, service?: string): string {
  const basePath = `/locations/${slug}`;
  return service ? `${basePath}/${service}` : basePath;
}
