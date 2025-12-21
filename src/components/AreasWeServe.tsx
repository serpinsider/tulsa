'use client';

import Link from 'next/link';

interface Area {
  name: string;
  slug?: string;
}

interface AreasWeServeProps {
  state: 'NY' | 'NJ' | 'CT' | 'MA';
  title?: string;
  description?: string;
}

const areasByState = {
  NY: {
    title: 'Areas We Serve in New York',
    description: 'Cleaning services throughout the greater New York metropolitan area.',
    sections: [
      {
        title: 'NYC Boroughs',
        areas: [
          { name: 'Brooklyn' },
          { name: 'Manhattan' },
          { name: 'Queens' },
          { name: 'Bronx' },
          { name: 'Staten Island' },
        ]
      },
      {
        title: 'Brooklyn Neighborhoods',
        areas: [
          { name: 'Park Slope' },
          { name: 'Williamsburg' },
          { name: 'Brooklyn Heights' },
          { name: 'DUMBO' },
          { name: 'Downtown Brooklyn' },
          { name: 'Fort Greene' },
          { name: 'Prospect Heights' },
          { name: 'Carroll Gardens' },
          { name: 'Cobble Hill' },
          { name: 'Boerum Hill' },
          { name: 'Red Hook' },
          { name: 'Gowanus' },
          { name: 'Sunset Park' },
          { name: 'Crown Heights' },
          { name: 'Bedford-Stuyvesant' },
          { name: 'Bushwick' },
          { name: 'Greenpoint' },
          { name: 'Clinton Hill' },
          { name: 'Windsor Terrace' },
          { name: 'Bay Ridge' },
        ]
      },
      {
        title: 'Long Island',
        areas: [
          { name: 'Nassau County' },
          { name: 'Suffolk County' },
          { name: 'The Hamptons' },
          { name: 'North Shore' },
          { name: 'South Shore' },
        ]
      }
    ]
  },
  NJ: {
    title: 'Areas We Serve in New Jersey',
    description: 'Cleaning services throughout Northern New Jersey and the greater NYC metro area.',
    sections: [
      {
        title: 'Hudson County',
        areas: [
          { name: 'Jersey City' },
          { name: 'Hoboken' },
          { name: 'Weehawken' },
          { name: 'Union City' },
          { name: 'West New York' },
        ]
      },
      {
        title: 'Bergen County',
        areas: [
          { name: 'Fort Lee' },
          { name: 'Edgewater' },
          { name: 'Englewood' },
          { name: 'Teaneck' },
          { name: 'Hackensack' },
        ]
      },
      {
        title: 'Essex County',
        areas: [
          { name: 'Newark' },
          { name: 'Montclair' },
          { name: 'Bloomfield' },
          { name: 'East Orange' },
          { name: 'Irvington' },
        ]
      }
    ]
  },
  CT: {
    title: 'Areas We Serve in Connecticut',
    description: 'Cleaning services in Fairfield County and surrounding areas.',
    sections: [
      {
        title: 'Fairfield County',
        areas: [
          { name: 'Greenwich' },
          { name: 'Stamford' },
          { name: 'Norwalk' },
          { name: 'Bridgeport' },
          { name: 'Fairfield' },
        ]
      }
    ]
  },
  MA: {
    title: 'Areas We Serve in Massachusetts',
    description: 'Cleaning services in the greater Boston area.',
    sections: [
      {
        title: 'Greater Boston',
        areas: [
          { name: 'Boston' },
          { name: 'Cambridge' },
          { name: 'Somerville' },
          { name: 'Brookline' },
        ]
      }
    ]
  }
};

import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

export default function AreasWeServe({ state, title, description }: AreasWeServeProps) {
  const stateData = areasByState[state];
  const displayTitle = title || stateData.title;
  const displayDescription = description || stateData.description;

  return (
    <section className="py-20" style={INLINE_STYLES.primary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            {displayTitle}
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
            {displayDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stateData.sections.map((section, idx) => (
            <div key={idx} className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8">
              <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.areas.map((area, areaIdx) => (
                  <li key={areaIdx} className="flex items-center text-white/80">
                    <svg className="w-4 h-4 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {area.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

