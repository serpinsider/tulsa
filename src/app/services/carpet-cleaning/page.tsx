import { Metadata } from 'next';
import CarpetCleaningService from '@/components/CarpetCleaningService';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: "Professional Carpet Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
  description: "Expert carpet cleaning services in Brooklyn, Manhattan, Queens & Bronx. Deep steam cleaning, stain removal, odor elimination, and carpet protection. Same-day service available!",
  keywords: [
    'carpet cleaning Brooklyn',
    'professional carpet cleaning NYC',
    'carpet cleaning service Brooklyn',
    'deep carpet cleaning',
    'carpet cleaning near me',
    'rug cleaning Brooklyn',
    'carpet steam cleaning',
    'pet stain removal',
    'carpet odor removal',
    'carpet cleaning Manhattan',
    'carpet cleaning Queens',
    'carpet cleaning Bronx',
  ],
  openGraph: {
    title: "Professional Carpet Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Expert carpet cleaning services in Brooklyn, Manhattan, Queens & Bronx. Deep steam cleaning, stain removal, odor elimination, and carpet protection. Same-day service available!",
    url: "https://brooklynmaids.com/services/carpet-cleaning",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Carpet Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Carpet Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Expert carpet cleaning services in Brooklyn, Manhattan, Queens & Bronx. Deep steam cleaning, stain removal, and odor elimination. Same-day service available!",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: "https://brooklynmaids.com/services/carpet-cleaning",
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

export default function CarpetCleaningPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollToTop />
      <CarpetCleaningService />
    </main>
  );
}


