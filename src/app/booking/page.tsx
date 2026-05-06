import { Metadata } from 'next';
import NativeBookingForm from '@/components/NativeBookingForm';
import { STEP_WIZARD_CONFIG } from '@/lib/step-wizard-config';

// /booking can carry ?t=<prefill-token>; force-dynamic so useSearchParams
// works without a build-time error and tokens resolve per request.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Book Your Cleaning - Tulsa Maids',
  description: 'Schedule your cleaning service with Tulsa Maids. Our easy booking system lets you customize your cleaning needs and find the perfect time slot for your schedule.',
  openGraph: {
    title: 'Book Your Cleaning - Tulsa Maids',
    description: 'Book your home cleaning service in minutes. Choose your cleaning type, schedule your preferred date and time, and let Tulsa Maids take care of the rest.',
    url: 'https://tulsamaids.com/booking',
    siteName: 'Tulsa Maids',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Book Your Cleaning - Tulsa Maids',
    description: 'Book your home cleaning service in minutes with Tulsa Maids.',
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
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#1a3755]">
      <NativeBookingForm
        brandSlug={STEP_WIZARD_CONFIG.businessId}
        businessName={STEP_WIZARD_CONFIG.businessName}
        accentColor={STEP_WIZARD_CONFIG.accentColor}
        btnTextColor={STEP_WIZARD_CONFIG.btnTextColor}
      />
    </main>
  );
}