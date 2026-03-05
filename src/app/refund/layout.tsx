import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy - Tulsa Maids',
  description: 'Refund policy for Tulsa Maids house cleaning services.',
  openGraph: {
    title: 'Refund Policy - Tulsa Maids',
    description: 'Refund policy for Tulsa Maids house cleaning services.',
    url: 'https://www.tulsamaids.com/refund',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Refund Policy - Tulsa Maids',
  },
  alternates: { canonical: 'https://www.tulsamaids.com/refund' },
};

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
