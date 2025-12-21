// Centralized contact information for Brooklyn Maids
export const CONTACT_INFO = {
  phone: {
    display: '(347) 750-4380',
    href: 'tel:+13477504380',
    raw: '+13477504380'
  },
  email: {
    display: 'hello@brooklynmaids.com',
    href: 'mailto:hello@brooklynmaids.com',
    raw: 'hello@brooklynmaids.com'
  },
  address: {
    street: '69 Empire Blvd',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11225',
    full: '69 Empire Blvd, Brooklyn, NY 11225'
  },
  social: {
    facebook: 'https://www.facebook.com/brooklynmaids',
    instagram: 'https://www.instagram.com/brooklynmaids',
    yelp: 'https://www.yelp.com/biz/brooklyn-maids-brooklyn'
  },
  hours: {
    weekday: '8:00 AM - 8:00 PM',
    weekend: '9:00 AM - 6:00 PM'
  }
} as const;

