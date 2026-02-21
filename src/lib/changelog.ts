/**
 * TULSA MAIDS CHANGELOG
 * Single source of truth for all Tulsa Maids site changes
 */

export interface ChangelogEntry {
  id: string;
  date: string;
  version?: string;
  type: 'feature' | 'fix' | 'improvement' | 'breaking' | 'security' | 'performance' | 'seo' | 'design';
  category: 'frontend' | 'backend' | 'crm' | 'auth' | 'api' | 'database' | 'seo' | 'ui' | 'infrastructure';
  title: string;
  description: string;
  impactedFiles?: string[];
  relatedFeatures?: string[];
  author?: string;
  metrics?: {
    before?: string;
    after?: string;
    improvement?: string;
  };
  rollbackInstructions?: string;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    id: 'tulsa-maids-site-creation-2026-01',
    date: '2026-01-25',
    version: '1.0.0',
    type: 'feature',
    category: 'infrastructure',
    title: 'Tulsa Maids Site Creation',
    description: `Created Tulsa Maids site from base-theme with full parameterization.

**Configuration:**
- Business: Tulsa Maids (tulsamaids.com)
- Service Area: Tulsa, Broken Arrow, Owasso, Jenks, Bixby, Sand Springs, OK
- Phone: (918) 900-8470
- Formspree: mrbjzvde (shared with Pine)
- BookingKoala subdomain: tulsa

**Components Updated:**
- branding.ts - All business identity
- content.ts - Review locations for Tulsa area
- locations.ts - 10 Tulsa metro area locations
- All service components - Location defaults updated
- All page metadata - Dynamic branding

**Quote Bot Integration:**
- Added 'tulsa' to prompts.js LOCATION_DETAILS
- Added 'tulsa' to pricing-manager.js businesses list
- Uses default Brooklyn pricing (can be customized later)`,
    impactedFiles: [
      'src/config/branding.ts',
      'src/config/content.ts',
      'src/lib/locations.ts',
      'src/app/page.tsx',
      'src/components/*.tsx',
      'bots/formspree-quote-bot/prompts.js',
      'bots/formspree-quote-bot/pricing-manager.js',
    ],
    relatedFeatures: ['StepWizard', 'Quote Bot', 'BookingKoala Integration'],
  },
];

export default CHANGELOG;
