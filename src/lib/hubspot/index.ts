// HubSpot CRM Integration
// 
// This module provides a clean interface to HubSpot CRM.
// To disable: Simply don't call these functions or remove the lib/hubspot folder.

export { HubSpotClient, getHubSpotClient } from './client';
export type {
  CustomerData,
  BookingData,
  HubSpotContact,
  HubSpotDeal,
  BookingResponse,
  CustomerBookingsResponse,
} from './types';

// Utility function to check if HubSpot is enabled
export function isHubSpotEnabled(): boolean {
  return !!process.env.HUBSPOT_API_KEY;
}
