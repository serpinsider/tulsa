import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Get Event Cleaning Quote - Brooklyn Maids',
  description: 'Get an instant quote for event cleaning services in New York. Pre-event setup, during-event support, and post-event cleanup.',
};

export default function EventCleaningQuotePage() {
  // Redirect to main quote page
  redirect('/quote');
}



