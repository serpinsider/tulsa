import { Metadata } from 'next';
import CommercialCleaningService from '@/components/CommercialCleaningService';
import ScrollToTop from '@/components/ScrollToTop';
import { generateServiceMetadata, SERVICE_METADATA } from '@/config/service-metadata';

export const metadata: Metadata = generateServiceMetadata(SERVICE_METADATA.commercial);

export default function CommercialPage() {
  return (
    <>
      <CommercialCleaningService />
      <ScrollToTop />
    </>
  );
}
