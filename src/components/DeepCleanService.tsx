import DeepCleanHero from './service-specific/DeepCleanHero';
import QuoteBar from './QuoteBar';
import CallOrTextBar from './CallOrTextBar';
import HowItWorksSection from './HowItWorksSection';
import ContactSection from './ContactSection';
import StructuredData from './StructuredData';
import DeepCleanReviewsSection from './service-specific/DeepCleanReviewsSection';
import DeepCleanFAQSection from './service-specific/DeepCleanFAQSection';
import AreasWeServeSection from './AreasWeServeSection';
import WhatWeCleanSection from './WhatWeCleanSection';
import { INLINE_STYLES } from '@/styles/colors';
import { TYPOGRAPHY } from '@/styles/typography';

export default function DeepCleanService() {
  const deepCleanServices = [
    {
      title: "Comprehensive Deep Cleaning",
      description: "Everything in a standard clean plus detailed attention to often-missed areas.",
      features: [
        "All standard cleaning tasks included",
        "Baseboards & door frames wiped down",
        "Window sills & tracks cleaned",
        "Detailed scrubbing of all surfaces",
        "Behind & under furniture (accessible areas)",
        "Light fixtures & ceiling fans dusted",
        "Cabinet exteriors cleaned",
        "Tile & grout deep cleaning"
      ]
    },
    {
      title: "Super Deep Clean",
      description: "Our most intensive cleaning for heavily soiled homes or extreme messes.",
      features: [
        "Everything in comprehensive deep clean",
        "Heavy grime & buildup removal",
        "Stubborn stain treatment",
        "Odor elimination & sanitization",
        "Intensive kitchen & bathroom scrubbing",
        "Pet mess & odor treatment",
        "Neglected area restoration",
        "Complete home deodorizing"
      ]
    },
    {
      title: "Seasonal Deep Cleaning",
      description: "Refresh your home for the changing seasons.",
      features: [
        "Spring cleaning preparation",
        "Fall deep clean & winterizing",
        "Holiday preparation cleaning",
        "Summer refresh & organization",
        "Closet & storage area cleaning",
        "Upholstery & fabric refresh",
        "Deep carpet cleaning available",
        "Outdoor space preparation"
      ]
    }
  ];

  const whenToBook = [
    {
      title: "Moving In or Out",
      description: "Get your new place spotless or leave your old place deposit-ready."
    },
    {
      title: "Heavily Soiled Homes",
      description: "Intensive cleaning for homes with extreme messes, odors, or neglect."
    },
    {
      title: "Seasonal Refresh",
      description: "Spring cleaning, fall preparation, or holiday hosting."
    },
    {
      title: "Before Special Events",
      description: "Prepare your home for guests, parties, or celebrations."
    },
    {
      title: "Health & Allergies",
      description: "Deep clean to reduce allergens, dust, and improve air quality."
    },
    {
      title: "Regular Maintenance",
      description: "Schedule quarterly deep cleans to maintain your home's condition."
    }
  ];

  return (
    <>
      <StructuredData type="service" data={{ 
        service: "Deep Cleaning",
        location: "Brooklyn, NY",
        description: "Professional deep cleaning services for homes and apartments"
      }} />
      
      <DeepCleanHero location="New York, NY" />
      <QuoteBar />
      
      {/* Deep Clean Services Section */}
      <section id="services" className="py-20" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>
              Deep Cleaning Services
            </h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Thorough, detailed cleaning that goes beyond the surface. Perfect for when your home needs extra attention or a complete refresh.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {deepCleanServices.map((service, index) => (
              <div key={index} className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8 hover:bg-[rgba(15,23,42,0.98)] hover:shadow-2xl hover:shadow-black/30 transition-all relative flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-serif font-bold text-[#dfbd69] mb-3 drop-shadow-lg min-h-[56px] flex items-center justify-center">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md min-h-[48px] flex items-center justify-center">
                    {service.description}
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start text-xs sm:text-sm text-white/90">
                      <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <a href="/quote" className="button-quaternary w-full">
                    Get Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallOrTextBar />

      {/* When to Book Section */}
      <section className="py-20" style={INLINE_STYLES.secondary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>
              When to Book a Deep Clean
            </h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Deep cleaning is perfect for these situations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whenToBook.map((item, index) => (
              <div 
                key={index}
                className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl border border-white/10 p-6 hover:bg-[rgba(15,23,42,0.98)] transition-all"
              >
                <h3 className="text-[#dfbd69] font-serif font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/quote" className="button-primary inline-block">
              Schedule Your Deep Clean
            </a>
          </div>
        </div>
      </section>

      <CallOrTextBar />
      <WhatWeCleanSection />
      <CallOrTextBar />
      <HowItWorksSection />
      <CallOrTextBar />
      <AreasWeServeSection />
      <QuoteBar />
      <DeepCleanReviewsSection />
      <CallOrTextBar />
      <DeepCleanFAQSection />
      <QuoteBar />
      <ContactSection />
    </>
  );
}

