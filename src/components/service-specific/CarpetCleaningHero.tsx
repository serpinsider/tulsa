import BaseHero from '../shared/BaseHero';
import CarpetStepWizard from '../specialty-wizards/CarpetStepWizard';

interface CarpetCleaningHeroProps {
  location?: string;
}

export default function CarpetCleaningHero({ location = "Las Vegas" }: CarpetCleaningHeroProps) {
  return (
    <BaseHero
      title="Professional Carpet Cleaning in Las Vegas"
      description="Deep steam cleaning that removes dirt, stains, and allergens. Same-day service available. Satisfaction guaranteed."
      location={location}
      showWizard={true}
      CustomWizard={CarpetStepWizard}
    />
  );
}
