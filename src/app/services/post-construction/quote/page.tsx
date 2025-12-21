import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Get Post-Construction Cleaning Quote - Brooklyn Maids",
  description: "Request a quote for post-construction and renovation cleaning services in Brooklyn and NYC.",
};

export default function PostConstructionQuotePage() {
  // Redirect to main quote page
  redirect('/quote');
}

