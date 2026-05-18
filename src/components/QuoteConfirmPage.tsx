'use client';

/**
 * QuoteConfirmPage  —  /q?t=<token>
 *
 * Standalone landing page where a customer lands after tapping the quote
 * link the bot texted them. NOT the booking form, NOT the multistep wizard.
 * Goal: convert a fresh quote into a confirmed booking in under 60 seconds.
 *
 * Layout (top -> bottom):
 *   1. HeaderSimple chrome (logo not linked, no Book button) — from layout
 *   2. Hero greeting: "Hi {first}, your quote is ready."
 *   3. Trust strip: 4 truthful pills (Insured / Pay after / Card or Zelle / Satisfaction)
 *   4. Quote card: always-visible breakdown, smart addon pills addable
 *      inline (no edit click), and a "Show full options" toggle that opens
 *      a scope editor for service tier / beds / baths / sqft / freq / all
 *      addons.
 *   5. Deep Clean tier-upsell banner (only if Standard selected): 25.6% of
 *      historical Brooklyn bookings choose Deep, so we soft-pitch it.
 *   6. Confirm form: address (Google autocomplete) / date+time / payment.
 *   7. CTA: "Confirm booking — $XYZ" (sticky on mobile so it never leaves).
 *   8. "What happens next" — 3 micro-steps under the CTA.
 *   9. In-page disclaimer block (truthful claims only, no Footer).
 *
 * Truth rules (per company policy):
 *   - Insured: YES
 *   - Trained: YES
 *   - Re-clean within 48h if you're not happy: YES (commit)
 *   - "Background-checked", "bonded", "$2M coverage", "5-star Google",
 *     "100% money-back" — NEVER. Brooklyn purged these for cause.
 *
 * Addon recommendations are data-driven from 6,154 historical bookings
 * (BookingKoala export, Jan 2025 - May 2026). Top picks by attach rate:
 *   Inside Fridge (10.0%), Inside Oven (8.5%), Pet Hair (8.0%),
 *   Hardwood (6.5%), Microwave (5.2%). Deep Clean (25.6%) is treated
 *   separately as a tier upsell, not an addon pill.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { usePrefillFromToken } from '@/lib/usePrefillFromToken';
import { CONTACT_INFO } from '@/lib/contact';
import { ADDONS } from '@/lib/constants/addons';

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
  cents?: number;
}

interface BrandOptions {
  brand: { slug: string; name: string };
  options: Record<'bedrooms' | 'bathrooms' | 'sqft' | 'service' | 'addon', RuleOption[]>;
  inclusions: Record<string, string[]>;
}

interface QuoteLineItem {
  label: string;
  amount: number;
  category?: 'bedrooms' | 'bathrooms' | 'sqft' | 'service' | 'addon' | string;
  ruleKey?: string;
}

interface QuoteResponse {
  ok: boolean;
  quote: {
    lineItems: QuoteLineItem[];
    subtotal: number;
    discount?: { label: string; amount: number } | null;
    total: number;
  };
  error?: string;
}

const VA_OPS_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_VA_OPS_URL) ||
  'https://maidcrm.com';

// Ordered by historical attach rate (BK data, 6,154 bookings).
// Deep Clean is intentionally NOT here — it's a tier, not an addon.
const RECOMMENDED_ADDON_ORDER = [
  'insideFridge',
  'insideOven',
  'petCleaning',
  'hardwood',
  'microwave',
  'interiorWindows',
  'baseboardCleaning',
];

const FREQUENCIES: Array<{ id: Frequency; label: string; badge?: string }> = [
  { id: 'one-time', label: 'One time' },
  { id: 'weekly', label: 'Weekly', badge: '10% off' },
  { id: 'bi-weekly', label: 'Bi-weekly', badge: '5% off' },
  { id: 'monthly', label: 'Monthly', badge: '$25 off' },
];

function classNames(...xs: Array<string | false | null | undefined>): string {
  return xs.filter(Boolean).join(' ');
}

function addonMeta(key: string) {
  return ADDONS.find((a) => a.key === key);
}

export default function QuoteConfirmPage(props: Props) {
  const { brandSlug, businessName, accentColor, btnTextColor } = props;
  const searchParams = useSearchParams();
  const token = searchParams?.get('t') ?? null;
  const prefill = usePrefillFromToken({ brandSlug });

  // ---------- brand options (services, addons, prices) ----------
  const [opts, setOpts] = useState<BrandOptions | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(`${VA_OPS_URL}/api/public/brands/${brandSlug}/options`, { cache: 'default' })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setOpts(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [brandSlug]);

  // ---------- mutable scope ----------
  const [service, setService] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sqft, setSqft] = useState('');
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const [frequency, setFrequency] = useState<Frequency>('one-time');

  // hydrate from prefill once
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
    if (
      p.frequency === 'one-time' ||
      p.frequency === 'weekly' ||
      p.frequency === 'bi-weekly' ||
      p.frequency === 'monthly'
    ) {
      setFrequency(p.frequency);
    }
  }, [prefill.status, prefill.payload]);

  // ---------- live quote recompute ----------
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
        if (data.ok && data.quote) setLiveQuote(data.quote);
      } catch {
        /* abort */
      } finally {
        setRecalculating(false);
      }
    }, 200);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [brandSlug, service, bedrooms, bathrooms, sqft, addons, frequency]);

  // ---------- form state ----------
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [zip, setZip] = useState('');
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState<string>('10:00');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'zelle'>('card');

  // Hydrate name/email from prefill payload so the form doesn't re-prompt
  // for fields we already have from the lead.
  useEffect(() => {
    const c = prefill.payload?.customer;
    if (!c) return;
    if (c.firstName && !firstName) setFirstName(c.firstName);
    if (c.lastName && !lastName) setLastName(c.lastName);
    if (c.email && !emailInput) setEmailInput(c.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill.payload]);

  const [editingScope, setEditingScope] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  // ---------- page-view tracking ----------
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

  // ---------- autosave draft ----------
  const persistRef = useRef(false);
  useEffect(() => {
    if (!token) return;
    const stored = sessionStorage.getItem(`quote_draft_${token}`);
    if (stored) {
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
      } catch {}
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
    setSavedFlash(true);
    const t = setTimeout(() => setSavedFlash(false), 1200);
    return () => clearTimeout(t);
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

  // ---------- derived ----------
  const customerFirst = useMemo(() => {
    const f = prefill.payload?.customer?.firstName?.trim();
    if (!f || f.length < 2) return null;
    return f;
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

  const total = liveQuote?.total ?? prefill.payload?.total ?? 0;
  const subtotal = liveQuote?.subtotal ?? total;
  const discount = liveQuote?.discount ?? null;

  // Reserved: full line-item breakdown is intentionally hidden from the
  // customer view to keep the summary simple. The quote endpoint still
  // returns it server-side for booking creation, and the helper above
  // (prettyLineLabel) is available if we want to bring the breakdown back
  // behind an "Itemized view" toggle later.

  // Smart recommendation: which addons to show as one-tap pills below the
  // breakdown. Filtered to:
  //  (a) addons the brand actually offers and prices
  //  (b) addons NOT already selected by the customer
  //  (c) addons NOT already included free in the current service tier
  //  (d) top historical attach rates (RECOMMENDED_ADDON_ORDER)
  const includedFreeKeys = useMemo(() => {
    if (!opts || !service) return new Set<string>();
    return new Set(opts.inclusions?.[service] ?? []);
  }, [opts, service]);

  const recommendedAddons = useMemo(() => {
    if (!opts) return [];
    const offered = new Map(opts.options.addon.map((a) => [a.ruleKey, a]));
    const result: Array<{ key: string; label: string; price: number; iconSrc: string | null }> = [];
    for (const key of RECOMMENDED_ADDON_ORDER) {
      if (addons.has(key)) continue;
      if (includedFreeKeys.has(key)) continue;
      const opt = offered.get(key);
      if (!opt) continue;
      const meta = addonMeta(key);
      result.push({
        key,
        label: meta?.label || opt.label,
        price: (opt.cents ?? 0) / 100,
        iconSrc: meta?.icon ? `/icons/addons/${meta.icon}` : null,
      });
      if (result.length >= 3) break;
    }
    return result;
  }, [opts, addons, includedFreeKeys]);

  // Deep Clean tier-upsell visibility: only when on Standard. Find the Deep
  // Clean rule and compute upcharge.
  const deepCleanUpsell = useMemo(() => {
    if (!opts) return null;
    const isStandard = /standard/i.test(service);
    if (!isStandard) return null;
    const deep = opts.options.service.find((s) => /deep/i.test(s.ruleKey));
    if (!deep) return null;
    const upcharge = (deep.cents ?? 0) / 100;
    return {
      ruleKey: deep.ruleKey,
      label: deep.label || 'Deep Clean',
      upcharge,
    };
  }, [opts, service]);

  const toggleAddon = useCallback(
    (key: string) => {
      const next = new Set(addons);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setAddons(next);
      void fetch(`${VA_OPS_URL}/api/public/quote-page-view`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          token,
          brandSlug,
          at: new Date().toISOString(),
          event: next.has(key) ? 'addon_added_from_pill' : 'addon_removed_from_pill',
          addon: key,
        }),
        keepalive: true,
      }).catch(() => {});
    },
    [addons, token, brandSlug],
  );

  const switchToDeep = useCallback(() => {
    if (!deepCleanUpsell) return;
    setService(deepCleanUpsell.ruleKey);
    void fetch(`${VA_OPS_URL}/api/public/quote-page-view`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        token,
        brandSlug,
        at: new Date().toISOString(),
        event: 'tier_upsell_accepted',
      }),
      keepalive: true,
    }).catch(() => {});
  }, [deepCleanUpsell, token, brandSlug]);

  // ---------- submit ----------
  const effectiveFirst = (firstName || prefill.payload?.customer?.firstName || '').trim();
  const effectiveLast = (lastName || prefill.payload?.customer?.lastName || '').trim();
  const canSubmit = !!(
    effectiveFirst &&
    effectiveLast &&
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
        const mergedCustomer = {
          firstName: firstName.trim() || payload.customer?.firstName || '',
          lastName: lastName.trim() || payload.customer?.lastName || '',
          phone: payload.customer?.phone || '',
          email: emailInput.trim() || payload.customer?.email || '',
        };
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
            customer: mergedCustomer,
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
          booking?: { id: string };
          portalSsoUrl?: string;
          error?: string;
        };
        if (!res.ok || !data.ok || !data.booking) {
          throw new Error(data.error || 'Could not confirm booking');
        }
        sessionStorage.removeItem(`quote_draft_${token}`);
        const next = `/customer?tab=bookings&booking=${data.booking.id}`;
        window.location.href =
          data.portalSsoUrl ||
          `${VA_OPS_URL}/api/sso?next=${encodeURIComponent(next)}`;
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
      firstName,
      lastName,
      emailInput,
      addressLine1,
      addressLine2,
      city,
      stateCode,
      zip,
      paymentMethod,
      token,
    ],
  );

  // ---------- error / loading shells ----------
  if (!token) {
    return (
      <SimpleMessage
        title="Quote link missing"
        body="This link is missing the quote reference. Open the link from your text or email."
        accentColor={accentColor}
        btnTextColor={btnTextColor}
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
        body="This quote may have expired or is for a different brand. Text or call us and we'll send a fresh one."
        accentColor={accentColor}
        btnTextColor={btnTextColor}
        showContact
      />
    );
  }
  if (prefill.status === 'error') {
    return (
      <SimpleMessage
        title="Couldn't load your quote"
        body="Try the link again in a minute, or contact us directly."
        accentColor={accentColor}
        btnTextColor={btnTextColor}
        showContact
      />
    );
  }

  // ---------- main render ----------
  return (
    <main
      className="min-h-screen pb-32 lg:pb-0"
      style={{
        background:
          'radial-gradient(1200px 600px at 50% -10%, rgba(223, 189, 105, 0.12) 0%, rgba(11, 22, 38, 0) 60%), linear-gradient(180deg, #0b1626 0%, #0a121e 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-5">
        {/* Greeting */}
        <div>
          <h1
            className="text-2xl sm:text-3xl font-semibold text-white leading-tight"
            style={{ fontFamily: 'var(--font-playfair, serif)' }}
          >
            {customerFirst ? `Hi ${customerFirst}, ` : ''}your quote is ready.
          </h1>
          <p className="text-white/70 text-sm sm:text-base mt-2 leading-relaxed">
            Review the details, add your address, pick a date. We&apos;ll only
            charge after the clean is done.
          </p>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <TrustPill icon="shield" label="Insured" accentColor={accentColor} />
          <TrustPill icon="cash" label="Pay after the clean" accentColor={accentColor} />
          <TrustPill icon="card" label="Card or Zelle" accentColor={accentColor} />
          <TrustPill icon="smile" label="Satisfaction guaranteed" accentColor={accentColor} />
        </div>

        {/* Quote card */}
        <section
          className="rounded-2xl border overflow-hidden"
          style={{
            background: 'rgba(18, 45, 72, 0.65)',
            borderColor: `${accentColor}40`,
            boxShadow: '0 10px 40px rgba(0,0,0,0.30)',
          }}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="min-w-0">
                <div
                  className="text-[10px] uppercase tracking-[0.18em] mb-1.5 font-semibold"
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
                <div className="text-[10px] uppercase tracking-wider text-white/55 mt-1">
                  {recalculating ? 'updating' : 'total'}
                </div>
              </div>
            </div>

            {/* Selected add-ons as bullet list (no redundant breakdown rows) */}
            {addons.size > 0 && (
              <div className="border-t border-white/10 pt-4">
                <div className="text-[10px] uppercase tracking-wider text-white/45 mb-2">
                  Your add-ons
                </div>
                <ul className="space-y-1.5 text-[13px]">
                  {Array.from(addons).map((k) => {
                    const meta = addonMeta(k);
                    const opt = opts?.options.addon.find((o) => o.ruleKey === k);
                    const price = opt?.cents ? (opt.cents / 100).toFixed(0) : null;
                    return (
                      <li key={k} className="flex items-start justify-between gap-3 text-white/85">
                        <span className="flex items-start gap-2 min-w-0">
                          <span
                            className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: accentColor }}
                            aria-hidden="true"
                          />
                          <span className="truncate">{meta?.label || k}</span>
                        </span>
                        <span className="flex items-center gap-3 shrink-0">
                          {price ? (
                            <span className="text-white/95 tabular-nums">+${price}</span>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => toggleAddon(k)}
                            className="text-white/45 hover:text-white text-xs"
                            aria-label={`Remove ${meta?.label || k}`}
                          >
                            remove
                          </button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Discount + subtotal row (only when there is a discount worth showing) */}
            {(discount || (subtotal !== total)) && (
              <div className="border-t border-white/10 pt-3 mt-4 space-y-1.5 text-[13px]">
                {discount && (
                  <div className="flex justify-between" style={{ color: accentColor }}>
                    <span>{discount.label}</span>
                    <span className="tabular-nums">-${discount.amount.toFixed(2)}</span>
                  </div>
                )}
                {subtotal !== total && (
                  <div className="flex justify-between text-white/55">
                    <span>Subtotal</span>
                    <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Recommended addon pills — addable WITHOUT clicking edit */}
            {recommendedAddons.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="text-[10px] uppercase tracking-wider text-white/45 mb-2">
                  Most-added by customers like you
                </div>
                <div className="flex flex-wrap gap-2">
                  {recommendedAddons.map((a) => (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => toggleAddon(a.key)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium border transition-all hover:bg-white/5"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: 'rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.92)',
                      }}
                    >
                      {a.iconSrc && (
                        <Image
                          src={a.iconSrc}
                          alt=""
                          width={20}
                          height={20}
                          className="opacity-90"
                        />
                      )}
                      <span>+ {a.label}</span>
                      <span className="tabular-nums" style={{ color: accentColor }}>
                        ${a.price.toFixed(0)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Full edit toggle */}
            <button
              type="button"
              onClick={() => setEditingScope((x) => !x)}
              className="mt-4 w-full text-[13px] font-medium rounded-lg py-2.5 transition-colors border"
              style={{
                background: editingScope ? `${accentColor}20` : 'transparent',
                borderColor: `${accentColor}60`,
                color: accentColor,
              }}
            >
              {editingScope ? 'Done editing' : 'Show full options (rooms, frequency, all add-ons)'}
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
              toggleAddon={toggleAddon}
              frequency={frequency}
              setFrequency={setFrequency}
              accentColor={accentColor}
            />
          )}
        </section>

        {/* Deep Clean tier-upsell banner */}
        {deepCleanUpsell && (
          <button
            type="button"
            onClick={switchToDeep}
            className="w-full text-left rounded-xl border p-4 flex items-start gap-3 transition-colors hover:bg-white/5"
            style={{
              background: `${accentColor}10`,
              borderColor: `${accentColor}40`,
            }}
          >
            <div
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: `${accentColor}25`, color: accentColor }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white text-sm font-semibold leading-tight">
                Upgrade to Deep Clean for ${deepCleanUpsell.upcharge.toFixed(0)} more
              </div>
              <div className="text-white/65 text-xs mt-1 leading-relaxed">
                1 in 4 of our customers chose Deep Clean. Adds baseboards, door frames,
                light fixtures, and detailed dusting.
              </div>
            </div>
            <span
              className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-md self-center"
              style={{ background: accentColor, color: btnTextColor }}
            >
              Switch
            </span>
          </button>
        )}

        {/* Recurring nudge (only one-time + only if recurring options exist) */}
        {frequency === 'one-time' && (
          <div
            className="rounded-xl border p-3 flex items-center justify-between gap-3"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.10)',
            }}
          >
            <div className="text-[13px] text-white/75 leading-snug">
              Save with recurring: <span style={{ color: accentColor }} className="font-semibold">10% weekly</span>, 5% bi-weekly, or $25 off monthly.
            </div>
            <button
              type="button"
              onClick={() => setFrequency('weekly')}
              className="shrink-0 text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors"
              style={{ color: accentColor, border: `1px solid ${accentColor}55` }}
            >
              Switch
            </button>
          </div>
        )}

        {/* Confirm form */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border p-5 sm:p-6 space-y-5"
          style={{
            background: 'rgba(18, 45, 72, 0.65)',
            borderColor: 'rgba(255,255,255,0.10)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.30)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
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
            <SavedPill visible={savedFlash} accentColor={accentColor} />
          </div>

          {/* Name + email — only shown if missing from the prefilled lead */}
          {(!prefill.payload?.customer?.firstName ||
            !prefill.payload?.customer?.lastName ||
            !prefill.payload?.customer?.email) && (
            <FieldGroup label="Your details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {!prefill.payload?.customer?.firstName && (
                  <Input
                    value={firstName}
                    onChange={setFirstName}
                    placeholder="First name"
                    accentColor={accentColor}
                  />
                )}
                {!prefill.payload?.customer?.lastName && (
                  <Input
                    value={lastName}
                    onChange={setLastName}
                    placeholder="Last name"
                    accentColor={accentColor}
                  />
                )}
              </div>
              {!prefill.payload?.customer?.email && (
                <Input
                  value={emailInput}
                  onChange={setEmailInput}
                  placeholder="Email (for booking confirmation)"
                  type="email"
                  inputMode="email"
                  accentColor={accentColor}
                  className="mt-2"
                />
              )}
            </FieldGroup>
          )}

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
              <Input value={city} onChange={setCity} placeholder="City" accentColor={accentColor} />
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
                sub="We text the handle and reference after the clean."
              />
            </div>
          </FieldGroup>

          {submitErr && (
            <div className="bg-red-500/15 border border-red-400/30 text-red-100 text-sm rounded-lg p-3">
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
            {submitting ? 'Confirming...' : `Confirm booking · $${total.toFixed(0)}`}
          </button>

          <div className="flex items-center justify-center gap-2 text-white/50 text-[11px]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>We won&apos;t charge anything today.</span>
          </div>
        </form>

        {/* What happens next */}
        <div
          className="rounded-2xl border p-5 sm:p-6"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-3 font-semibold">
            What happens next
          </div>
          <ol className="space-y-3">
            <NextStep
              num={1}
              title="We assign your cleaner"
              body="You&apos;ll get a text with their name once they&apos;re scheduled."
              accentColor={accentColor}
            />
            <NextStep
              num={2}
              title="Day-of arrival window confirmed"
              body="We text you the arrival window the morning of."
              accentColor={accentColor}
            />
            <NextStep
              num={3}
              title="Pay after the clean is done"
              body="Card on file or Zelle. We email an itemized receipt."
              accentColor={accentColor}
            />
          </ol>
        </div>

        {/* Help row */}
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={CONTACT_INFO?.phone?.href}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border transition-colors hover:bg-white/5"
            style={{ color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.12)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call {CONTACT_INFO?.phone?.display}
          </a>
          <a
            href={`sms:${CONTACT_INFO?.phone?.raw}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border transition-colors hover:bg-white/5"
            style={{ color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.12)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Text us
          </a>
        </div>

        {/* In-page disclaimer */}
        <DisclaimerBlock businessName={businessName} accentColor={accentColor} />
      </div>

      {/* Mobile sticky CTA */}
      <MobileStickyCta
        canSubmit={canSubmit}
        total={total}
        submitting={submitting}
        accentColor={accentColor}
        btnTextColor={btnTextColor}
        onClick={() => {
          // submit the form by dispatching from the parent — the form's
          // own button handles validation. We focus the form to ensure the
          // user sees what's missing if invalid.
          const form = document.querySelector('form');
          if (form) form.requestSubmit();
        }}
      />
    </main>
  );
}

// ===================== sub-components =====================

function TrustPill({
  icon,
  label,
  accentColor,
}: {
  icon: 'shield' | 'cash' | 'card' | 'smile';
  label: string;
  accentColor: string;
}) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg border"
      style={{
        background: 'rgba(255,255,255,0.025)',
        borderColor: 'rgba(255,255,255,0.10)',
      }}
    >
      <div className="shrink-0" style={{ color: accentColor }}>
        <TrustIcon name={icon} />
      </div>
      <div className="text-[12px] sm:text-[13px] text-white/85 leading-tight">{label}</div>
    </div>
  );
}

function TrustIcon({ name }: { name: 'shield' | 'cash' | 'card' | 'smile' }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (name === 'cash') {
    return (
      <svg {...common}>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    );
  }
  if (name === 'card') {
    return (
      <svg {...common}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function NextStep({
  num,
  title,
  body,
  accentColor,
}: {
  num: number;
  title: string;
  body: string;
  accentColor: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div
        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
        style={{ background: `${accentColor}25`, color: accentColor }}
      >
        {num}
      </div>
      <div className="min-w-0">
        <div className="text-white text-sm font-medium leading-tight">{title}</div>
        <div className="text-white/55 text-xs mt-0.5 leading-relaxed">{body}</div>
      </div>
    </li>
  );
}

function DisclaimerBlock({
  businessName,
  accentColor,
}: {
  businessName: string;
  accentColor: string;
}) {
  return (
    <footer
      className="rounded-xl border p-4 text-[11px] text-white/55 leading-relaxed space-y-3"
      style={{
        background: 'rgba(255,255,255,0.015)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <p>
        <span className="font-semibold text-white/75">Re-clean promise:</span> if
        you&apos;re not happy with any area we cleaned, text us within 48 hours
        and we&apos;ll come back and re-clean it at no charge.
      </p>
      <p>
        {businessName} is insured. Our cleaners are trained for residential
        cleaning. Confirming this booking does not charge your payment method;
        you&apos;re only billed after the clean is complete. You can reschedule
        or cancel free up to 24 hours before your appointment by texting us.
      </p>
      <p className="flex flex-wrap gap-x-3 gap-y-1">
        <a href="/terms" className="hover:text-white" style={{ color: accentColor }}>
          Terms
        </a>
        <a href="/privacy" className="hover:text-white" style={{ color: accentColor }}>
          Privacy
        </a>
        <span className="text-white/35">© {new Date().getFullYear()} {businessName}</span>
      </p>
    </footer>
  );
}

function SavedPill({ visible, accentColor }: { visible: boolean; accentColor: string }) {
  return (
    <div
      className={classNames(
        'flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full transition-opacity',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{
        background: `${accentColor}18`,
        color: accentColor,
        border: `1px solid ${accentColor}40`,
      }}
      aria-hidden={!visible}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Saved
    </div>
  );
}

function MobileStickyCta({
  canSubmit,
  total,
  submitting,
  accentColor,
  btnTextColor,
  onClick,
}: {
  canSubmit: boolean;
  total: number;
  submitting: boolean;
  accentColor: string;
  btnTextColor: string;
  onClick: () => void;
}) {
  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t backdrop-blur-md"
      style={{
        background: 'rgba(11,22,38,0.92)',
        borderTopColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={!canSubmit || submitting}
        className="w-full px-6 py-3 rounded-lg text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: accentColor,
          color: btnTextColor,
        }}
      >
        {submitting ? 'Confirming...' : `Confirm · $${total.toFixed(0)}`}
      </button>
    </div>
  );
}

// ===================== Scope Editor (full) =====================

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
  toggleAddon: (k: string) => void;
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
    toggleAddon,
    frequency,
    setFrequency,
    accentColor,
  } = props;

  if (!opts) {
    return (
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 border-t border-white/10 pt-4">
        <div className="text-white/55 text-sm">Loading options...</div>
      </div>
    );
  }

  return (
    <div className="px-5 pb-5 sm:px-6 sm:pb-6 border-t border-white/10 pt-4 space-y-5 bg-black/10">
      {opts.options.service.length > 1 && (
        <div>
          <EditorLabel>Service type</EditorLabel>
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

      <div>
        <EditorLabel>Frequency</EditorLabel>
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

      {opts.options.addon.length > 0 && (
        <div>
          <EditorLabel>All add-ons</EditorLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {opts.options.addon.map((a) => {
              const meta = addonMeta(a.ruleKey);
              const selected = addons.has(a.ruleKey);
              const iconSrc = meta?.icon ? `/icons/addons/${meta.icon}` : null;
              return (
                <button
                  key={a.ruleKey}
                  type="button"
                  onClick={() => toggleAddon(a.ruleKey)}
                  className="text-left rounded-lg px-3 py-2.5 border transition-all flex items-start gap-2.5"
                  style={{
                    background: selected ? `${accentColor}22` : 'rgba(255,255,255,0.03)',
                    borderColor: selected ? accentColor : 'rgba(255,255,255,0.15)',
                  }}
                >
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt=""
                      width={22}
                      height={22}
                      className="opacity-90 shrink-0 mt-0.5"
                    />
                  ) : (
                    <span className="w-[22px]" aria-hidden="true" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium text-white leading-tight">
                      {meta?.label || a.label}
                    </span>
                    {a.cents ? (
                      <span className="block text-[11px] mt-0.5 tabular-nums" style={{ color: selected ? accentColor : 'rgba(255,255,255,0.5)' }}>
                        +${(a.cents / 100).toFixed(0)}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function EditorLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-2 font-semibold">
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
      <EditorLabel>{label}</EditorLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm outline-none cursor-pointer"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = accentColor;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        }}
      >
        <option value="" className="bg-[#0b1626]">Select</option>
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
      className="px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-all"
      style={{
        background: selected ? `${accentColor}22` : 'rgba(255,255,255,0.03)',
        borderColor: selected ? accentColor : 'rgba(255,255,255,0.15)',
        color: selected ? '#fff' : 'rgba(255,255,255,0.78)',
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

// ===================== Form atoms =====================

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-white/80 text-sm font-medium mb-2">{label}</div>
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
  // Force dark color-scheme for date/time so the native calendar/clock icon
  // renders light on dark instead of nearly-invisible black-on-dark.
  const needsDarkScheme = type === 'date' || type === 'time' || type === 'datetime-local';
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
      style={needsDarkScheme ? { colorScheme: 'dark' } : undefined}
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
      className="text-left rounded-lg px-3 py-3 border transition-all"
      style={{
        background: selected ? `${accentColor}22` : 'rgba(255,255,255,0.03)',
        borderColor: selected ? accentColor : 'rgba(255,255,255,0.15)',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
          style={{
            borderColor: selected ? accentColor : 'rgba(255,255,255,0.45)',
            background: selected ? accentColor : 'transparent',
          }}
        >
          {selected && <div className="w-1.5 h-1.5 rounded-full" style={{ background: btnTextColor }} />}
        </div>
        <span className="text-white font-medium text-sm">{title}</span>
      </div>
      <div className="text-white/60 text-xs pl-6">{sub}</div>
    </button>
  );
}

// ===================== loading/error shells =====================

function SimpleMessage({
  title,
  body,
  accentColor,
  btnTextColor,
  showContact,
}: {
  title: string;
  body: string;
  accentColor: string;
  btnTextColor: string;
  showContact?: boolean;
}) {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(180deg, #0b1626 0%, #0a121e 100%)' }}
    >
      <div className="max-w-md w-full text-center">
        <h1
          className="text-2xl font-semibold text-white mb-3"
          style={{ fontFamily: 'var(--font-playfair, serif)' }}
        >
          {title}
        </h1>
        <p className="text-white/70 leading-relaxed">{body}</p>
        {showContact && CONTACT_INFO?.phone?.href && (
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <a
              href={CONTACT_INFO.phone.href}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white border border-white/20"
            >
              Call {CONTACT_INFO.phone.display}
            </a>
            <a
              href={`sms:${CONTACT_INFO.phone.raw}`}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium"
              style={{ background: accentColor, color: btnTextColor }}
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

// ===================== helpers =====================

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
    room.push(bedLabel ? `${bedLabel} bed` : `${bedrooms} bed`);
  }
  if (bathrooms) {
    const bathLabel = opts?.options.bathrooms.find((s) => s.ruleKey === bathrooms)?.label;
    room.push(bathLabel ? `${bathLabel} bath` : `${bathrooms} bath`);
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

// ===================== Google Places autocomplete =====================

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
    let ac: {
      addListener?: (e: string, fn: () => void) => void;
      getPlace?: () => unknown;
    } | null = null;
    loadGoogleMaps().then((ok) => {
      if (!ok || !inputRef.current) return;
      const w = window as unknown as {
        google: {
          maps: {
            places: {
              Autocomplete: new (
                el: HTMLInputElement,
                opts: {
                  types: string[];
                  componentRestrictions: { country: string[] };
                  fields: string[];
                },
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
