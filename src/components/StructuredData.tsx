/**
 * StructuredData Component
 * 
 * Automatically pulls service areas from locations.ts
 * No manual updates needed when creating new sites.
 */

import { BRANDING } from '@/config/branding';
import { locations } from '@/lib/locations';

interface StructuredDataProps {
  type: 'local-business' | 'service' | 'location' | 'organization' | 'website' | 'faq';
  data?: {
    location?: string;
    description?: string;
    service?: string;
    cities?: string[];
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'local-business':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": BRANDING.businessName,
          "image": `${BRANDING.url}${BRANDING.assets.ogImage}`,
          "description": BRANDING.seo.metaDescription,
          "url": BRANDING.url,
          "telephone": BRANDING.phone.raw,
          "email": BRANDING.email.display,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US",
            "addressRegion": BRANDING.address.state,
            "addressLocality": BRANDING.address.city,
            "postalCode": BRANDING.address.zip,
            "streetAddress": BRANDING.address.street
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 36.1540,
            "longitude": -95.9928
          },
          "areaServed": [
            {
              "@type": "State",
              "name": BRANDING.primaryState
            },
            ...locations.map(loc => ({
              "@type": "City",
              "name": loc.name
            }))
          ],
          "serviceType": ["House Cleaning", "Maid Service", "Residential Cleaning"],
          "priceRange": "$80-$400",
          "openingHours": ["Mo-Fr 08:00-20:00", "Sa-Su 09:00-18:00"],
          "paymentAccepted": ["Credit Card", "Debit Card", "Zelle"],
          "currenciesAccepted": "USD",
          "sameAs": [
            "https://www.facebook.com/tulsamaids",
            "https://www.instagram.com/tulsamaids",
            "https://www.linkedin.com/company/tulsamaids",
            "https://twitter.com/tulsamaids"
          ]
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": BRANDING.businessName,
          "url": BRANDING.url,
          "logo": `${BRANDING.url}${BRANDING.assets.logo}`,
          "description": "House cleaning services across Tulsa and surrounding areas.",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": BRANDING.phone.raw,
            "contactType": "customer service",
            "areaServed": "US",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.facebook.com/tulsamaids",
            "https://www.instagram.com/tulsamaids",
            "https://www.linkedin.com/company/tulsamaids",
            "https://twitter.com/tulsamaids"
          ]
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": BRANDING.businessName,
          "alternateName": [`${BRANDING.businessName} Cleaning`, BRANDING.domain],
          "url": BRANDING.url,
          "description": BRANDING.seo.metaDescription,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${BRANDING.url}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What's included in your cleans?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every clean includes sweeping, mopping, vacuuming, cleaning surfaces in bedrooms, bathrooms, common areas, and kitchen. We ensure thorough cleaning of all specified areas."
              }
            },
            {
              "@type": "Question",
              "name": "What's the difference between a standard clean and a deep clean?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our deep cleans include everything in a standard clean plus wiping down doors, door frames, windowsills, window frames, and baseboards for a more thorough cleaning experience."
              }
            },
            {
              "@type": "Question",
              "name": "What's a move out clean?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Move in/out cleans are our most thorough service. We include everything from the deep clean plus cleaning inside cabinets, closets, and wiping down all shelves to ensure the space is ready for new occupants."
              }
            },
            {
              "@type": "Question",
              "name": "Do you bring your own supplies?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we use pet-safe and non-toxic products. We bring our own mops and vacuum (upon request)."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer recurring service discounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Save 10% with weekly service, 5% with bi-weekly service, or $10 off monthly cleanings."
              }
            }
          ]
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `House Cleaning Services${data?.location ? ` in ${data.location}` : ''}`,
          "provider": {
            "@type": "LocalBusiness",
            "name": BRANDING.businessName,
            "url": BRANDING.url
          },
          "serviceType": "House Cleaning",
          "description": `House cleaning and maid services${data?.location ? ` in ${data.location}` : ''}. Regular cleaning, deep cleaning, move-out cleaning, and specialty services.`,
          "areaServed": data?.location ? {
            "@type": "State",
            "name": data.location
          } : undefined,
          "offers": [
            {
              "@type": "Offer",
              "name": "Regular Cleaning",
              "description": "Weekly, bi-weekly, or monthly cleaning services",
              "price": "89",
              "priceCurrency": "USD",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "minPrice": "89",
                "maxPrice": "200",
                "priceCurrency": "USD"
              }
            },
            {
              "@type": "Offer", 
              "name": "Deep Cleaning",
              "description": "Comprehensive deep cleaning service",
              "price": "150",
              "priceCurrency": "USD",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "minPrice": "150",
                "maxPrice": "300",
                "priceCurrency": "USD"
              }
            }
          ]
        };

      case 'location':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `House Cleaning Services in ${data?.location}`,
          "provider": {
            "@type": "LocalBusiness",
            "name": BRANDING.businessName
          },
          "serviceArea": {
            "@type": "State",
            "name": data?.location
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `Cleaning Services in ${data?.location}`,
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Regular House Cleaning",
                  "description": "Weekly, bi-weekly, or monthly cleaning"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Deep Cleaning",
                  "description": "Thorough, detailed cleaning service"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service", 
                  "name": "Move-out Cleaning",
                  "description": "Complete cleaning for moving"
                }
              }
            ]
          }
        };

      default:
        return {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}