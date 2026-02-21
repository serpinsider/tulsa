import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

export default function HandymanHowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Describe Your Project",
      description: "Tell us what needs assembly, mounting, or repair.",
    },
    {
      number: "2", 
      title: "We Arrive Ready",
      description: "Licensed handyman with all tools and hardware.",
    },
    {
      number: "3",
      title: "Quality Guaranteed",
      description: "Quality work with satisfaction guarantee.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20" style={INLINE_STYLES.primary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            How Our Handyman Service Works
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-2xl mx-auto`}>
            Get your home projects completed in three easy steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-[#926f34] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6`}>
                {step.number}
              </div>
              
              <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-3">
                {step.title}
              </h3>
              
              <p className="text-sm sm:text-base text-white/80">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
