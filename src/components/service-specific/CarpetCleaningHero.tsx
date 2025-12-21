import BaseHero from '../shared/BaseHero';

interface CarpetCleaningHeroProps {
  location?: string;
}

export default function CarpetCleaningHero({ location = "Brooklyn, NY" }: CarpetCleaningHeroProps) {
  return (
    <BaseHero
      title="Book Carpet Cleaning in NYC"
      description="Deep carpet cleaning, stain removal, and upholstery cleaning for homes and businesses."
      location={location}
      showWizard={true}
    />
  );
}
