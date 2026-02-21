import { Metadata } from 'next';
import EventCleaningService from '@/components/EventCleaningService';
import ScrollToTop from '@/components/ScrollToTop';
import { generateServiceMetadata, SERVICE_METADATA } from '@/config/service-metadata';

export const metadata: Metadata = generateServiceMetadata(SERVICE_METADATA.eventCleaning);

export default function EventCleaningPage() {
  return (
    <>
      <EventCleaningService />
      <ScrollToTop />
    </>
  );
}
