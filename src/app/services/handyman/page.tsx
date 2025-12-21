import { Metadata } from 'next';
import HandymanService from '@/components/HandymanService';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: "Handyman Services in Brooklyn, NY - Brooklyn Maids",
  description: "Professional handyman services in Brooklyn, Manhattan & NYC. Furniture assembly, TV mounting, home repairs, and maintenance. Licensed, insured, and reliable. Same-day service available!",
  keywords: [
    'handyman services Brooklyn',
    'home repairs Brooklyn',
    'handyman near me',
    'Brooklyn handyman service',
    'home maintenance Brooklyn',
    'small repairs Brooklyn',
    'professional handyman Brooklyn',
    'home improvement Brooklyn',
    'furniture assembly Brooklyn',
    'TV mounting service',
  ],
  openGraph: {
    title: "Handyman Services in Brooklyn, NY - Brooklyn Maids",
    description: "Expert handyman services for home repairs, furniture assembly, TV mounting, and maintenance in Brooklyn and NYC. Same-day service available.",
    url: "https://brooklynmaids.com/services/handyman",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Handyman Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handyman Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional handyman services for repairs, assembly, and maintenance in Brooklyn and NYC. Licensed and insured with same-day availability.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: "https://brooklynmaids.com/services/handyman",
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

export default function HandymanPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollToTop />
      <HandymanService />
    </main>
  );
}


