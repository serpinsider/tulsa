// Service Configuration
// Rooms, service types, and other booking configurations

export interface Room {
  id: string;
  name: string;
  description: string;
}

export const ROOMS: Room[] = [
  {
    id: 'living_room',
    name: 'Living Room',
    description: 'Main living area',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'All bedrooms',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Kitchen area',
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    description: 'All bathrooms',
  },
  {
    id: 'dining_room',
    name: 'Dining Room',
    description: 'Dining area',
  },
  {
    id: 'office',
    name: 'Office',
    description: 'Home office',
  },
  {
    id: 'basement',
    name: 'Basement',
    description: 'Basement area',
  },
  {
    id: 'garage',
    name: 'Garage',
    description: 'Garage space',
  },
];

export interface AccessMethod {
  id: string;
  label: string;
  requiresDetails: boolean; // Whether to show additional text field
}

export const ACCESS_METHODS: AccessMethod[] = [
  {
    id: 'someone_home',
    label: 'Someone will be at home',
    requiresDetails: false,
  },
  {
    id: 'access_code',
    label: 'An access code will be provided (please list code below in notes)',
    requiresDetails: true,
  },
  {
    id: 'key_mailbox',
    label: 'We will leave a key in the mailbox',
    requiresDetails: false,
  },
  {
    id: 'other',
    label: 'Other (please specify below in notes)',
    requiresDetails: true,
  },
];

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  baseTimeMinutes: number; // Base time estimate
  availableFor: ('residential' | 'commercial')[];
}

export const SERVICE_TYPES: ServiceType[] = [
  {
    id: 'residential_cleaning',
    name: 'Residential Cleaning Services',
    description: 'Standard home cleaning service',
    baseTimeMinutes: 120, // 2 hours base
    availableFor: ['residential'],
  },
  {
    id: 'move_in_out_package',
    name: 'Move In / Out Cleaning Package',
    description: 'Comprehensive cleaning for move-in or move-out',
    baseTimeMinutes: 240, // 4 hours base
    availableFor: ['residential'],
  },
  {
    id: 'spring_deep_clean',
    name: 'Spring Deep Clean',
    description: 'Thorough seasonal deep cleaning',
    baseTimeMinutes: 180, // 3 hours base
    availableFor: ['residential'],
  },
  {
    id: 'hourly_specific_areas',
    name: 'Hourly Service - Specific Areas',
    description: 'Hourly cleaning for specific areas only',
    baseTimeMinutes: 60, // 1 hour base
    availableFor: ['residential'],
  },
  {
    id: 'standard_cleaning',
    name: 'Standard Cleaning',
    description: 'Regular cleaning service',
    baseTimeMinutes: 90, // 1.5 hours base
    availableFor: ['residential'],
  },
  {
    id: 'deep_cleaning',
    name: 'Deep Cleaning',
    description: 'Thorough deep cleaning service',
    baseTimeMinutes: 180, // 3 hours base
    availableFor: ['residential'],
  },
  {
    id: 'house_cleaning',
    name: 'House Cleaning',
    description: 'General house cleaning',
    baseTimeMinutes: 120, // 2 hours base
    availableFor: ['residential'],
  },
  {
    id: 'commercial_cleaning',
    name: 'Commercial Cleaning',
    description: 'Office and commercial space cleaning',
    baseTimeMinutes: 180, // 3 hours base
    availableFor: ['commercial'],
  },
];

export interface BookingStatus {
  id: string;
  label: string;
  color: string;
  description: string;
}

export const BOOKING_STATUSES: BookingStatus[] = [
  {
    id: 'pending',
    label: 'Pending',
    color: '#fbbf24', // yellow
    description: 'Booking requested but not confirmed',
  },
  {
    id: 'confirmed',
    label: 'Confirmed',
    color: '#10b981', // green
    description: 'Booking confirmed and scheduled',
  },
  {
    id: 'in_progress',
    label: 'In Progress',
    color: '#3b82f6', // blue
    description: 'Service currently being performed',
  },
  {
    id: 'completed',
    label: 'Completed',
    color: '#8b5cf6', // purple
    description: 'Service completed successfully',
  },
  {
    id: 'cancelled',
    label: 'Cancelled',
    color: '#ef4444', // red
    description: 'Booking cancelled by customer or admin',
  },
  {
    id: 'no_show',
    label: 'No Show',
    color: '#f97316', // orange
    description: 'Customer was not available',
  },
];

// Helper functions
export function getRoom(id: string): Room | undefined {
  return ROOMS.find(room => room.id === id);
}

export function getAccessMethod(id: string): AccessMethod | undefined {
  return ACCESS_METHODS.find(method => method.id === id);
}

export function getServiceType(id: string): ServiceType | undefined {
  return SERVICE_TYPES.find(type => type.id === id);
}

export function getBookingStatus(id: string): BookingStatus | undefined {
  return BOOKING_STATUSES.find(status => status.id === id);
}

// Format rooms for HubSpot (comma-separated)
export function formatRoomsForHubSpot(selectedIds: string[]): string {
  return selectedIds
    .map(id => {
      const room = getRoom(id);
      return room?.name || id;
    })
    .join(', ');
}

// Parse HubSpot comma-separated rooms back to IDs
export function parseRoomsFromHubSpot(roomsString: string): string[] {
  if (!roomsString) return [];
  
  const names = roomsString.split(',').map(s => s.trim());
  return names
    .map(name => {
      const room = ROOMS.find(r => r.name === name);
      return room?.id;
    })
    .filter((id): id is string => id !== undefined);
}

// Format access method for HubSpot
export function formatAccessMethodForHubSpot(methodId: string): string {
  const method = getAccessMethod(methodId);
  return method?.label || methodId;
}

// Sales tax rates by location
export const SALES_TAX_RATES: Record<string, number> = {
  'brooklyn': 0.08875, // 8.875% for NYC
  'philadelphia': 0.08, // 8% for Philadelphia
};

export function getSalesTaxRate(location: string): number {
  return SALES_TAX_RATES[location.toLowerCase()] || 0;
}

// Frequency discount rates
export const FREQUENCY_DISCOUNTS: Record<string, number> = {
  'one_time': 0, // No discount
  'weekly': 0.10, // 10% off
  'bi_weekly': 0.05, // 5% off
  'monthly': 0.03, // 3% off
};

export function getFrequencyDiscount(frequency: string): number {
  return FREQUENCY_DISCOUNTS[frequency.toLowerCase()] || 0;
}

