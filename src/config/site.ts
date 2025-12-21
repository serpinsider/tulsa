/**
 * Site Configuration
 * Defines which HubSpot data this site should show
 */

export const SITE_CONFIG = {
  // HubSpot property values for filtering (MUST match internal enum values in HubSpot)
  siteBusiness: 'brooklyn_maids', // Internal enum value (not the display label)
  siteLocation: 'Brooklyn', // Must match HubSpot's site_location property
  
  // Display names
  businessName: 'Brooklyn Maids',
  location: 'Brooklyn',
} as const;

