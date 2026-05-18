'use client';

/**
 * QuoteConfirmPage
 *
 * Dedicated standalone page customers land on when they tap the link from
 * their quote SMS / email. NOT the booking form. Layout:
 *   - Branded header (logo + contact)
 *   - Read-only "Here's your quote" summary with an Edit toggle for scope
 *   - Three required fields to convert: address, date/time, payment method
 *   - Single CTA: Confirm booking
 *   - Help row: call us or text us
 *
 * Lifecycle:
 *   1. Customer arrives with ?t=<quote_prefill_token>
 *   2. We hit va-ops to resolve the token -> prefill payload (name, phone,
 *      email, service, beds, baths, addons, quoted total, leadId)
 *   3. Page renders with the quote already shown
 *   4. Customer fills address + date/time + payment method
 *   5. POST /api/public/bookings/create with quotePrefillToken passed through
 *      so va-ops marks the source lead as `booked` and links the booking.
 *   6. Redirect to maidcrm SSO -> customer portal showing the new booking
 *
 * Brand-isolation: this component is byte-identical across all native
 * brand sites. Differences come from the props (brandSlug, businessName,
 * accentColor, etc.) which are passed by the per-brand /q/page.tsx wrapper.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePrefillFromToken } from '@/lib/usePrefillFromToken';
import { CONTACT_INFO } from '@/lib/contact';

interface Props {
  brandSlug: string;
  businessName: string;
  accentColor: string;
  btnTextColor: string;
  cardBg?: string;
}

interface Quote {
  lineItems: Array<{ label: string; amount: number }>;
  subtotal: number;
  discount?: { label: string; amount: number };
  total: number;
}

const VA_OPS_URL =
  typeof process !== 'undefined' && typeof process.env !== 'undefined'
    ? process.env.NEXT_PUBLIC_VA_OPS_URL || 'https://maidcrm.com'
    : 'https://maidcrm.com';

function classNames(...xs: Array<string | false | null | undefined>): string {
  return xs.filter(Boolean).join(' ');
}

export default function QuoteConfirmPage(props: Props) {
  const { brandSlug, businessName, accentColor, btnTextColor } = props;
  const searchParams = useSearchParams();
  const token = searchParams?.get('t') ?? null;
  const prefill = usePrefillFromToken({ brandSlug });

  // Editable scope (collapsed by default, opens when customer hits Edit).
  const [scopeOpen, setScopeOpen] = useState(false);

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

  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);

  // Track quote-page view exactly once per session per token.
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
    }).catch(() => {
      // best-effort; never block the customer on analytics
    });
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

  // Quote summary derived from prefill payload (no client-side recalc).
  const quote: Quote | null = useMemo(() => {
    if (prefill.status !== 'ready' || !prefill.payload?.total) return null;
    return {
      lineItems: [
        {
          label: scopeText(prefill.payload),
          amount: prefill.payload.total,
        },
      ],
      subtotal: prefill.payload.total,
      total: prefill.payload.total,
    };
  }, [prefill.status, prefill.payload]);

  const customerName = useMemo(() => {
    const p = prefill.payload?.customer;
    if (!p) return '';
    return [p.firstName, p.lastName].filter(Boolean).join(' ').trim();
  }, [prefill.payload]);

  // Min/max date pickers: tomorrow through 60 days out.
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

  const canSubmit = !!(
    addressLine1.trim() &&
    city.trim() &&
    zip.trim() &&
    scheduledDate &&
    scheduledTime &&
    paymentMethod
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
            service: payload.service,
            bedrooms: payload.bedrooms,
            bathrooms: payload.bathrooms,
            sqft: payload.sqft,
            addons: payload.addons || [],
            frequency: payload.frequency || 'one-time',
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
        body={`This quote may have expired or is for a different location. Text or call us and we'll send a fresh one.`}
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

  return (
    <main
      className="min-h-screen pb-16"
      style={{
        background: `radial-gradient(1200px 600px at 50% -10%, ${accentColor}1f 0%, rgba(11, 17, 32, 0) 60%), linear-gradient(180deg, #0b1120 0%, #0a0f1a 100%)`,
      }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="text-white font-semibold tracking-tight">
          {businessName}
        </div>
        <a
          href={CONTACT_INFO?.phone?.href}
          className="text-xs sm:text-sm text-white/70 hover:text-white"
        >
          Need help? {CONTACT_INFO?.phone?.display}
        </a>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-8 sm:pt-12 space-y-5">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-white">
            {customerName ? `Hi ${customerName.split(' ')[0]},` : 'Welcome!'} here&apos;s your quote.
          </h1>
          <p className="text-white/70 text-sm mt-2">
            Confirm in under a minute. We charge after the cleaning is done.
          </p>
        </div>

        {/* Quote summary (collapsed / editable) */}
        <section
          className="rounded-2xl border backdrop-blur-md overflow-hidden"
          style={{
            background: 'rgba(22, 32, 52, 0.72)',
            borderColor: `${accentColor}30`,
          }}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div
                  className="text-[11px] uppercase tracking-wider mb-1"
                  style={{ color: accentColor }}
                >
                  Your quote
                </div>
                <div className="text-white font-medium text-base sm:text-lg leading-tight">
                  {scopeText(prefill.payload)}
                </div>
                {prefill.payload?.frequency && prefill.payload.frequency !== 'one-time' && (
                  <div className="text-white/60 text-xs mt-1 capitalize">
                    Recurring: {prefill.payload.frequency.replace('-', ' ')}
                  </div>
                )}
              </div>
              <div className="shrink-0 text-right">
                <div className="text-3xl sm:text-4xl font-bold" style={{ color: accentColor }}>
                  ${quote ? quote.total.toFixed(0) : '—'}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">
                  Total
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setScopeOpen((x) => !x)}
              className="mt-4 text-xs text-white/60 hover:text-white inline-flex items-center gap-1"
            >
              {scopeOpen ? 'Hide details' : 'See details / change scope'}
              <span aria-hidden>{scopeOpen ? '\u2191' : '\u2193'}</span>
            </button>
          </div>
          {scopeOpen && (
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 border-t border-white/10 pt-4 space-y-3 text-sm">
              {prefill.payload?.addons && prefill.payload.addons.length > 0 && (
                <div>
                  <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">
                    Included add-ons
                  </div>
                  <div className="text-white/80">
                    {prefill.payload.addons.map((a) => prettyAddon(a)).join(', ')}
                  </div>
                </div>
              )}
              <div className="text-white/60 text-xs leading-relaxed pt-2 border-t border-white/10">
                Need to change scope (add a bedroom, drop an add-on)?{' '}
                <a
                  href={`sms:${CONTACT_INFO?.phone?.raw}`}
                  className="underline"
                  style={{ color: accentColor }}
                >
                  Text us
                </a>{' '}
                or call{' '}
                <a
                  href={CONTACT_INFO?.phone?.href}
                  className="underline"
                  style={{ color: accentColor }}
                >
                  {CONTACT_INFO?.phone?.display}
                </a>{' '}
                and we&apos;ll send an updated quote.
              </div>
            </div>
          )}
        </section>

        {/* Confirmation form */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border backdrop-blur-md p-5 sm:p-6 space-y-5"
          style={{
            background: 'rgba(22, 32, 52, 0.72)',
            borderColor: 'rgba(255,255,255,0.10)',
          }}
        >
          <div>
            <h2 className="text-white font-semibold text-base">
              To confirm, we need three things
            </h2>
            <p className="text-white/55 text-xs mt-1">
              Address, date, and how you&apos;d like to pay.
            </p>
          </div>

          {/* Address */}
          <FieldGroup label="1. Service address">
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

          {/* Date / time */}
          <FieldGroup label="2. Date and time">
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
            <p className="text-white/50 text-[11px] mt-1.5">
              We&apos;ll confirm the exact arrival window after assigning a cleaner.
            </p>
          </FieldGroup>

          {/* Payment */}
          <FieldGroup label="3. Payment method">
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
            className="w-full px-6 py-3 rounded-lg text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            style={{
              background: accentColor,
              color: btnTextColor,
            }}
          >
            {submitting
              ? 'Confirming...'
              : quote
                ? `Confirm booking \u2014 $${quote.total.toFixed(0)}`
                : 'Confirm booking'}
          </button>

          <p className="text-center text-white/45 text-[11px]">
            By confirming, you agree to our terms. We&apos;ll text and email a
            receipt after the cleaning is done.
          </p>
        </form>

        {/* Help row */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <a
            href={CONTACT_INFO?.phone?.href}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm text-white border border-white/15 hover:bg-white/5 transition-colors"
          >
            Call {CONTACT_INFO?.phone?.display}
          </a>
          <a
            href={`sms:${CONTACT_INFO?.phone?.raw}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm text-white border border-white/15 hover:bg-white/5 transition-colors"
          >
            Text us a question
          </a>
        </div>
      </div>
    </main>
  );
}

// ---------- helpers ----------

function scopeText(payload: {
  service?: string;
  bedrooms?: string;
  bathrooms?: string;
} | null | undefined): string {
  if (!payload) return 'Your quote';
  const parts: string[] = [];
  if (payload.service) parts.push(prettyService(payload.service));
  const room: string[] = [];
  if (payload.bedrooms) room.push(`${payload.bedrooms} bed`);
  if (payload.bathrooms) room.push(`${payload.bathrooms} bath`);
  if (room.length) parts.push(`for your ${room.join(', ')}`);
  return parts.join(' ') || 'Your cleaning';
}

function prettyService(s: string): string {
  const lc = s.toLowerCase().replace(/_/g, ' ');
  if (lc.includes('move')) return 'Move-out clean';
  if (lc.includes('deep')) return 'Deep clean';
  if (lc.includes('post') && lc.includes('construct')) return 'Post-construction clean';
  return 'Standard clean';
}

function prettyAddon(a: string): string {
  return a
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
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
      style={{
        boxShadow: 'inset 0 0 0 0px transparent',
      }}
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
        selected ? 'shadow-inner' : 'hover:bg-white/5',
      )}
      style={{
        background: selected ? `${accentColor}20` : 'rgba(255,255,255,0.03)',
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
    <main className="min-h-screen bg-[#0b1120] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-serif font-semibold text-white mb-3">
          {title}
        </h1>
        <p className="text-white/70 leading-relaxed">{body}</p>
        {showContact && CONTACT_INFO?.phone?.href && (
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <a
              href={CONTACT_INFO.phone.href}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white border border-white/15"
              style={{ borderColor: `${accentColor}40` }}
            >
              Call {CONTACT_INFO.phone.display}
            </a>
            <a
              href={`sms:${CONTACT_INFO.phone.raw}`}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
              style={{ background: accentColor }}
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
    <main className="min-h-screen bg-[#0b1120] flex items-center justify-center px-6">
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

// ---------- address autocomplete ----------
// Same lazy-load pattern as NativeBookingForm. Keeps the dependency at the
// page-component level so brands without a Google Maps key still work
// (fallback to a plain text input).

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
      className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white placeholder-white/35 text-sm outline-none"
      onFocus={(e) => {
        e.currentTarget.style.borderColor = accentColor;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
      }}
    />
  );
}
