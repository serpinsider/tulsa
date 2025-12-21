import BaseHero from '../shared/BaseHero';

interface AirbnbCleaningHeroProps {
  location?: string;
}

export default function AirbnbCleaningHero({ location = "Brooklyn, NY" }: AirbnbCleaningHeroProps) {
  return (
    <BaseHero
      title="Book Airbnb Turnover Cleaning in NYC"
      description="Professional turnover cleaning for Airbnb hosts. Quick, thorough, and guest-ready."
      location={location}
      showWizard={true}
    />
  );
}
