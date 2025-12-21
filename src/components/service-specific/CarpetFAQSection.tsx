import BaseFAQ from '../shared/BaseFAQ';

export default function CarpetFAQSection() {
  const faqs = [
    {
      question: "How often should I have my carpets cleaned?",
      answer: "We recommend carpet cleaning every 6-12 months for most homes.\n\nFor high-traffic areas or homes with pets and children, every 3-6 months is ideal."
    },
    {
      question: "How long does it take for carpets to dry?",
      answer: "Carpets typically take 4-6 hours to dry completely.\n\nDrying time depends on humidity, air circulation, and carpet thickness. We use powerful extraction equipment to minimize drying time."
    },
    {
      question: "Can you remove pet stains and odors?",
      answer: "Yes! We specialize in pet stain and odor removal using enzyme-based treatments.\n\nThese break down organic matter and eliminate odors at the source, not just mask them."
    },
    {
      question: "Is carpet cleaning safe for children and pets?",
      answer: "Absolutely. We use eco-friendly, non-toxic cleaning solutions that are safe for your family and pets.\n\nAll products are biodegradable and leave no harmful residues."
    },
    {
      question: "Do you move furniture?",
      answer: "We'll move light furniture like chairs, coffee tables, and small items.\n\nFor heavy furniture like sofas, beds, and dressers, we clean around them or you can move them beforehand."
    },
    {
      question: "What types of stains can you remove?",
      answer: "We can remove most stains including wine, coffee, food spills, pet accidents, mud, and grease.\n\nSome permanent stains may be lightened but not completely removed."
    },
    {
      question: "How do I get a carpet cleaning quote?",
      answer: "Get a quote for carpet cleaning:\n\n<div class='flex flex-col sm:flex-row gap-3 mt-4'><a href='/services/carpet-cleaning/quote' class='bg-[#dfbd69] text-slate-900 px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#dfbd69]/90 transition-colors'>Get Carpet Quote</a></div>Or contact us directly:\n• Call: <a href='tel:+13477504380' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>(347) 750-4380</a>\n• Text: <a href='sms:+13477504380' class='text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold'>(347) 750-4380</a>"
    }
  ];

  return (
    <BaseFAQ
      title="Carpet Cleaning FAQ"
      description="Everything you need to know about our carpet cleaning services"
      faqs={faqs}
    />
  );
}
