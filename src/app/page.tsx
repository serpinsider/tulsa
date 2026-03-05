import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import CallOrTextBar from '@/components/CallOrTextBar';
import QuoteBar from '@/components/QuoteBar';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WhatWeCleanSection from '@/components/WhatWeCleanSection';
import AreasWeServeSection from '@/components/AreasWeServeSection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Tulsa Maids - House Cleaning & Maid Service in Tulsa, OK',
  description: 'Professional house cleaning and maid service serving Tulsa, Broken Arrow, Owasso, and surrounding Oklahoma areas. Book online in 60 seconds.',
  alternates: {
    canonical: 'https://tulsamaids.com',
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection location="Tulsa, OK" />
      <QuoteBar />
      <ServicesSection location="Tulsa, OK" />
      <CallOrTextBar />
      <WhatWeCleanSection />
      <QuoteBar />
      <HowItWorksSection />
      <CallOrTextBar />
      <AreasWeServeSection />
      <QuoteBar />
      <ReviewsSection location="Tulsa" />
      <CallOrTextBar />
      <FAQSection location="Tulsa" />
      <QuoteBar />
      <ContactSection />
    </main>
  );
}
