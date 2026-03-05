import BaseHero from '../shared/BaseHero';
import PostConstructionStepWizard from '../specialty-wizards/PostConstructionStepWizard';

interface PostConstructionHeroProps {
  location?: string;
}

export default function PostConstructionHero({ location = "Tulsa, OK" }: PostConstructionHeroProps) {
  return (
    <BaseHero
      title="Post-Construction Cleaning in Tulsa"
      description="Thorough cleanup after renovations, remodels, and new construction. We handle the dust, debris, and final polish so your space is move-in ready."
      location={location}
      showWizard={true}
      CustomWizard={PostConstructionStepWizard}
    />
  );
}
