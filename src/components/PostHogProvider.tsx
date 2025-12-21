'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPostHog, trackPageView } from '@/lib/posthog/client';

function PostHogTracker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize PostHog on mount
    initPostHog();
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <PostHogTracker>{children}</PostHogTracker>
    </Suspense>
  );
}

