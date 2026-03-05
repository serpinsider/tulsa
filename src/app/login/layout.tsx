import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In - Tulsa Maids',
  description: 'Log in to your Tulsa Maids account to manage bookings, view history, and schedule new cleaning services.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
