import { Metadata } from 'next';
import HandymanService from '@/components/HandymanService';
import ScrollToTop from '@/components/ScrollToTop';
import { generateServiceMetadata, SERVICE_METADATA } from '@/config/service-metadata';

export const metadata: Metadata = generateServiceMetadata(SERVICE_METADATA.handyman);

export default function HandymanPage() {
  return (
    <>
      <HandymanService />
      <ScrollToTop />
    </>
  );
}
