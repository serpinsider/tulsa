import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Tulsa Maids',
  description: 'Privacy policy for Tulsa Maids house cleaning services.',
  openGraph: {
    title: 'Privacy Policy - Tulsa Maids',
    description: 'Privacy policy for Tulsa Maids house cleaning services.',
    url: 'https://www.tulsamaids.com/privacy',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Tulsa Maids',
  },
  alternates: { canonical: 'https://www.tulsamaids.com/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
