import { Metadata } from 'next';
import { BRANDING, getBookingKoalaUrl } from '@/config/branding';
import BookingKoalaEmbed from '@/components/BookingKoalaEmbed';

export const metadata: Metadata = {
  title: `Book Your Cleaning - ${BRANDING.businessName}`,
  description: `Schedule your cleaning service with ${BRANDING.businessName}. Our easy booking system lets you customize your cleaning needs and find the perfect time slot for your schedule.`,
  openGraph: {
    title: `Book Your Cleaning - ${BRANDING.businessName}`,
    description: `Book your home cleaning service in minutes. Choose your cleaning type, schedule your preferred date and time, and let ${BRANDING.businessName} take care of the rest.`,
    url: `${BRANDING.url}/booking`,
    siteName: BRANDING.businessName,
    type: 'website',
  },
};

export default function BookingPage() {
  return (
    <main className="min-h-screen pt-24">
      <BookingKoalaEmbed src={getBookingKoalaUrl('booknow')} title={`${BRANDING.businessName} Booking`} />
    </main>
  );
}
