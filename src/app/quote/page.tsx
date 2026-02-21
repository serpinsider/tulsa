import { Metadata } from 'next';
import { BRANDING } from '@/config/branding';
import StepWizard from '@/components/StepWizard';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: `Get Your Quote - ${BRANDING.businessName}`,
  description: `Get an instant, accurate quote for house cleaning services. Fast, easy, and no obligations. Serving ${BRANDING.serviceArea}.`,
  openGraph: {
    title: `Get Your Quote - ${BRANDING.businessName}`,
    description: `Get an instant quote for your home cleaning service. Choose your cleaning type, customize your needs, and let ${BRANDING.businessName} take care of the rest.`,
    url: `${BRANDING.url}/quote`,
    siteName: BRANDING.businessName,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Get a Cleaning Quote',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function QuotePage() {
  return (
    <main className="min-h-screen pt-32" style={INLINE_STYLES.primary}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-xl text-white/80">
            Fill out the form below and we'll send you a detailed quote instantly!
          </p>
        </div>
        <StepWizard />
      </div>
    </main>
  );
}
