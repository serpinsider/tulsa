const ANALYTICS_URL = 'https://maidcrm.com/api/public/analytics/event';
const BRAND_SLUG = 'tulsa';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem('_mcrm_sid');
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('_mcrm_sid', sid);
  }
  return sid;
}

function getUtmParams(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
} {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const val = params.get(key);
    if (val) result[key] = val;
  }
  return result;
}

function fire(event_type: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const payload = {
    brand_slug: BRAND_SLUG,
    session_id: getSessionId(),
    event_type,
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    ...getUtmParams(),
    data: data || {},
  };
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ANALYTICS_URL, JSON.stringify(payload));
    } else {
      fetch(ANALYTICS_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // tracking must never break the UI
  }
}

export function trackPageview() {
  fire('pageview');
}

export function trackClick(type: string) {
  fire('cta_click', { type });
}

export function trackQuoteStart() {
  fire('quote_start');
}

export function trackQuoteStep(step: number) {
  fire('quote_step', { step });
}

export function trackQuoteSubmit() {
  fire('quote_submit');
}

export function trackBookingStart() {
  fire('booking_start');
}

export function trackBookingComplete() {
  fire('booking_complete');
}

export function trackPhoneClick() {
  fire('phone_click');
}

export function trackTextClick() {
  fire('text_click');
}
