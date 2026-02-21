import { Metadata } from 'next';
import { BRANDING } from '@/config/branding';
import EventCleaningQuoteClient from './EventCleaningQuoteClient';

export const metadata: Metadata = {
  title: `Get Your Event Cleaning Quote - ${BRANDING.businessName}`,
  description: `Request a quote for event cleaning services in ${BRANDING.serviceArea}. Pre-event setup, during-event support, and post-event cleanup.`,
  openGraph: {
    title: `Get Your Event Cleaning Quote - ${BRANDING.businessName}`,
    description: `Request a quote for event cleaning services in ${BRANDING.serviceArea}.`,
    url: `${BRANDING.url}/services/event-cleaning/quote`,
    siteName: BRANDING.businessName,
    type: 'website',
  },
};

export default function EventCleaningQuotePage() {
  return <EventCleaningQuoteClient />;
}
