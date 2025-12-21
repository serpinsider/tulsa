import { Metadata } from 'next';
import AirbnbCleaningService from '@/components/AirbnbCleaningService';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: "Airbnb Cleaning Services in Brooklyn, NY - Brooklyn Maids",
  description: "Trusted Airbnb & vacation rental cleaning in Brooklyn, Manhattan & NYC. Fast turnover cleaning, restocking, guest-ready guarantee, and 24/7 availability. Same-day service available!",
  keywords: [
    'Airbnb cleaning Brooklyn',
    'vacation rental cleaning',
    'short term rental cleaning',
    'Airbnb turnover cleaning',
    'rental property cleaning',
    'guest-ready cleaning Brooklyn',
    'Airbnb cleaning service',
    'vacation rental turnover',
    'Airbnb cleaning NYC',
    'rental cleaning service',
  ],
  openGraph: {
    title: "Airbnb Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Trusted Airbnb turnover cleaning with same-day service. 24/7 availability and guest-ready guarantee for vacation rentals in Brooklyn, Manhattan & NYC.",
    url: "https://brooklynmaids.com/services/airbnb",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Airbnb Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Fast Airbnb turnover cleaning with guest-ready guarantee. 24/7 availability and same-day service in Brooklyn and NYC.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: "https://brooklynmaids.com/services/airbnb",
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

export default function AirbnbPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollToTop />
      <AirbnbCleaningService />
    </main>
  );
}


