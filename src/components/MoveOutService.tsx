import MoveOutHero from './service-specific/MoveOutHero';
import QuoteBar from './QuoteBar';
import CallOrTextBar from './CallOrTextBar';
import HowItWorksSection from './HowItWorksSection';
import ContactSection from './ContactSection';
import StructuredData from './StructuredData';
import MoveOutReviewsSection from './service-specific/MoveOutReviewsSection';
import MoveOutFAQSection from './service-specific/MoveOutFAQSection';
import AreasWeServeSection from './AreasWeServeSection';
import WhatWeCleanSection from './WhatWeCleanSection';
import { INLINE_STYLES } from '@/styles/colors';
import { TYPOGRAPHY } from '@/styles/typography';

export default function MoveOutService() {
  const moveOutServices = [
    {
      title: "Move-Out Cleaning",
      description: "Leave your property spotless and get your full security deposit back.",
      features: [
        "Everything in deep clean included",
        "Inside all cabinets & drawers",
        "Inside all appliances (fridge, oven, dishwasher)",
        "Inside closets & storage areas",
        "All shelves wiped down",
        "Walls spot-cleaned for marks",
        "Baseboards & trim detailed",
        "Inspection-ready guarantee"
      ]
    },
    {
      title: "Move-In Cleaning",
      description: "Start fresh in your new home with a complete deep clean.",
      features: [
        "Pre-move sanitization",
        "Cabinet & drawer cleaning",
        "Appliance deep cleaning",
        "Bathroom deep sanitization",
        "Floor deep cleaning & polishing",
        "Window cleaning (interior)",
        "Dust & allergen removal",
        "Ready for your belongings"
      ]
    },
    {
      title: "Landlord & Property Manager Service",
      description: "Turnover cleaning for rental properties between tenants.",
      features: [
        "Fast turnaround time",
        "Inspection checklist included",
        "Photo documentation available",
        "Recurring property discounts",
        "Same-day service available",
        "Key pickup & drop-off",
        "Damage assessment reporting",
        "Professional cleaning guarantee"
      ]
    }
  ];

  const moveOutChecklist = [
    {
      category: "Kitchen",
      tasks: [
        "Clean inside & outside all cabinets",
        "Clean inside refrigerator & freezer",
        "Clean inside oven & stovetop",
        "Clean inside microwave",
        "Clean inside dishwasher",
        "Degrease all surfaces",
        "Clean sink & faucet",
        "Wipe down all appliances"
      ]
    },
    {
      category: "Bathrooms",
      tasks: [
        "Deep scrub shower/tub & tiles",
        "Clean inside cabinets & drawers",
        "Scrub & disinfect toilet",
        "Clean mirrors & fixtures",
        "Wipe down all surfaces",
        "Clean inside medicine cabinet",
        "Grout cleaning",
        "Polish all chrome fixtures"
      ]
    },
    {
      category: "Bedrooms & Living Areas",
      tasks: [
        "Clean inside all closets",
        "Wipe down all shelves",
        "Clean inside drawers",
        "Dust all surfaces thoroughly",
        "Clean windows & sills",
        "Wipe baseboards & trim",
        "Vacuum & mop all floors",
        "Remove all cobwebs"
      ]
    },
    {
      category: "Final Touches",
      tasks: [
        "Spot-clean walls for marks",
        "Clean light fixtures & switches",
        "Clean door frames & doors",
        "Vacuum vents & returns",
        "Clean window tracks",
        "Final walkthrough inspection",
        "Trash removal",
        "Keys returned to landlord"
      ]
    }
  ];

  return (
    <>
      <StructuredData type="service" data={{ 
        service: "Move In/Out Cleaning",
        location: "Tulsa, OK",
        description: "Professional move in and move out cleaning services"
      }} />
      
      <MoveOutHero location="Tulsa, OK" />
      <QuoteBar />
      
      {/* Move-Out Services Section */}
      <section id="services" className="py-20" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>
              Move In/Out Cleaning Services
            </h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Our most comprehensive cleaning service. Perfect for moving, getting your deposit back, or preparing a property for new tenants.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {moveOutServices.map((service, index) => (
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

      {/* Move-Out Checklist Section */}
      <section className="py-20" style={INLINE_STYLES.secondary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>
              Complete Move-Out Checklist
            </h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Our comprehensive checklist ensures nothing is missed
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {moveOutChecklist.map((section, index) => (
              <div 
                key={index}
                className="bg-[rgba(22,48,75,0.95)] backdrop-blur-md rounded-xl border border-white/10 p-8"
              >
                <h3 className="text-[#dfbd69] font-serif font-bold text-xl mb-6 text-center">
                  {section.category}
                </h3>
                <ul className="space-y-3">
                  {section.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start text-white/90 text-sm">
                      <svg className="w-4 h-4 text-[#dfbd69] mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/quote" className="button-primary inline-block">
              Book Your Move-Out Clean
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
      <MoveOutReviewsSection />
      <CallOrTextBar />
      <MoveOutFAQSection />
      <QuoteBar />
      <ContactSection />
    </>
  );
}

