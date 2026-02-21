import CommercialCleaningHero from './service-specific/CommercialCleaningHero';
import QuoteBar from './QuoteBar';
import CallOrTextBar from './CallOrTextBar';
import HowItWorksSection from './HowItWorksSection';
import ContactSection from './ContactSection';
import StructuredData from './StructuredData';
import CommercialFAQSection from './service-specific/CommercialFAQSection';
import CommercialReviewsSection from './service-specific/CommercialReviewsSection';
import AreasWeServeSection from './AreasWeServeSection';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

export default function CommercialCleaningService() {
  const commercialServices = [
    {
      title: "Office Cleaning & Maintenance",
      description: "Daily and recurring workspace cleaning.",
      features: [
        "Desk & furniture dusting",
        "Floor vacuuming & mopping",
        "Trash & recycling removal",
        "Restroom cleaning & restocking"
      ]
    },
    {
      title: "Janitorial Services",
      description: "Comprehensive facility maintenance and cleaning.",
      features: [
        "Deep sanitization services",
        "Floor stripping & waxing",
        "Carpet & upholstery cleaning",
        "Window cleaning (interior)",
        "Supply restocking & management"
      ]
    },
    {
      title: "Realtor & Turnover Cleaning",
      description: "Property staging and turnover cleaning.",
      features: [
        "Floor-to-ceiling deep cleaning",
        "Cabinet & storage cleaning",
        "Debris & dust removal",
        "Move-in ready preparation"
      ]
    }
  ];

  return (
    <>
      <StructuredData type="service" data={{ 
        service: "Commercial Cleaning",
        location: "Tulsa, OK",
        description: "Office and commercial cleaning services"
      }} />
      
      <CommercialCleaningHero location="New York, NY" />
      <QuoteBar />
      
      {/* Commercial Services Section */}
      <section id="services" className="py-20" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>
              Commercial Cleaning Services
            </h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Office and commercial cleaning with flexible scheduling
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {commercialServices.map((service, index) => (
              <div key={index} className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8 hover:bg-[rgba(15,23,42,0.98)] hover:shadow-2xl hover:shadow-black/30 transition-all relative flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-[#dfbd69] mb-3 drop-shadow-lg">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md min-h-[48px]">
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
                  <a href="/services/commercial/quote" className="button-quaternary w-full">
                    Get Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallOrTextBar />
      <HowItWorksSection />
      <CallOrTextBar />
      <AreasWeServeSection />
      <QuoteBar />
      <CommercialReviewsSection />
      <CallOrTextBar />
      <CommercialFAQSection />
      <QuoteBar />
      <ContactSection />
    </>
  );
}