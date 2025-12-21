import { Metadata } from 'next';
import BookingKoalaEmbed from '@/components/BookingKoalaEmbed';

export const metadata: Metadata = {
  title: 'Book Your Cleaning - Brooklyn Maids',
  description: 'Schedule your cleaning service with Brooklyn Maids. Our easy booking system lets you customize your cleaning needs and find the perfect time slot for your schedule.',
  openGraph: {
    title: 'Book Your Cleaning - Brooklyn Maids',
    description: 'Book your home cleaning service in minutes. Choose your cleaning type, schedule your preferred date and time, and let Brooklyn Maids take care of the rest.',
    url: 'https://brooklynmaids.com/booking',
    siteName: 'Brooklyn Maids',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Book a Cleaning Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/booking',
  },
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0f172a]">
      <BookingKoalaEmbed />
    </main>
  );
}