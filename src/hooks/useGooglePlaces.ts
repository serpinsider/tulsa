import { useEffect, useRef, useState } from 'react';

interface PlaceResult {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  formattedAddress: string;
}

export function useGooglePlaces(
  onPlaceSelected: (place: PlaceResult) => void,
  countryRestriction: string = 'us'
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGooglePlaces = async () => {
      // Check if Google Places is already loaded
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true);
        return;
      }

      // Load Google Places script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setIsLoaded(true);
      };

      document.head.appendChild(script);
    };

    loadGooglePlaces();
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    // Initialize autocomplete
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: countryRestriction },
      fields: ['address_components', 'formatted_address']
    });

    // Handle place selection
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place || !place.address_components) return;

      let address = '';
      let city = '';
      let state = '';
      let zipCode = '';

      // Parse address components
      place.address_components.forEach((component) => {
        const types = component.types;
        
        if (types.includes('street_number') || types.includes('route')) {
          address += component.long_name + ' ';
        } else if (types.includes('locality')) {
          city = component.long_name;
        } else if (types.includes('administrative_area_level_1')) {
          state = component.short_name;
        } else if (types.includes('postal_code')) {
          zipCode = component.long_name;
        }
      });

      const result: PlaceResult = {
        address: address.trim(),
        city,
        state,
        zipCode,
        formattedAddress: place.formatted_address || ''
      };

      onPlaceSelected(result);
    });

    return () => {
      // Cleanup
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, onPlaceSelected, countryRestriction]);

  return { inputRef, isLoaded };
}
