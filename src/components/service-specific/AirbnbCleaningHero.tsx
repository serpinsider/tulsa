import BaseHero from '../shared/BaseHero';
import AirbnbStepWizard from '../specialty-wizards/AirbnbStepWizard';

interface AirbnbCleaningHeroProps {
  location?: string;
}

export default function AirbnbCleaningHero({ location = "Las Vegas" }: AirbnbCleaningHeroProps) {
  return (
    <BaseHero
      title="Airbnb Turnover Cleaning Services in Las Vegas"
      description="Professional turnover cleaning for Airbnb hosts. Quick, thorough, and guest-ready. Same-day service available for last-minute bookings."
      location={location}
      showWizard={true}
      CustomWizard={AirbnbStepWizard}
    />
  );
}
