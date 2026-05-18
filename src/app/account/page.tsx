/**
 * /account - portal SSO entry point on the brand domain.
 *
 * Customers receive transactional SMS / email with links to
 *   https://<brand>.com/account?t=<token>&next=/customer
 *
 * Why this route exists on the brand site rather than on va-ops:
 *   The va-ops Next.js app is deployed at assistant-ashy-five.vercel.app
 *   (until per-brand account.<brand>.com CNAMEs are configured). Putting
 *   the public-facing link on the brand domain means customers see
 *   Tulsa Maids in their messages, not a generic Vercel URL.
 *
 *   The actual SSO / Clerk handoff still happens server-side on va-ops:
 *   this page just 302s with the same querystring preserved. The user's
 *   URL bar briefly shows the va-ops host during the Clerk redirect,
 *   then lands on /customer (or whatever ?next= specified).
 *
 * Token validation, customer lookup, and Clerk sign-in token minting all
 * happen in va-ops at /api/sso. We do NOT validate the token here, so a
 * tampered URL just gets a "invalid_or_expired_link" page after the
 * round-trip. That's intentional - tokens are single-use and brand sites
 * are static-ish, so we don't want them to need a DB connection.
 */

import { redirect } from 'next/navigation';

const SSO_ORIGIN = process.env.NEXT_PUBLIC_VA_OPS_ORIGIN || 'https://maidcrm.com';

interface PageProps {
  searchParams: Promise<{ t?: string; next?: string }>;
}

export default async function AccountSsoPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.t;
  const next = params.next;

  // No token: send to the magic-link sign-in form so customers can
  // enter email/phone and receive a fresh login link.
  if (!token) {
    redirect(`${SSO_ORIGIN}/sign-in/magic`);
  }

  const target = new URL(`${SSO_ORIGIN}/api/sso`);
  target.searchParams.set('t', token);
  if (next) target.searchParams.set('next', next);
  redirect(target.toString());
}
