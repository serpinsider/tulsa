// Custom hook for creating bookings with HubSpot
'use client';

import { useState } from 'react';

interface BookingFormData {
  // Customer info
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  
  // Service info
  serviceName: string;
  serviceDate: string;
  serviceTime?: string;
  amount: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  frequency?: 'one_time' | 'weekly' | 'bi_weekly' | 'monthly';
  specialInstructions?: string;
  
  // Site tracking
  siteLocation?: string;
}

interface UseHubSpotBookingResult {
  createBooking: (data: BookingFormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  data: any | null;
}

export function useHubSpotBooking(): UseHubSpotBookingResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const createBooking = async (formData: BookingFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);

    try {
      const response = await fetch('/api/hubspot/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            email: formData.email,
            firstname: formData.firstName,
            lastname: formData.lastName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            siteLocation: formData.siteLocation || 'Unknown',
          },
          booking: {
            serviceName: formData.serviceName,
            serviceDate: formData.serviceDate,
            serviceTime: formData.serviceTime,
            amount: formData.amount,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            squareFeet: formData.squareFeet,
            frequency: formData.frequency || 'one_time',
            specialInstructions: formData.specialInstructions,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            siteLocation: formData.siteLocation || 'Unknown',
          },
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create booking');
      }

      setSuccess(true);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createBooking,
    isLoading,
    error,
    success,
    data,
  };
}

// Hook for fetching customer bookings
export function useCustomerBookings(email: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  const fetchBookings = async () => {
    if (!email) {
      setBookings([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/hubspot/bookings?email=${encodeURIComponent(email)}`
      );
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch bookings');
      }

      setBookings(result.bookings || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Fetch bookings error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bookings,
    isLoading,
    error,
    fetchBookings,
  };
}
