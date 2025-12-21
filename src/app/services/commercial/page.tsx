import { Metadata } from 'next';
import CommercialCleaningService from '@/components/CommercialCleaningService';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: "Commercial Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
  description: "Professional office and commercial cleaning services in Brooklyn, Manhattan & NYC. Daily, weekly, monthly cleaning for offices, retail spaces, and businesses. Licensed & insured. Flexible scheduling.",
  keywords: [
    'commercial cleaning Brooklyn',
    'office cleaning NYC',
    'business cleaning service',
    'commercial cleaning near me',
    'office cleaning Brooklyn',
    'retail space cleaning',
    'commercial janitorial services',
    'office maintenance Brooklyn',
  ],
  openGraph: {
    title: "Commercial Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Professional office and commercial cleaning services in Brooklyn, Manhattan & NYC. Reliable, thorough, and flexible scheduling for businesses of all sizes.",
    url: "https://brooklynmaids.com/services/commercial",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Commercial Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Professional office and commercial cleaning for businesses in Brooklyn and NYC. Daily, weekly, and monthly service options available.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: "https://brooklynmaids.com/services/commercial",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 160,
    },
  },
};

export default function CommercialPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollToTop />
      <CommercialCleaningService />
    </main>
  );
}


