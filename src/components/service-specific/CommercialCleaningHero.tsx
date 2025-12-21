import BaseHero from '../shared/BaseHero';

interface CommercialCleaningHeroProps {
  location?: string;
}

export default function CommercialCleaningHero({ location = "Brooklyn, NY" }: CommercialCleaningHeroProps) {
  return (
    <BaseHero
      title="Book Commercial Cleaning in NYC"
      description="Office cleaning, janitorial services, and commercial maintenance for businesses of all sizes."
      location={location}
      showWizard={true}
    />
  );
}
