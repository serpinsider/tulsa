import BaseFAQ from '../shared/BaseFAQ';

export default function AirbnbFAQSection() {
  const faqs = [
    {
      question: "How quickly can you turn around an Airbnb cleaning?",
      answer: "We can typically complete Airbnb turnovers within 2-3 hours.\n\nWe offer same-day service for last-minute bookings and emergency cleaning is available 24/7 for urgent situations."
    },
    {
      question: "Do you provide linens and amenities?",
      answer: "We can restock basic amenities like toilet paper and towels.\n\nFor linens, we offer a linen service or can work with your existing supplies. We can also coordinate with your preferred linen service."
    },
    {
      question: "How do you handle damage reporting?",
      answer: "We document any damage we find during cleaning and can provide photos and reports.\n\nThis helps protect your property and supports insurance claims or guest charges."
    },
    {
      question: "Can you coordinate with property management software?",
      answer: "Yes, we can integrate with most systems like Airbnb and VRBO.\n\nWe provide updates on cleaning status, issues found, and completion confirmations for seamless management."
    },
    {
      question: "What's included in Airbnb cleaning?",
      answer: "Our service includes thorough cleaning of all areas, fresh linens, restocking supplies, damage inspection, and staging.\n\nWe ensure your property is guest-ready every time."
    },
    {
      question: "Do you offer recurring Airbnb cleaning?",
      answer: "Yes! We can set up automated cleaning schedules based on your booking calendar.\n\nMany hosts use our recurring service for consistent quality and peace of mind."
    }
  ];

  return (
    <BaseFAQ
      title="Airbnb FAQ"
      description="Common questions about our Airbnb turnover cleaning services"
      faqs={faqs}
    />
  );
}
