import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signing you in - Tulsa Maids',
  description: 'Signing you in to your Tulsa Maids account.',
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
