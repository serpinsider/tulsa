import BaseHero from '../shared/BaseHero';
import CommercialStepWizard from '../specialty-wizards/CommercialStepWizard';

interface CommercialCleaningHeroProps {
  location?: string;
}

export default function CommercialCleaningHero({ location = "Tulsa, OK" }: CommercialCleaningHeroProps) {
  return (
    <BaseHero
      title="Commercial Cleaning Services in Tulsa"
      description="Professional cleaning for offices, retail stores, restaurants and more. Flexible scheduling, trained staff, reliable service."
      location={location}
      showWizard={true}
      CustomWizard={CommercialStepWizard}
    />
  );
}
