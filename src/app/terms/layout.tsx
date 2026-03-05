import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Tulsa Maids',
  description: 'Terms of service for Tulsa Maids house cleaning services.',
  openGraph: {
    title: 'Terms of Service - Tulsa Maids',
    description: 'Terms of service for Tulsa Maids house cleaning services.',
    url: 'https://www.tulsamaids.com/terms',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - Tulsa Maids',
  },
  alternates: { canonical: 'https://www.tulsamaids.com/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
