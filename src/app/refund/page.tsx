import { Metadata } from 'next';
import RefundClient from './RefundClient';

export const metadata: Metadata = {
  title: 'Refund Policy - Tulsa Maids',
  description: 'Our satisfaction guarantee and cancellation policy. We make it right if the clean isn\'t to your standard.',
  openGraph: {
    title: 'Refund Policy - Tulsa Maids',
    description: 'Our satisfaction guarantee and cancellation policy. We make it right if the clean isn\'t to your standard.',
    url: 'https://tulsamaids.com/refund',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
};

export default function RefundPage() {
  return <RefundClient />;
}
