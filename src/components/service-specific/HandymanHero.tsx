import BaseHero from '../shared/BaseHero';
import HandymanStepWizard from '../specialty-wizards/HandymanStepWizard';

interface HandymanHeroProps {
  location?: string;
}

export default function HandymanHero({ location = "Las Vegas" }: HandymanHeroProps) {
  return (
    <BaseHero
      title="Handyman Services in Las Vegas"
      description="Professional handyman services for all your home repair and improvement needs. TV mounting, furniture assembly, minor repairs and more."
      location={location}
      showWizard={true}
      CustomWizard={HandymanStepWizard}
    />
  );
}
