'use client';

import { useState } from 'react';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

export default function DeepCleanFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's the difference between a standard clean and a deep clean?",
      answer: "Our deep cleans include everything in a standard clean plus wiping down doors, door frames, windowsills, window frames, and baseboards. We spend extra time on detailed scrubbing and getting into areas that don't get regular attention."
    },
    {
      question: "How long does a deep clean take?",
      answer: "A deep clean typically takes 4-8 hours depending on the size of your home and its condition. We'll give you an accurate time estimate when you book."
    },
    {
      question: "Do I need to be home during the deep clean?",
      answer: "No, as long as our team can get in on their own, they can complete the clean and leave. Many customers prefer to be out while we work."
    },
    {
      question: "What should I do to prepare for a deep clean?",
      answer: "Please pick up any clutter, secure any valuables, and let us know about any areas that need special attention. We'll handle the rest!"
    },
    {
      question: "How often should I get a deep clean?",
      answer: "We recommend a deep clean 2-4 times per year, or seasonally. Many customers book deep cleans in spring and fall, or before/after major holidays."
    },
    {
      question: "Do you bring your own supplies?",
      answer: "Yes, we use pet-safe and non-toxic products. We bring our own mops and vacuum (upon request)."
    },
    {
      question: "Can you clean my fridge, microwave, and oven?",
      answer: "Yes! These are available as add-ons. Inside fridge, inside oven, and microwave cleaning can be added to any deep clean."
    },
    {
      question: "What areas do you serve?",
      answer: "We serve all of Brooklyn, Manhattan, Queens, Bronx, Staten Island, Long Island, Westchester, Jersey City, and Hoboken."
    },
    {
      question: "Do you offer recurring deep clean discounts?",
      answer: "Yes! Save 10% with weekly service, 5% with bi-weekly service, or $10 off monthly cleanings."
    },
    {
      question: "What payment methods do you accept?",
      answer: "You pay at the end of the clean using credit/debit card, Zelle, or cash. We offer a satisfaction guarantee - you only pay if you're happy with the service."
    }
  ];

  return (
    <section id="faq" className="py-20" style={INLINE_STYLES.secondary}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            Deep Cleaning FAQ
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-2xl mx-auto`}>
            Common questions about our deep cleaning services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/[0.03] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-base sm:text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <svg 
                  className={`w-5 h-5 text-[#dfbd69] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-white/80 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

