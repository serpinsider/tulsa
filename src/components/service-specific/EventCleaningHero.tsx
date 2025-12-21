import BaseHero from '../shared/BaseHero';

interface EventCleaningHeroProps {
  location?: string;
}

export default function EventCleaningHero({ location = "Brooklyn, NY" }: EventCleaningHeroProps) {
  return (
    <BaseHero
      title="Book Event Cleaning in NYC"
      description="Pre-event setup, during-event support, and post-event cleanup for parties, weddings, corporate events, and special occasions."
      location={location}
      showWizard={true}
    />
  );
}



