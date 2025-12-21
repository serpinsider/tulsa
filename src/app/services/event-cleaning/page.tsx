import { Metadata } from 'next';
import EventCleaningService from '@/components/EventCleaningService';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: "Event Cleaning Services in Brooklyn, NY - Brooklyn Maids",
  description: "Expert event cleanup services in Brooklyn, Manhattan & NYC. Pre-event setup, during-event support, and post-event cleanup for parties, weddings, corporate events. Available 24/7 with guaranteed satisfaction!",
  keywords: [
    'event cleaning Brooklyn',
    'party cleanup service',
    'wedding cleaning Brooklyn',
    'corporate event cleaning',
    'venue cleaning service',
    'post-event cleanup',
    'event cleanup Brooklyn',
    'party cleaning service',
    'event venue cleaning',
    'special event cleaning',
  ],
  openGraph: {
    title: "Event Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional event cleaning for weddings, parties, corporate events, and special occasions in Brooklyn, Manhattan & NYC. Pre-event, during-event, and post-event services.",
    url: "https://brooklynmaids.com/services/event-cleaning",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Event Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Pre-event, during-event, and post-event cleaning services for weddings, parties, and corporate events in Brooklyn and NYC.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: "https://brooklynmaids.com/services/event-cleaning",
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

export default function EventCleaningPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollToTop />
      <EventCleaningService />
    </main>
  );
}




