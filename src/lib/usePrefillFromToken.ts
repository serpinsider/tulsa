'use client';

/**
 * usePrefillFromToken
 *
 * Reusable client-side hook that reads a `?t=` query string param on a
 * brand site, looks up the matching `quote_prefill` magic token from the
 * CRM, and hands a normalized payload back so the host form can hydrate
 * its fields.
 *
 * Designed so that wiring a new brand site is a 5-line drop-in:
 *
 *     import { usePrefillFromToken } from 'base-theme/.../usePrefillFromToken';
 *
 *     const { payload, status } = usePrefillFromToken({ brandSlug: 'vegas' });
 *
 *     useEffect(() => {
 *       if (!payload) return;
 *       // Map payload fields onto whatever local state the form uses.
 *     }, [payload]);
 *
 * IMPORTANT: this hook is intentionally side-effect-free outside of the
 * fetch + state. It does NOT consume the token (uses the read-only
 * /api/public/quote-prefill GET). The host form is responsible for
 * deciding which fields to apply, in the order it likes (e.g. only after
 * brand options have loaded so we can validate ruleKeys).
 *
 * Brand opt-in is enforced in TWO places, NOT here:
 *   1. CRM-side `PREFILL_ENABLED_BRAND_SLUGS` allowlist controls whether
 *      a `?t=` URL is ever generated for a given brand.
 *   2. The host component decides whether to wire up this hook at all.
 *
 * If a token is found but its embedded `brandSlug` does not match the
 * `brandSlug` arg passed in here, we return `payload: null` and
 * `status: 'mismatch'` so the host form can ignore the prefill rather
 * than hydrating cross-brand data.
 */

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const VA_OPS_URL =
  typeof process !== 'undefined' && typeof process.env !== 'undefined'
    ? process.env.NEXT_PUBLIC_VA_OPS_URL || 'https://assistant-ashy-five.vercel.app'
    : 'https://assistant-ashy-five.vercel.app';

export type PrefillCustomer = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
};

export type PrefillFrequency = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly' | undefined;

export interface PrefillPayload {
  brandSlug?: string;
  service?: string;
  bedrooms?: string;
  bathrooms?: string;
  sqft?: string;
  addons?: string[];
  frequency?: PrefillFrequency;
  zip?: string;
  total?: number;
  customer?: PrefillCustomer;
  leadId?: number;
  source?: string;
}

export type PrefillStatus =
  | 'idle'        // No `?t=` param present, nothing to do.
  | 'loading'     // Fetch in flight.
  | 'ready'       // Token resolved, payload available.
  | 'mismatch'    // Token resolved but brandSlug mismatch — caller should ignore.
  | 'invalid'     // Token expired / unknown / wrong kind.
  | 'error';      // Network or unexpected error.

interface Args {
  /** CRM brand slug for the host site, e.g. 'vegas'. Required so that we can refuse cross-brand prefills. */
  brandSlug: string;
  /**
   * Optional — defaults to `process.env.NEXT_PUBLIC_VA_OPS_URL` or the
   * Vercel preview host. Pass an explicit override only in tests.
   */
  vaOpsUrl?: string;
}

interface Result {
  payload: PrefillPayload | null;
  status: PrefillStatus;
  /** The raw token (if any). Useful when the host wants to show a confirmation message. */
  token: string | null;
}

function normalizeFrequency(raw: string | undefined): PrefillFrequency {
  if (!raw) return undefined;
  const fq = raw.toLowerCase().replace(/_/g, '-');
  if (fq === 'one-time' || fq === 'one time' || fq === 'onetime') return 'one-time';
  if (fq === 'weekly') return 'weekly';
  if (fq === 'bi-weekly' || fq === 'biweekly') return 'bi-weekly';
  if (fq === 'monthly') return 'monthly';
  return undefined;
}

function normalizeZip(raw: unknown): string | undefined {
  if (raw == null) return undefined;
  const z = String(raw).trim();
  return /^\d{5}(-\d{4})?$/.test(z) ? z.slice(0, 5) : undefined;
}

export function usePrefillFromToken(args: Args): Result {
  const searchParams = useSearchParams();
  const token = searchParams?.get('t') ?? null;

  const [payload, setPayload] = useState<PrefillPayload | null>(null);
  const [status, setStatus] = useState<PrefillStatus>(token?.trim() ? 'loading' : 'idle');
  const ranRef = useRef(false);

  useEffect(() => {
    if (!token?.trim() || ranRef.current) return;
    ranRef.current = true;
    let cancelled = false;
    const base = args.vaOpsUrl || VA_OPS_URL;
    (async () => {
      try {
        const res = await fetch(
          `${base}/api/public/quote-prefill?t=${encodeURIComponent(token.trim())}`,
        );
        const data = (await res.json()) as { ok?: boolean; payload?: Record<string, unknown> };
        if (cancelled) return;
        if (!data.ok || !data.payload || typeof data.payload !== 'object') {
          setStatus('invalid');
          return;
        }
        const p = data.payload as PrefillPayload & {
          frequency?: string;
          zip?: string | number;
        };
        if (p.brandSlug && p.brandSlug !== args.brandSlug) {
          setStatus('mismatch');
          return;
        }
        const normalized: PrefillPayload = {
          brandSlug: p.brandSlug,
          service: p.service,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          sqft: p.sqft,
          addons: Array.isArray(p.addons)
            ? (p.addons as unknown[]).filter((x): x is string => typeof x === 'string')
            : undefined,
          frequency: normalizeFrequency(typeof p.frequency === 'string' ? p.frequency : undefined),
          zip: normalizeZip(p.zip),
          total: typeof p.total === 'number' ? p.total : undefined,
          customer: p.customer,
          leadId: typeof p.leadId === 'number' ? p.leadId : undefined,
          source: typeof p.source === 'string' ? p.source : undefined,
        };
        setPayload(normalized);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, args.brandSlug, args.vaOpsUrl]);

  return { payload, status, token };
}

/**
 * Helper: take a CRM/snake_case addon key like `inside_fridge` and convert
 * to a brand-site camelCase form-field key like `insideFridge`. The CRM and
 * the brand QuoteForm components disagree on casing for legacy reasons —
 * this lets the brand QuoteForm pass `addonKeyForCamelCase(raw)` directly
 * into its boolean addons map without per-site translation tables.
 *
 * If the raw key has no underscore (already camelCase), it's returned as-is.
 */
export function addonKeyForCamelCase(raw: string): string {
  const s = raw.trim();
  if (!s) return '';
  if (!s.includes('_')) return s;
  const parts = s.toLowerCase().split('_').filter(Boolean);
  if (!parts.length) return '';
  return parts[0] + parts.slice(1).map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join('');
}

/**
 * Helper: rough heuristic to pick a `serviceType` value for QuoteForm-style
 * components that use the legacy `'standard' | 'deep' | 'moveout'` enum.
 * Returns '' if no match.
 */
export function inferLegacyServiceType(
  service: string | undefined,
): 'standard' | 'deep' | 'moveout' | '' {
  if (!service) return '';
  const lc = service.toLowerCase().replace(/\s+/g, '_');
  if (lc.includes('move')) return 'moveout';
  if (lc.includes('deep')) return 'deep';
  if (lc.includes('standard') || lc.includes('maintenance')) return 'standard';
  return '';
}
