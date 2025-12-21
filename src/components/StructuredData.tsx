import { CONTACT_INFO } from '@/lib/contact';

interface StructuredDataProps {
  type: 'local-business' | 'service' | 'location' | 'organization' | 'website' | 'faq';
  data?: {
    location?: string;
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
          "name": "Brooklyn Maids",
          "image": "https://brooklynmaids.com/ogs-image.jpg",
          "description": "House cleaning services serving Brooklyn and surrounding NYC areas. Reliable, thorough, and trusted cleaning for your home.",
          "url": "https://brooklynmaids.com",
          "telephone": CONTACT_INFO.phone.raw,
          "email": CONTACT_INFO.email.raw,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US",
            "addressRegion": CONTACT_INFO.address.state,
            "addressLocality": CONTACT_INFO.address.city,
            "postalCode": CONTACT_INFO.address.zip,
            "streetAddress": CONTACT_INFO.address.street
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.6782,
            "longitude": -73.9442
          },
          "areaServed": [
            {
              "@type": "State",
              "name": "New York"
            },
            {
              "@type": "State",
              "name": "New Jersey"
            },
            // NYC Boroughs
            { "@type": "City", "name": "Brooklyn" },
            { "@type": "City", "name": "Manhattan" },
            { "@type": "City", "name": "Queens" },
            { "@type": "City", "name": "Bronx" },
            { "@type": "City", "name": "Staten Island" },
            // Brooklyn Neighborhoods
            { "@type": "AdministrativeArea", "name": "Park Slope" },
            { "@type": "AdministrativeArea", "name": "Williamsburg" },
            { "@type": "AdministrativeArea", "name": "Brooklyn Heights" },
            { "@type": "AdministrativeArea", "name": "DUMBO" },
            { "@type": "AdministrativeArea", "name": "Downtown Brooklyn" },
            { "@type": "AdministrativeArea", "name": "Fort Greene" },
            { "@type": "AdministrativeArea", "name": "Prospect Heights" },
            { "@type": "AdministrativeArea", "name": "Carroll Gardens" },
            { "@type": "AdministrativeArea", "name": "Cobble Hill" },
            { "@type": "AdministrativeArea", "name": "Boerum Hill" },
            { "@type": "AdministrativeArea", "name": "Red Hook" },
            { "@type": "AdministrativeArea", "name": "Gowanus" },
            { "@type": "AdministrativeArea", "name": "Sunset Park" },
            { "@type": "AdministrativeArea", "name": "Crown Heights" },
            { "@type": "AdministrativeArea", "name": "Bedford-Stuyvesant" },
            { "@type": "AdministrativeArea", "name": "Bushwick" },
            { "@type": "AdministrativeArea", "name": "Greenpoint" },
            { "@type": "AdministrativeArea", "name": "Clinton Hill" },
            { "@type": "AdministrativeArea", "name": "Windsor Terrace" },
            { "@type": "AdministrativeArea", "name": "Bay Ridge" },
            { "@type": "AdministrativeArea", "name": "Albemarle" },
            { "@type": "AdministrativeArea", "name": "Atlantic Terminal" },
            { "@type": "AdministrativeArea", "name": "Bath Beach" },
            { "@type": "AdministrativeArea", "name": "Bensonhurst" },
            { "@type": "AdministrativeArea", "name": "Bergen Beach" },
            { "@type": "AdministrativeArea", "name": "Borough Park" },
            { "@type": "AdministrativeArea", "name": "Brighton Beach" },
            { "@type": "AdministrativeArea", "name": "Broadway Junction" },
            { "@type": "AdministrativeArea", "name": "Brooklyn Navy Yard" },
            { "@type": "AdministrativeArea", "name": "Brownsville" },
            { "@type": "AdministrativeArea", "name": "Canarsie" },
            { "@type": "AdministrativeArea", "name": "City Line" },
            { "@type": "AdministrativeArea", "name": "Columbia Street Waterfront" },
            { "@type": "AdministrativeArea", "name": "Coney Island" },
            { "@type": "AdministrativeArea", "name": "Cypress Hills" },
            { "@type": "AdministrativeArea", "name": "Dahill" },
            { "@type": "AdministrativeArea", "name": "Dyker Beach Park" },
            { "@type": "AdministrativeArea", "name": "Dyker Heights" },
            { "@type": "AdministrativeArea", "name": "East Flatbush" },
            { "@type": "AdministrativeArea", "name": "East New York" },
            { "@type": "AdministrativeArea", "name": "East Williamsburg" },
            { "@type": "AdministrativeArea", "name": "Erasmus" },
            { "@type": "AdministrativeArea", "name": "Farragut" },
            { "@type": "AdministrativeArea", "name": "Flatbush" },
            { "@type": "AdministrativeArea", "name": "Flatlands" },
            { "@type": "AdministrativeArea", "name": "Floyd Bennett Field" },
            { "@type": "AdministrativeArea", "name": "Fort Hamilton" },
            { "@type": "AdministrativeArea", "name": "Georgetown" },
            { "@type": "AdministrativeArea", "name": "Gerritsen Beach" },
            { "@type": "AdministrativeArea", "name": "Gravesend" },
            { "@type": "AdministrativeArea", "name": "Greenwood Cemetery" },
            { "@type": "AdministrativeArea", "name": "Greenwood Heights" },
            { "@type": "AdministrativeArea", "name": "Highland Park" },
            { "@type": "AdministrativeArea", "name": "Homecrest" },
            { "@type": "AdministrativeArea", "name": "Industry City" },
            { "@type": "AdministrativeArea", "name": "Kensington" },
            { "@type": "AdministrativeArea", "name": "Los Sures Southside" },
            { "@type": "AdministrativeArea", "name": "Madison" },
            { "@type": "AdministrativeArea", "name": "Manhattan Beach" },
            { "@type": "AdministrativeArea", "name": "Mapleton" },
            { "@type": "AdministrativeArea", "name": "Marine Park" },
            { "@type": "AdministrativeArea", "name": "Midwood" },
            { "@type": "AdministrativeArea", "name": "Midwood Park" },
            { "@type": "AdministrativeArea", "name": "Mill Basin" },
            { "@type": "AdministrativeArea", "name": "Navy Yard" },
            { "@type": "AdministrativeArea", "name": "New Lots" },
            { "@type": "AdministrativeArea", "name": "Northside" },
            { "@type": "AdministrativeArea", "name": "Ocean Hill" },
            { "@type": "AdministrativeArea", "name": "Paerdegat" },
            { "@type": "AdministrativeArea", "name": "Parkville" },
            { "@type": "AdministrativeArea", "name": "Prospect Lefferts Gardens" },
            { "@type": "AdministrativeArea", "name": "Prospect Park South" },
            { "@type": "AdministrativeArea", "name": "Remsen Village" },
            { "@type": "AdministrativeArea", "name": "Seagate" },
            { "@type": "AdministrativeArea", "name": "Sheepshead Bay" },
            { "@type": "AdministrativeArea", "name": "South Slope" },
            { "@type": "AdministrativeArea", "name": "South Williamsburg" },
            { "@type": "AdministrativeArea", "name": "Starrett City" },
            { "@type": "AdministrativeArea", "name": "Stuyvesant Heights" },
            { "@type": "AdministrativeArea", "name": "Victorian Flatbush" },
            { "@type": "AdministrativeArea", "name": "Vinegar Hill" },
            // Long Island & Westchester
            { "@type": "City", "name": "Long Island" },
            { "@type": "City", "name": "Westchester" },
            // New Jersey
            { "@type": "City", "name": "Jersey City" },
            { "@type": "City", "name": "Hoboken" }
          ],
          "serviceType": ["House Cleaning", "Maid Service", "Residential Cleaning"],
          "priceRange": "$80-$400",
          "openingHours": ["Mo-Fr 08:00-20:00", "Sa-Su 09:00-18:00"],
          "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
          "currenciesAccepted": "USD",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "267",
            "bestRating": "5",
            "worstRating": "1"
          },
          "sameAs": [
            "https://www.facebook.com/brooklynmaids",
            "https://www.instagram.com/brooklynmaids",
            "https://www.linkedin.com/company/brooklynmaids",
            "https://twitter.com/brooklynmaids"
          ]
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Brooklyn Maids",
          "url": "https://brooklynmaids.com",
          "logo": "https://brooklynmaids.com/ogs-image.jpg",
          "description": "House cleaning services across New York City and surrounding areas.",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+13477504380",
            "contactType": "customer service",
            "areaServed": "US",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.facebook.com/brooklynmaids",
            "https://www.instagram.com/brooklynmaids",
            "https://www.linkedin.com/company/brooklynmaids",
            "https://twitter.com/brooklynmaids"
          ]
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Brooklyn Maids",
          "alternateName": ["Brooklyn Maids Cleaning", "brooklynmaids.com"],
          "url": "https://brooklynmaids.com",
          "description": "House cleaning services across Brooklyn, New York",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://brooklynmaids.com/search?q={search_term_string}"
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
            "name": "Brooklyn Maids",
            "url": "https://brooklynmaids.com"
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
            "name": "Brooklyn Maids"
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