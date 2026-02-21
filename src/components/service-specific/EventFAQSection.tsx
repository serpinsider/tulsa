'use client';

import { useState } from 'react';
import { BRANDING } from '@/config/branding';

export default function EventFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of events do you clean for?",
      answer: "We handle all types of events including weddings, corporate events, parties, galas, fundraisers, concerts, festivals, and private celebrations.\n\nOur team has experience with both intimate gatherings and large-scale events with hundreds of guests."
    },
    {
      question: "Do you offer same-day or emergency event cleaning?",
      answer: `Yes! We understand events can be time-sensitive.\n\nWe offer same-day and emergency cleaning services for last-minute events, spills, or unexpected situations. Call us at ${BRANDING.phone.display} for urgent needs.`
    },
    {
      question: "Can you clean during the event?",
      answer: "Absolutely. We provide discreet during-event cleaning services to maintain a clean environment throughout your event.\n\nOur team can handle restroom maintenance, trash removal, spill cleanup, and general tidying without disrupting your guests."
    },
    {
      question: "What's included in post-event cleaning?",
      answer: "Our comprehensive post-event cleanup includes:\n\n• Complete trash and debris removal\n• Floor cleaning (sweeping, mopping, vacuuming)\n• Surface wiping and sanitization\n• Restroom deep cleaning\n• Kitchen and catering area cleanup\n• Furniture arrangement and restoration"
    },
    {
      question: "How far in advance should I book event cleaning?",
      answer: "We recommend booking at least 1-2 weeks in advance for regular events.\n\nFor large events or peak seasons (holidays, wedding season), book 3-4 weeks ahead to ensure availability. However, we do accommodate last-minute requests whenever possible."
    },
    {
      question: "Are your staff trained for event environments?",
      answer: "Yes, all our housekeepers are specifically trained for event cleaning scenarios.\n\nThey understand the importance of discretion, efficiency, and working around guests and equipment. All staff are background-checked, insured, and professionally uniformed."
    },
    {
      question: "How do I get an event cleaning quote?",
      answer: `Get a custom quote for your event:\n\n<div class='flex flex-col sm:flex-row gap-3 mt-4'><a href='/services/event-cleaning/quote' class='bg-[#dfbd69] text-slate-900 px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#dfbd69]/90 transition-colors'>Get Event Quote</a></div>Or contact us directly:\n• Call: <a href='${BRANDING.phone.href}' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>${BRANDING.phone.display}</a>\n• Email: <a href='${BRANDING.email.href}' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>${BRANDING.email.display}</a>`
    }
  ];

  return (
    <section id="faq" className="py-20" style={{background: 'rgba(15, 23, 42, 0.95)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[#dfbd69] mb-6 drop-shadow-lg">
            Event Cleaning FAQ
          </h2>
          <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Everything you need to know about our event cleaning services
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



