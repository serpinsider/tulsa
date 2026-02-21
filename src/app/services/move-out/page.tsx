import { Metadata } from 'next';
import MoveOutService from '@/components/MoveOutService';
import ScrollToTop from '@/components/ScrollToTop';
import { generateServiceMetadata, SERVICE_METADATA } from '@/config/service-metadata';

export const metadata: Metadata = generateServiceMetadata(SERVICE_METADATA.moveOut);

export default function MoveOutPage() {
  return (
    <>
      <MoveOutService />
      <ScrollToTop />
    </>
  );
}
