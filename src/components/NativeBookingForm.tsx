'use client';

/**
 * NativeBookingForm
 *
 * Customer-facing booking form that replaces the BookingKoala embed.
 * Talks directly to the CRM's public API (/api/public/*).
 *
 * Props:
 *   brandSlug     - CRM brand slug (e.g. "brooklyn", "bayside"). Must match brands.slug.
 *   businessName  - Display name (for header + success message).
 *   accentColor   - Brand accent color (hex).
 *   btnTextColor  - Button text color contrasting accent.
 *
 * Server contract:
 *   GET  {VA_OPS}/api/public/brands/:slug/options  -> { brand, options, inclusions }
 *   POST {VA_OPS}/api/public/quote                -> { quote: { lineItems, subtotal, discount, total } }
 *   POST {VA_OPS}/api/public/bookings/create      -> { booking, customer, quote, message }
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ADDONS } from '@/lib/constants/addons';
import { CONTACT_INFO } from '@/lib/contact';
import { usePrefillFromToken } from '@/lib/usePrefillFromToken';

const VA_OPS_URL =
  process.env.NEXT_PUBLIC_VA_OPS_URL || 'https://assistant-ashy-five.vercel.app';

type RuleOption = { ruleKey: string; label: string; cents: number };
type BrandOptions = {
  brand: { slug: string; name: string; phone: string | null };
  options: Record<'bedrooms' | 'bathrooms' | 'sqft' | 'service' | 'addon', RuleOption[]>;
  inclusions: Record<string, string[]>;
};

type QuoteResponse = {
  ok: boolean;
  quote: {
    lineItems: Array<{ category: string; ruleKey: string; label: string; amount: number }>;
    subtotal: number;
    discount: { label: string; amount: number } | null;
    total: number;
    includedFreeWithService: { service: string; addons: string[] } | null;
  };
  error?: string;
};

type Frequency = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';

const FREQUENCIES: Array<{ id: Frequency; label: string; badge?: string; popular?: boolean }> = [
  { id: 'one-time', label: 'One Time' },
  { id: 'weekly', label: 'Weekly', badge: '10% OFF' },
  { id: 'bi-weekly', label: 'Bi-Weekly', badge: '5% OFF' },
  { id: 'monthly', label: 'Monthly', badge: '$25 OFF', popular: true },
];

const ENTRY_METHODS = [
  { id: 'home', label: "I'll be home" },
  { id: 'lockbox', label: 'Lockbox / key code' },
  { id: 'hidden_key', label: 'Hidden key' },
  { id: 'doorman', label: 'Doorman / concierge' },
  { id: 'other', label: 'Other (note below)' },
];

interface Props {
  brandSlug: string;
  businessName: string;
  accentColor?: string;
  btnTextColor?: string;
}

export default function NativeBookingForm({
  brandSlug,
  businessName,
  accentColor = '#dfbd69',
  btnTextColor = '#000',
}: Props) {
  const [opts, setOpts] = useState<BrandOptions | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  const [service, setService] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sqft, setSqft] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [frequency, setFrequency] = useState<Frequency>('one-time');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('10:00');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [usState, setUsState] = useState('');
  const [zip, setZip] = useState('');

  const [entryMethod, setEntryMethod] = useState('home');
  const [specialNotes, setSpecialNotes] = useState('');
  const [botField, setBotField] = useState('');

  const [promoCode, setPromoCode] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'zelle'>('card');

  const [quote, setQuote] = useState<QuoteResponse['quote'] | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteErr, setQuoteErr] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    bookingId: string;
    scheduledStartAt: string;
    total: number;
    paymentMethodKind: 'card' | 'zelle';
  } | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // The va-ops endpoint sets s-maxage=300 on the CDN, so most visits
        // hit the edge in ~30-50ms. We use 'default' (respect HTTP headers)
        // instead of 'force-cache' so a backend update is picked up within
        // 5 minutes without users having to hard-refresh. The CDN does the
        // heavy lifting either way.
        const res = await fetch(`${VA_OPS_URL}/api/public/brands/${brandSlug}/options`, {
          cache: 'default',
        });
        const data = await res.json();
        if (!alive) return;
        if (!res.ok) {
          setLoadErr(data.error || 'Unable to load booking options');
          return;
        }
        setOpts(data);
        if (data.options?.service?.length) setService(data.options.service[0].ruleKey);
        if (data.options?.bedrooms?.length) setBedrooms(data.options.bedrooms[0].ruleKey);
        if (data.options?.bathrooms?.length) setBathrooms(data.options.bathrooms[0].ruleKey);
        if (data.options?.sqft?.length) setSqft(data.options.sqft[0].ruleKey);
      } catch (e) {
        if (!alive) return;
        setLoadErr(e instanceof Error ? e.message : 'Network error');
      }
    })();
    return () => {
      alive = false;
    };
  }, [brandSlug]);

  // Quote-prefill hydration: shared hook reads `?t=` from the URL, hits
  // the CRM, validates brandSlug match, returns normalized payload.
  // Field-by-field application gated on `opts` so we validate ruleKeys
  // against live brand options before applying.
  const prefillHydratedRef = useRef(false);
  const prefill = usePrefillFromToken({ brandSlug });
  useEffect(() => {
    if (!opts || !prefill.payload || prefillHydratedRef.current) return;
    prefillHydratedRef.current = true;
    const p = prefill.payload;
    if (p.service && opts.options.service.some((o) => o.ruleKey === p.service)) {
      setService(p.service);
    }
    if (p.bedrooms && opts.options.bedrooms.some((o) => o.ruleKey === p.bedrooms)) {
      setBedrooms(p.bedrooms);
    }
    if (p.bathrooms && opts.options.bathrooms.some((o) => o.ruleKey === p.bathrooms)) {
      setBathrooms(p.bathrooms);
    }
    if (p.sqft && opts.options.sqft.some((o) => o.ruleKey === p.sqft)) {
      setSqft(p.sqft);
    }
    if (Array.isArray(p.addons) && p.addons.length) {
      const allowed = new Set(opts.options.addon.map((o) => o.ruleKey));
      const next = new Set<string>();
      for (const a of p.addons) {
        if (allowed.has(a)) next.add(a);
      }
      if (next.size) setSelectedAddons(next);
    }
    if (p.frequency) setFrequency(p.frequency);
    if (p.zip) setZip(p.zip);
    if (p.customer) {
      if (p.customer.firstName) setFirstName(p.customer.firstName);
      if (p.customer.lastName) setLastName(p.customer.lastName);
      if (p.customer.phone) setPhone(p.customer.phone);
      if (p.customer.email) setEmail(p.customer.email);
    }
  }, [opts, prefill.payload]);

  const includedAddons = useMemo(() => {
    if (!opts || !service) return new Set<string>();
    const arr = opts.inclusions?.[service] || [];
    return new Set(arr);
  }, [opts, service]);

  const visibleAddons = useMemo(() => {
    if (!opts) return [];
    const keys = new Set(opts.options.addon.map((o) => o.ruleKey));
    return ADDONS.filter((a) => keys.has(a.key));
  }, [opts]);

  const serviceLabel = useMemo(() => {
    if (!opts || !service) return '';
    return opts.options.service.find((s) => s.ruleKey === service)?.label || service;
  }, [opts, service]);

  const includedFreeLabels = useMemo(() => {
    return Array.from(includedAddons)
      .map((key) => ADDONS.find((a) => a.key === key)?.label || key)
      .sort((a, b) => a.localeCompare(b));
  }, [includedAddons]);

  const bedroomsLabel = useMemo(
    () => opts?.options.bedrooms.find((o) => o.ruleKey === bedrooms)?.label || '\u2014',
    [opts, bedrooms]
  );
  const bathroomsLabel = useMemo(
    () => opts?.options.bathrooms.find((o) => o.ruleKey === bathrooms)?.label || '\u2014',
    [opts, bathrooms]
  );
  const sqftLabel = useMemo(
    () => opts?.options.sqft.find((o) => o.ruleKey === sqft)?.label || '',
    [opts, sqft]
  );
  const frequencyLabel = useMemo(
    () => FREQUENCIES.find((f) => f.id === frequency)?.label || '\u2014',
    [frequency]
  );

  const toggleAddon = (key: string) => {
    if (includedAddons.has(key)) return;
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const refreshQuote = useCallback(async () => {
    if (!service || !bedrooms || !bathrooms) {
      setQuote(null);
      return;
    }
    abortRef.current?.abort();
    const ctl = new AbortController();
    abortRef.current = ctl;
    setQuoteLoading(true);
    setQuoteErr(null);
    try {
      const res = await fetch(`${VA_OPS_URL}/api/public/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctl.signal,
        body: JSON.stringify({
          brandSlug,
          service,
          bedrooms,
          bathrooms,
          sqft: sqft || undefined,
          addons: Array.from(selectedAddons),
          frequency,
        }),
      });
      const data = (await res.json()) as QuoteResponse;
      if (ctl.signal.aborted) return;
      if (!res.ok || !data.ok) {
        setQuoteErr(data.error || 'Could not calculate a quote');
        setQuote(null);
      } else {
        setQuote(data.quote);
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        setQuoteErr(e instanceof Error ? e.message : 'Network error');
      }
    } finally {
      if (!ctl.signal.aborted) setQuoteLoading(false);
    }
  }, [brandSlug, service, bedrooms, bathrooms, sqft, selectedAddons, frequency]);

  useEffect(() => {
    const t = setTimeout(refreshQuote, 250);
    return () => clearTimeout(t);
  }, [refreshQuote]);

  const formValid =
    !!service &&
    !!bedrooms &&
    !!bathrooms &&
    !!scheduledDate &&
    !!scheduledTime &&
    firstName.trim().length > 1 &&
    lastName.trim().length > 1 &&
    (phone.replace(/\D/g, '').length >= 10 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) &&
    line1.trim().length > 3 &&
    city.trim().length > 1 &&
    usState.trim().length >= 2 &&
    /^\d{5}$/.test(zip.trim());

  const submit = async () => {
    if (!formValid || submitting) return;
    setSubmitting(true);
    setSubmitErr(null);
    try {
      const scheduledStartAt = new Date(`${scheduledDate}T${scheduledTime}:00`).toISOString();
      const res = await fetch(`${VA_OPS_URL}/api/public/bookings/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandSlug,
          service,
          bedrooms,
          bathrooms,
          sqft: sqft || undefined,
          addons: Array.from(selectedAddons),
          frequency,
          scheduledStartAt,
          customer: { firstName, lastName, phone, email },
          address: { line1, line2, city, state: usState, zip },
          entryMethod,
          specialNotes,
          promoCode: promoCode.trim() || undefined,
          paymentMethodKind: paymentMethod,
          // If the customer arrived via a `?t=<prefill-token>` URL, forward
          // the token so the CRM can attribute the booking back to the lead
          // / Quo conversation that minted it. Undefined when no token.
          quotePrefillToken: prefill.token || undefined,
          botField,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Booking failed');
      }
      setSuccessData({
        bookingId: data.booking.id,
        scheduledStartAt: data.booking.scheduledStartAt,
        total: data.booking.finalAmount,
        paymentMethodKind: paymentMethod,
      });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      setSubmitErr(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-48 pb-20">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-10 text-center">
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={btnTextColor} strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">You&apos;re booked.</h1>
          <p className="text-white/70 mb-6">
            {businessName} received your booking. We&apos;ll text you shortly to confirm your cleaner and finalize the details.
          </p>
          <div className="text-left bg-black/30 rounded-lg p-4 mb-6 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-white/60">Confirmation</span>
              <span className="text-white font-mono">{successData.bookingId.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Date</span>
              <span className="text-white">{new Date(successData.scheduledStartAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Total</span>
              <span className="text-white font-semibold">${successData.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Payment</span>
              <span className="text-white">
                {successData.paymentMethodKind === 'zelle' ? 'Zelle (after service)' : 'Card on file'}
              </span>
            </div>
          </div>
          <div className="text-xs text-[#dfbd69] bg-[#dfbd69]/10 border border-[#dfbd69]/30 rounded-lg p-3 text-left">
            {successData.paymentMethodKind === 'zelle' ? (
              <>
                <strong>Next step:</strong> we&apos;ll text you the Zelle email/phone and a unique
                reference number after the cleaner finishes. Add the reference to the memo so we
                can match the payment to your booking automatically.
              </>
            ) : (
              <>
                <strong>Next step:</strong> we&apos;ll text you a secure link to add a card on file.
                Your card stays uncharged until the cleaner finishes the job.
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loadErr) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-48 pb-20 text-center">
        <p className="text-red-300 mb-4">{loadErr}</p>
        <p className="text-white/60 text-sm">
          Please call or text us and we&apos;ll book you over the phone.
        </p>
      </div>
    );
  }

  if (!opts) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-48 pb-20 text-center">
        <div className="animate-pulse text-white/60">Loading booking options...</div>
      </div>
    );
  }

  // Background helper for inputs/selects/textareas — matches QuoteForm.tsx
  const inputBg = 'rgba(26, 55, 85, 0.5)';
  const inputClass =
    'w-full p-3 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69]';

  return (
    <div className="w-full max-w-full sm:container mx-auto px-4 pt-48 pb-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl border border-white/10 space-y-6" style={{ background: inputBg }}>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              Book your cleaning with {businessName}
            </h1>
            <p className="text-white/80 mb-2">
              Tell us what you need. Pay after the service is done.
            </p>
          </div>
          <Section title="1. Choose your service">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {opts.options.service.map((s) => (
                <TileButton
                  key={s.ruleKey}
                  selected={service === s.ruleKey}
                  onClick={() => setService(s.ruleKey)}
                  accent={accentColor}
                  label={s.label}
                  sublabel={null}
                />
              ))}
            </div>
          </Section>

          <Section title="2. Property size">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Bedrooms"
                value={bedrooms}
                onChange={setBedrooms}
                options={opts.options.bedrooms}
                inputBg={inputBg}
              />
              <Select
                label="Bathrooms"
                value={bathrooms}
                onChange={setBathrooms}
                options={opts.options.bathrooms}
                inputBg={inputBg}
              />
              {opts.options.sqft.length > 0 && (
                <div className="col-span-2">
                  <Select
                    label="Square footage"
                    value={sqft}
                    onChange={setSqft}
                    options={opts.options.sqft}
                    inputBg={inputBg}
                  />
                </div>
              )}
            </div>
          </Section>

          <Section title="3. How often do you need cleaning?">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FREQUENCIES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFrequency(f.id)}
                  className={`relative ${
                    frequency === f.id
                      ? 'ring-2 ring-[#dfbd69] bg-white/40 border border-white'
                      : 'ring-1 ring-white/30 hover:ring-2 hover:ring-[#dfbd69]/50 bg-white/10'
                  } rounded-lg p-4 text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
                >
                  {f.popular && (
                    <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#dfbd69] text-[#283845] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      MOST POPULAR
                    </span>
                  )}
                  <span className="text-sm font-semibold text-white block">{f.label}</span>
                  {f.badge && (
                    <span className="text-[10px] text-white/70 block mt-0.5">{f.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </Section>

          {visibleAddons.length > 0 && (
            <Section title="4. Add Extra Services (Optional)">
              <div className="space-y-3">
                {/* Service-type-aware callout: tells the customer what's already included */}
                {includedAddons.size > 0 && (
                  <div className="text-xs text-[#dfbd69] bg-[#dfbd69]/10 border border-[#dfbd69]/30 rounded-lg p-3">
                    <strong>{serviceLabel}:</strong>{' '}
                    Includes {includedFreeLabels.join(', ')} at no extra charge.
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {visibleAddons
                    .filter((a) => !includedAddons.has(a.key))
                    .map((a) => {
                      const isSelected = selectedAddons.has(a.key);
                      return (
                        <button
                          key={a.key}
                          type="button"
                          onClick={() => toggleAddon(a.key)}
                          className={`relative cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-[#dfbd69] bg-white/40'
                              : 'ring-1 ring-white/20 bg-white/10 hover:ring-2 hover:ring-[#dfbd69]/50'
                          } rounded-lg p-3 text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
                        >
                          <div className="flex flex-col gap-2">
                            <div className="w-8 h-8 mx-auto">
                              <Image
                                src={`/icons/addons/${a.icon}`}
                                alt={a.label}
                                width={32}
                                height={32}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="text-xs font-medium text-white">{a.label}</div>
                            <div className="text-[10px] text-white/70">{a.description}</div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            </Section>
          )}

          <Section title="5. When would you like us?">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Date*</label>
                <input
                  type="date"
                  value={scheduledDate}
                  min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className={inputClass}
                  style={{ background: inputBg, colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Time*</label>
                <input
                  type="time"
                  value={scheduledTime}
                  step={1800}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className={inputClass}
                  style={{ background: inputBg, colorScheme: 'dark' }}
                />
              </div>
            </div>
            <p className="text-xs text-white/60 mt-2">
              We&apos;ll confirm the exact window after matching you with a cleaner.
            </p>
          </Section>

          <Section title="6. Your contact info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField label="First name" value={firstName} onChange={setFirstName} inputClass={inputClass} inputBg={inputBg} placeholder="ex. Jane" />
              <TextField label="Last name" value={lastName} onChange={setLastName} inputClass={inputClass} inputBg={inputBg} placeholder="ex. Smith" />
              <TextField label="Email" value={email} onChange={setEmail} type="email" inputClass={inputClass} inputBg={inputBg} placeholder="email@example.com" />
              <TextField label="Phone" value={phone} onChange={setPhone} type="tel" inputClass={inputClass} inputBg={inputBg} placeholder="(555) 123-4567" />
            </div>
          </Section>

          <Section title="7. Service address">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <TextField label="Street address" value={line1} onChange={setLine1} inputClass={inputClass} inputBg={inputBg} />
              </div>
              <TextField label="Apt / Unit (optional)" value={line2} onChange={setLine2} required={false} inputClass={inputClass} inputBg={inputBg} />
              <TextField label="City" value={city} onChange={setCity} inputClass={inputClass} inputBg={inputBg} />
              <TextField label="State" value={usState} onChange={setUsState} inputClass={inputClass} inputBg={inputBg} />
              <TextField label="Zip" value={zip} onChange={setZip} inputClass={inputClass} inputBg={inputBg} />
            </div>
          </Section>

          <Section title="8. How do we get in?">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
              {ENTRY_METHODS.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setEntryMethod(e.id)}
                  className={`relative ${
                    entryMethod === e.id
                      ? 'ring-2 ring-[#dfbd69] bg-white/40'
                      : 'ring-1 ring-white/30 hover:ring-2 hover:ring-[#dfbd69]/50 bg-white/10'
                  } rounded-lg p-3 text-xs text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
                >
                  <span className="text-white font-medium">{e.label}</span>
                </button>
              ))}
            </div>
            <textarea
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Anything else we should know? (pets, parking, problem areas...)"
              rows={3}
              className={inputClass}
              style={{ background: inputBg, colorScheme: 'dark' }}
            />
          </Section>

          <Section title="9. Promo code (optional)">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase().slice(0, 32))}
              placeholder="Enter promo code if you have one"
              className={inputClass}
              style={{ background: inputBg, colorScheme: 'dark' }}
              maxLength={32}
            />
            {promoCode.trim() && (
              <p className="text-[11px] text-white/60 mt-2">
                We&apos;ll verify this code and apply any discount before charging your card. If it&apos;s invalid we&apos;ll let you know.
              </p>
            )}
          </Section>

          <Section title="10. Payment method">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`relative ${
                  paymentMethod === 'card'
                    ? 'ring-2 ring-[#dfbd69] bg-white/40'
                    : 'ring-1 ring-white/30 hover:ring-2 hover:ring-[#dfbd69]/50 bg-white/10'
                } rounded-lg p-4 text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
              >
                <span className="text-sm font-semibold text-white block">Credit / Debit Card</span>
                <span className="text-[10px] text-white/70">Charged after service</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('zelle')}
                className={`relative ${
                  paymentMethod === 'zelle'
                    ? 'ring-2 ring-[#dfbd69] bg-white/40'
                    : 'ring-1 ring-white/30 hover:ring-2 hover:ring-[#dfbd69]/50 bg-white/10'
                } rounded-lg p-4 text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
              >
                <span className="text-sm font-semibold text-white block">Zelle</span>
                <span className="text-[10px] text-white/70">Send after service</span>
              </button>
            </div>
            <div className="text-xs text-[#dfbd69] bg-[#dfbd69]/10 border border-[#dfbd69]/30 rounded-lg p-3">
              {paymentMethod === 'card' ? (
                <>
                  <strong>No charge today.</strong> After you book, we&apos;ll text you a secure link
                  to add a card on file. Your card is only charged after the cleaner finishes the job.
                </>
              ) : (
                <>
                  <strong>Pay by Zelle.</strong> After service, we&apos;ll text you the Zelle
                  details with a unique reference number to include in the memo.
                </>
              )}
            </div>
          </Section>

          {/* Bottom-of-form Book button — customers on mobile or anyone who
              scrolls the form don't always realize the submit lives inside
              the sticky sidebar summary. This duplicates the submit at the
              natural reading end of the form. Same handler, same disabled
              logic, same error state. */}
          <div className="pt-2 space-y-3">
            {submitErr && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm rounded-lg p-3">
                {submitErr}
              </div>
            )}
            <button
              type="button"
              onClick={submit}
              disabled={!formValid || submitting || !quote}
              className="button-quaternary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? 'Booking\u2026'
                : quote
                  ? `Book my cleaning \u2013 $${quote.total.toFixed(2)}`
                  : 'Book my cleaning'}
            </button>
            <p className="text-[11px] text-white/60 text-center">
              No charge now. We&apos;ll text you to confirm before your appointment.
            </p>
          </div>

          <input
            type="text"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-5000px' }}
          />

          <div className="text-center pt-4 border-t border-white/10">
            <div className="flex items-center justify-center space-x-2 text-sm text-white/80">
              <div className="flex text-[#dfbd69]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>4.9 (171 Reviews)</span>
              <span className="text-white/40">|</span>
              <span>171 Happy Customers</span>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-4 self-start space-y-6">
          {/* Booking summary card - mirrors QuoteForm's "Quote Summary" structure */}
          <div className="backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl border border-white/10 space-y-5" style={{ background: inputBg }}>
            <h3 className="text-xl font-serif font-semibold text-white">Booking summary</h3>

            <div className="space-y-3 text-sm">
              {(firstName || lastName) && (
                <div>
                  <span className="text-white font-semibold">Name:</span>
                  <p className="text-white/80">{firstName} {lastName}</p>
                </div>
              )}
              <div>
                <span className="text-white font-semibold">Property:</span>
                <p className="text-white/80">
                  {bedroomsLabel}, {bathroomsLabel}
                  {sqftLabel && <>, {sqftLabel}</>}
                </p>
              </div>
              <div>
                <span className="text-white font-semibold">Service:</span>
                <p className="text-white/80">{serviceLabel || '\u2014'}</p>
              </div>
              <div>
                <span className="text-white font-semibold">Frequency:</span>
                <p className="text-white/80">{frequencyLabel}</p>
              </div>
              <div>
                <span className="text-white font-semibold">Add-ons:</span>
                {selectedAddons.size === 0 && includedAddons.size === 0 ? (
                  <p className="text-white/80">None selected</p>
                ) : (
                  <ul className="list-disc list-inside text-white/80 mt-1">
                    {Array.from(selectedAddons)
                      .map((key) => ADDONS.find((a) => a.key === key)?.label || key)
                      .sort((a, b) => a.localeCompare(b))
                      .map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    {includedFreeLabels.map((label) => (
                      <li key={`inc-${label}`}>
                        {label}
                        <span className="text-[#dfbd69] ml-2">(included)</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {scheduledDate && (
                <div>
                  <span className="text-white font-semibold">When:</span>
                  <p className="text-white/80">
                    {new Date(`${scheduledDate}T${scheduledTime}:00`).toLocaleString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )}
            </div>

            {quoteLoading && !quote && (
              <div className="text-white/60 text-sm animate-pulse pt-2 border-t border-white/10">
                Calculating&hellip;
              </div>
            )}

            {quoteErr && (
              <div className="text-red-300 text-sm pt-2 border-t border-white/10">{quoteErr}</div>
            )}

            {quote && (
              <div className="border-t border-white/10 pt-4 space-y-1 text-sm">
                {quote.lineItems.map((li, idx) => (
                  <div key={idx} className="flex justify-between text-white/80">
                    <span className="truncate pr-2">{li.label}</span>
                    <span>${li.amount.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-white/80 pt-2 border-t border-white/10">
                  <span>Subtotal</span>
                  <span>${quote.subtotal.toFixed(2)}</span>
                </div>
                {quote.discount && (
                  <div className="flex justify-between text-[#dfbd69]">
                    <span>{quote.discount.label}</span>
                    <span>-${quote.discount.amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span className="text-white">Total</span>
                  <span className="text-[#dfbd69]">${quote.total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {submitErr && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm rounded-lg p-3">
                {submitErr}
              </div>
            )}

            <button
              type="button"
              onClick={submit}
              disabled={!formValid || submitting || !quote}
              className="button-quaternary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Booking\u2026' : 'Book my cleaning'}
            </button>

            <p className="text-[11px] text-white/60 text-center">
              No charge now. We&apos;ll text you to confirm before your appointment.
            </p>
          </div>

          {/* Need Help? card - same chrome as QuoteForm sidebar */}
          <div className="backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/10 space-y-3" style={{ background: inputBg }}>
            <h3 className="text-base font-serif font-semibold text-white">Need help?</h3>
            <a
              href={CONTACT_INFO.phone.href}
              className="flex items-center space-x-3 text-sm text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{CONTACT_INFO.phone.display}</span>
            </a>
            <a
              href={`sms:${CONTACT_INFO.phone.raw}`}
              className="flex items-center space-x-3 text-sm text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Text us</span>
            </a>
            <a
              href={CONTACT_INFO.email.href}
              className="flex items-center space-x-3 text-sm text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{CONTACT_INFO.email.display}</span>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-3 text-white">{title}</label>
      {children}
    </div>
  );
}

function TileButton({
  selected,
  onClick,
  label,
  sublabel,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  sublabel: string | null;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative cursor-pointer group ${
        selected
          ? 'ring-2 ring-[#dfbd69] bg-white/40'
          : 'ring-1 ring-white/30 hover:ring-2 hover:ring-[#dfbd69]/50 bg-white/10'
      } rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
    >
      <span className="text-sm font-semibold text-white mb-1">{label}</span>
      {sublabel && <span className="text-xs text-white/70">{sublabel}</span>}
    </button>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  inputBg,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: RuleOption[];
  inputBg?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-white">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-white/20 rounded-lg text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69]"
        style={{ background: inputBg, colorScheme: 'dark' }}
      >
        {options.map((o) => (
          <option key={o.ruleKey} value={o.ruleKey} className="bg-gray-900">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  required = true,
  inputClass,
  placeholder,
  inputBg,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  inputClass: string;
  placeholder?: string;
  inputBg?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-white">
        {label}
        {required && '*'}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        placeholder={placeholder}
        style={{ background: inputBg, colorScheme: 'dark' }}
      />
    </div>
  );
}
