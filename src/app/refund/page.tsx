import { Metadata } from 'next';
import { BRANDING } from '@/config/branding';
import RefundClient from './RefundClient';

export const metadata: Metadata = {
  title: `Refund Policy - ${BRANDING.businessName}`,
  description: 'Our satisfaction guarantee and cancellation policy. We make it right if the clean isn\'t to your standard.',
  openGraph: {
    title: `Refund Policy - ${BRANDING.businessName}`,
    description: 'Our satisfaction guarantee and cancellation policy. We make it right if the clean isn\'t to your standard.',
    url: `${BRANDING.url}/refund`,
    siteName: BRANDING.businessName,
    type: 'website',
  },
};

export default function RefundPage() {
  return <RefundClient />;
}
