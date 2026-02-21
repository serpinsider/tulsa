import BaseHero from '../shared/BaseHero';
import { BRANDING } from '@/config/branding';

interface EventCleaningHeroProps {
  location?: string;
}

export default function EventCleaningHero({ location = `${BRANDING.primaryCity}, ${BRANDING.primaryState}` }: EventCleaningHeroProps) {
  return (
    <BaseHero
      title={`Professional Event Cleaning Services in ${BRANDING.serviceArea}`}
      description="Pre-event setup, during-event support, and post-event cleanup for parties, weddings, corporate events, and special occasions."
      location={location}
      showWizard={false}
      quoteUrl="/services/event-cleaning/quote"
    />
  );
}



