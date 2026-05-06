import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handyman Services Quote - Tulsa Maids',
  description: 'Get a quote for professional handyman services in Tulsa, OK. TV mounting, furniture assembly, minor repairs and more.',
  alternates: {
    canonical: 'https://tulsamaids.com/services/handyman/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
