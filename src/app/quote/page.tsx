import { Metadata } from 'next';
import { BRANDING } from '@/config/branding';
import QuoteForm from '@/components/QuoteForm';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: `Get Your Quote - ${BRANDING.businessName}`,
  description: `Get an instant, accurate quote for house cleaning services in ${BRANDING.serviceArea}. Fast, easy, and no obligations. Book online!`,
  openGraph: {
    title: `Get Your Quote - ${BRANDING.businessName}`,
    description: `Get an instant quote for your home cleaning service. Choose your cleaning type, customize your needs, and let ${BRANDING.businessName} take care of the rest.`,
    url: `${BRANDING.url}/quote`,
    siteName: BRANDING.businessName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Get Your Quote - ${BRANDING.businessName}`,
    description: `Get an instant, accurate quote for house cleaning services in ${BRANDING.serviceArea}.`,
  },
  alternates: {
    canonical: `${BRANDING.url}/quote`,
  },
};

export default function QuotePage() {
  return (
    <main className="min-h-screen pt-32" style={INLINE_STYLES.primary}>
      <QuoteForm />
    </main>
  );
}
