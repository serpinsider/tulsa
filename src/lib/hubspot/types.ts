// HubSpot CRM Types for Cleaning Business

export interface CustomerData {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  site_location?: string; // Brooklyn, Philly, etc.
  site_business?: string; // Auto-detected business name
}

export interface BookingData {
  customerEmail: string;
  serviceName: string;
  serviceDate: string;
  serviceTime?: string;
  amount: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  frequency?: 'one_time' | 'weekly' | 'bi_weekly' | 'monthly';
  specialInstructions?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  siteLocation?: string; // Which site the booking came from
  siteBusiness?: string; // Auto-detected business name
  dealstage?: string; // Optional: specify which HubSpot stage to create the deal in
}

export interface HubSpotContact {
  id: string;
  properties: {
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

export interface HubSpotDeal {
  id: string;
  properties: {
    dealname: string;
    amount: string;
    dealstage: string;
    closedate?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse {
  success: boolean;
  contact: HubSpotContact;
  deal: HubSpotDeal;
  message?: string;
}

export interface CustomerBookingsResponse {
  success: boolean;
  bookings: HubSpotDeal[];
  message?: string;
}

export interface CompanyData {
  name: string;
  domain?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  industry?: string;
  description?: string;
  site_location?: string;
}

export interface HubSpotCompany {
  id: string;
  properties: {
    name: string;
    domain?: string;
    phone?: string;
    city?: string;
    state?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}
