/**
 * Dynamic Content Configuration
 * 
 * This file contains all dynamic text content that references locations or business details.
 * Update this when creating a new site from base-theme.
 */

import { BRANDING } from './branding';
import { locations } from '@/lib/locations';

/**
 * Get formatted location list for display
 * Examples:
 * - "Brooklyn, Manhattan, Queens, Bronx, and Staten Island"
 * - "Las Vegas, Henderson, Summerlin, and Paradise"
 */
export const getFormattedLocationList = (limit?: number) => {
  const locs = limit ? locations.slice(0, limit) : locations;
  if (locs.length === 0) return 'our service areas';
  if (locs.length === 1) return locs[0].name;
  if (locs.length === 2) return `${locs[0].name} and ${locs[1].name}`;
  
  const allButLast = locs.slice(0, -1).map(l => l.name).join(', ');
  const last = locs[locs.length - 1].name;
  return `${allButLast}, and ${last}`;
};

/**
 * FAQ: "What areas do you service?" answer
 */
export const SERVICE_AREA_FAQ_ANSWER = `We proudly serve ${getFormattedLocationList()}. ${BRANDING.serviceAreaLong}.`;

/**
 * Coverage zone text for ContactInfoSection
 */
export const COVERAGE_ZONE = {
  title: BRANDING.primaryCity,
  subtitle: getFormattedLocationList(4), // Show first 4 locations
};

/**
 * Review locations - Replace with actual cities in your service area
 * Used in ReviewsSection and service-specific review sections
 */
export const REVIEW_LOCATIONS = [
  'Tulsa, OK',
  'Broken Arrow, OK',
  'Owasso, OK',
  'Jenks, OK',
  'Bixby, OK',
  'Sand Springs, OK',
];

/**
 * Customer coverage text for ReviewsSection
 */
export const CUSTOMER_COVERAGE_TEXT = `Trusted by homeowners across ${getFormattedLocationList(3)}`;

/**
 * Areas We Serve description
 */
export const AREAS_WE_SERVE_DESCRIPTION = `Professional house cleaning services throughout ${BRANDING.serviceArea}`;

/**
 * Footer description
 */
export const FOOTER_DESCRIPTION = `Professional cleaning services throughout ${BRANDING.serviceArea}. Book online in 60 seconds.`;

/**
 * Announcement Bar text
 */
export const ANNOUNCEMENT_BAR_TEXT = `Serving ${BRANDING.serviceAreaAbbreviation} • Book in 60 Seconds`;

/**
 * Service area text for QuoteForm FAQ
 */
export const QUOTE_FORM_SERVICE_AREA_TEXT = `We serve ${getFormattedLocationList()}.`;





