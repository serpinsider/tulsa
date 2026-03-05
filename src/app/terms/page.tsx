import { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms of Service - Tulsa Maids',
  description: 'Our terms of service and service agreement for Tulsa Maids house cleaning services.',
  openGraph: {
    title: 'Terms of Service - Tulsa Maids',
    description: 'Our terms of service and service agreement for Tulsa Maids house cleaning services.',
    url: 'https://tulsamaids.com/terms',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
