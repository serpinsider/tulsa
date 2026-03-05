import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Cleaning Quote - ${BRANDING.businessName}',
  description: 'Get a quote for professional commercial cleaning in [LOCATION]. Offices, retail, restaurants, and more.',
  alternates: {
    canonical: 'https://[DOMAIN]/services/commercial/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
