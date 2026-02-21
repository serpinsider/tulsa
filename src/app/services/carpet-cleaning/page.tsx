import { Metadata } from 'next';
import CarpetCleaningService from '@/components/CarpetCleaningService';
import ScrollToTop from '@/components/ScrollToTop';
import { generateServiceMetadata, SERVICE_METADATA } from '@/config/service-metadata';

export const metadata: Metadata = generateServiceMetadata(SERVICE_METADATA.carpet);

export default function CarpetCleaningPage() {
  return (
    <>
      <CarpetCleaningService />
      <ScrollToTop />
    </>
  );
}
