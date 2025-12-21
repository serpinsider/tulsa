'use client';

import { useEffect } from 'react';

/**
 * ScrollToTop Component
 * Automatically scrolls to top of page when component mounts
 * Used on service pages to ensure users start at the top when navigating
 */
export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

