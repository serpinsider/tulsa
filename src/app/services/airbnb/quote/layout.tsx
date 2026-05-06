import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Quote - Tulsa Maids',
  description: 'Get a quote for professional Airbnb turnover cleaning in Tulsa, OK. Same-day service, guest-ready results.',
  alternates: {
    canonical: 'https://tulsamaids.com/services/airbnb/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
