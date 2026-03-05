'use client';

import { useState } from 'react';
import { taskCounts, type CleaningArea, cleaningTasks } from '@/lib/constants/cleaning-tasks';

type CleaningType = 'standard' | 'deep' | 'moveout';

interface CleaningTypesSectionProps {
  location?: string;
}

export default function CleaningTypesSection({ location = "Tulsa, OK" }: CleaningTypesSectionProps) {
  const [activeTab, setActiveTab] = useState<CleaningType>('standard');

  const cleaningTypes = {
    standard: {
      title: "Standard Clean",
      subtitle: `${taskCounts.routine} Essential Tasks`,
      description: "Perfect for regular maintenance and keeping your home consistently clean and organized.",
      price: "Starting at $120",
      filter: (task: any) => task.routine
    },
    deep: {
      title: "Deep Clean", 
      subtitle: `${taskCounts.deep} Comprehensive Tasks`,
      description: "Thorough cleaning that reaches every corner, perfect for seasonal cleaning or special occasions.",
      price: "Starting at $180",
      filter: (task: any) => task.deep
    },
    moveout: {
      title: "Move In/Out Clean",
      subtitle: `${taskCounts.moveInOut} Complete Tasks`, 
      description: "Complete top-to-bottom cleaning for moving, including inside cabinets, appliances, and all surfaces.",
      price: "Starting at $220",
      filter: (task: any) => task.moveInOut === true
    }
  };

  const getFilteredTasks = (cleaningType: CleaningType) => {
    const filter = cleaningTypes[cleaningType].filter;
    const filteredTasks: Record<CleaningArea, any[]> = {
      Kitchen: [],
      Bathrooms: [],
      Bedrooms: [],
      'Common Areas': []
    };

    Object.entries(cleaningTasks).forEach(([area, tasks]) => {
      filteredTasks[area as CleaningArea] = tasks.filter(filter);
    });

    return filteredTasks;
  };

  return (
    <>
      {/* Cleaning Details Section */}
      <section id="standard-details" className="py-20 bg-[rgba(22,48,75,0.95)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#dfbd69] mb-4">
              Cleaning Service Details
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto">
              Choose the cleaning service that best fits your needs. Each service includes different levels of detail and coverage.
            </p>
          </div>

          {/* Simple Comparison Table */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(cleaningTypes).map(([key, type]) => (
              <div key={key} className="bg-[rgba(22,48,75,0.95)] backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-8 text-center">
                <h3 className="text-2xl font-serif font-bold text-[#dfbd69] mb-2">
                  {type.title}
                </h3>
                <p className="text-lg text-white/90 mb-2">
                  {type.subtitle}
                </p>
                <p className="text-white/70 mb-4">
                  {type.description}
                </p>
                <div className="text-xl font-bold text-[#dfbd69] mb-6">
                  {type.price}
                </div>
                <div className="flex flex-col gap-3">
                  <a 
                    href="/quote" 
                    className="button-quaternary px-6 py-3"
                  >
                    Get Quote
                  </a>
                  <a 
                    href="/booking" 
                    className="button-tertiary px-6 py-3"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional anchor points for deep and moveout */}
      <div id="deep-details" style={{ position: 'absolute', top: '-200px' }}></div>
      <div id="moveout-details" style={{ position: 'absolute', top: '-200px' }}></div>
    </>
  );
}
