'use client';

import { useEffect } from 'react';
import { trackPageview } from '@/lib/analytics';

export default function AnalyticsBeacon() {
  useEffect(() => {
    trackPageview();
  }, []);
  return null;
}
