import BaseHero from '../shared/BaseHero';
import { BRANDING } from '@/config/branding';

interface DeepCleanHeroProps {
  location?: string;
}

export default function DeepCleanHero({ location = `${BRANDING.primaryCity}, ${BRANDING.primaryState}` }: DeepCleanHeroProps) {
  return (
    <BaseHero
      title={`Deep Cleaning Services in ${BRANDING.primaryCity}`}
      description="Thorough deep cleaning for a complete home refresh. Perfect for seasonal cleaning or when your space needs intensive attention."
      location={location}
      showWizard={true}
    />
  );
}

