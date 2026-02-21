import { Metadata } from 'next';
import CarCleaningService from '@/components/CarCleaningService';
import ScrollToTop from '@/components/ScrollToTop';
import { generateServiceMetadata, SERVICE_METADATA } from '@/config/service-metadata';

export const metadata: Metadata = generateServiceMetadata(SERVICE_METADATA.carCleaning);

export default function CarCleaningPage() {
  return (
    <>
      <CarCleaningService />
      <ScrollToTop />
    </>
  );
}
