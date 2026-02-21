import { Metadata } from 'next';
import DeepCleanService from '@/components/DeepCleanService';
import ScrollToTop from '@/components/ScrollToTop';
import { generateServiceMetadata, SERVICE_METADATA } from '@/config/service-metadata';

export const metadata: Metadata = generateServiceMetadata(SERVICE_METADATA.deepClean);

export default function DeepCleanPage() {
  return (
    <>
      <DeepCleanService />
      <ScrollToTop />
    </>
  );
}

