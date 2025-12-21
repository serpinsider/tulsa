import { Metadata } from 'next';
import PostConstructionService from '@/components/PostConstructionService';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: "Post-Construction Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
  description: "Expert post-construction cleanup in Brooklyn, Manhattan & NYC. Construction debris removal, dust elimination, and move-in ready cleaning. Licensed & insured contractors. Same-day service available!",
  keywords: [
    'post-construction cleaning Brooklyn',
    'construction cleanup NYC',
    'after construction cleaning',
    'construction debris removal',
    'post renovation cleaning',
    'builder cleaning service',
    'construction site cleaning',
    'final construction clean',
    'dust removal service',
    'move-in ready cleaning',
  ],
  openGraph: {
    title: "Post-Construction Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Expert post-construction cleanup services. We handle construction debris removal, dust elimination, and final touches to make your space move-in ready.",
    url: "https://brooklynmaids.com/services/post-construction",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Post-Construction Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post-Construction Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Professional post-construction cleanup. Construction debris removal and move-in ready cleaning in Brooklyn, Manhattan & NYC.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: "https://brooklynmaids.com/services/post-construction",
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

export default function PostConstructionPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollToTop />
      <PostConstructionService />
    </main>
  );
}


