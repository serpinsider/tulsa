import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carpet Cleaning Quote - Tulsa Maids',
  description: 'Get a quote for professional carpet cleaning in Tulsa, OK. Deep steam cleaning, stain removal, pet odor treatment.',
  alternates: {
    canonical: 'https://tulsamaids.com/services/carpet-cleaning/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
