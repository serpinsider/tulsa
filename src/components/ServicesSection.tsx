'use client';

import Link from 'next/link';
import { useState } from 'react';
import { taskCounts } from '@/lib/constants/cleaning-tasks';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

interface ServicesSectionProps {
  location?: string;
}

export default function ServicesSection({ location = "Tulsa, OK" }: ServicesSectionProps) {
  const [showAllServices, setShowAllServices] = useState(false);

  const serviceCategories = {
    cleaning: {
      title: "House Cleaning",
      href: "/",
      services: [
        { name: "Standard Cleaning", href: "/#services" },
        { name: "Deep Cleaning", href: "/#services" },
        { name: "Move-in/Move-out Cleaning", href: "/#services" },
        { name: "Apartment Cleaning", href: "/#services" },
        { name: "House Cleaning", href: "/#services" },
        { name: "Recurring Cleaning", href: "/#services" }
      ]
    },
    specialized: {
      title: "Specialized Cleaning",
      href: null,
      services: [
        { name: "Airbnb Cleaning", href: "/services/airbnb" },
        { name: "Commercial Cleaning", href: "/services/commercial" },
        { name: "Event Cleaning", href: "/services/event-cleaning" },
        { name: "Post-Construction Cleaning", href: "/services/post-construction" },
        { name: "Office Cleaning", href: "/services/commercial" },
        { name: "Janitorial Services", href: "/services/commercial" }
      ]
    },
    carpet: {
      title: "Carpet & Car Cleaning",
      href: "/services/carpet-cleaning",
      services: [
        { name: "Carpet Cleaning", href: "/services/carpet-cleaning" },
        { name: "Upholstery Cleaning", href: "/services/carpet-cleaning" },
        { name: "Rug Cleaning", href: "/services/carpet-cleaning" },
        { name: "Car Interior Clean", href: "/services/car-cleaning" },
        { name: "Car Exterior Clean", href: "/services/car-cleaning" },
        { name: "Car Full Clean", href: "/services/car-cleaning" }
      ]
    },
    handyman: {
      title: "Handyman Services",
      href: "/services/handyman",
      services: [
        { name: "Furniture Assembly", href: "/services/handyman" },
        { name: "TV Mounting", href: "/services/handyman" },
        { name: "Picture Hanging", href: "/services/handyman" },
        { name: "Shelf Installation", href: "/services/handyman" },
        { name: "Minor Repairs", href: "/services/handyman" },
        { name: "Home Installations", href: "/services/handyman" }
      ]
    }
  };

  const services = [
    {
      id: 'standard',
      title: "Standard Clean",
      description: "Our housekeeper takes care of the basics to keep your home fresh and clean.",
      features: [
        "Bedrooms & Bathrooms",
        "Kitchen Surfaces & Living Areas", 
        "Sweeping & Mopping",
        "Dusting & Vacuuming"
      ],
      taskCount: taskCounts.routine,
      scrollTarget: "#what-we-clean",
      isExternal: false
    },
    {
      id: 'deep',
      title: "Deep Clean",
      description: "Everything in a standard clean plus more time if your home needs it.",
      features: [
        "Baseboards & Door Frames",
        "Window Sills & Tracks", 
        "Detailed Scrubbing",
        "Tile/Grout Cleaning"
      ],
      taskCount: taskCounts.deep,
      href: "/services/deep-clean",
      quoteHref: "/quote",
      isExternal: true
    },
    {
      id: 'moveout',
      title: "Move Out Clean",
      description: "Deep Clean plus inside cabinets, appliances, move-in and move-out inspection ready.",
      features: [
        "Inside All Cabinets",
        "Appliance Cleaning",
        "Wall Stain Removal",
        "Complete Deep Clean"
      ],
      taskCount: taskCounts.moveInOut,
      href: "/services/move-out",
      quoteHref: "/quote",
      isExternal: true
    },
    {
      id: 'carpet',
      title: "Carpet Cleaning",
      description: "Steam cleaning, stain removal, and odor elimination for carpets.",
      features: [
        "Deep Stain Removal",
        "Deodorizing Treatment", 
        "Pet Stain Treatment",
        "Fabric Protection"
      ],
      href: "/services/carpet-cleaning",
      quoteHref: "/services/carpet-cleaning/quote",
      isExternal: true
    },
    {
      id: 'car',
      title: "Car Cleaning",
      description: "Interior and exterior car detailing for a showroom finish.",
      features: [
        "Interior Clean",
        "Exterior Clean",
        "Full Clean",
        "Odor Elimination"
      ],
      href: "/services/car-cleaning",
      quoteHref: "/services/car-cleaning/quote",
      isExternal: true,
      isNew: true
    },
    {
      id: 'handyman',
      title: "Handyman Services", 
      description: "Assembly, mounting, repairs, and home installations.",
      features: [
        "Furniture Assembly",
        "TV Mounting",
        "Picture Hanging",
        "Minor Repairs"
      ],
      href: "/services/handyman",
      quoteHref: "/services/handyman/quote",
      isExternal: true
    },
    {
      id: 'commercial',
      title: "Commercial Cleaning",
      description: "Office and commercial cleaning with flexible scheduling.",
      features: [
        "Daily Office Cleaning",
        "Janitorial Services",
        "Floor Care & Restrooms",
        "After-Hours Available"
      ],
      href: "/services/commercial",
      quoteHref: "/services/commercial/quote",
      isExternal: true
    },
    {
      id: 'airbnb',
      title: "Airbnb Cleaning",
      description: "Fast turnover cleaning with guest-ready guarantee.",
      features: [
        "Same-Day Service",
        "Linen Changes",
        "Restocking Supplies",
        "Guest-Ready Inspection"
      ],
      href: "/services/airbnb",
      quoteHref: "/services/airbnb/quote",
      isExternal: true
    },
    {
      id: 'postconstruction',
      title: "Post-Construction",
      description: "Thorough cleanup after renovations and construction work.",
      features: [
        "Dust & Debris Removal",
        "Paint & Sticker Removal",
        "Deep Surface Cleaning",
        "Final Inspection Ready"
      ],
      href: "/services/post-construction",
      quoteHref: "/services/post-construction/quote",
      isExternal: true
    }
  ];



  return (
    <>
      <section id="services" className="py-20" style={INLINE_STYLES.secondary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>
              Home Services
            </h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              From house cleaning to handyman services, we've got your home covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8 hover:bg-[rgba(15,23,42,0.98)] hover:shadow-2xl hover:shadow-black/30 transition-all relative flex flex-col h-full">
                {service.isNew && (
                  <div className="absolute -top-3 -right-3 bg-[#dfbd69] text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    NEW
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-[#dfbd69] mb-3 drop-shadow-lg">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md min-h-[48px]">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs sm:text-sm text-white/90">
                      <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-2">
                  {service.isExternal ? (
                    // External link to dedicated service page
                    <Link
                      href={service.href!}
                      className="button-quaternary w-full block text-center"
                    >
                      View Details
                    </Link>
                  ) : (
                    // Scroll to details section on same page
                    <Link
                      href={service.scrollTarget!}
                      scroll={true}
                      className="button-quaternary w-full block text-center"
                    >
                      View Details
                    </Link>
                  )}
                  <Link
                    href={service.quoteHref || "/quote"}
                    className="button-tertiary w-full block text-center"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* All Services Collapsible Section */}
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="text-center">
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <span className="text-sm font-medium underline decoration-white/30 hover:decoration-white/60 underline-offset-4">
                  {showAllServices ? 'Hide' : 'View'} All Services
                </span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    showAllServices ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {showAllServices && (
              <div className="mt-6 bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-6 animate-in slide-in-from-top duration-300">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {Object.entries(serviceCategories).map(([key, category]) => (
                    <div key={key}>
                      <h3 className="text-[#dfbd69] font-serif font-bold mb-4 text-lg">{category.title}</h3>
                      <div className="space-y-1">
                        {category.services.map((service, index) => (
                          <Link 
                            key={index} 
                            href={service.href}
                            className="block text-sm text-white/80 hover:text-white transition-colors py-1 rounded hover:bg-white/5"
                          >
                            {service.name} in Tulsa
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}