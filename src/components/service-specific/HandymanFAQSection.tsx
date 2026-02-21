import BaseFAQ from '../shared/BaseFAQ';
import { BRANDING } from '@/config/branding';

export default function HandymanFAQSection() {
  const faqs = [
    {
      question: "What types of furniture can you assemble?",
      answer: "We can assemble virtually any furniture including IKEA, Wayfair, Amazon purchases, custom furniture, office furniture, bedroom sets, and dining tables.\n\nWe bring all necessary tools and hardware."
    },
    {
      question: "Do you provide mounting hardware for TV installation?",
      answer: "We provide basic mounting hardware for standard installations.\n\nFor specialty mounts or specific requirements, we may recommend purchasing the appropriate mount beforehand to ensure the best fit."
    },
    {
      question: "Are you licensed and insured for handyman work?",
      answer: "Yes, we are fully licensed and insured for all handyman services.\n\nWe carry comprehensive liability insurance and workers compensation for your protection and peace of mind."
    },
    {
      question: "How do you price handyman services?",
      answer: "We offer transparent hourly rates with free estimates for larger projects.\n\nMost small jobs are completed within 1-3 hours. We provide upfront pricing with no hidden fees."
    },
    {
      question: "Can you handle electrical and plumbing work?",
      answer: "We handle basic electrical work like outlet/switch replacements and light fixtures, plus minor plumbing like faucet repairs and unclogging drains.\n\nFor major electrical or plumbing work, we can refer you to licensed specialists."
    },
    {
      question: "How do I get a handyman quote?",
      answer: `Get a quote for your handyman project:\n\n<div class='flex flex-col sm:flex-row gap-3 mt-4'><a href='/services/handyman/quote' class='bg-[#dfbd69] text-slate-900 px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#dfbd69]/90 transition-colors'>Get Handyman Quote</a></div>Or contact us directly:\n• Call: <a href='${BRANDING.phone.href}' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>${BRANDING.phone.display}</a>\n• Text: <a href='${BRANDING.phone.smsHref}' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>${BRANDING.phone.display}</a>`
    }
  ];

  return (
    <BaseFAQ
      title="Handyman FAQ"
      description="Common questions about our handyman services"
      faqs={faqs}
    />
  );
}
