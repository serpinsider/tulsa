import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Our Team - Tulsa Maids',
  description: 'Join the Tulsa Maids team. We are hiring house cleaners in Tulsa OK.',
  openGraph: {
    title: 'Join Our Team - Tulsa Maids',
    description: 'Join the Tulsa Maids team. We are hiring house cleaners in Tulsa OK.',
    url: 'https://www.tulsamaids.com/join-our-team',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Our Team - Tulsa Maids',
    description: 'Join the Tulsa Maids team. We are hiring house cleaners in Tulsa OK.',
  },
  alternates: { canonical: 'https://www.tulsamaids.com/join-our-team' },
};

export default function JoinOurTeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
