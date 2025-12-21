import BaseHero from '../shared/BaseHero';

interface DeepCleanHeroProps {
  location?: string;
}

export default function DeepCleanHero({ location = "Brooklyn, NY" }: DeepCleanHeroProps) {
  return (
    <BaseHero
      title="Book a Deep Clean in Brooklyn"
      description="Thorough deep cleaning for a complete home refresh. Perfect for seasonal cleaning or when your space needs intensive attention."
      location={location}
      showWizard={true}
    />
  );
}

