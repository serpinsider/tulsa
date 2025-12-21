// HubSpot API Client
import type { CustomerData, BookingData, HubSpotContact, HubSpotDeal, CompanyData, HubSpotCompany } from './types';

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

export class HubSpotClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.HUBSPOT_API_KEY || '';
    
    if (!this.apiKey) {
      throw new Error('HubSpot API key is required. Set HUBSPOT_API_KEY in your environment.');
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${HUBSPOT_API_BASE}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error('HubSpot API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: error,
        endpoint: endpoint
      });
      throw new Error(`HubSpot API Error: ${response.status} - ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  /**
   * Create or update a contact in HubSpot
   */
  async upsertContact(data: CustomerData): Promise<HubSpotContact> {
    // First, try to find existing contact by email
    const searchResult = await this.searchContactByEmail(data.email);
    
    if (searchResult) {
      // Update existing contact
      return this.updateContact(searchResult.id, data);
    }
    
    // Create new contact
    return this.createContact(data);
  }

  /**
   * Search for a contact by email
   */
  async searchContactByEmail(email: string): Promise<HubSpotContact | null> {
    try {
      const response = await this.makeRequest('/crm/v3/objects/contacts/search', {
        method: 'POST',
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: email,
            }],
          }],
          properties: ['email', 'firstname', 'lastname', 'phone'],
        }),
      });

      return response.results?.[0] || null;
    } catch (error) {
      console.error('Error searching for contact:', error);
      return null;
    }
  }

  /**
   * Create a new contact
   */
  private async createContact(data: CustomerData): Promise<HubSpotContact> {
    return this.makeRequest('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          site_location: data.site_location, // Custom property
          site_business: data.site_business, // Auto-detected business
        },
      }),
    });
  }

  /**
   * Update an existing contact
   */
  private async updateContact(contactId: string, data: Partial<CustomerData>): Promise<HubSpotContact> {
    return this.makeRequest(`/crm/v3/objects/contacts/${contactId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        properties: {
          ...data,
        },
      }),
    });
  }

  /**
   * Create a deal (booking) in HubSpot
   */
  async createDeal(data: BookingData, contactId: string, contactName?: string): Promise<HubSpotDeal> {
    // Use provided dealname if exists, otherwise construct one
    const dealName = (data as any).dealname || `${data.serviceName} - ${data.address || contactName || 'Quote'}`;
    
    // Build properties object with only standard HubSpot properties
    // Custom properties need to be created in HubSpot first
    
    // Convert serviceDate to Unix timestamp (milliseconds) for HubSpot closedate
    let closeDateTimestamp: string | undefined;
    if (data.serviceDate) {
      const date = new Date(data.serviceDate);
      if (!isNaN(date.getTime())) {
        // HubSpot expects Unix timestamp in milliseconds
        closeDateTimestamp = date.getTime().toString();
      }
    }
    
    const properties: Record<string, string> = {
      dealname: dealName,
      amount: data.amount.toString(),
      dealstage: data.dealstage || '2038568669', // Default to confirmed booking stage
      pipeline: 'default',
      ...(closeDateTimestamp && { closedate: closeDateTimestamp }),
    };

    // Add custom properties only if they're defined
    // Note: These will fail if not created in HubSpot
    // You can create them at: Settings > Properties > Deal properties
    
    // Format service_date as YYYY-MM-DD (date only, no time)
    let formattedServiceDate: string | undefined;
    if (data.serviceDate) {
      const date = new Date(data.serviceDate);
      if (!isNaN(date.getTime())) {
        // Format as YYYY-MM-DD
        formattedServiceDate = date.toISOString().split('T')[0];
      }
    }
    
    const customProperties: Record<string, string | undefined> = {
      service_type: data.serviceName,
      service_date: formattedServiceDate,
      service_time: data.serviceTime,
      bedrooms: data.bedrooms?.toString(),
      bathrooms: data.bathrooms?.toString(),
      square_feet: data.squareFeet?.toString(),
      frequency: data.frequency,
      special_instructions: data.specialInstructions,
      service_address: data.address,
      service_city: data.city,
      service_state: data.state,
      service_zip: data.zip,
      site_location: data.siteLocation,
      site_business: data.siteBusiness, // Auto-detected business
      // contact_name: contactName, // Disabled - fetch through associations instead
    };

    // Only include custom properties that have values
    // Uncomment this section once properties are created in HubSpot
    Object.entries(customProperties).forEach(([key, value]) => {
      if (value !== undefined) {
        properties[key] = value;
      }
    });

    console.log('Creating deal with properties:', JSON.stringify(properties, null, 2));

    const deal = await this.makeRequest('/crm/v3/objects/deals', {
      method: 'POST',
      body: JSON.stringify({
        properties,
      }),
    });
    
    console.log('Deal created successfully:', deal.id);

    // Associate deal with contact
    await this.associateDealWithContact(deal.id, contactId);

    return deal;
  }

  /**
   * Associate a deal with a contact
   */
  private async associateDealWithContact(dealId: string, contactId: string): Promise<void> {
    await this.makeRequest(`/crm/v3/objects/deals/${dealId}/associations/contact/${contactId}/3`, {
      method: 'PUT',
    });
  }

  /**
   * Get all deals (bookings) for a contact
   */
  async getContactDeals(contactId: string): Promise<HubSpotDeal[]> {
    const response = await this.makeRequest(
      `/crm/v3/objects/contacts/${contactId}/associations/deals`,
      { method: 'GET' }
    );

    if (!response.results?.length) {
      return [];
    }

    // Fetch full deal details
    const dealIds = response.results.map((r: any) => r.id);
    const deals = await Promise.all(
      dealIds.map((id: string) => this.getDeal(id))
    );

    return deals;
  }

  /**
   * Get a single deal by ID
   */
  async getDeal(dealId: string): Promise<HubSpotDeal> {
    return this.makeRequest(`/crm/v3/objects/deals/${dealId}`, {
      method: 'GET',
    });
  }

  /**
   * Update deal stage (e.g., when service is completed)
   */
  async updateDealStage(dealId: string, stage: string): Promise<HubSpotDeal> {
    return this.makeRequest(`/crm/v3/objects/deals/${dealId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        properties: {
          dealstage: stage,
        },
      }),
    });
  }

  /**
   * Update a deal with any properties
   */
  async updateDeal(dealId: string, properties: Record<string, any>): Promise<HubSpotDeal> {
    return this.makeRequest(`/crm/v3/objects/deals/${dealId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        properties,
      }),
    });
  }

  /**
   * Get a contact by ID
   */
  async getContact(contactId: string): Promise<HubSpotContact> {
    return this.makeRequest(`/crm/v3/objects/contacts/${contactId}`, {
      method: 'GET',
    });
  }

  /**
   * Create a booking (contact + deal) in one operation
   */
  async createBooking(customerData: CustomerData, bookingData: BookingData) {
    // 1. Create or update contact
    const contact = await this.upsertContact(customerData);

    // 2. Create deal and associate with contact
    // Pass contact name for easy display in calendar/lists
    const contactName = `${customerData.firstname} ${customerData.lastname}`;
    const deal = await this.createDeal(bookingData, contact.id, contactName);

    return {
      contact,
      deal,
    };
  }

  /**
   * Create a company in HubSpot
   */
  async createCompany(data: CompanyData): Promise<HubSpotCompany> {
    return this.makeRequest('/crm/v3/objects/companies', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          name: data.name,
          domain: data.domain,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          industry: data.industry,
          description: data.description,
          site_location: data.site_location,
        },
      }),
    });
  }

  /**
   * Get a company by ID
   */
  async getCompany(companyId: string): Promise<HubSpotCompany> {
    return this.makeRequest(`/crm/v3/objects/companies/${companyId}`, {
      method: 'GET',
    });
  }

  /**
   * Search for a company by name
   */
  async searchCompanyByName(name: string): Promise<HubSpotCompany | null> {
    try {
      const response = await this.makeRequest('/crm/v3/objects/companies/search', {
        method: 'POST',
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'name',
              operator: 'EQ',
              value: name,
            }],
          }],
          properties: ['name', 'domain', 'phone', 'city', 'state'],
        }),
      });

      return response.results?.[0] || null;
    } catch (error) {
      console.error('Error searching for company:', error);
      return null;
    }
  }

  /**
   * Associate a contact with a company
   */
  async associateContactWithCompany(contactId: string, companyId: string): Promise<void> {
    await this.makeRequest(`/crm/v3/objects/contacts/${contactId}/associations/company/${companyId}/2`, {
      method: 'PUT',
    });
  }

  /**
   * Get all companies associated with a contact
   */
  async getContactCompanies(contactId: string): Promise<HubSpotCompany[]> {
    const response = await this.makeRequest(
      `/crm/v3/objects/contacts/${contactId}/associations/companies`,
      { method: 'GET' }
    );

    if (!response.results?.length) {
      return [];
    }

    // Fetch full company details
    const companyIds = response.results.map((r: any) => r.id);
    const companies = await Promise.all(
      companyIds.map((id: string) => this.getCompany(id))
    );

    return companies;
  }

  /**
   * Get all contacts associated with a company
   */
  async getCompanyContacts(companyId: string): Promise<HubSpotContact[]> {
    const response = await this.makeRequest(
      `/crm/v3/objects/companies/${companyId}/associations/contacts`,
      { method: 'GET' }
    );

    if (!response.results?.length) {
      return [];
    }

    // Fetch full contact details
    const contactIds = response.results.map((r: any) => r.id);
    const contacts = await Promise.all(
      contactIds.map((id: string) => 
        this.makeRequest(`/crm/v3/objects/contacts/${id}`, { method: 'GET' })
      )
    );

    return contacts;
  }
}

// Export a singleton instance
let hubspotClient: HubSpotClient | null = null;

export function getHubSpotClient(): HubSpotClient {
  if (!hubspotClient) {
    hubspotClient = new HubSpotClient();
  }
  return hubspotClient;
}
