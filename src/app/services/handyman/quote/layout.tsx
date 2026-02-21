import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handyman Services Quote - [BUSINESS_NAME]',
  description: 'Get a quote for professional handyman services in [LOCATION]. TV mounting, furniture assembly, minor repairs and more.',
  alternates: {
    canonical: 'https://[DOMAIN]/services/handyman/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
