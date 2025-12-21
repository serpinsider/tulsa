'use client';

import { useState } from 'react';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

interface FAQ {
  question: string;
  answer: string;
}

interface BaseFAQProps {
  title: string;
  description: string;
  faqs: FAQ[];
}

export default function BaseFAQ({ title, description, faqs }: BaseFAQProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20" style={INLINE_STYLES.primary}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            {title}
          </h2>
          <p className={`${TYPOGRAPHY.description} mx-auto`}>
            {description}
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
                <h3 className={TYPOGRAPHY.faqQuestion}>
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
                  <div className={TYPOGRAPHY.faqAnswer}>
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

