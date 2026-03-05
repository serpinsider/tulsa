import { BRANDING } from './branding';
import { locations } from '@/lib/locations';

export const getFormattedLocationList = (limit?: number) => {
  const locs = limit ? locations.slice(0, limit) : locations;
  if (locs.length === 0) return 'our service areas';
  if (locs.length === 1) return locs[0].name;
  if (locs.length === 2) return `${locs[0].name} and ${locs[1].name}`;
  const allButLast = locs.slice(0, -1).map(l => l.name).join(', ');
  const last = locs[locs.length - 1].name;
  return `${allButLast}, and ${last}`;
};

export const SERVICE_AREA_FAQ_ANSWER = `We proudly serve ${getFormattedLocationList()}. ${BRANDING.serviceAreaLong}.`;

export const COVERAGE_ZONE = {
  title: BRANDING.primaryCity,
  subtitle: getFormattedLocationList(4),
};

export const REVIEW_LOCATIONS = [
  'Tulsa, OK',
  'Broken Arrow, OK',
  'Owasso, OK',
  'Jenks, OK',
  'Bixby, OK',
  'Sand Springs, OK',
];

export const CUSTOMER_COVERAGE_TEXT = `Trusted by homeowners across ${getFormattedLocationList(3)}`;
export const AREAS_WE_SERVE_DESCRIPTION = `Professional house cleaning services throughout ${BRANDING.serviceArea}`;
export const FOOTER_DESCRIPTION = `Professional cleaning services throughout ${BRANDING.serviceArea}. Book online in 60 seconds.`;
export const ANNOUNCEMENT_BAR_TEXT = `Serving ${BRANDING.serviceAreaAbbreviation} - Book in 60 Seconds`;
export const QUOTE_FORM_SERVICE_AREA_TEXT = `We serve ${getFormattedLocationList()}.`;
