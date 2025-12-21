import BaseHero from '../shared/BaseHero';

interface DeepCleanHeroProps {
  location?: string;
}

export default function DeepCleanHero({ location = "Brooklyn, NY" }: DeepCleanHeroProps) {
  return (
    <BaseHero
      title="Book a Deep Clean in Brooklyn"
      description="Thorough deep cleaning for a complete home refresh. Perfect for seasonal cleaning, heavily soiled homes, or when your space needs intensive attention. We tackle tough dirt, grime, buildup, and stubborn odors in every corner."
      location={location}
      showWizard={true}
    />
  );
}

