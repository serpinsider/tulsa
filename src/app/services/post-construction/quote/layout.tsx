import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post-Construction Cleaning Quote - Tulsa Maids',
  description: 'Get a quote for post-construction cleanup in Tulsa, OK. Thorough dust, debris, and detail cleaning after your project.',
  alternates: {
    canonical: 'https://tulsamaids.com/services/post-construction/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
