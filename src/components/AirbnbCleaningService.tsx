import AirbnbCleaningHero from './service-specific/AirbnbCleaningHero';
import QuoteBar from './QuoteBar';
import CallOrTextBar from './CallOrTextBar';
import HowItWorksSection from './HowItWorksSection';
import AirbnbReviewsSection from './service-specific/AirbnbReviewsSection';
import ContactSection from './ContactSection';
import StructuredData from './StructuredData';
import AirbnbFAQSection from './service-specific/AirbnbFAQSection';
import AreasWeServeSection from './AreasWeServeSection';
import { INLINE_STYLES } from '@/styles/colors';

export default function AirbnbCleaningService() {
  const airbnbServices = [
    {
      title: "Guest-Ready Cleaning & Staging",
      description: "Complete turnover cleaning for guest arrivals.",
      features: [
        "Bathroom & kitchen deep cleaning",
        "Fresh linens & bed staging",
        "Floor vacuuming & mopping",
        "Trash removal & restocking"
      ]
    },
    {
      title: "Restocking & Essentials",
      description: "Keep properties fully stocked for guests.",
      features: [
        "Paper products & soap refills",
        "Coffee, tea & pantry basics",
        "Fresh towels & bath mats",
        "Kitchen supplies & amenities"
      ]
    },
    {
      title: "Turnover Reporting & Maintenance",
      description: "Property monitoring and host reporting.",
      features: [
        "Damage reporting with photos",
        "Maintenance issue alerts",
        "Inventory tracking & management",
        "Property manager coordination"
      ]
    }
  ];

  return (
    <>
      <StructuredData type="service" data={{ 
        service: "Airbnb Cleaning",
        location: "Tulsa, OK",
        description: "Airbnb and vacation rental cleaning services"
      }} />
      
      <AirbnbCleaningHero location="Tulsa, OK" />
      <QuoteBar />
      
      {/* Airbnb Services Section */}
      <section id="services" className="py-20" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#dfbd69] mb-4">
              Airbnb Cleaning Services
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto">
              Comprehensive Airbnb cleaning and property management services designed for vacation rental hosts.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {airbnbServices.map((service, index) => (
              <div key={index} className="bg-[rgba(22,48,75,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8 hover:bg-[rgba(22,48,75,0.98)] hover:shadow-2xl hover:shadow-black/30 transition-all relative flex flex-col h-full">
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
                  <a href="/services/airbnb/quote" className="button-quaternary w-full">
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
      <AirbnbReviewsSection />
      <CallOrTextBar />
      <AirbnbFAQSection />
      <QuoteBar />
      <ContactSection />
    </>
  );
}