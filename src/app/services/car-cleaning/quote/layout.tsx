import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Cleaning Quote - [BUSINESS_NAME]',
  description: 'Get a quote for professional car cleaning and detailing in [LOCATION]. Interior, exterior, and full detail packages.',
  alternates: {
    canonical: 'https://[DOMAIN]/services/car-cleaning/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
