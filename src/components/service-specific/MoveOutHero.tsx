import BaseHero from '../shared/BaseHero';

interface MoveOutHeroProps {
  location?: string;
}

export default function MoveOutHero({ location = "Brooklyn, NY" }: MoveOutHeroProps) {
  return (
    <BaseHero
      title="Book a Move In/Out Clean in Brooklyn"
      description="Professional move in/out cleaning to ensure your property is spotless for the next occupants. Get your deposit back with our thorough, inspection-ready cleaning service."
      location={location}
      showWizard={true}
    />
  );
}

