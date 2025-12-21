import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Get Car Cleaning Quote - Brooklyn Maids",
  description: "Request a quote for car interior and exterior cleaning services in Brooklyn and NYC.",
};

export default function CarCleaningQuotePage() {
  // Redirect to main quote page
  redirect('/quote');
}

