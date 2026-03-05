/**
 * Branding Configuration - Tulsa Maids
 */

export const BRANDING = {
  businessName: 'Tulsa Maids',
  businessId: 'tulsa',

  domain: 'tulsamaids.com',
  url: 'https://tulsamaids.com',

  primaryCity: 'Tulsa',
  primaryState: 'OK',
  serviceArea: 'Tulsa, Broken Arrow, Owasso',
  serviceAreaLong: 'Tulsa, Broken Arrow, Owasso, Jenks, Bixby, Sand Springs, and surrounding Oklahoma areas',
  serviceAreaAbbreviation: 'Tulsa Metro',

  timezone: 'America/Chicago',

  phone: {
    display: '(918) 818-2460',
    href: 'tel:+19188182460',
    raw: '+19188182460',
    smsHref: 'sms:+19188182460',
  },

  email: {
    display: 'hello@tulsamaids.com',
    href: 'mailto:hello@tulsamaids.com',
    raw: 'hello@tulsamaids.com',
  },

  address: {
    street: '',
    city: 'Tulsa',
    state: 'OK',
    zip: '74103',
    full: 'Tulsa, OK 74103',
  },

  assets: {
    logo: '/logo.png',
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
    ogImage: '/ogs-image.jpg',
    twitterImage: '/twitter-image.jpg',
    heroVideo: '/hero-vid.mp4',
  },

  integrations: {
    formspreeId: 'mrbjzvde',
    posthogKey: '',
    fathomSiteId: '',
    bookingKoalaSubdomain: 'pine',
  },

  seo: {
    metaTitle: 'Tulsa Maids - House Cleaning & Maid Service in Tulsa, OK',
    metaDescription: 'Professional house cleaning and maid service serving Tulsa, Broken Arrow, Owasso, and surrounding Oklahoma areas. Book online in 60 seconds.',
    keywords: 'house cleaning, maid service, cleaning service, Tulsa, Broken Arrow, Oklahoma cleaning',
  },

  hours: {
    weekday: '8:00 AM - 8:00 PM',
    weekend: '9:00 AM - 6:00 PM',
    display: 'Monday-Sunday, 8 AM - 8 PM',
  },

  social: {
    facebook: 'https://www.facebook.com/tulsamaids',
    instagram: 'https://www.instagram.com/tulsamaids',
    yelp: 'https://www.yelp.com/biz/tulsa-maids-tulsa',
  },
} as const;

export const getBookingKoalaUrl = (path: string = 'booknow') => {
  return `https://${BRANDING.integrations.bookingKoalaSubdomain}.bookingkoala.com/${path}?embed=true`;
};

export const getFormspreeEndpoint = () => {
  return `https://formspree.io/f/${BRANDING.integrations.formspreeId}`;
};

export type BrandingConfig = typeof BRANDING;
