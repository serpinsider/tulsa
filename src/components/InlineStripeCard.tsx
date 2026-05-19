'use client';

/**
 * Inline Stripe card-add panel for the /q confirm page.
 *
 * Mounts a Stripe PaymentElement once we have a SetupIntent client_secret
 * + publishable key from the public setup-intent endpoint. Exposes:
 *
 *   - onCardReady(setupIntentId): called after confirmSetup succeeds with
 *     the setupIntent id. Parent should stash it and include in the
 *     /api/public/bookings/create call.
 *
 *   - confirmRef: parent attaches via ref to call .confirm() at submit
 *     time. Returns a Promise that resolves to { ok, setupIntentId, error }.
 *
 * This component does NOT call the booking-create API; the parent owns
 * that. We just produce a confirmed setup intent.
 */

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

export interface InlineStripeCardHandle {
  confirm: () => Promise<{ ok: boolean; setupIntentId?: string; error?: string }>;
}

interface Props {
  token: string;
  vaOpsUrl: string;
  customer: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  accentColor: string;
  onStatusChange?: (status: 'idle' | 'loading' | 'ready' | 'error', error?: string) => void;
}

const InlineStripeCard = forwardRef<InlineStripeCardHandle, Props>(function InlineStripeCard(
  { token, vaOpsUrl, customer, accentColor, onStatusChange },
  ref,
) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [setupIntentId, setSetupIntentId] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const ranRef = useRef(false);
  const confirmRef = useRef<((s: Stripe, e: StripeElements) => Promise<{ ok: boolean; setupIntentId?: string; error?: string }>) | null>(
    null,
  );

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    onStatusChange?.('loading');
    (async () => {
      try {
        const res = await fetch(`${vaOpsUrl}/api/public/payments/setup-intent`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            token,
            email: customer.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phone: customer.phone,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          setFetchError(data.detail || data.error || 'Could not start card setup.');
          onStatusChange?.('error', data.error || 'setup_failed');
          return;
        }
        if (!data.clientSecret || !data.publishableKey) {
          setFetchError('Stripe is not configured. Pick Zelle below or text us.');
          onStatusChange?.('error', 'no_keys');
          return;
        }
        setStripePromise(loadStripe(data.publishableKey));
        setClientSecret(data.clientSecret);
        setSetupIntentId(data.setupIntentId);
        onStatusChange?.('ready');
      } catch (e) {
        setFetchError(e instanceof Error ? e.message : 'Network error.');
        onStatusChange?.('error', 'network');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      confirm: async () => {
        if (!stripePromise) return { ok: false, error: 'stripe not loaded' };
        if (!confirmRef.current) return { ok: false, error: 'elements not mounted' };
        const stripe = await stripePromise;
        if (!stripe) return { ok: false, error: 'stripe failed to load' };
        // Inner confirm runner reads useStripe/useElements via the
        // ConfirmRunner child. Race-safe because we await its assignment
        // via the effect below before the parent calls .confirm().
        return confirmRef.current(stripe, null as unknown as StripeElements);
      },
    }),
    [stripePromise],
  );

  const options = useMemo(() => {
    if (!clientSecret) return null;
    return {
      clientSecret,
      // paymentMethodOrder belongs on Elements options, NOT on the
      // PaymentElement options. Putting it on PaymentElement throws
      // a synchronous error from stripe-js and crashes the React tree.
      paymentMethodOrder: ['card', 'link', 'cashapp'],
      // Match the dark glass cards on /q. Background is a hair lighter
      // than the form panel so the Stripe inputs feel "inset" instead
      // of floating on top of nothing. accentColor drives focus ring,
      // selected-tab underline, and the saved-Link chip.
      appearance: {
        theme: 'night' as const,
        labels: 'floating' as const,
        variables: {
          colorPrimary: accentColor,
          colorBackground: 'rgba(255,255,255,0.04)',
          colorText: '#ffffff',
          colorTextSecondary: 'rgba(255,255,255,0.65)',
          colorTextPlaceholder: 'rgba(255,255,255,0.35)',
          colorIconTab: 'rgba(255,255,255,0.65)',
          colorIconTabSelected: accentColor,
          colorDanger: '#fca5a5',
          borderRadius: '8px',
          fontSizeBase: '14px',
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          spacingUnit: '4px',
        },
        rules: {
          '.Input': {
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: 'none',
            padding: '10px 12px',
          },
          '.Input:focus': {
            border: `1px solid ${accentColor}`,
            boxShadow: `0 0 0 1px ${accentColor}`,
          },
          '.Input--invalid': {
            border: '1px solid #fca5a5',
            boxShadow: 'none',
          },
          '.Label': {
            color: 'rgba(255,255,255,0.75)',
            fontWeight: '500',
          },
          '.Tab': {
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.85)',
          },
          '.Tab:hover': {
            backgroundColor: 'rgba(255,255,255,0.06)',
            color: '#ffffff',
          },
          '.Tab--selected': {
            backgroundColor: `${accentColor}22`,
            border: `1px solid ${accentColor}`,
            color: '#ffffff',
          },
          '.TabIcon--selected': {
            fill: accentColor,
          },
          '.Block': {
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.10)',
          },
          '.AccordionItem': {
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: 'none',
          },
          '.AccordionItem--selected': {
            backgroundColor: `${accentColor}10`,
            border: `1px solid ${accentColor}55`,
          },
          '.PickerItem': {
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#ffffff',
          },
          '.PickerItem--selected': {
            backgroundColor: `${accentColor}22`,
            border: `1px solid ${accentColor}`,
          },
          '.MenuAction': {
            color: accentColor,
          },
        },
      },
    };
  }, [clientSecret, accentColor]);

  if (fetchError) {
    return (
      <div className="text-[12px] rounded-lg border border-red-400/30 bg-red-500/10 text-red-100 px-3 py-2">
        {fetchError}
      </div>
    );
  }
  if (!options || !stripePromise) {
    return (
      <div className="text-[12px] text-white/55 py-2">Loading secure card form...</div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <ConfirmRunner
        setupIntentId={setupIntentId || ''}
        billingDetails={{
          email: customer.email,
          name: [customer.firstName, customer.lastName].filter(Boolean).join(' ') || undefined,
          phone: customer.phone,
        }}
        bind={(fn) => (confirmRef.current = fn)}
      />
      <PaymentElement
        options={{
          // Plain accordion. With only ['card','link'] allowed on the
          // SetupIntent server-side and paymentMethodOrder on the Elements
          // wrapper, this renders as a single card panel with Link's
          // email/saved-card chip beside the card number field, matching
          // the BK reference. Stripe rejects layout.radios as a boolean
          // on newer SDKs (wants 'always'|'never'|'auto'|'if_multiple');
          // safest to just not specify it.
          layout: 'accordion',
          fields: {
            billingDetails: {
              email: customer.email ? 'never' : 'auto',
              name: customer.firstName || customer.lastName ? 'never' : 'auto',
              phone: customer.phone ? 'never' : 'auto',
            },
          },
          defaultValues: {
            billingDetails: {
              email: customer.email,
              name: [customer.firstName, customer.lastName].filter(Boolean).join(' ') || undefined,
              phone: customer.phone,
            },
          },
        }}
      />
    </Elements>
  );
});

export default InlineStripeCard;

function ConfirmRunner({
  setupIntentId,
  billingDetails,
  bind,
}: {
  setupIntentId: string;
  billingDetails: { email?: string; name?: string; phone?: string };
  bind: (fn: (s: Stripe, e: StripeElements) => Promise<{ ok: boolean; setupIntentId?: string; error?: string }>) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    bind(async (sOuter) => {
      void sOuter;
      if (!stripe || !elements) return { ok: false, error: 'not mounted' };
      // Stripe requires billing_details fields we hid in the PaymentElement
      // (`fields.billingDetails.name: 'never'` etc) to be passed back here
      // at confirm time. defaultValues on the element only populates the
      // UI - it does NOT carry through to the confirm call. We rebuild the
      // billing_details from the prefill payload so Stripe's validator
      // is happy.
      const bd: Record<string, string> = {};
      if (billingDetails.name) bd.name = billingDetails.name;
      if (billingDetails.email) bd.email = billingDetails.email;
      if (billingDetails.phone) bd.phone = billingDetails.phone;

      const result = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: typeof window !== 'undefined' ? window.location.href : 'https://example.com',
          payment_method_data: {
            billing_details: bd,
          },
        },
        redirect: 'if_required',
      });
      if (result.error) {
        return { ok: false, error: result.error.message || 'card declined' };
      }
      if (!result.setupIntent || result.setupIntent.status !== 'succeeded') {
        return {
          ok: false,
          error: `Card status: ${result.setupIntent?.status || 'unknown'}.`,
        };
      }
      return { ok: true, setupIntentId };
    });
  }, [stripe, elements, setupIntentId, bind]);
  return null;
}
