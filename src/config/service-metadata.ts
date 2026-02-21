/**
 * Service Metadata Configuration
 * 
 * Centralized metadata generator for all service pages.
 * Update service area references when creating a new site.
 */

import { Metadata } from 'next';
import { BRANDING } from './branding';

interface ServiceMetadata {
  title: string;
  description: string;
  keywords: string[];
  serviceName: string;
  slug: string;
}

export const generateServiceMetadata = (service: ServiceMetadata): Metadata => {
  const fullTitle = `${service.title} - ${BRANDING.businessName}`;
  
  return {
    title: fullTitle,
    description: service.description,
    keywords: service.keywords,
    openGraph: {
      title: fullTitle,
      description: service.description,
      url: `${BRANDING.url}/services/${service.slug}`,
      siteName: BRANDING.businessName,
      images: [
        {
          url: '/ogs-image.jpg',
          width: 1200,
          height: 630,
          alt: `${service.serviceName} - ${BRANDING.businessName}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: service.description,
      images: ['/ogs-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': 160,
      },
    },
  };
};

// Pre-configured service metadata (update for your service area)
export const SERVICE_METADATA = {
  deepClean: {
    title: `Deep Cleaning Services in ${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
    description: `Professional deep cleaning in ${BRANDING.primaryCity} ${BRANDING.primaryState}. Tackle tough dirt, grime & buildup with our thorough process. Perfect for seasonal cleaning, heavily soiled homes, or when your space needs intensive attention. Same-day service, satisfaction guaranteed. Book online!`,
    keywords: [
      `deep cleaning ${BRANDING.primaryCity}`,
      'deep house cleaning service',
      `thorough cleaning ${BRANDING.primaryCity}`,
      `spring cleaning ${BRANDING.primaryCity}`,
      `deep clean service ${BRANDING.primaryCity}`,
      'detailed house cleaning',
      'intensive cleaning service',
      'deep cleaning near me',
      'heavily soiled home cleaning',
      'seasonal cleaning service',
    ],
    serviceName: 'Deep Cleaning Services',
    slug: 'deep-clean',
  },
  moveOut: {
    title: `Move Out Cleaning Services in ${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
    description: `Professional move out cleaning in ${BRANDING.primaryCity} ${BRANDING.primaryState}. Get your security deposit back with our thorough move-out cleaning service. We clean everything from baseboards to appliances. Same-day service available. Book online!`,
    keywords: [
      `move out cleaning ${BRANDING.primaryCity}`,
      'end of lease cleaning',
      `move in cleaning ${BRANDING.primaryCity}`,
      'security deposit cleaning',
      'apartment move out cleaning',
      'move out cleaning service',
      'end of tenancy cleaning',
    ],
    serviceName: 'Move Out Cleaning Services',
    slug: 'move-out',
  },
  commercial: {
    title: `Commercial Cleaning Services in ${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
    description: `Professional commercial cleaning in ${BRANDING.primaryCity} ${BRANDING.primaryState}. Office cleaning, janitorial services, and commercial maintenance. Keep your business spotless. Book online!`,
    keywords: [
      `commercial cleaning ${BRANDING.primaryCity}`,
      'office cleaning service',
      'janitorial services',
      'business cleaning',
      'commercial cleaning service',
    ],
    serviceName: 'Commercial Cleaning Services',
    slug: 'commercial',
  },
  carpet: {
    title: `Carpet Cleaning Services in ${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
    description: `Professional carpet cleaning in ${BRANDING.primaryCity} ${BRANDING.primaryState}. Deep carpet cleaning, stain removal, and upholstery cleaning. Book online!`,
    keywords: [
      `carpet cleaning ${BRANDING.primaryCity}`,
      'carpet cleaning service',
      'upholstery cleaning',
      'stain removal',
      'carpet steam cleaning',
    ],
    serviceName: 'Carpet Cleaning Services',
    slug: 'carpet-cleaning',
  },
  handyman: {
    title: `Handyman Services in ${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
    description: `Professional handyman services in ${BRANDING.primaryCity} ${BRANDING.primaryState}. Furniture assembly, TV mounting, picture hanging, and minor repairs. Book online!`,
    keywords: [
      `handyman services ${BRANDING.primaryCity}`,
      'furniture assembly',
      'TV mounting',
      'picture hanging',
      'handyman service',
    ],
    serviceName: 'Handyman Services',
    slug: 'handyman',
  },
  airbnb: {
    title: `Airbnb Cleaning Services in ${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
    description: `Professional Airbnb cleaning in ${BRANDING.primaryCity} ${BRANDING.primaryState}. Fast turnovers, same-day service. Keep your Airbnb spotless. Book online!`,
    keywords: [
      `airbnb cleaning ${BRANDING.primaryCity}`,
      'vacation rental cleaning',
      'short term rental cleaning',
      'airbnb turnover service',
    ],
    serviceName: 'Airbnb Cleaning Services',
    slug: 'airbnb',
  },
  postConstruction: {
    title: `Post-Construction Cleaning in ${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
    description: `Professional post-construction cleaning in ${BRANDING.primaryCity} ${BRANDING.primaryState}. Remove dust, debris, and construction mess. Book online!`,
    keywords: [
      `post construction cleaning ${BRANDING.primaryCity}`,
      'construction cleanup',
      'after builders cleaning',
      'renovation cleaning',
    ],
    serviceName: 'Post-Construction Cleaning',
    slug: 'post-construction',
  },
  carCleaning: {
    title: `Car Cleaning & Detailing in ${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
    description: `Professional car cleaning and detailing in ${BRANDING.primaryCity} ${BRANDING.primaryState}. Interior and exterior car cleaning. Book online!`,
    keywords: [
      `car cleaning ${BRANDING.primaryCity}`,
      'car detailing',
      'auto detailing',
      'vehicle cleaning',
    ],
    serviceName: 'Car Cleaning & Detailing',
    slug: 'car-cleaning',
  },
  eventCleaning: {
    title: `Event Cleaning Services in ${BRANDING.primaryCity}, ${BRANDING.primaryState}`,
    description: `Professional event cleaning in ${BRANDING.primaryCity} ${BRANDING.primaryState}. Pre and post event cleaning. Keep your event space spotless. Book online!`,
    keywords: [
      `event cleaning ${BRANDING.primaryCity}`,
      'party cleanup',
      'event cleanup service',
      'post event cleaning',
    ],
    serviceName: 'Event Cleaning Services',
    slug: 'event-cleaning',
  },
};





