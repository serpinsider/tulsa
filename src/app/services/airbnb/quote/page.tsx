import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Get Airbnb Cleaning Quote - Brooklyn Maids",
  description: "Request a quote for Airbnb turnover cleaning services in Brooklyn and NYC.",
};

export default function AirbnbQuotePage() {
  // Redirect to main quote page
  redirect('/quote');
}

