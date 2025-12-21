import BaseHero from '../shared/BaseHero';

interface MoveOutHeroProps {
  location?: string;
}

export default function MoveOutHero({ location = "Brooklyn, NY" }: MoveOutHeroProps) {
  return (
    <BaseHero
      title="Book a Move In/Out Clean in Brooklyn"
      description="Professional move in/out cleaning for spotless properties. Get your deposit back with our thorough, inspection-ready service."
      location={location}
      showWizard={true}
    />
  );
}

