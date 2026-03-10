import { Metadata } from 'next';
import { INLINE_STYLES } from '@/styles/colors';
import EventCleaningQuoteClient from './EventCleaningQuoteClient';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: 'Get Your Event Cleaning Quote - Tulsa Maids',
  description: 'Request a quote for event cleaning services in Tulsa, OK. Pre-event setup, during-event support, and post-event cleanup.',
  openGraph: {
    title: 'Get Your Event Cleaning Quote - Tulsa Maids',
    description: 'Request a quote for event cleaning services in Tulsa, OK.',
    url: 'https://tulsamaids.com/services/event-cleaning/quote',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
};

export default function EventCleaningQuotePage() {
  return <EventCleaningQuoteClient />;
}
