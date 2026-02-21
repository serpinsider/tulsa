import { Metadata } from 'next';
import { BRANDING } from '@/config/branding';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: `Privacy Policy - ${BRANDING.businessName}`,
  description: `Our privacy policy explains how ${BRANDING.businessName} collects, uses, and protects your personal information.`,
  openGraph: {
    title: `Privacy Policy - ${BRANDING.businessName}`,
    description: `Our privacy policy explains how ${BRANDING.businessName} collects, uses, and protects your personal information.`,
    url: `${BRANDING.url}/privacy`,
    siteName: BRANDING.businessName,
    type: 'website',
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
