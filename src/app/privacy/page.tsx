import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy - Tulsa Maids',
  description: 'How we protect and use your information. Learn about our privacy practices and your rights.',
  openGraph: {
    title: 'Privacy Policy - Tulsa Maids',
    description: 'How we protect and use your information. Learn about our privacy practices and your rights.',
    url: 'https://tulsamaids.com/privacy',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
