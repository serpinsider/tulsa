'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';
import { locations } from '@/lib/locations';

// Helper to convert name to slug
const nameToSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
};

// Helper to check if location page exists
const hasLocationPage = (name: string): boolean => {
  const slug = nameToSlug(name);
  return locations.some(loc => loc.slug === slug);
};

const nyAreas = {
  boroughs: [
    { name: 'Brooklyn', slug: 'brooklyn' },
    { name: 'Manhattan', slug: 'manhattan' },
    { name: 'Queens', slug: 'queens' },
    { name: 'Bronx', slug: 'bronx' },
    { name: 'Staten Island', slug: 'staten-island' }
  ],
  brooklynNeighborhoods: [
    'Park Slope', 'Williamsburg', 'Brooklyn Heights', 'DUMBO', 'Downtown Brooklyn',
    'Fort Greene', 'Prospect Heights', 'Carroll Gardens', 'Cobble Hill', 'Boerum Hill',
    'Red Hook', 'Gowanus', 'Sunset Park', 'Crown Heights', 'Bedford-Stuyvesant',
    'Bushwick', 'Greenpoint', 'Clinton Hill', 'Windsor Terrace', 'Bay Ridge'
  ],
  manhattanNeighborhoods: [
    'Upper East Side', 'Upper West Side', 'Tribeca', 'SoHo', 'Chelsea',
    'West Village', 'East Village', 'Greenwich Village', 'Midtown', 'Financial District',
    'Battery Park City', 'Gramercy', 'Murray Hill', 'Hell\'s Kitchen', 'Harlem'
  ],
  queensNeighborhoods: [
    'Astoria', 'Long Island City', 'Forest Hills', 'Bayside', 'Flushing',
    'Jamaica', 'Elmhurst', 'Jackson Heights', 'Woodside', 'Sunnyside'
  ],
  bronxNeighborhoods: [
    'Riverdale', 'Pelham Bay', 'City Island', 'Fordham', 'Kingsbridge',
    'Morris Park', 'Throgs Neck', 'Co-op City', 'Bedford Park', 'Norwood'
  ],
  statenIslandNeighborhoods: [
    'St. George', 'Stapleton', 'Tottenville', 'Great Kills', 'New Dorp', 'Annadale'
  ],
  longIsland: [
    'Great Neck', 'Manhasset', 'Garden City', 'Port Washington', 'Roslyn',
    'East Hampton', 'Southampton', 'Bridgehampton', 'Montauk', 'Sag Harbor'
  ],
  westchester: [
    'Scarsdale', 'Rye', 'White Plains', 'Bronxville', 'Yonkers',
    'New Rochelle', 'Larchmont', 'Mamaroneck', 'Pelham', 'Harrison'
  ]
};

export default function AreasWeServeSection() {
  const [showAllAreas, setShowAllAreas] = useState(false);
  
  return (
    <section id="areas" className="pt-20 pb-12" style={INLINE_STYLES.primary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            Areas We Serve
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
            Professional cleaning services throughout New York
          </p>
        </div>

        {/* Single Grid - All Cards Flow Naturally */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* NYC Boroughs with Links */}
          <div className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8">
            <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4">
              NYC Boroughs
            </h3>
            <ul className="space-y-2">
              {nyAreas.boroughs.map((area) => (
                <li key={area.slug} className="flex items-center text-white/80 text-sm">
                  <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link 
                    href={`/locations/${area.slug}`}
                    className="hover:text-[#dfbd69] transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brooklyn Neighborhoods */}
          <div className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8">
            <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4">
              <Link href="/locations/brooklyn" className="hover:text-[#dfbd69]/80 transition-colors">
                Brooklyn Areas
              </Link>
            </h3>
            <ul className="space-y-2">
              {(showAllAreas ? nyAreas.brooklynNeighborhoods : nyAreas.brooklynNeighborhoods.slice(0, 5)).map((area) => (
                <li key={area} className="flex items-center text-white/80 text-sm">
                  <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {hasLocationPage(area) ? (
                    <Link 
                      href={`/locations/${nameToSlug(area)}`}
                      className="hover:text-[#dfbd69] transition-colors"
                    >
                      {area}
                    </Link>
                  ) : (
                    area
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Manhattan Neighborhoods */}
          <div className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8">
            <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4">
              <Link href="/locations/manhattan" className="hover:text-[#dfbd69]/80 transition-colors">
                Manhattan Areas
              </Link>
            </h3>
            <ul className="space-y-2">
              {(showAllAreas ? nyAreas.manhattanNeighborhoods : nyAreas.manhattanNeighborhoods.slice(0, 5)).map((area) => (
                <li key={area} className="flex items-center text-white/80 text-sm">
                  <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {hasLocationPage(area) ? (
                    <Link 
                      href={`/locations/${nameToSlug(area)}`}
                      className="hover:text-[#dfbd69] transition-colors"
                    >
                      {area}
                    </Link>
                  ) : (
                    area
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Queens Neighborhoods */}
          <div className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8">
            <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4">
              <Link href="/locations/queens" className="hover:text-[#dfbd69]/80 transition-colors">
                Queens Areas
              </Link>
            </h3>
            <ul className="space-y-2">
              {(showAllAreas ? nyAreas.queensNeighborhoods : nyAreas.queensNeighborhoods.slice(0, 5)).map((area) => (
                <li key={area} className="flex items-center text-white/80 text-sm">
                  <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {hasLocationPage(area) ? (
                    <Link 
                      href={`/locations/${nameToSlug(area)}`}
                      className="hover:text-[#dfbd69] transition-colors"
                    >
                      {area}
                    </Link>
                  ) : (
                    area
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional areas only show when expanded */}
          {showAllAreas && (
            <>
              {/* Bronx Neighborhoods */}
              <div className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8">
                <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4">
                  <Link href="/locations/bronx" className="hover:text-[#dfbd69]/80 transition-colors">
                    Bronx Areas
                  </Link>
                </h3>
                <ul className="space-y-2">
                  {nyAreas.bronxNeighborhoods.map((area) => (
                    <li key={area} className="flex items-center text-white/80 text-sm">
                      <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {hasLocationPage(area) ? (
                        <Link 
                          href={`/locations/${nameToSlug(area)}`}
                          className="hover:text-[#dfbd69] transition-colors"
                        >
                          {area}
                        </Link>
                      ) : (
                        area
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Long Island */}
              <div className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8">
                <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4">
                  <Link href="/locations/long-island" className="hover:text-[#dfbd69]/80 transition-colors">
                    Long Island
                  </Link>
                </h3>
                <ul className="space-y-2">
                  {nyAreas.longIsland.map((area) => (
                    <li key={area} className="flex items-center text-white/80 text-sm">
                      <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {hasLocationPage(area) ? (
                        <Link 
                          href={`/locations/${nameToSlug(area)}`}
                          className="hover:text-[#dfbd69] transition-colors"
                        >
                          {area}
                        </Link>
                      ) : (
                        area
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Staten Island Neighborhoods */}
              <div className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8">
                <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4">
                  <Link href="/locations/staten-island" className="hover:text-[#dfbd69]/80 transition-colors">
                    Staten Island Areas
                  </Link>
                </h3>
                <ul className="space-y-2">
                  {nyAreas.statenIslandNeighborhoods.map((area) => (
                    <li key={area} className="flex items-center text-white/80 text-sm">
                      <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {hasLocationPage(area) ? (
                        <Link 
                          href={`/locations/${nameToSlug(area)}`}
                          className="hover:text-[#dfbd69] transition-colors"
                        >
                          {area}
                        </Link>
                      ) : (
                        area
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Westchester */}
              <div className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8">
                <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4">
                  <Link href="/locations/westchester" className="hover:text-[#dfbd69]/80 transition-colors">
                    Westchester County
                  </Link>
                </h3>
                <ul className="space-y-2">
                  {nyAreas.westchester.map((area) => (
                    <li key={area} className="flex items-center text-white/80 text-sm">
                      <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {hasLocationPage(area) ? (
                        <Link 
                          href={`/locations/${nameToSlug(area)}`}
                          className="hover:text-[#dfbd69] transition-colors"
                        >
                          {area}
                        </Link>
                      ) : (
                        area
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Show More Button */}
        <div className="text-center my-12">
          <button 
            onClick={() => setShowAllAreas(!showAllAreas)}
            className="bg-transparent hover:bg-white/10 border border-[#dfbd69] text-[#dfbd69] px-5 py-2.5 rounded-lg transition-all duration-300 inline-block"
          >
            {showAllAreas ? 'Show Less Areas' : 'Show All Service Areas'}
          </button>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white/10 my-12"></div>

        {/* Also Serving New Jersey */}
        <div className="text-center">
          <p className="text-white/80 text-base">
            We also serve <Link href="/new-jersey" className="text-[#dfbd69] hover:underline font-semibold">Northern New Jersey</Link> including Jersey City, Hoboken, and surrounding areas.
          </p>
        </div>

      </div>
    </section>
  );
}