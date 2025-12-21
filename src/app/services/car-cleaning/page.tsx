import { Metadata } from 'next';
import CarCleaningService from '@/components/CarCleaningService';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: "Mobile Car Cleaning & Detailing in Brooklyn & NYC - Brooklyn Maids",
  description: "Professional mobile car detailing and cleaning services in Brooklyn, Manhattan & NYC. Interior deep cleaning, exterior wash & wax, stain removal, and odor elimination. Convenient mobile service at your location!",
  keywords: [
    'car cleaning Brooklyn',
    'mobile car detailing NYC',
    'car detailing Brooklyn',
    'auto detailing service',
    'car wash Brooklyn',
    'interior car cleaning',
    'mobile car wash',
    'car detailing near me',
    'professional car cleaning',
    'vehicle detailing Brooklyn',
  ],
  openGraph: {
    title: "Mobile Car Cleaning & Detailing in Brooklyn & NYC - Brooklyn Maids",
    description: "Professional mobile car detailing service in Brooklyn and NYC. Interior deep cleaning, exterior wash & wax, and full detailing packages at your location.",
    url: "https://brooklynmaids.com/services/car-cleaning",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Car Cleaning & Detailing Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Car Cleaning & Detailing in Brooklyn & NYC - Brooklyn Maids",
    description: "Convenient mobile car detailing in Brooklyn and NYC. Professional interior and exterior cleaning at your location.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: "https://brooklynmaids.com/services/car-cleaning",
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

export default function CarCleaningPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollToTop />
      <CarCleaningService />
    </main>
  );
}

