import { useEffect, useState } from 'react';

/**
 * Hook to safely execute client-only code without causing hydration errors
 * Returns true only after component mounts on client
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook to safely access window/document without hydration errors
 * Returns null during SSR, actual value on client
 */
export function useSafeWindow<T>(getter: () => T, defaultValue: T): T {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      setValue(getter());
    } catch (error) {
      console.error('Error accessing window property:', error);
    }
  }, [getter]);

  return value;
}

