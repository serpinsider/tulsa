import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import QuoteBar from '@/components/QuoteBar';
import ServicesSection from '@/components/ServicesSection';
import CallOrTextBar from '@/components/CallOrTextBar';
import WhatWeCleanSection from '@/components/WhatWeCleanSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import AreasWeServeSection from '@/components/AreasWeServeSection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import { locations, getLocationWithState } from '@/lib/locations';
import { BRANDING } from '@/config/branding';

interface LocationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all locations
export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

// Generate metadata for each location
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((loc) => loc.slug === slug);
  
  if (!location) {
    return {
      title: `Location Not Found - ${BRANDING.businessName}`,
    };
  }

  const locationWithState = getLocationWithState(location.name, location.slug);

  return {
    title: `House Cleaning in ${locationWithState} - ${BRANDING.businessName}`,
    description: `House cleaning services in ${locationWithState}. Licensed & insured maids, 100% satisfaction guarantee. Book your trusted cleaning service today!`,
    openGraph: {
      title: `House Cleaning in ${locationWithState} - ${BRANDING.businessName}`,
      description: `House cleaning services in ${locationWithState}. Licensed & insured maids, 100% satisfaction guarantee. Book your trusted cleaning service today!`,
      url: `${BRANDING.url}/locations/${location.slug}`,
      siteName: BRANDING.businessName,
      images: [
        {
          url: '/ogs-image.jpg',
          width: 1200,
          height: 630,
          alt: `${BRANDING.businessName} - House Cleaning Services in ${locationWithState}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = locations.find((loc) => loc.slug === slug);
  
  if (!location) {
    notFound();
  }

  const locationWithState = getLocationWithState(location.name, location.slug);

  return (
    <main>
      <HeroSection location={location.name} />
      <QuoteBar />
      <ServicesSection location={locationWithState} />
      <CallOrTextBar />
      <WhatWeCleanSection />
      <QuoteBar />
      <HowItWorksSection />
      <CallOrTextBar />
      <AreasWeServeSection />
      <QuoteBar />
      <ReviewsSection location={location.name} />
      <CallOrTextBar />
      <FAQSection location={location.name} />
      <QuoteBar />
      <ContactSection />
    </main>
  );
}