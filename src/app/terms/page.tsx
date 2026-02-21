import { Metadata } from 'next';
import { BRANDING } from '@/config/branding';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: `Terms of Service - ${BRANDING.businessName}`,
  description: `Our terms of service and service agreement for ${BRANDING.businessName} house cleaning services.`,
  openGraph: {
    title: `Terms of Service - ${BRANDING.businessName}`,
    description: `Our terms of service and service agreement for ${BRANDING.businessName} house cleaning services.`,
    url: `${BRANDING.url}/terms`,
    siteName: BRANDING.businessName,
    type: 'website',
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
