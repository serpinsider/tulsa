import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Cleaning Quote - Tulsa Maids',
  description: 'Get a quote for professional commercial cleaning in Tulsa, OK. Offices, retail, restaurants, and more.',
  alternates: {
    canonical: 'https://tulsamaids.com/services/commercial/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
