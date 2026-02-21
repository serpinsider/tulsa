// Service Configuration
// Minimal config to prevent build errors

export const ROOMS = [
  { id: 'living_room', name: 'Living Room' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'dining_room', name: 'Dining Room' },
  { id: 'basement', name: 'Basement' },
  { id: 'garage', name: 'Garage' },
];

export const ACCESS_METHODS = [
  { id: 'home', name: 'I will be home' },
  { id: 'key', name: 'Leave key/code' },
  { id: 'lockbox', name: 'Lockbox' },
  { id: 'doorman', name: 'Doorman/Concierge' },
];

export function getSalesTaxRate(location?: string): number {
  // Sales tax is NOT calculated on the frontend
  // Bot handles all pricing including tax when customer submits quote
  // This function kept for compatibility but returns 0
  return 0;
}

export function getFrequencyDiscount(frequency: string): number {
  // Frequency discounts are NOT calculated on the frontend
  // Bot handles all pricing logic when customer submits quote
  // This function kept for compatibility but returns 0
  return 0;
}

export function formatRoomsForHubSpot(rooms: string[]): string {
  return rooms.join(', ');
}

export function formatAccessMethodForHubSpot(method: string): string {
  const methodMap: Record<string, string> = {
    'home': 'I will be home',
    'key': 'Leave key/code',
    'lockbox': 'Lockbox',
    'doorman': 'Doorman/Concierge'
  };
  return methodMap[method] || method;
}

export function parseRoomsFromHubSpot(roomsString?: string): string[] {
  if (!roomsString) return [];
  return roomsString.split(', ').filter(Boolean);
}