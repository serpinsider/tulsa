import BaseHero from './shared/BaseHero';
import QuoteBar from './QuoteBar';
import CallOrTextBar from './CallOrTextBar';
import HowItWorksSection from './HowItWorksSection';
import ContactSection from './ContactSection';
import StructuredData from './StructuredData';
import CarCleaningReviewsSection from './service-specific/CarCleaningReviewsSection';
import BaseFAQ from './shared/BaseFAQ';
import AreasWeServeSection from './AreasWeServeSection';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';
import { BRANDING } from '@/config/branding';

export default function CarCleaningService() {
  const carServices = [
    {
      title: "Interior Clean",
      description: "Complete interior cleaning and restoration.",
      features: [
        "Vacuuming & shampooing",
        "Dashboard & console cleaning",
        "Leather conditioning",
        "Window & mirror cleaning"
      ]
    },
    {
      title: "Exterior Clean",
      description: "Wash, wax, and protect your car's exterior.",
      features: [
        "Hand wash & dry",
        "Wax & polish application",
        "Tire & wheel cleaning",
        "Headlight restoration"
      ]
    },
    {
      title: "Full Clean",
      description: "Complete interior and exterior detailing package.",
      features: [
        "Interior deep clean",
        "Exterior wash & wax",
        "Engine bay cleaning",
        "Odor elimination treatment"
      ]
    }
  ];

  const faqs = [
    {
      question: "What's included in a car cleaning service?",
      answer: "Our car cleaning includes interior vacuuming, upholstery shampooing, dashboard and console cleaning, window cleaning, exterior wash and wax, tire and wheel cleaning, and odor elimination. We can customize the service based on your needs."
    },
    {
      question: "How long does car detailing take?",
      answer: "Interior detailing typically takes 2-3 hours, exterior detailing takes 1-2 hours, and full service detailing takes 3-5 hours depending on the vehicle size and condition."
    },
    {
      question: "Do you come to my location?",
      answer: "Yes! We offer mobile car cleaning services. We'll come to your home, office, or any convenient location in Tulsa and surrounding areas with all our equipment and supplies."
    },
    {
      question: "What if my car needs stain removal or odor treatment?",
      answer: "We specialize in tough stains and odor elimination. We use professional-grade products and techniques to remove pet odors, food stains, and other stubborn issues. Let us know about any specific concerns when booking."
    },
    {
      question: "How often should I get my car detailed?",
      answer: "We recommend full detailing every 4-6 months for regular maintenance. However, if you have pets, kids, or use your car frequently, quarterly detailing helps maintain its condition and resale value."
    },
    {
      question: "Do you detail SUVs and trucks?",
      answer: "Yes, we detail all vehicle types including sedans, SUVs, trucks, and vans. Pricing may vary based on vehicle size and condition."
    }
  ];

  return (
    <>
      <StructuredData type="service" data={{ 
        service: "Car Cleaning",
        location: `${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
        description: "Car detailing and cleaning services"
      }} />
      
      <BaseHero 
        title={`Professional Car Detailing Services in ${BRANDING.serviceArea}`}
        description="Interior and exterior car detailing with mobile service available. From deep cleaning to full detailing, we bring showroom quality to your vehicle."
        location={`${BRANDING.primaryCity}, ${BRANDING.primaryState}`}
        showWizard={false}
        quoteUrl="/services/car-cleaning/quote"
      />
      <QuoteBar />
      
      {/* Car Cleaning Services Section */}
      <section id="services" className="py-20" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>
              Car Cleaning Services
            </h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Mobile car detailing with professional-grade equipment and products
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {carServices.map((service, index) => (
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
                  <a href="/services/car-cleaning/quote" className="button-quaternary w-full">
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
      <CarCleaningReviewsSection />
      <CallOrTextBar />
      <BaseFAQ 
        title="Car Cleaning FAQ"
        description="Common questions about our car detailing services"
        faqs={faqs}
      />
      <QuoteBar />
      <ContactSection />
    </>
  );
}

