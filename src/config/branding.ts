/**
 * Branding Configuration - Tulsa Maids
 * 
 * SINGLE SOURCE OF TRUTH for all site-specific branding and identity data.
 */

export const BRANDING = {
  // ===== BUSINESS IDENTITY =====
  
  businessName: 'Tulsa Maids',
  businessId: 'tulsa',
  
  // ===== DOMAIN & URL =====
  
  domain: 'tulsamaids.com',
  url: 'https://www.tulsamaids.com',
  
  // ===== SERVICE AREA =====
  
  primaryCity: 'Tulsa',
  primaryState: 'OK',
  serviceArea: 'Tulsa, Broken Arrow, Owasso',
  serviceAreaLong: 'Tulsa, Broken Arrow, Owasso, Jenks, Bixby, Sand Springs, and surrounding Oklahoma areas',
  serviceAreaAbbreviation: 'Tulsa Metro',
  
  // ===== TIMEZONE =====
  
  timezone: 'America/Chicago',
  
  // ===== CONTACT INFORMATION =====
  
  phone: {
    display: '(918) 900-8470',
    href: 'tel:+19189008470',
    raw: '+19189008470',
    smsHref: 'sms:+19189008470',
  },
  
  email: {
    display: 'hello@tulsamaids.com',
    href: 'mailto:hello@tulsamaids.com',
    raw: 'hello@tulsamaids.com',
  },
  
  // ===== BUSINESS ADDRESS =====
  
  address: {
    street: '',
    city: 'Tulsa',
    state: 'OK',
    zip: '74103',
    full: 'Tulsa, OK 74103',
  },
  
  // ===== ASSETS =====
  
  assets: {
    logo: '/logo.png',
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
    ogImage: '/ogs-image.jpg',
    twitterImage: '/twitter-image.jpg',
    heroVideo: '/hero-vid.mp4',
  },
  
  // ===== THIRD-PARTY IDS =====
  
  integrations: {
    formspreeId: 'mrbjzvde',
    posthogKey: '',
    fathomSiteId: '',
    bookingKoalaSubdomain: 'tulsa',
  },
  
  // ===== SEO METADATA =====
  
  seo: {
    metaTitle: 'Tulsa Maids - House Cleaning & Maid Service in Tulsa, OK',
    metaDescription: 'Professional house cleaning and maid service serving Tulsa, Broken Arrow, Owasso, and surrounding Oklahoma areas. Book online in 60 seconds. Trusted, reliable, and eco-friendly cleaning.',
    keywords: 'house cleaning, maid service, cleaning service, Tulsa, Broken Arrow, Oklahoma cleaning',
  },
  
  // ===== BUSINESS HOURS =====
  
  hours: {
    weekday: '8:00 AM - 8:00 PM',
    weekend: '9:00 AM - 6:00 PM',
    display: 'Monday-Sunday, 8 AM - 8 PM',
  },
  
  // ===== SOCIAL MEDIA =====
  
  social: {
    facebook: 'https://www.facebook.com/tulsamaids',
    instagram: 'https://www.instagram.com/tulsamaids',
    yelp: 'https://www.yelp.com/biz/tulsa-maids-tulsa',
  },
} as const;

/**
 * Helper to get BookingKoala embed URL
 */
export const getBookingKoalaUrl = (path: string = 'booknow') => {
  return `https://${BRANDING.integrations.bookingKoalaSubdomain}.bookingkoala.com/${path}?embed=true`;
};

/**
 * Helper to get Formspree endpoint
 */
export const getFormspreeEndpoint = () => {
  return `https://formspree.io/f/${BRANDING.integrations.formspreeId}`;
};

/**
 * Type export for use in other files
 */
export type BrandingConfig = typeof BRANDING;
