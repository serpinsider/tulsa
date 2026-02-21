// PostHog Analytics Client Configuration
import posthog from 'posthog-js';

const POSTHOG_KEY = 'phc_2JkAmbCMxoiKEfNhDpEzdm3qQLIgnWC6lwea1QqhF56';
const POSTHOG_HOST = 'https://us.i.posthog.com';

export const initPostHog = () => {
  if (typeof window !== 'undefined' && !posthog.__loaded) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      // Set site property on all events
      loaded: (posthog) => {
        posthog.register({
          site_business: 'Tulsa Maids',
          site_location: 'Tulsa',
          environment: process.env.NODE_ENV,
        });
      },
    });
  }
  return posthog;
};

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, {
      ...properties,
      site_business: 'Tulsa Maids',
      site_location: 'Tulsa',
    });
  }
};

// Identify user (for logged in users)
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, {
      ...traits,
      site_business: 'Tulsa Maids',
      site_location: 'Tulsa',
    });
  }
};

// Track page view
export const trackPageView = (pagePath?: string) => {
  if (typeof window !== 'undefined') {
    posthog.capture('$pageview', {
      $current_url: pagePath || window.location.href,
      site_business: 'Tulsa Maids',
      site_location: 'Tulsa',
    });
  }
};

export default posthog;

