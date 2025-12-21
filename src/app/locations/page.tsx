import { Metadata } from 'next';
import Link from 'next/link';
import { locations, getLocationWithState } from '@/lib/locations';

export const metadata: Metadata = {
  title: 'Service Areas - Brooklyn Maids',
  description: 'Brooklyn Maids provides house cleaning services across Brooklyn, Manhattan, Queens, Bronx, and surrounding areas. Find your location.',
  openGraph: {
    title: 'Service Areas - Brooklyn Maids',
    description: 'Brooklyn Maids provides house cleaning services across Brooklyn, Manhattan, Queens, Bronx, and surrounding areas.',
    url: 'https://brooklynmaids.com/locations',
    siteName: 'Brooklyn Maids',
    images: [
      {
        url: '/ogs-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brooklyn Maids Service Areas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/locations',
  },
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
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-on-light)] mb-6">
            Areas We Serve
          </h1>
          <p className="text-lg text-[var(--text-muted-light)] max-w-3xl mx-auto">
            House cleaning services across Brooklyn, Manhattan, Queens, Bronx, and surrounding areas. 
            Licensed, insured, and trusted by thousands of customers.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(locationsByState).map(([state, stateLocations]) => (
            <div key={state} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-serif font-bold text-[var(--text-on-light)] mb-6">
                {state === 'NY' ? 'New York' : state === 'NJ' ? 'New Jersey' : 'Connecticut'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {stateLocations.map((location) => (
                  <Link
                    key={location.slug}
                    href={`/locations/${location.slug}`}
                    className="group p-4 rounded-lg border border-gray-200 hover:border-[#dfbd69] hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-[var(--text-on-light)] group-hover:text-[#dfbd69] transition-colors">
                          {location.name}
                        </h3>
                        <p className="text-sm text-[var(--text-muted-light)]">
                          {location.state}
                        </p>
                      </div>
                      <svg 
                        className="w-5 h-5 text-gray-400 group-hover:text-[#dfbd69] transition-colors"
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

        <div className="mt-16 bg-[#283845] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-4">
            Don't See Your Area?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            We're constantly expanding our service areas. Contact us to see if we can serve your location 
            or to request service in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+13477504380" 
              className="bg-[#dfbd69] text-[#283845] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Call (347) 750-4380
            </a>
            <a 
              href="mailto:hi@brooklynmaids.com" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#283845] transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}