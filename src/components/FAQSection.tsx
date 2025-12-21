'use client';

import { useState } from 'react';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';


interface FAQSectionProps {
  location?: string;
}

export default function FAQSection({ location = "Brooklyn" }: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's included in your standard house cleaning service?",
      answer: "Our standard cleaning includes:\n\n• Sweeping, mopping, vacuuming all floors\n• Dusting surfaces\n• Cleaning bathrooms (toilet, sink, shower/tub, mirrors)\n• Kitchen cleaning (countertops, stovetop, outside of appliances, sink)\n• Making beds\n• Emptying trash\n\nWe clean all bedrooms, bathrooms, kitchen, and common areas thoroughly."
    },
    {
      question: "What's the difference between standard, deep, and move-out cleaning?",
      answer: "**Standard Clean:** Regular maintenance cleaning of all main areas.\n\n**Deep Clean:** Includes everything in standard plus wiping down doors, door frames, windowsills, window frames, baseboards, light fixtures, and detailed cleaning of hard-to-reach areas.\n\n**Move-Out Clean:** Our most thorough service including everything in deep clean plus inside cabinets, closets, shelves, appliance interiors, and detailed cleaning to help you get your security deposit back."
    },
    {
      question: "Do you bring your own cleaning supplies and equipment?",
      answer: "Yes! We bring all our own commercial-grade cleaning supplies and equipment.\n\nOur maids come fully equipped with everything needed to clean your home thoroughly, including eco-friendly products that are safe for your family and pets."
    },
    {
      question: "Are you insured and bonded?",
      answer: "Yes, Brooklyn Maids is fully insured and bonded for your peace of mind.\n\nAll our housekeepers are background-checked and trained. We carry comprehensive liability insurance to protect your home and belongings."
    },
    {
      question: "What areas do you service?",
      answer: "**New York:**\n• Brooklyn: Park Slope, Williamsburg, Brooklyn Heights, DUMBO, Prospect Heights, Crown Heights, Bay Ridge, Sunset Park, Red Hook, Gowanus, Bushwick, Greenpoint\n• Manhattan\n• Queens\n• Bronx\n• Staten Island\n\n**New Jersey:**\n• Jersey City, Hoboken, Weehawken, Union City, North Bergen, West New York, Secaucus, Bayonne\n\n**Zip Codes Served:**\n• Brooklyn: 11201, 11206, 11209, 11211, 11213, 11215, 11216, 11217, 11220, 11221, 11222, 11231, 11238\n• Manhattan: 10001-10282\n• Queens: 11101-11697\n• Bronx: 10451-10475\n• Staten Island: 10301-10314\n• New Jersey: 07002, 07030, 07047, 07086, 07087, 07093, 07094, 07302, 07306, 07310\n\nContact us to confirm service in your area."
    },
    {
      question: "How do I schedule a cleaning?",
      answer: "Get a quote or book online, or contact us directly:\n\n• Call: <a href='tel:+13477504380' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>(347) 750-4380</a>\n• Text: <a href='sms:+13477504380' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>(347) 750-4380</a>\n\nWe offer same-day and next-day service when available.\n\nContact us if you have questions about cleaning or handyman services.\n\n<div class='flex flex-col sm:flex-row gap-3 mt-4'><a href='/quote' class='bg-[#dfbd69] text-slate-900 px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#dfbd69]/90 transition-colors'>Get A Quote</a><a href='/booking' class='bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-white/30 transition-colors border border-white/30'>Book Now</a></div>"
    },
    {
      question: "Do you offer recurring cleaning services?",
      answer: "Yes! We offer weekly, bi-weekly, and monthly recurring cleaning services.\n\nRecurring customers receive discounted rates and priority scheduling. You can easily manage your recurring schedule through our online portal or by contacting us."
    },
    {
      question: "What days do you operate?",
      answer: "We operate every day of the week, 8 AM to 8 PM.\n\nThis includes weekends and most holidays for your convenience."
    },
    {
      question: "What if I'm not home during the cleaning?",
      answer: "No problem! Many of our customers prefer to be out during cleaning.\n\nWe just need access to your home (key, doorman, etc.) and any special instructions. We'll text you when we arrive and when we're finished."
    },
    {
      question: "Do you clean homes with pets?",
      answer: "Absolutely! We love pets and are experienced cleaning homes with furry friends.\n\nJust let us know about your pets when booking so we can take proper precautions. We offer pet hair removal as an add-on service."
    },
    {
      question: "Do you offer handyman services?",
      answer: "Yes! Our handyman services include furniture assembly, TV mounting, picture hanging, and minor repairs.\n\nYou can select handyman services when booking your cleaning or as a standalone service.\n\nContact us if you have questions about specific handyman tasks."
    },
    {
      question: "Do you offer carpet cleaning?",
      answer: "Yes! We provide deep carpet cleaning, stain removal, and upholstery cleaning.\n\nYou can add carpet cleaning to your regular cleaning service or book it as a standalone service.\n\nContact us if you have questions about carpet cleaning options."
    },
    {
      question: "How do I pay for services?",
      answer: "We charge after we're done cleaning and you're completely satisfied.\n\nYou can pay by card or Zelle for your convenience. No upfront payments required!"
    },
    {
      question: "Do you offer office cleaning?",
      answer: "Yes! We provide commercial office cleaning services for small to medium businesses.\n\nThis includes regular maintenance cleaning, deep cleaning, and post-construction cleanup for offices. Contact us for commercial pricing and scheduling."
    },
    {
      question: "Are your products eco-friendly and pet-safe?",
      answer: "Absolutely! We use eco-friendly, non-toxic cleaning products that are safe for your family and pets.\n\nAll our products are commercial-grade but gentle on your home environment. We can also accommodate specific product requests if you have allergies or sensitivities."
    },
    {
      question: "What's your cancellation policy?",
      answer: "You might incur a fee if you cancel or reschedule less than 24 hours before your scheduled cleaning.\n\nHowever, we always make exceptions if something is wrong or if you just need to reschedule. We understand life happens and we're flexible with our customers."
    }
  ];

  return (
    <section id="faq" className="py-20" style={INLINE_STYLES.primary}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            FAQ
          </h2>
          <p className={`${TYPOGRAPHY.description} mx-auto`}>
            Everything you need to know about our residential cleaning services.
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