import { Metadata } from 'next';
import PostConstructionService from '@/components/PostConstructionService';
import ScrollToTop from '@/components/ScrollToTop';
import { generateServiceMetadata, SERVICE_METADATA } from '@/config/service-metadata';

export const metadata: Metadata = generateServiceMetadata(SERVICE_METADATA.postConstruction);

export default function PostConstructionPage() {
  return (
    <>
      <PostConstructionService />
      <ScrollToTop />
    </>
  );
}
