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
  alternates: {
    canonical: "https://brooklynmaids.com",
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection location="Brooklyn, NY" />
      <QuoteBar />
      <ServicesSection location="Brooklyn, NY" />
      <CallOrTextBar />
      <WhatWeCleanSection />
      <QuoteBar />
      <HowItWorksSection />
      <CallOrTextBar />
      <AreasWeServeSection />
      <QuoteBar />
      <ReviewsSection location="Brooklyn" />
      <CallOrTextBar />
      <FAQSection location="Brooklyn" />
      <QuoteBar />
      <ContactSection />
    </main>
  );
}
