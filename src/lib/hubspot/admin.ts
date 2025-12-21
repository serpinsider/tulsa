// Admin-specific HubSpot operations
import { getHubSpotClient } from './client';
import { dashboardCache, CACHE_KEYS } from '../cache';

// Add simple rate limit tracking
let lastCallTime = 0;
const MIN_CALL_INTERVAL = 200; // 200ms between calls

export async function getAllDeals(filters?: {
  dealstage?: string;
  siteLocation?: string;
  siteBusiness?: string;
  limit?: number;
}) {
  // Create cache key from filters
  const cacheKey = `${CACHE_KEYS.DEALS}:${JSON.stringify(filters)}`;
  const cached = dashboardCache.get<any[]>(cacheKey);
  if (cached) {
    console.log('Returning cached deals');
    return cached;
  }
  
  // Simple rate limiting
  const now = Date.now();
  const timeSinceLastCall = now - lastCallTime;
  if (timeSinceLastCall < MIN_CALL_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_CALL_INTERVAL - timeSinceLastCall));
  }
  lastCallTime = Date.now();

  const client = getHubSpotClient();
  
  const filterGroups: any[] = [];
  
  if (filters?.dealstage) {
    filterGroups.push({
      filters: [{
        propertyName: 'dealstage',
        operator: 'EQ',
        value: filters.dealstage,
      }],
    });
  }
  
  if (filters?.siteLocation) {
    filterGroups.push({
      filters: [{
        propertyName: 'site_location',
        operator: 'EQ',
        value: filters.siteLocation,
      }],
    });
  }

  if (filters?.siteBusiness) {
    filterGroups.push({
      filters: [{
        propertyName: 'site_business',
        operator: 'EQ',
        value: filters.siteBusiness,
      }],
    });
  }

  // Only request properties that currently exist in HubSpot
  // After adding the new properties (see HUBSPOT_PROPERTIES_TO_ADD.md),
  // uncomment the additional properties below
  const baseProperties = [
    'dealname',
    'amount',
    'dealstage',
    'service_type',
    'service_date',
    'service_time',
    'service_address',
    'service_city',
    'service_state',
    'bedrooms',
    'bathrooms',
    'square_feet',
    'frequency',
    'site_location',
    'site_business',
    'special_instructions',
    'assigned_provider',
    'assigned_provider_name',
    'confirmation_number',
    'createdate',
    // Contact info stored directly on deal
    'contact_name',
    'contact_email',
    'contact_phone',
  ];

  // Enhanced properties - NOW ACTIVE since you've added them to HubSpot!
  const enhancedProperties = [
    'apt_number',
    'extras',
    'excludes',
    'access_method',
    'booking_note',
    'private_customer_note',
    'provider_note',
    'provider_has_keys',
    'estimated_job_hours',
    'service_total',
    'sales_tax',
    'discount_code',
    'discount_from_code',
    'discount_from_frequency',
    'discount_from_referral',
    'total_discount',
    'final_amount',
    'amount_paid',
    'amount_owed',
    'refunded_amount',
    'tip_amount',
    'parking_fee',
    'bonus_amount',
    'reschedule_fee',
    'expedited_fee',
    'service_fee',
    'price_adjustment',
    'price_adjustment_comment',
    'payment_method',
    'stripe_customer_id',
    'stripe_transaction_id',
    'provider_payment',
    'booking_status',
    'created_by',
    'rating_value',
    'rating_comment',
  ];

  const searchBody: any = {
    sorts: [{ propertyName: 'createdate', direction: 'DESCENDING' }],
    properties: [...baseProperties, ...enhancedProperties, 'confirmation_number', 'createdate'],
    associations: ['contacts'], // CRITICAL: Get contact associations with each deal
    limit: 200, // Max allowed by HubSpot
  };

  if (filterGroups.length > 0) {
    searchBody.filterGroups = filterGroups;
  }

  // Fetch all deals with pagination
  let allDeals: any[] = [];
  let after: string | undefined = undefined;
  const maxPages = 10; // Limit to 2000 deals (10 pages * 200)
  let pageCount = 0;

  do {
    if (after) {
      searchBody.after = after;
    }

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/deals/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HubSpot API Error:', errorData);
      throw new Error(`Failed to fetch deals: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    allDeals = allDeals.concat(data.results || []);
    after = data.paging?.next?.after;
    pageCount++;

    // Stop if we've reached the max pages or there's no more data
  } while (after && pageCount < maxPages);

  console.log(`Fetched ${allDeals.length} deals across ${pageCount} pages`);
  
  const deals = allDeals;
  
  // Cache the results for 30 seconds
  dashboardCache.set(cacheKey, deals, 30000);
  
  // Set contact_name to dealname (we extract customer name from dealname format in frontend)
  const enrichedDeals = deals.map((deal: any) => ({
    ...deal,
    properties: {
      ...deal.properties,
      contact_name: deal.properties.dealname || 'Customer',
    },
  }));

  return enrichedDeals;
}

export async function getAllContacts(filters?: {
  siteLocation?: string;
  siteBusiness?: string;
  limit?: number;
}) {
  const filterGroups: any[] = [];
  
  if (filters?.siteLocation) {
    filterGroups.push({
      filters: [{
        propertyName: 'site_location',
        operator: 'EQ',
        value: filters.siteLocation,
      }],
    });
  }

  if (filters?.siteBusiness) {
    filterGroups.push({
      filters: [{
        propertyName: 'site_business',
        operator: 'EQ',
        value: filters.siteBusiness,
      }],
    });
  }

  const searchBody: any = {
    sorts: [{ propertyName: 'createdate', direction: 'DESCENDING' }],
    properties: [
      'email',
      'firstname',
      'lastname',
      'phone',
      'address',
      'city',
      'state',
      'zip',
      'site_location',
      'site_business',
    ],
    limit: filters?.limit || 100,
  };

  if (filterGroups.length > 0) {
    searchBody.filterGroups = filterGroups;
  }

  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchBody),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }

  const data = await response.json();
  return data.results || [];
}

export async function getRevenueStats(siteLocation?: string) {
  const deals = await getAllDeals({ siteLocation });
  
  const stats = {
    totalRevenue: 0,
    completedRevenue: 0,
    pendingRevenue: 0,
    totalBookings: deals.length,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
  };

  deals.forEach((deal: any) => {
    const amount = parseFloat(deal.properties.amount || '0');
    const stage = deal.properties.dealstage;

    stats.totalRevenue += amount;

    if (stage === 'closedwon') {
      stats.completedRevenue += amount;
      stats.completedBookings++;
    } else if (stage === 'closedlost') {
      stats.cancelledBookings++;
    } else {
      stats.pendingRevenue += amount;
      stats.pendingBookings++;
    }
  });

  return stats;
}
