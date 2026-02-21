import { Metadata } from 'next';
import { BRANDING } from '@/config/branding';
import JoinOurTeamClient from './JoinOurTeamClient';

export const metadata: Metadata = {
  title: `Join Our Team - ${BRANDING.businessName}`,
  description: `Join the ${BRANDING.businessName} team. We're looking for reliable, detail-oriented cleaners to join our growing team.`,
  openGraph: {
    title: `Join Our Team - ${BRANDING.businessName}`,
    description: `Join the ${BRANDING.businessName} team. We're looking for reliable, detail-oriented cleaners to join our growing team.`,
    url: `${BRANDING.url}/join-our-team`,
    siteName: BRANDING.businessName,
    type: 'website',
  },
};

export default function JoinOurTeamPage() {
  return <JoinOurTeamClient />;
}
