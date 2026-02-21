import BaseHero from '../shared/BaseHero';
import { BRANDING } from '@/config/branding';

interface MoveOutHeroProps {
  location?: string;
}

export default function MoveOutHero({ location = `${BRANDING.primaryCity}, ${BRANDING.primaryState}` }: MoveOutHeroProps) {
  return (
    <BaseHero
      title={`Move In/Out Cleaning Services in ${BRANDING.primaryCity}`}
      description="Professional move in/out cleaning for spotless properties. Get your deposit back with our thorough, inspection-ready service."
      location={location}
      showWizard={true}
    />
  );
}

