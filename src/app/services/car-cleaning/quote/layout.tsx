import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Cleaning Quote - Tulsa Maids',
  description: 'Get a quote for professional car cleaning and detailing in Tulsa, OK. Interior, exterior, and full detail packages.',
  alternates: {
    canonical: 'https://tulsamaids.com/services/car-cleaning/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
