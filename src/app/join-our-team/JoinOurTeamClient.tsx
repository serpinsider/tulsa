'use client';

/**
 * Brand-themed cleaner application form.
 *
 * Submits to the CRM `/api/public/cleaner-apply` endpoint (no auth), which
 * creates a `cleaner_leads` row. Admin reviews, then sends an account invite.
 *
 * Simplified field set (no ID, no W-9 at signup). ID and payment info are
 * collected post-approval in the cleaner portal.
 *
 * Each site's page.tsx passes brand identity as props. Reads colors from
 * the per-site `@/styles/colors` (which exists on every site).
 */

import { useState } from 'react';
import Link from 'next/link';
import { COLORS } from '@/styles/colors';

const VA_OPS_URL = process.env.NEXT_PUBLIC_VA_OPS_URL || 'https://maidcrm.com';

interface Props {
  /** CRM brand slug (must match a row in brands.slug). e.g. 'pacific', 'vegas'. */
  brandSlug: string;
  /** Display name for the brand. e.g. 'Pacific Maids'. */
  businessName: string;
  /** Default city to pre-fill. Optional. */
  primaryCity?: string;
  /** Default state (2-letter) to pre-fill. Optional. */
  primaryState?: string;
  /** Hint text for the locations field, e.g. neighborhoods served by this brand. */
  locationsHint?: string;
}

type Experience = 'none' | 'some' | 'professional';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  locations: string;
  experience: Experience | '';
  hasTransport: boolean;
  note: string;
}

function formatPhone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 10);
  if (d.length === 0) return '';
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function JoinOurTeamClient(props: Props) {
  const { brandSlug, businessName, primaryCity = '', primaryState = '', locationsHint } = props;
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: primaryCity,
    state: primaryState,
    locations: '',
    experience: '',
    hasTransport: false,
    note: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const accent = COLORS.brand.gold;
  const accentMuted = COLORS.brand.goldMuted;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.firstName || !form.lastName) {
      setError('Please enter your name.');
      return;
    }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!form.experience) {
      setError('Please select your experience level.');
      return;
    }

    setSubmitting(true);
    try {
      const locations = form.locations
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch(`${VA_OPS_URL}/api/public/cleaner-apply`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email || null,
          phone: `+1${phoneDigits}`,
          city: form.city || null,
          state: (form.state || '').toUpperCase().slice(0, 2) || null,
          brandSlug,
          locations,
          experience: form.experience,
          hasTransport: form.hasTransport,
          note: form.note || null,
          source: 'brand-site',
        }),
      });

      if (!res.ok) {
        const detail = await res.json().catch(() => null);
        throw new Error(detail?.error || `Submit failed (${res.status})`);
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section
        className="min-h-screen flex items-center justify-center py-16 px-4"
        style={{ background: COLORS.backgrounds.primary }}
      >
        <div
          className="max-w-md w-full rounded-2xl p-8 text-center border"
          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: `${accent}25`, border: `1px solid ${accent}55` }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Application received</h1>
          <p className="text-white/70 text-sm mb-6">
            Thanks {form.firstName}. We'll review your application and reach out within a few days
            with next steps. If you're a fit, we'll send you a link to set up your cleaner account.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ background: accent, color: '#111' }}
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4" style={{ background: COLORS.backgrounds.primary }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Join the {businessName} team</h1>
          <p className="text-white/65 text-sm sm:text-base">
            Competitive pay, flexible scheduling, weekly payouts. Apply in under 2 minutes.
            We'll review and reach out within a few days.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl p-6 sm:p-8 space-y-4 border"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="First name" required>
              <input
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none focus:ring-2"
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
            </Field>
            <Field label="Last name" required>
              <input
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none focus:ring-2"
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Phone" required>
              <input
                inputMode="tel"
                value={form.phone}
                onChange={(e) => update('phone', formatPhone(e.target.value))}
                placeholder="(555) 555-5555"
                className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none focus:ring-2"
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="optional"
                className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none focus:ring-2"
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Field label="City">
                <input
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none focus:ring-2"
                  style={{
                    background: 'rgba(0,0,0,0.25)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                />
              </Field>
            </div>
            <Field label="State">
              <input
                value={form.state}
                maxLength={2}
                onChange={(e) => update('state', e.target.value.toUpperCase())}
                className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none focus:ring-2 uppercase"
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
            </Field>
          </div>

          <Field label="Neighborhoods or areas you can serve" hint={locationsHint || 'Comma or newline separated.'}>
            <textarea
              value={form.locations}
              onChange={(e) => update('locations', e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none focus:ring-2"
              style={{
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />
          </Field>

          <Field label="Cleaning experience" required>
            <div className="grid grid-cols-3 gap-2">
              {([
                ['none', 'No experience'],
                ['some', 'Some'],
                ['professional', 'Professional'],
              ] as const).map(([value, label]) => {
                const active = form.experience === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => update('experience', value)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: active ? `${accent}22` : 'rgba(0,0,0,0.25)',
                      border: `1px solid ${active ? accent : 'rgba(255,255,255,0.12)'}`,
                      color: active ? accent : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </Field>

          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.hasTransport}
              onChange={(e) => update('hasTransport', e.target.checked)}
              className="w-4 h-4 rounded"
              style={{ accentColor: accent }}
            />
            <span className="text-sm text-white/80">I have reliable transportation</span>
          </label>

          <Field label="Anything else we should know?" hint="Optional. Languages spoken, schedule preferences, special skills, etc.">
            <textarea
              value={form.note}
              onChange={(e) => update('note', e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none focus:ring-2"
              style={{
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />
          </Field>

          {error && (
            <div
              className="px-3 py-2 rounded-lg text-sm"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: 'rgb(252, 165, 165)',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accentMuted})`,
              color: '#111',
            }}
          >
            {submitting ? 'Submitting...' : 'Submit application'}
          </button>

          <p className="text-xs text-white/40 text-center pt-2">
            No ID or paperwork needed to apply. We'll collect that after approval.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/70 mb-1.5">
        {label}
        {required && <span className="text-white/40 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-white/40 mt-1">{hint}</p>}
    </div>
  );
}
