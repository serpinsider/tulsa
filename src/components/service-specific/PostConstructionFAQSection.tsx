import BaseFAQ from '../shared/BaseFAQ';

export default function PostConstructionFAQSection() {
  const faqs = [
    {
      question: "What does post-construction cleaning include?",
      answer: "Our post-construction cleaning includes removal of all debris, dust, and construction residue.\n\nWe clean all surfaces, windows, floors, fixtures, and ensure the space is move-in ready."
    },
    {
      question: "How soon after construction can you clean?",
      answer: "We can start cleaning as soon as the heavy construction work is complete and it's safe to enter.\n\nWe recommend scheduling once all major work is done but before final inspections."
    },
    {
      question: "Do you handle large construction projects?",
      answer: "Yes! We handle projects of all sizes from single-room renovations to full home remodels.\n\nWe can also provide ongoing cleaning during long-term construction projects."
    },
    {
      question: "What if there's still construction dust after cleaning?",
      answer: "Construction dust can be persistent. If you find areas we missed, contact us within 24 hours.\n\nWe'll return to re-clean those areas at no additional charge. Your satisfaction is guaranteed."
    },
    {
      question: "How do I get a post-construction quote?",
      answer: "Get a quote for your construction cleanup:\n\n<div class='flex flex-col sm:flex-row gap-3 mt-4'><a href='/services/post-construction/quote' class='bg-[#dfbd69] text-slate-900 px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#dfbd69]/90 transition-colors'>Get Quote</a></div>Or contact us directly:\n• Call: <a href='tel:+13477504380' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>(347) 750-4380</a>\n• Text: <a href='sms:+13477504380' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>(347) 750-4380</a>"
    }
  ];

  return (
    <BaseFAQ
      title="Post-Construction FAQ"
      description="Common questions about our construction cleanup services"
      faqs={faqs}
    />
  );
}
