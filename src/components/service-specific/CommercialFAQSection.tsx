'use client';

import { useState } from 'react';

export default function CommercialFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of commercial spaces do you clean?",
      answer: "We clean offices, retail stores, medical facilities, restaurants, warehouses, schools, and hotels.\n\nOur team is trained to handle the specific requirements of different industries and facility types."
    },
    {
      question: "Do you provide cleaning outside of business hours?",
      answer: "Yes! We offer flexible scheduling including early morning, evening, overnight, and weekend services.\n\nWe work around your business hours to minimize disruption to your operations."
    },
    {
      question: "Are your staff background checked and insured?",
      answer: "Absolutely. All our housekeepers undergo thorough background checks and are fully trained.\n\nOur company is licensed, bonded, and insured with comprehensive liability coverage to protect your business and property."
    },
    {
      question: "How do you ensure consistent quality?",
      answer: "We maintain consistency through detailed cleaning checklists, regular team training, and quality control inspections.\n\nWe assign dedicated teams for each client and provide digital reporting with open communication channels for feedback."
    },
    {
      question: "Can you handle special industry requirements?",
      answer: "Yes, we have specialized training and protocols for different industries.\n\nThis includes medical-grade disinfection for healthcare facilities, food-safe cleaning for restaurants, and compliance with industry-specific regulations."
    },
    {
      question: "What's your commercial satisfaction guarantee?",
      answer: "We offer a 100% satisfaction guarantee for all commercial clients.\n\nIf you're not completely satisfied, contact us within 24 hours and we'll return to re-clean at no additional charge."
    },
    {
      question: "How do I get a commercial cleaning quote?",
      answer: "Get a quote tailored to your business needs:\n\n<div class='flex flex-col sm:flex-row gap-3 mt-4'><a href='/services/commercial/quote' class='bg-[#dfbd69] text-slate-900 px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#dfbd69]/90 transition-colors'>Get Commercial Quote</a></div>Or contact us directly:\n• Call: <a href='tel:+13477504380' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>(347) 750-4380</a>\n• Email: <a href='mailto:hello@brooklynmaids.com' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>hello@brooklynmaids.com</a>"
    }
  ];

  return (
    <section id="faq" className="py-20" style={{background: 'rgba(15, 23, 42, 0.95)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[#dfbd69] mb-6 drop-shadow-lg">
            Commercial FAQ
          </h2>
          <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Everything you need to know about our commercial cleaning services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden">
              <button
                className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors ${
                  openFAQ === index 
                    ? 'bg-white/15' 
                    : 'hover:bg-white/15'
                }`}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <h3 className="text-base font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-white/70 transition-transform ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6 pt-2 bg-white/5">
                  <div className="text-sm text-white/70 leading-relaxed space-y-3">
                    {faq.answer.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}