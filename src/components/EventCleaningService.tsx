import EventCleaningHero from './service-specific/EventCleaningHero';
import QuoteBar from './QuoteBar';
import CallOrTextBar from './CallOrTextBar';
import HowItWorksSection from './HowItWorksSection';
import ContactSection from './ContactSection';
import StructuredData from './StructuredData';
import EventFAQSection from './service-specific/EventFAQSection';
import ReviewsSection from './ReviewsSection';
import AreasWeServeSection from './AreasWeServeSection';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

export default function EventCleaningService() {
  const eventServices = [
    {
      title: "Pre-Event Setup Cleaning",
      description: "Make your venue shine before guests arrive.",
      features: [
        "Complete venue deep cleaning",
        "Floor cleaning & sanitization",
        "Restroom preparation",
        "Surface dusting & polishing",
        "Trash removal & setup"
      ]
    },
    {
      title: "During-Event Support",
      description: "Discreet cleaning services while your event is in progress.",
      features: [
        "Restroom maintenance & restocking",
        "Continuous trash removal",
        "Spill cleanup & emergency response",
        "Surface wiping & tidying",
        "Catering area support"
      ]
    },
    {
      title: "Post-Event Cleanup",
      description: "Comprehensive cleanup to restore your venue.",
      features: [
        "Complete debris removal",
        "Floor vacuuming & mopping",
        "Kitchen & catering cleanup",
        "Furniture arrangement",
        "Deep sanitization",
        "Waste disposal & recycling"
      ]
    }
  ];

  return (
    <>
      <StructuredData type="service" data={{ 
        service: "Event Cleaning",
        location: "Tulsa, OK",
        description: "Pre-event, during-event, and post-event cleaning services"
      }} />
      
      <EventCleaningHero location="New York, NY" />
      <QuoteBar />
      
      {/* Event Services Section */}
      <section id="services" className="py-20" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>
              Event Cleaning Services
            </h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Complete cleaning solutions for events of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {eventServices.map((service, index) => (
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
                  <a href="/services/event-cleaning/quote" className="button-quaternary w-full">
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
      <ReviewsSection location="Tulsa" />
      <CallOrTextBar />
      <EventFAQSection />
      <QuoteBar />
      <ContactSection />
    </>
  );
}



