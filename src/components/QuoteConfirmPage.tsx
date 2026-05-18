'use client';

/**
 * QuoteConfirmPage
 *
 * Standalone, full-bleed quote-confirmation page customers land on when
 * they tap the bot's quote link. NOT the booking form, NOT the lead-gen
 * quote step-wizard. This is the dedicated "your quote is ready, confirm
 * to book" page.
 *
 * Layout:
 *   1. Brand chrome (Logo + Call/Text buttons) — no full site nav
 *   2. Hero: "Hi {Name}, here's your quote."
 *   3. Quote card: line items + total, ALWAYS visible. "Edit" toggle that
 *      opens an inline scope editor (service, beds, baths, sqft, addons,
 *      frequency) which re-quotes live via /api/public/quote.
 *   4. Confirmation form: address (autocomplete), date/time, payment
 *      method (card/Zelle radio). Single CTA "Confirm booking $XYZ".
 *   5. Help row: call us, text us, FAQs link
 *
 * Lifecycle:
 *   - Mount with ?t=<quote_prefill_token>
 *   - Resolve token -> prefill payload (name, phone, email, service, etc)
 *   - On Edit: open scope editor; on any scope change, POST /api/public/quote
 *     to recompute total
 *   - On Confirm: POST /api/public/bookings/create -> redirect to portal SSO
 *
 * Brand-isolation: identical across all 13 native brand sites. Brand
 * differences come from props (brandSlug, businessName, accentColor, etc).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePrefillFromToken } from '@/lib/usePrefillFromToken';
import { CONTACT_INFO } from '@/lib/contact';
import Logo from '@/components/Logo';

interface Props {
  brandSlug: string;
  businessName: string;
  accentColor: string;
  btnTextColor: string;
}

type Frequency = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';

interface RuleOption {
  ruleKey: string;
  label: string;
}

interface BrandOptions {
  brand: { slug: string; name: string };
  options: Record<'bedrooms' | 'bathrooms' | 'sqft' | 'service' | 'addon', RuleOption[]>;
}

interface QuoteResponse {
  ok: boolean;
  quote: {
    lineItems: Array<{ label: string; amount: number; category?: string; ruleKey?: string }>;
    subtotal: number;
    discount?: { label: string; amount: number } | null;
    total: number;
  };
  error?: string;
}

const VA_OPS_URL =
  typeof process !== 'undefined' && typeof process.env !== 'undefined'
    ? process.env.NEXT_PUBLIC_VA_OPS_URL || 'https://maidcrm.com'
    : 'https://maidcrm.com';

const FREQUENCIES: Array<{ id: Frequency; label: string; badge?: string }> = [
  { id: 'one-time', label: 'One time' },
  { id: 'weekly', label: 'Weekly', badge: '10% off' },
  { id: 'bi-weekly', label: 'Bi-weekly', badge: '5% off' },
  { id: 'monthly', label: 'Monthly', badge: '$25 off' },
];

function classNames(...xs: Array<string | false | null | undefined>): string {
  return xs.filter(Boolean).join(' ');
}

function prettyAddon(a: string): string {
  return a
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function QuoteConfirmPage(props: Props) {
  const { brandSlug, businessName, accentColor, btnTextColor } = props;
  const searchParams = useSearchParams();
  const token = searchParams?.get('t') ?? null;
  const prefill = usePrefillFromToken({ brandSlug });

  // Brand options for the edit panel selectors (loaded on first render so
  // the edit-panel pops open instantly when tapped, no spinner).
  const [opts, setOpts] = useState<BrandOptions | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(`${VA_OPS_URL}/api/public/brands/${brandSlug}/options`, {
      cache: 'default',
    })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setOpts(d);
      })
      .catch(() => {
        // page still renders with the prefill-only quote, edit panel
        // shows "loading options" instead of selectors.
      });
    return () => {
      cancelled = true;
    };
  }, [brandSlug]);

  // Scope state (mutable: customer can edit).
  const [service, setService] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sqft, setSqft] = useState('');
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const [frequency, setFrequency] = useState<Frequency>('one-time');

  // Hydrate scope from the prefill payload once it loads.
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current || prefill.status !== 'ready' || !prefill.payload) return;
    hydratedRef.current = true;
    const p = prefill.payload;
    if (p.service) setService(p.service);
    if (p.bedrooms) setBedrooms(p.bedrooms);
    if (p.bathrooms) setBathrooms(p.bathrooms);
    if (p.sqft) setSqft(p.sqft);
    if (Array.isArray(p.addons)) setAddons(new Set(p.addons));
    if (p.frequency === 'one-time' || p.frequency === 'weekly' || p.frequency === 'bi-weekly' || p.frequency === 'monthly') {
      setFrequency(p.frequency);
    }
  }, [prefill.status, prefill.payload]);

  // Live quote recalculation when scope changes.
  const [liveQuote, setLiveQuote] = useState<QuoteResponse['quote'] | null>(null);
  const [recalculating, setRecalculating] = useState(false);
  useEffect(() => {
    if (!service) return;
    setRecalculating(true);
    const controller = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`${VA_OPS_URL}/api/public/quote`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            brandSlug,
            service,
            bedrooms,
            bathrooms,
            sqft,
            addons: Array.from(addons),
            frequency,
          }),
          signal: controller.signal,
        });
        const data = (await res.json()) as QuoteResponse;
        if (data.ok && data.quote) {
          setLiveQuote(data.quote);
        }
      } catch {
        // ignore (typically Abort)
      } finally {
        setRecalculating(false);
      }
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [brandSlug, service, bedrooms, bathrooms, sqft, addons, frequency]);

  // Address
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [zip, setZip] = useState('');

  // Date / time
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState<string>('10:00');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'zelle'>('card');

  // Edit toggle
  const [editingScope, setEditingScope] = useState(false);

  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);

  // Track page view exactly once per session per token.
  useEffect(() => {
    if (!token) return;
    const key = `quote_view_logged_${token}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    void fetch(`${VA_OPS_URL}/api/public/quote-page-view`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token, brandSlug, at: new Date().toISOString() }),
      keepalive: true,
    }).catch(() => {});
  }, [token, brandSlug]);

  // Autosave the form to sessionStorage so a customer who taps away and
  // comes back doesn't lose progress.
  const persistRef = useRef(false);
  useEffect(() => {
    if (!token) return;
    const stored = sessionStorage.getItem(`quote_draft_${token}`);
    if (!stored) {
      persistRef.current = true;
      return;
    }
    try {
      const d = JSON.parse(stored) as Record<string, string>;
      if (d.addressLine1) setAddressLine1(d.addressLine1);
      if (d.addressLine2) setAddressLine2(d.addressLine2);
      if (d.city) setCity(d.city);
      if (d.stateCode) setStateCode(d.stateCode);
      if (d.zip) setZip(d.zip);
      if (d.scheduledDate) setScheduledDate(d.scheduledDate);
      if (d.scheduledTime) setScheduledTime(d.scheduledTime);
      if (d.paymentMethod === 'card' || d.paymentMethod === 'zelle') {
        setPaymentMethod(d.paymentMethod);
      }
    } catch {
      /* ignore */
    }
    persistRef.current = true;
  }, [token]);

  useEffect(() => {
    if (!token || !persistRef.current) return;
    sessionStorage.setItem(
      `quote_draft_${token}`,
      JSON.stringify({
        addressLine1,
        addressLine2,
        city,
        stateCode,
        zip,
        scheduledDate,
        scheduledTime,
        paymentMethod,
      }),
    );
  }, [
    token,
    addressLine1,
    addressLine2,
    city,
    stateCode,
    zip,
    scheduledDate,
    scheduledTime,
    paymentMethod,
  ]);

  const customerName = useMemo(() => {
    const p = prefill.payload?.customer;
    if (!p) return '';
    return [p.firstName, p.lastName].filter(Boolean).join(' ').trim();
  }, [prefill.payload]);

  const dateMin = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().slice(0, 10);
  }, []);
  const dateMax = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 60);
    return t.toISOString().slice(0, 10);
  }, []);

  const displayQuote =
    liveQuote ||
    (prefill.payload?.total
      ? {
          lineItems: [
            {
              label: scopeText({
                service,
                bedrooms,
                bathrooms,
                opts,
              }) || 'Cleaning',
              amount: prefill.payload.total,
            },
          ],
          subtotal: prefill.payload.total,
          total: prefill.payload.total,
          discount: null,
        }
      : null);

  const total = displayQuote?.total ?? prefill.payload?.total ?? 0;

  const canSubmit = !!(
    addressLine1.trim() &&
    city.trim() &&
    zip.trim() &&
    scheduledDate &&
    scheduledTime &&
    paymentMethod &&
    service
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSubmit || !prefill.payload) return;
      setSubmitting(true);
      setSubmitErr(null);
      try {
        const payload = prefill.payload;
        const res = await fetch(`${VA_OPS_URL}/api/public/bookings/create`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            brandSlug,
            service,
            bedrooms,
            bathrooms,
            sqft,
            addons: Array.from(addons),
            frequency,
            scheduledLocalDate: scheduledDate,
            scheduledLocalTime: scheduledTime,
            estimatedMinutes: 120,
            customer: payload.customer || {},
            address: {
              line1: addressLine1.trim(),
              line2: addressLine2.trim() || undefined,
              city: city.trim(),
              state: stateCode.trim().toUpperCase().slice(0, 2),
              zip: zip.trim(),
            },
            paymentMethodKind: paymentMethod,
            quotePrefillToken: token || undefined,
          }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          booking?: { id: string; finalAmount: number; scheduledStartAt: string };
          portalSsoUrl?: string;
          error?: string;
        };
        if (!res.ok || !data.ok || !data.booking) {
          throw new Error(data.error || 'Could not confirm booking');
        }
        sessionStorage.removeItem(`quote_draft_${token}`);
        const redirectTo =
          data.portalSsoUrl ||
          `${VA_OPS_URL}/api/sso?next=${encodeURIComponent(
            `/customer?tab=bookings&booking=${data.booking.id}`,
          )}`;
        window.location.href = redirectTo;
      } catch (err) {
        setSubmitErr(err instanceof Error ? err.message : 'Something went wrong');
        setSubmitting(false);
      }
    },
    [
      canSubmit,
      prefill.payload,
      brandSlug,
      service,
      bedrooms,
      bathrooms,
      sqft,
      addons,
      frequency,
      scheduledDate,
      scheduledTime,
      addressLine1,
      addressLine2,
      city,
      stateCode,
      zip,
      paymentMethod,
      token,
    ],
  );

  // ---------- Loading / error states ----------
  if (!token) {
    return (
      <SimpleMessage
        title="Quote link missing"
        body="This link is missing the quote reference. Please open the link from your text or email."
        accentColor={accentColor}
      />
    );
  }
  if (prefill.status === 'loading' || prefill.status === 'idle') {
    return <LoadingShell accentColor={accentColor} />;
  }
  if (prefill.status === 'invalid' || prefill.status === 'mismatch') {
    return (
      <SimpleMessage
        title="Quote not found"
        body="This quote may have expired or is for a different location. Text or call us and we'll send a fresh one."
        accentColor={accentColor}
        showContact
      />
    );
  }
  if (prefill.status === 'error') {
    return (
      <SimpleMessage
        title="Couldn't load your quote"
        body="Please try the link again in a minute, or contact us directly."
        accentColor={accentColor}
        showContact
      />
    );
  }

  // ---------- Main page ----------
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          'radial-gradient(1400px 700px at 50% -10%, rgba(223, 189, 105, 0.10) 0%, rgba(11, 17, 32, 0) 60%), linear-gradient(180deg, #0b1626 0%, #0a121e 100%)',
      }}
    >
      {/* Brand chrome */}
      <header className="border-b border-white/10 bg-[#0b1626]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Logo size="sm" />
          <div className="flex items-center gap-1.5">
            <a
              href={CONTACT_INFO?.phone?.href}
              className="px-3 py-2 rounded-md text-xs font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
              aria-label="Call us"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">{CONTACT_INFO?.phone?.display}</span>
            </a>
            <a
              href={`sms:${CONTACT_INFO?.phone?.raw}`}
              className="px-3 py-2 rounded-md text-xs font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
              aria-label="Text us"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Text</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 space-y-5">
        {/* Greeting */}
        <div>
          <h1
            className="text-2xl sm:text-3xl font-serif font-semibold text-white leading-tight"
            style={{ fontFamily: 'var(--font-playfair, serif)' }}
          >
            {customerName ? `Hi ${customerName.split(' ')[0]},` : 'Welcome!'} your quote is ready.
          </h1>
          <p className="text-white/65 text-sm mt-2 leading-relaxed">
            Review the details below, then add your address, pick a date,
            and choose how you&apos;d like to pay. We only charge after the
            clean is done.
          </p>
        </div>

        {/* Quote card */}
        <section
          className="rounded-2xl border overflow-hidden"
          style={{
            background: 'rgba(18, 45, 72, 0.55)',
            borderColor: `${accentColor}40`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <div
                  className="text-[10px] uppercase tracking-[0.15em] mb-1.5 font-semibold"
                  style={{ color: accentColor }}
                >
                  Your quote
                </div>
                <div
                  className="text-white text-xl sm:text-2xl leading-tight"
                  style={{ fontFamily: 'var(--font-playfair, serif)' }}
                >
                  {scopeText({ service, bedrooms, bathrooms, opts }) || 'Cleaning service'}
                </div>
                {frequency !== 'one-time' && (
                  <div className="text-white/55 text-xs mt-1 capitalize">
                    {frequency.replace('-', ' ')} recurring
                  </div>
                )}
              </div>
              <div className="shrink-0 text-right">
                <div
                  className="text-3xl sm:text-4xl font-bold leading-none"
                  style={{ color: accentColor }}
                >
                  ${total.toFixed(0)}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/45 mt-1">
                  {recalculating ? 'updating...' : 'total'}
                </div>
              </div>
            </div>

            {/* Line items — ALWAYS visible */}
            <div className="border-t border-white/10 pt-4 space-y-1.5 text-sm">
              {displayQuote?.lineItems.map((li, idx) => (
                <div key={idx} className="flex justify-between text-white/75">
                  <span className="truncate pr-3">{li.label}</span>
                  <span className="text-white/90">${li.amount.toFixed(2)}</span>
                </div>
              ))}
              {displayQuote?.discount && (
                <div className="flex justify-between" style={{ color: accentColor }}>
                  <span>{displayQuote.discount.label}</span>
                  <span>-${displayQuote.discount.amount.toFixed(2)}</span>
                </div>
              )}
              {addons.size > 0 && (
                <div className="pt-2 mt-2 border-t border-white/10">
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1.5">
                    Included add-ons
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(addons).map((a) => (
                      <span
                        key={a}
                        className="text-[11px] px-2 py-0.5 rounded-full text-white/75"
                        style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}35` }}
                      >
                        {prettyAddon(a)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Edit toggle */}
            <button
              type="button"
              onClick={() => setEditingScope((x) => !x)}
              className="mt-4 w-full text-sm font-medium rounded-lg py-2.5 transition-colors border"
              style={{
                background: editingScope ? `${accentColor}20` : 'transparent',
                borderColor: `${accentColor}55`,
                color: accentColor,
              }}
            >
              {editingScope ? 'Done editing' : 'Edit scope (rooms, frequency, add-ons)'}
            </button>
          </div>

          {editingScope && (
            <ScopeEditor
              opts={opts}
              service={service}
              setService={setService}
              bedrooms={bedrooms}
              setBedrooms={setBedrooms}
              bathrooms={bathrooms}
              setBathrooms={setBathrooms}
              sqft={sqft}
              setSqft={setSqft}
              addons={addons}
              setAddons={setAddons}
              frequency={frequency}
              setFrequency={setFrequency}
              accentColor={accentColor}
            />
          )}
        </section>

        {/* Confirmation form */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border p-5 sm:p-6 space-y-5"
          style={{
            background: 'rgba(18, 45, 72, 0.55)',
            borderColor: 'rgba(255,255,255,0.10)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div>
            <h2
              className="text-white text-lg sm:text-xl font-semibold"
              style={{ fontFamily: 'var(--font-playfair, serif)' }}
            >
              Confirm your booking
            </h2>
            <p className="text-white/55 text-xs mt-1">
              Address, date, and how you&apos;d like to pay.
            </p>
          </div>

          <FieldGroup label="Service address">
            <AddressAutocomplete
              value={addressLine1}
              onSelect={({ line1, city: c, state: s, zip: z }) => {
                setAddressLine1(line1);
                setCity(c);
                setStateCode(s);
                setZip(z);
              }}
              onTextChange={setAddressLine1}
              placeholder="Street address"
              accentColor={accentColor}
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Input
                value={city}
                onChange={setCity}
                placeholder="City"
                accentColor={accentColor}
              />
              <Input
                value={stateCode}
                onChange={(v) => setStateCode(v.toUpperCase().slice(0, 2))}
                placeholder="ST"
                accentColor={accentColor}
              />
              <Input
                value={zip}
                onChange={(v) => setZip(v.replace(/\D/g, '').slice(0, 5))}
                placeholder="ZIP"
                accentColor={accentColor}
                inputMode="numeric"
              />
            </div>
            <Input
              value={addressLine2}
              onChange={setAddressLine2}
              placeholder="Apt / unit (optional)"
              accentColor={accentColor}
              className="mt-2"
            />
          </FieldGroup>

          <FieldGroup label="Date and time">
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                value={scheduledDate}
                onChange={setScheduledDate}
                accentColor={accentColor}
                min={dateMin}
                max={dateMax}
              />
              <Input
                type="time"
                value={scheduledTime}
                onChange={setScheduledTime}
                accentColor={accentColor}
              />
            </div>
            <p className="text-white/45 text-[11px] mt-1.5">
              We&apos;ll confirm the exact arrival window after assigning a cleaner.
            </p>
          </FieldGroup>

          <FieldGroup label="Payment method">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <RadioCard
                selected={paymentMethod === 'card'}
                onClick={() => setPaymentMethod('card')}
                accentColor={accentColor}
                btnTextColor={btnTextColor}
                title="Card on file"
                sub="We text a secure link to add it. Charged after the clean."
              />
              <RadioCard
                selected={paymentMethod === 'zelle'}
                onClick={() => setPaymentMethod('zelle')}
                accentColor={accentColor}
                btnTextColor={btnTextColor}
                title="Zelle"
                sub="We text the handle + reference after the clean."
              />
            </div>
          </FieldGroup>

          {submitErr && (
            <div className="bg-red-500/15 border border-red-400/30 text-red-200 text-sm rounded-lg p-3">
              {submitErr}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="w-full px-6 py-3.5 rounded-lg text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            style={{
              background: accentColor,
              color: btnTextColor,
              boxShadow: canSubmit && !submitting ? `0 8px 24px ${accentColor}40` : 'none',
            }}
          >
            {submitting ? 'Confirming...' : `Confirm booking \u2014 $${total.toFixed(0)}`}
          </button>

          <p className="text-center text-white/40 text-[11px]">
            By confirming, you agree to our{' '}
            <a href="/terms" className="underline hover:text-white/60">terms</a>.
            We&apos;ll text and email a receipt after the cleaning is done.
          </p>
        </form>

        {/* Help row */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <a
            href={CONTACT_INFO?.phone?.href}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white/85 border transition-colors hover:bg-white/5"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          >
            Call {CONTACT_INFO?.phone?.display}
          </a>
          <a
            href={`sms:${CONTACT_INFO?.phone?.raw}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white/85 border transition-colors hover:bg-white/5"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          >
            Text us a question
          </a>
        </div>
      </div>
    </main>
  );
}

// ---------- ScopeEditor ----------

function ScopeEditor(props: {
  opts: BrandOptions | null;
  service: string;
  setService: (v: string) => void;
  bedrooms: string;
  setBedrooms: (v: string) => void;
  bathrooms: string;
  setBathrooms: (v: string) => void;
  sqft: string;
  setSqft: (v: string) => void;
  addons: Set<string>;
  setAddons: (v: Set<string>) => void;
  frequency: Frequency;
  setFrequency: (v: Frequency) => void;
  accentColor: string;
}) {
  const {
    opts,
    service,
    setService,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    sqft,
    setSqft,
    addons,
    setAddons,
    frequency,
    setFrequency,
    accentColor,
  } = props;

  if (!opts) {
    return (
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 border-t border-white/10 pt-4">
        <div className="text-white/45 text-sm">Loading scope options...</div>
      </div>
    );
  }

  const toggleAddon = (key: string) => {
    const next = new Set(addons);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setAddons(next);
  };

  return (
    <div className="px-5 pb-5 sm:px-6 sm:pb-6 border-t border-white/10 pt-4 space-y-4 bg-black/15">
      {/* Service */}
      {opts.options.service.length > 1 && (
        <div>
          <Label>Service type</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {opts.options.service.map((s) => (
              <Pill
                key={s.ruleKey}
                selected={service === s.ruleKey}
                onClick={() => setService(s.ruleKey)}
                accentColor={accentColor}
              >
                {s.label}
              </Pill>
            ))}
          </div>
        </div>
      )}

      {/* Beds + baths */}
      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="Bedrooms"
          value={bedrooms}
          onChange={setBedrooms}
          options={opts.options.bedrooms}
          accentColor={accentColor}
        />
        <SelectField
          label="Bathrooms"
          value={bathrooms}
          onChange={setBathrooms}
          options={opts.options.bathrooms}
          accentColor={accentColor}
        />
      </div>

      {opts.options.sqft.length > 0 && (
        <SelectField
          label="Square footage (optional)"
          value={sqft}
          onChange={setSqft}
          options={opts.options.sqft}
          accentColor={accentColor}
        />
      )}

      {/* Frequency */}
      <div>
        <Label>Frequency</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FREQUENCIES.map((f) => (
            <Pill
              key={f.id}
              selected={frequency === f.id}
              onClick={() => setFrequency(f.id)}
              accentColor={accentColor}
              subText={f.badge}
            >
              {f.label}
            </Pill>
          ))}
        </div>
      </div>

      {/* Addons */}
      {opts.options.addon.length > 0 && (
        <div>
          <Label>Add-ons</Label>
          <div className="grid grid-cols-2 gap-2">
            {opts.options.addon.map((a) => (
              <Pill
                key={a.ruleKey}
                selected={addons.has(a.ruleKey)}
                onClick={() => toggleAddon(a.ruleKey)}
                accentColor={accentColor}
              >
                {a.label}
              </Pill>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-wider text-white/45 mb-1.5 font-medium">
      {children}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  accentColor,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: RuleOption[];
  accentColor: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm outline-none cursor-pointer transition-colors"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = accentColor;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        }}
      >
        <option value="" className="bg-[#0b1626]">Select...</option>
        {options.map((o) => (
          <option key={o.ruleKey} value={o.ruleKey} className="bg-[#0b1626]">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Pill({
  selected,
  onClick,
  accentColor,
  children,
  subText,
}: {
  selected: boolean;
  onClick: () => void;
  accentColor: string;
  children: React.ReactNode;
  subText?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-all',
        selected ? '' : 'hover:bg-white/5',
      )}
      style={{
        background: selected ? `${accentColor}22` : 'rgba(255,255,255,0.03)',
        borderColor: selected ? accentColor : 'rgba(255,255,255,0.15)',
        color: selected ? '#fff' : 'rgba(255,255,255,0.75)',
      }}
    >
      <span>{children}</span>
      {subText && (
        <span
          className="block text-[10px] mt-0.5"
          style={{ color: selected ? accentColor : 'rgba(255,255,255,0.45)' }}
        >
          {subText}
        </span>
      )}
    </button>
  );
}

// ---------- atoms ----------

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-white/75 text-sm font-medium mb-2">{label}</div>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  inputMode,
  accentColor,
  className,
  min,
  max,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email';
  accentColor: string;
  className?: string;
  min?: string;
  max?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      inputMode={inputMode}
      min={min}
      max={max}
      className={classNames(
        'w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white placeholder-white/35 text-sm outline-none transition-colors',
        className,
      )}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = accentColor;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
      }}
    />
  );
}

function RadioCard({
  selected,
  onClick,
  accentColor,
  btnTextColor,
  title,
  sub,
}: {
  selected: boolean;
  onClick: () => void;
  accentColor: string;
  btnTextColor: string;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'text-left rounded-lg px-3 py-3 border transition-all',
        selected ? '' : 'hover:bg-white/5',
      )}
      style={{
        background: selected ? `${accentColor}22` : 'rgba(255,255,255,0.03)',
        borderColor: selected ? accentColor : 'rgba(255,255,255,0.15)',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
          style={{
            borderColor: selected ? accentColor : 'rgba(255,255,255,0.4)',
            background: selected ? accentColor : 'transparent',
          }}
        >
          {selected && (
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: btnTextColor }}
            />
          )}
        </div>
        <span className="text-white font-medium text-sm">{title}</span>
      </div>
      <div className="text-white/55 text-xs pl-6">{sub}</div>
    </button>
  );
}

function SimpleMessage({
  title,
  body,
  accentColor,
  showContact,
}: {
  title: string;
  body: string;
  accentColor: string;
  showContact?: boolean;
}) {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(180deg, #0b1626 0%, #0a121e 100%)' }}
    >
      <div className="max-w-md w-full text-center">
        <h1
          className="text-2xl font-serif font-semibold text-white mb-3"
          style={{ fontFamily: 'var(--font-playfair, serif)' }}
        >
          {title}
        </h1>
        <p className="text-white/70 leading-relaxed">{body}</p>
        {showContact && CONTACT_INFO?.phone?.href && (
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <a
              href={CONTACT_INFO.phone.href}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white border border-white/15"
            >
              Call {CONTACT_INFO.phone.display}
            </a>
            <a
              href={`sms:${CONTACT_INFO.phone.raw}`}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium"
              style={{ background: accentColor, color: '#122d48' }}
            >
              Text us
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

function LoadingShell({ accentColor }: { accentColor: string }) {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(180deg, #0b1626 0%, #0a121e 100%)' }}
    >
      <div className="text-center">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3"
          style={{ borderColor: accentColor, borderTopColor: 'transparent' }}
        />
        <p className="text-white/60 text-sm">Loading your quote...</p>
      </div>
    </main>
  );
}

// ---------- helpers ----------

function scopeText(args: {
  service?: string;
  bedrooms?: string;
  bathrooms?: string;
  opts?: BrandOptions | null;
}): string {
  const { service, bedrooms, bathrooms, opts } = args;
  const parts: string[] = [];
  if (service) {
    const svcLabel = opts?.options.service.find((s) => s.ruleKey === service)?.label;
    parts.push(svcLabel || prettyService(service));
  }
  const room: string[] = [];
  if (bedrooms) {
    const bedLabel = opts?.options.bedrooms.find((s) => s.ruleKey === bedrooms)?.label;
    room.push(bedLabel || `${bedrooms} bed`);
  }
  if (bathrooms) {
    const bathLabel = opts?.options.bathrooms.find((s) => s.ruleKey === bathrooms)?.label;
    room.push(bathLabel || `${bathrooms} bath`);
  }
  if (room.length) parts.push(`for your ${room.join(', ')}`);
  return parts.join(' ');
}

function prettyService(s: string): string {
  const lc = s.toLowerCase().replace(/_/g, ' ');
  if (lc.includes('move')) return 'Move-out clean';
  if (lc.includes('deep')) return 'Deep clean';
  if (lc.includes('post') && lc.includes('construct')) return 'Post-construction clean';
  return 'Standard clean';
}

// ---------- address autocomplete ----------

function loadGoogleMaps(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (
    (window as unknown as { google?: { maps?: { places?: unknown } } })?.google
      ?.maps?.places
  ) {
    return Promise.resolve(true);
  }
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return Promise.resolve(false);
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&v=weekly`;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
}

interface ParsedAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
}

function AddressAutocomplete({
  value,
  onSelect,
  onTextChange,
  placeholder,
  accentColor,
}: {
  value: string;
  onSelect: (addr: ParsedAddress) => void;
  onTextChange: (v: string) => void;
  placeholder?: string;
  accentColor: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let ac: { addListener?: (e: string, fn: () => void) => void; getPlace?: () => unknown } | null = null;
    loadGoogleMaps().then((ok) => {
      if (!ok || !inputRef.current) return;
      const w = window as unknown as {
        google: {
          maps: {
            places: {
              Autocomplete: new (
                el: HTMLInputElement,
                opts: { types: string[]; componentRestrictions: { country: string[] }; fields: string[] },
              ) => typeof ac;
            };
          };
        };
      };
      ac = new w.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: ['us'] },
        fields: ['address_components', 'formatted_address'],
      });
      ac?.addListener?.('place_changed', () => {
        const place = ac?.getPlace?.() as
          | { address_components?: Array<{ long_name: string; short_name: string; types: string[] }> }
          | undefined;
        const parts = place?.address_components || [];
        const get = (...types: string[]) =>
          parts.find((p) => types.some((t) => p.types.includes(t)));
        const num = get('street_number')?.long_name || '';
        const route = get('route')?.long_name || '';
        const city =
          get('locality')?.long_name ||
          get('sublocality')?.long_name ||
          get('postal_town')?.long_name ||
          '';
        const stateShort = get('administrative_area_level_1')?.short_name || '';
        const zip = get('postal_code')?.long_name || '';
        const line1 = [num, route].filter(Boolean).join(' ').trim();
        onSelect({
          line1: line1 || (place?.address_components?.[0]?.long_name ?? value),
          city,
          state: stateShort,
          zip,
        });
      });
    });
  }, [onSelect, value]);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onTextChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="off"
      className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white placeholder-white/35 text-sm outline-none transition-colors"
      onFocus={(e) => {
        e.currentTarget.style.borderColor = accentColor;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
      }}
    />
  );
}
