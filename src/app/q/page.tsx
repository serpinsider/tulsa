import { Metadata } from 'next';
import QuoteConfirmPage from '@/components/QuoteConfirmPage';
import { STEP_WIZARD_CONFIG } from '@/lib/step-wizard-config';

// /q?t=<quote_prefill_token> -> standalone branded quote-confirmation page.
// Force-dynamic so useSearchParams works at request time.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Confirm your booking',
  description:
    'Confirm your cleaning quote. Add your address and payment method to finalize.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <QuoteConfirmPage
      brandSlug={STEP_WIZARD_CONFIG.businessId}
      businessName={STEP_WIZARD_CONFIG.businessName}
      accentColor={STEP_WIZARD_CONFIG.accentColor}
      btnTextColor={STEP_WIZARD_CONFIG.btnTextColor}
    />
  );
}
