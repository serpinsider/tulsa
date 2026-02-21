'use client';

import { useState } from 'react';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';
import { SERVICE_AREA_FAQ_ANSWER } from '@/config/content';
import { BRANDING } from '@/config/branding';

export default function MoveOutFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's included in a move-out clean?",
      answer: "Our move-out cleans are the most thorough service we offer. We include everything from a deep clean plus cleaning inside all cabinets, closets, drawers, and wiping down all shelves. We also clean appliances inside and out, and ensure the property is inspection-ready."
    },
    {
      question: "Will this help me get my security deposit back?",
      answer: "Yes! Our move-out cleaning is specifically designed to meet landlord and property manager standards. We follow a comprehensive checklist to ensure your property is left in excellent condition."
    },
    {
      question: "How long does a move-out clean take?",
      answer: "Move-out cleans typically take 5-10 hours depending on the size and condition of the property. We'll provide an accurate estimate when you book."
    },
    {
      question: "Do you clean appliances?",
      answer: "Yes! We clean inside the refrigerator, oven, microwave, dishwasher, and all other appliances. This is included in the move-out service."
    },
    {
      question: "Can you do same-day or next-day move-out cleaning?",
      answer: "We offer same-day service when available. Contact us as early as possible to check availability for your move-out date."
    },
    {
      question: "What if the landlord finds something after you clean?",
      answer: "We offer a satisfaction guarantee. If your landlord identifies any cleaning issues within 48 hours, we'll come back and address them at no additional charge."
    },
    {
      question: "Do I need to be present during the cleaning?",
      answer: "No, you don't need to be present. Many customers drop off keys or arrange access and pick them up after we're done."
    },
    {
      question: "What's the difference between move-out and deep clean?",
      answer: "Move-out cleaning includes everything in a deep clean PLUS inside all cabinets, drawers, closets, appliances, and more intensive detail work. It's our most comprehensive service."
    },
    {
      question: "Do you remove trash and debris?",
      answer: "We'll bag and remove small amounts of trash. For large amounts of debris or furniture removal, we recommend a junk removal service first."
    },
    {
      question: "What areas do you serve for move-out cleaning?",
      answer: SERVICE_AREA_FAQ_ANSWER
    }
  ];

  return (
    <section id="faq" className="py-20" style={INLINE_STYLES.secondary}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            Move-Out Cleaning FAQ
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-2xl mx-auto`}>
            Common questions about our move in/out cleaning services
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

