import CarpetCleaningHero from './service-specific/CarpetCleaningHero';
import QuoteBar from './QuoteBar';
import CallOrTextBar from './CallOrTextBar';
import HowItWorksSection from './HowItWorksSection';
import ContactSection from './ContactSection';
import StructuredData from './StructuredData';
import CarpetReviewsSection from './service-specific/CarpetReviewsSection';
import CarpetFAQSection from './service-specific/CarpetFAQSection';
import AreasWeServeSection from './AreasWeServeSection';
import { INLINE_STYLES } from '@/styles/colors';
import { TYPOGRAPHY } from '@/styles/typography';

export default function CarpetCleaningService() {
  const carpetServices = [
    {
      title: "Residential Carpet & Upholstery",
      description: "Complete carpet and furniture cleaning for homes.",
      features: [
        "Steam cleaning & stain removal",
        "Pet odor treatment",
        "Upholstery cleaning",
        "Traffic lane restoration"
      ]
    },
    {
      title: "Area Rugs & Specialty Fibers",
      description: "Expert care for valuable and delicate rugs.",
      features: [
        "Persian & Oriental rugs",
        "Pickup & delivery service",
        "Fringe care & color protection",
        "Moth prevention treatment"
      ]
    },
    {
      title: "Commercial Carpet Care",
      description: "Carpet maintenance for businesses.",
      features: [
        "Office & retail cleaning",
        "High-traffic area restoration",
        "Scheduled maintenance plans",
        "After-hours service available"
      ]
    }
  ];

  return (
    <>
      <StructuredData type="service" data={{ 
        service: "Carpet Cleaning",
        location: "Tulsa, OK",
        description: "Carpet and upholstery cleaning services"
      }} />
      
      <CarpetCleaningHero location="Tulsa, OK" />
      <QuoteBar />
      
      {/* Carpet Services Section */}
      <section id="services" className="py-20" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>
              Carpet Cleaning Services
            </h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Deep carpet and upholstery cleaning with eco-friendly solutions
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {carpetServices.map((service, index) => (
              <div key={index} className="bg-[rgba(22,48,75,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8 hover:bg-[rgba(22,48,75,0.98)] hover:shadow-2xl hover:shadow-black/30 transition-all relative flex flex-col h-full">
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
                  <a href="/services/carpet-cleaning/quote" className="button-quaternary w-full">
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
      <CarpetReviewsSection />
      <CallOrTextBar />
      <CarpetFAQSection />
      <QuoteBar />
      <ContactSection />
    </>
  );
}