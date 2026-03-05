import BaseHero from '../shared/BaseHero';
import CarCleaningStepWizard from '../specialty-wizards/CarCleaningStepWizard';

interface CarCleaningHeroProps {
  location?: string;
}

export default function CarCleaningHero({ location = "Tulsa, OK" }: CarCleaningHeroProps) {
  return (
    <BaseHero
      title="Professional Car Cleaning in Tulsa"
      description="Mobile detailing and car cleaning services. Interior, exterior, and full detail packages. We come to you."
      location={location}
      showWizard={true}
      CustomWizard={CarCleaningStepWizard}
    />
  );
}
