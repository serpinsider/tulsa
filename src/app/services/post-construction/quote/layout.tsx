import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post-Construction Cleaning Quote - ${BRANDING.businessName}',
  description: 'Get a quote for post-construction cleanup in [LOCATION]. Thorough dust, debris, and detail cleaning after your project.',
  alternates: {
    canonical: 'https://[DOMAIN]/services/post-construction/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
