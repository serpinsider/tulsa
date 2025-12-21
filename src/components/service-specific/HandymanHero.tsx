import BaseHero from '../shared/BaseHero';

interface HandymanHeroProps {
  location?: string;
}

export default function HandymanHero({ location = "Brooklyn, NY" }: HandymanHeroProps) {
  return (
    <BaseHero
      title="Book Handyman Services in NYC"
      description="Furniture assembly, TV mounting, repairs, and home improvement services."
      location={location}
      showWizard={true}
    />
  );
}
