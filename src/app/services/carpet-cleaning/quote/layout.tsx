import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carpet Cleaning Quote - ${BRANDING.businessName}',
  description: 'Get a quote for professional carpet cleaning in [LOCATION]. Deep steam cleaning, stain removal, pet odor treatment.',
  alternates: {
    canonical: 'https://[DOMAIN]/services/carpet-cleaning/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
