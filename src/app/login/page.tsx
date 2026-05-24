/**
 * /login — passwordless login redirect.
 *
 * Replaces the legacy BookingKoala iframe embed (which was broken since
 * we migrated bookings to the native CRM). Punts to the va-ops magic-link
 * page where customers enter email/phone and receive a one-tap login SMS
 * or email.
 */

import { redirect } from 'next/navigation';

const PORTAL_LOGIN_URL = 'https://account.tulsamaids.com/sign-in/magic';

export default function LoginPage() {
  redirect(PORTAL_LOGIN_URL);
}
