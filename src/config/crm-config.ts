import { SiteConfig } from '@crm/core';

export const crmConfig: SiteConfig = {
  // Tenant Identity
  tenantId: 'brooklyn-maids',
  businessName: 'Brooklyn Maids',
  domain: 'brooklynmaids.com',
  
  // CRM Theme - Brooklyn Gold/Dark
  crmTheme: {
    brand: {
      primary: '#dfbd69',
      secondary: '#926f34',
      accent: '#c9a961',
    },
    backgrounds: {
      primary: '#1a1a1a',
      secondary: '#252525',
      tertiary: '#0a0a0a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
      muted: '#666666',
    },
    sidebar: {
      background: '#252525',
      activeTab: 'linear-gradient(135deg, #dfbd69, #926f34)',
      activeTextColor: '#0a0a0a',
      inactiveTextColor: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(255, 255, 255, 0.1)',
    },
    header: {
      background: '#252525',
      textColor: '#ffffff',
      divider: 'rgba(255, 255, 255, 0.15)',
    },
    buttons: {
      primary: {
        background: 'linear-gradient(135deg, #dfbd69, #926f34)',
        color: '#0a0a0a',
        hover: '#c9a961',
      },
      secondary: {
        background: '#2a2a2a',
        color: '#dfbd69',
        border: '#dfbd69',
      },
    },
    status: {
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
    },
    accents: {
      border: '#2a2a2a',
      hover: 'rgba(223, 189, 105, 0.1)',
      focus: '#dfbd69',
    },
  },
  
  // Features
  features: {
    booking: true,
    giftCards: true,
    commercialCleaning: true,
  },
  
  // CRM Integration
  crm: {
    hubspotPortalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
    defaultPipeline: 'cleaning-services',
  },
};

