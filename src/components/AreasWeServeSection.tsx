'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';
import { locations } from '@/lib/locations';
import { AREAS_WE_SERVE_DESCRIPTION } from '@/config/content';

export default function AreasWeServeSection() {
  const [showAllAreas, setShowAllAreas] = useState(false);
  
  // Show first 8 locations by default, all when expanded
  const displayedLocations = showAllAreas ? locations : locations.slice(0, 8);
  const hasMoreLocations = locations.length > 8;
  
  return (
    <section id="areas" className="pt-20 pb-12" style={INLINE_STYLES.primary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            Areas We Serve
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
            {AREAS_WE_SERVE_DESCRIPTION}
          </p>
        </div>

        {/* Dynamic Grid Based on Location Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {displayedLocations.map((location) => (
            <Link 
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-6 hover:border-[#dfbd69]/50 transition-all duration-300 group"
            >
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[#dfbd69] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#dfbd69] transition-colors">
                    {location.name}
                  </h3>
                  {location.state && (
                    <p className="text-sm text-white/60 mt-1">{location.state}</p>
                  )}
                  {location.description && (
                    <p className="text-xs text-white/50 mt-2">{location.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMoreLocations && (
          <div className="text-center my-12">
            <button 
              onClick={() => setShowAllAreas(!showAllAreas)}
              className="bg-transparent hover:bg-white/10 border border-[#dfbd69] text-[#dfbd69] px-5 py-2.5 rounded-lg transition-all duration-300 inline-block"
            >
              {showAllAreas ? 'Show Less Areas' : `Show All ${locations.length} Service Areas`}
            </button>
          </div>
        )}

        {/* View All Locations Link */}
        <div className="text-center mt-8">
          <Link 
            href="/locations" 
            className="text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold inline-flex items-center gap-2"
          >
            View Complete Service Area Map
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
