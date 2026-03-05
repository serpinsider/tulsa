import { Metadata } from 'next';
import Link from 'next/link';
import { locations } from '@/lib/locations';
import { BRANDING } from '@/config/branding';
import { getFormattedLocationList } from '@/config/content';

export const metadata: Metadata = {
  title: `Service Areas - ${BRANDING.businessName}`,
  description: `${BRANDING.businessName} provides house cleaning services across ${BRANDING.serviceAreaLong}. Find your location.`,
  openGraph: {
    title: `Service Areas - ${BRANDING.businessName}`,
    description: `${BRANDING.businessName} provides house cleaning services across ${BRANDING.serviceAreaLong}.`,
    url: `${BRANDING.url}/locations`,
    siteName: BRANDING.businessName,
    images: [
      {
        url: '/ogs-image.jpg',
        width: 1200,
        height: 630,
        alt: `${BRANDING.businessName} Service Areas`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Service Areas - ${BRANDING.businessName}`,
    description: `${BRANDING.businessName} provides house cleaning services across ${BRANDING.serviceAreaLong}.`,
  },
  alternates: {
    canonical: `${BRANDING.url}/locations`,
  },
};

// Map state abbreviations to full names
const stateNames: Record<string, string> = {
  'NY': 'New York',
  'NJ': 'New Jersey',
  'CT': 'Connecticut',
  'NV': 'Nevada',
  'CA': 'California',
  'AZ': 'Arizona',
  'TX': 'Texas',
  'FL': 'Florida',
  'MD': 'Maryland',
  'DC': 'Washington D.C.',
  'VA': 'Virginia',
  'NC': 'North Carolina',
  'MA': 'Massachusetts',
  'CO': 'Colorado',
};

export default function LocationsPage() {
  // Group locations by state
  const locationsByState = locations.reduce((acc, location) => {
    if (!acc[location.state]) {
      acc[location.state] = [];
    }
    acc[location.state].push(location);
    return acc;
  }, {} as Record<string, typeof locations>);

  return (
    <main className="min-h-screen pt-48 pb-12" style={{ background: 'rgba(30, 35, 40, 0.98)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#dfbd69] mb-6">
            Areas We Serve
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            House cleaning services across {getFormattedLocationList()}. 
            Licensed, insured, and trusted by thousands of customers.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(locationsByState).map(([state, stateLocations]) => (
            <div key={state} className="backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8" style={{ background: 'rgba(20, 25, 30, 0.8)' }}>
              <h2 className="text-2xl font-serif font-bold text-[#dfbd69] mb-6">
                {stateNames[state] || state}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {stateLocations.map((location) => (
                  <Link
                    key={location.slug}
                    href={`/locations/${location.slug}`}
                    className="group p-4 rounded-lg border border-white/20 hover:border-[#dfbd69] hover:bg-white/5 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-[#dfbd69] transition-colors">
                          {location.name}
                        </h3>
                        <p className="text-sm text-white/60">
                          {location.state}
                        </p>
                      </div>
                      <svg 
                        className="w-5 h-5 text-white/40 group-hover:text-[#dfbd69] transition-colors"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8 text-center" style={{ background: 'rgba(20, 25, 30, 0.9)' }}>
          <h2 className="text-2xl font-serif font-bold text-[#dfbd69] mb-4">
            Don't See Your Area?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            We're constantly expanding our service areas. Contact us to see if we can serve your location 
            or to request service in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={BRANDING.phone.href}
              className="bg-[#dfbd69] text-[#1a1f24] px-8 py-3 rounded-lg font-semibold hover:bg-[#c9a84f] transition-all"
            >
              Call {BRANDING.phone.display}
            </a>
            <a 
              href={BRANDING.email.href}
              className="bg-transparent border-2 border-[#dfbd69] text-[#dfbd69] px-8 py-3 rounded-lg font-semibold hover:bg-[#dfbd69] hover:text-[#1a1f24] transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
