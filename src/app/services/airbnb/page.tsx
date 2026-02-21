import { Metadata } from 'next';
import AirbnbCleaningService from '@/components/AirbnbCleaningService';
import ScrollToTop from '@/components/ScrollToTop';
import { generateServiceMetadata, SERVICE_METADATA } from '@/config/service-metadata';

export const metadata: Metadata = generateServiceMetadata(SERVICE_METADATA.airbnb);

export default function AirbnbPage() {
  return (
    <>
      <AirbnbCleaningService />
      <ScrollToTop />
    </>
  );
}
