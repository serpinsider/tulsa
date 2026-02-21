import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Quote - [BUSINESS_NAME]',
  description: 'Get a quote for professional Airbnb turnover cleaning in [LOCATION]. Same-day service, guest-ready results.',
  alternates: {
    canonical: 'https://[DOMAIN]/services/airbnb/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
