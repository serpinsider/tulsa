import { Metadata } from 'next';
import JoinOurTeamClient from './JoinOurTeamClient';

export const metadata: Metadata = {
  title: 'Join Our Team - Tulsa Maids',
  description: 'Apply to join our professional cleaning team. Competitive pay, flexible scheduling, and ongoing training. Start your career with Tulsa Maids today.',
  openGraph: {
    title: 'Join Our Team - Tulsa Maids',
    description: 'Apply to join our professional cleaning team. Competitive pay, flexible scheduling, and ongoing training.',
    url: 'https://tulsamaids.com/join-our-team',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
};

export default function JoinOurTeamPage() {
  return <JoinOurTeamClient />;
}
