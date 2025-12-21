import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Get Your Quote",
      description: "Tell us about your project and get a detailed estimate tailored to your needs.",
    },
    {
      number: "2", 
      title: "We Schedule & Arrive",
      description: "Our team coordinates with you and arrives ready to work.",
    },
    {
      number: "3",
      title: "Complete & Pay",
      description: "We finish the job to your satisfaction, then you pay for quality work.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20" style={INLINE_STYLES.secondary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            How It Works
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-2xl mx-auto`}>
            Book your cleaning service in three easy steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-[#dfbd69]">
                <span className="text-[#dfbd69] font-bold text-xl">{step.number}</span>
              </div>
              
              <h3 className="text-xl font-serif font-bold text-white mb-3">
                {step.title}
              </h3>
              
              <p className="text-white/70 text-sm">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+3.5rem)] w-[calc(100%-7rem)] h-[2px]">
                  <div className="w-full h-full bg-gradient-to-r from-[#dfbd69]/50 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}