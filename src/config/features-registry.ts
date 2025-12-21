/**
 * BROOKLYN MAIDS CRM - FEATURE REGISTRY
 * Central registry of all implemented features with internal codenames
 * Use this for tracking, updates, and documentation
 */

export interface Feature {
  id: string; // Internal codename
  name: string; // Display name
  category: 'core' | 'dashboard' | 'integration' | 'automation' | 'ui' | 'seo';
  status: 'complete' | 'partial' | 'planned';
  version: string; // When implemented
  description: string;
  files: string[]; // Key files
  dependencies?: string[]; // Other feature IDs this depends on
  hubspotProps?: string[]; // HubSpot properties used
  apiRoutes?: string[]; // API endpoints
  howItWorks?: string; // Technical explanation
}

export const FEATURES: Feature[] = [
  // ============================================
  // CORE CRM FEATURES
  // ============================================
  {
    id: 'hubspot-integration',
    name: 'HubSpot CRM Integration',
    category: 'core',
    status: 'complete',
    version: '1.0.0',
    description: 'Complete HubSpot API integration for contacts, deals, and companies',
    files: [
      'src/lib/hubspot/client.ts',
      'src/lib/hubspot/types.ts',
      'src/lib/hubspot/admin.ts',
    ],
    apiRoutes: [
      '/api/hubspot/admin/deals',
      '/api/hubspot/admin/contacts',
      '/api/hubspot/admin/stats',
      '/api/hubspot/assign-provider',
    ],
    howItWorks: 'Uses HubSpot Private App token to interact with Contacts (customers/providers/employees) and Deals (bookings/quotes). All data is stored in HubSpot with custom properties.',
    hubspotProps: [
      // CONTACT PROPERTIES
      'role', 'active', 'service_areas', 'calendar_color', 'payment_method', 
      'hourly_rate', 'last_login', 'site_business',
      // DEAL PROPERTIES (54 total)
      'service_date', 'service_time', 'service_type', 'service_address', 'service_city',
      'service_state', 'service_zip', 'bedrooms', 'bathrooms', 'square_feet', 'frequency',
      'assigned_provider', 'assigned_provider_name', 'site_location', 'site_business',
      'extras', 'excludes', 'apt_number', 'access_method', 'booking_note',
      'private_customer_note', 'provider_note', 'provider_has_keys', 'estimated_job_hours',
      'service_total', 'sales_tax', 'discount_code', 'discount_from_code',
      'discount_from_frequency', 'discount_from_referral', 'total_discount', 'final_amount',
      'amount_paid', 'amount_owed', 'refunded_amount', 'tip_amount', 'parking_fee',
      'bonus_amount', 'reschedule_fee', 'expedited_fee', 'service_fee',
      'price_adjustment', 'price_adjustment_comment', 'payment_method',
      'stripe_customer_id', 'stripe_transaction_id', 'provider_payment',
      'booking_status', 'created_by', 'rating_value', 'rating_comment',
      'email', 'phone', 'contact_name',
    ],
  },
  {
    id: 'multi-business-manager',
    name: 'Multi-Business Management System',
    category: 'core',
    status: 'complete',
    version: '2.1.0',
    description: 'Manages 13+ cleaning businesses with automatic zip code detection and filtering. Added Mesa Maids (Arizona) Oct 2025.',
    files: [
      'src/config/zip-business-mapping.ts',
      'src/components/dashboard/AnalyticsDashboard.tsx',
      'src/app/api/submit-quote/route.ts',
    ],
    apiRoutes: ['/api/submit-quote', '/api/submit-booking'],
    howItWorks: 'Maps zip codes to businesses (Brooklyn Maids, Mesa Maids, Philly Maids, etc). Auto-sets site_business on contact/deal creation. Admin can filter calendar/reports by business then location. Mesa Maids serves Greater Phoenix Metro (Mesa, Phoenix, Scottsdale, Tempe, Chandler, Gilbert, Glendale, Peoria, Surprise) with Arizona zip codes 850-857.',
    dependencies: ['hubspot-integration'],
    hubspotProps: ['site_business', 'site_location'],
  },
  {
    id: 'provider-management',
    name: 'Provider Management System',
    category: 'core',
    status: 'complete',
    version: '1.5.0',
    description: 'Full CRUD for cleaning providers with colors, service areas, payment details',
    files: [
      'src/app/api/providers/route.ts',
      'src/components/dashboard/ProviderManagement.tsx',
      'src/components/dashboard/EditProviderForm.tsx',
    ],
    apiRoutes: ['/api/providers', '/api/providers/[id]'],
    howItWorks: 'Stores providers as HubSpot contacts with role=provider. Admins can add/edit/deactivate providers, set calendar colors, assign service areas, payment methods. Colors used in calendar for visual assignment tracking.',
    dependencies: ['hubspot-integration'],
    hubspotProps: [
      'role',
      'active',
      'service_areas',
      'calendar_color',
      'payment_method',
      'hourly_rate',
    ],
  },
  {
    id: 'booking-engine',
    name: 'Advanced Booking Engine',
    category: 'core',
    status: 'complete',
    version: '1.8.0',
    description: 'Complete booking system with 50+ fields, add-ons, pricing, discounts',
    files: [
      'src/lib/pricing-engine.ts',
      'src/config/add-ons.ts',
      'src/config/service-config.ts',
    ],
    apiRoutes: ['/api/submit-booking', '/api/submit-quote'],
    howItWorks: 'Calculates pricing based on service type, sqft, bedrooms, add-ons. Creates HubSpot deal with all booking details. Supports frequency discounts, promo codes, sales tax. Tracks extras (fridge, oven, laundry), excludes (baseboards, windows), and payment status.',
    dependencies: ['hubspot-integration'],
    hubspotProps: [
      'service_date',
      'service_type',
      'amount',
      'final_amount',
      'assigned_provider',
      'extras',
      'excludes',
      'discount_code',
      'sales_tax',
      'service_total',
      'discount_from_code',
      'discount_from_frequency',
      'amount_paid',
      'amount_owed',
    ],
  },

  // ============================================
  // DASHBOARD FEATURES
  // ============================================
  {
    id: 'admin-dashboard',
    name: 'Admin Dashboard',
    category: 'dashboard',
    status: 'complete',
    version: '1.0.0',
    description: 'Main admin interface with modern dark theme and v4 brand styling',
    files: [
      'src/components/dashboard/AdminDashboardModern.tsx',
      'src/components/dashboard/DashboardLayout.tsx',
      'src/styles/dashboard-dark.ts',
    ],
    apiRoutes: ['/api/hubspot/admin/deals', '/api/hubspot/admin/contacts', '/api/hubspot/admin/stats'],
    howItWorks: 'Central hub with tabbed navigation (Schedule, Bookings, Leads, Customers, Providers, Reports, Analytics, Employees, Features). Dark slate theme with gold accents. Client-side caching for performance. Role-based tab visibility.',
    dependencies: ['hubspot-integration'],
  },
  {
    id: 'fullcalendar-scheduling',
    name: 'FullCalendar Scheduling System',
    category: 'dashboard',
    status: 'complete',
    version: '1.9.0',
    description: 'Visual calendar with provider color-coding, day/job totals, filtering',
    files: ['src/components/dashboard/FullCalendarScheduling.tsx'],
    apiRoutes: ['/api/hubspot/admin/deals', '/api/providers'],
    howItWorks: 'FullCalendar displays confirmed bookings with provider colors. Shows "X jobs | $Y total" next to day number. Click booking opens drawer with full details. Provider sidebar shows all active providers with color coding. Filters by date, provider, business.',
    dependencies: ['provider-management', 'booking-engine'],
    hubspotProps: ['assigned_provider', 'assigned_provider_name', 'calendar_color', 'service_date', 'amount', 'dealstage'],
  },
  {
    id: 'leads-management',
    name: 'Leads Management Interface',
    category: 'dashboard',
    status: 'complete',
    version: '1.2.0',
    description: 'Track and convert quote requests to bookings',
    files: ['src/components/dashboard/LeadsManagementDark.tsx'],
    dependencies: ['hubspot-integration'],
  },
  {
    id: 'bookings-list-view',
    name: 'Bookings List View',
    category: 'dashboard',
    status: 'complete',
    version: '1.3.0',
    description: 'Table view of all bookings with filtering and bulk actions',
    files: ['src/components/dashboard/BookingsListView.tsx'],
    dependencies: ['booking-engine'],
  },
  {
    id: 'analytics-dashboard',
    name: 'Business Analytics Dashboard',
    category: 'dashboard',
    status: 'complete',
    version: '2.0.0',
    description: 'Comprehensive analytics with revenue, provider performance, service breakdowns',
    files: ['src/components/dashboard/AnalyticsDashboard.tsx'],
    dependencies: ['multi-business-manager', 'booking-engine', 'provider-management'],
  },
  {
    id: 'provider-dashboard',
    name: 'Provider Dashboard',
    category: 'dashboard',
    status: 'complete',
    version: '1.1.0',
    description: 'Individual provider view with their assigned jobs and schedule',
    files: [
      'src/components/dashboard/ProviderDashboard.tsx',
      'src/app/provider-dashboard/page.tsx',
    ],
    dependencies: ['provider-management', 'booking-engine'],
  },
  {
    id: 'admin-provider-detail',
    name: 'Admin Provider Detail Page',
    category: 'dashboard',
    status: 'complete',
    version: '2.1.0',
    description: 'Admin view of specific provider with stats, bookings, and payout tracking',
    files: [
      'src/components/dashboard/AdminProviderDetail.tsx',
      'src/app/admin-dashboard/provider/[id]/page.tsx',
    ],
    apiRoutes: ['/api/providers', '/api/hubspot/admin/deals'],
    howItWorks: 'Loads provider by ID from HubSpot contacts, filters all deals by assigned_provider matching the ID. Shows stats (total bookings, completed, upcoming, revenue, payout). Clickable provider names in booking drawer link here.',
    dependencies: ['provider-management', 'analytics-dashboard'],
    hubspotProps: ['assigned_provider', 'assigned_provider_name', 'provider_payment', 'service_date', 'dealstage', 'amount'],
  },
  {
    id: 'drawer-detail-views',
    name: 'Right-Side Drawer Detail Views',
    category: 'ui',
    status: 'complete',
    version: '1.6.0',
    description: 'Slide-out drawers for booking/lead/provider details instead of modals',
    files: [
      'src/components/dashboard/EnhancedBookingDetail.tsx',
      'src/components/dashboard/LeadDetailDrawer.tsx',
    ],
    howItWorks: 'Clicking booking/lead opens right-side drawer with full details. Calendar/background stays visible and interactive. Includes editable notes, Send Payment Link, Cancel/Charge buttons. Drawer scrolls with custom scrollbars.',
    dependencies: ['admin-dashboard'],
  },
  {
    id: 'booking-edit-form',
    name: 'In-App Booking Edit Form',
    category: 'dashboard',
    status: 'complete',
    version: '1.7.0',
    description: 'Edit all booking details within the app (no HubSpot redirect)',
    files: ['src/components/dashboard/EditBookingForm.tsx'],
    dependencies: ['booking-engine'],
  },

  // ============================================
  // INTEGRATION FEATURES
  // ============================================
  {
    id: 'openphone-sms',
    name: 'OpenPhone SMS Integration',
    category: 'integration',
    status: 'complete',
    version: '1.4.0',
    description: '17 SMS notification endpoints for customers, providers, and admins',
    files: [
      'src/lib/notifications.ts',
      'brooklyn-bot crm test/server.js',
      'src/app/test-sms/page.tsx',
    ],
    apiRoutes: [
      '/sms/booking-confirmation', '/sms/booking-reminder', '/sms/provider-assignment',
      '/sms/provider-job-reminder', '/sms/booking-cancellation', '/sms/booking-rescheduled',
      '/sms/payment-received', '/sms/payment-reminder', '/sms/quote-received',
      '/sms/booking-change-notification', '/sms/provider-change-notification',
      '/sms/admin-new-booking', '/sms/admin-cancellation', '/sms/admin-urgent'
    ],
    howItWorks: 'Brooklyn bot (Node.js server) runs on Heroku. Next.js calls these endpoints with booking details. Bot formats messages and sends via OpenPhone API. Each business has its own phone number in OpenPhone.',
    dependencies: [],
  },
  {
    id: 'quote-form-api',
    name: 'Quote Request Form & API',
    category: 'integration',
    status: 'complete',
    version: '1.0.0',
    description: 'Public quote form with SMS notifications and HubSpot sync',
    files: [
      'src/app/test-quote/page.tsx',
      'src/app/api/submit-quote/route.ts',
    ],
    dependencies: ['hubspot-integration', 'openphone-sms', 'multi-business-manager'],
  },
  {
    id: 'booking-form-api',
    name: 'Direct Booking Form & API',
    category: 'integration',
    status: 'complete',
    version: '1.0.0',
    description: 'Public booking form for confirmed reservations',
    files: [
      'src/app/test-booking/page.tsx',
      'src/app/api/create-booking/route.ts',
    ],
    dependencies: ['hubspot-integration', 'booking-engine'],
  },
  {
    id: 'csv-import-system',
    name: 'CSV Import System',
    category: 'integration',
    status: 'complete',
    version: '1.5.0',
    description: 'Import providers, customers, and bookings from CSV files',
    files: [
      'scripts/import-providers.ts',
      'scripts/import-bookings.ts',
      'scripts/import-future-bookings.ts',
    ],
    dependencies: ['hubspot-integration'],
  },

  // ============================================
  // AUTOMATION FEATURES
  // ============================================
  {
    id: 'auto-business-detection',
    name: 'Automatic Business Detection',
    category: 'automation',
    status: 'complete',
    version: '2.0.0',
    description: 'Auto-detects which business entity from customer zip code',
    files: ['src/config/zip-business-mapping.ts', 'src/app/api/submit-quote/route.ts'],
    dependencies: ['multi-business-manager'],
  },
  {
    id: 'pricing-calculator',
    name: 'Real-Time Pricing Calculator',
    category: 'automation',
    status: 'complete',
    version: '1.8.0',
    description: 'Live pricing with discounts, add-ons, frequency, taxes, tips',
    files: ['src/lib/pricing-engine.ts', 'src/config/add-ons.ts'],
    dependencies: [],
  },
  {
    id: 'provider-assignment',
    name: 'Provider Assignment System',
    category: 'automation',
    status: 'complete',
    version: '1.9.0',
    description: 'Assign/reassign providers with calendar color-coding',
    files: [
      'src/components/dashboard/FullCalendarScheduling.tsx',
      'src/app/api/hubspot/assign-provider/route.ts',
    ],
    dependencies: ['provider-management', 'fullcalendar-scheduling'],
  },
  {
    id: 'dashboard-caching',
    name: 'Client-Side Dashboard Caching',
    category: 'automation',
    status: 'complete',
    version: '1.8.0',
    description: 'In-memory caching for faster dashboard loads',
    files: ['src/lib/cache.ts', 'src/components/dashboard/AdminDashboardModern.tsx'],
    dependencies: ['admin-dashboard'],
  },

  // ============================================
  // UI/UX FEATURES
  // ============================================
  {
    id: 'dark-theme',
    name: 'Modern Dark Theme UI',
    category: 'ui',
    status: 'complete',
    version: '1.0.0',
    description: 'Custom dark theme with v4 brand colors and gold accents',
    files: [
      'src/styles/dashboard-dark.ts',
      'src/styles/colors.ts',
      'src/styles/typography.ts',
      'src/styles/layouts.ts',
    ],
    dependencies: [],
  },
  {
    id: 'custom-scrollbars',
    name: 'Custom Scrollbar Styling',
    category: 'ui',
    status: 'complete',
    version: '1.6.0',
    description: 'Consistent dark-themed scrollbars across all browsers',
    files: ['src/app/globals.css'],
    dependencies: ['dark-theme'],
  },
  {
    id: 'responsive-design',
    name: 'Responsive Mobile Design',
    category: 'ui',
    status: 'complete',
    version: '1.0.0',
    description: 'Mobile-optimized layouts for all dashboard pages',
    files: ['src/components/**/*, src/styles/**/*'],
    dependencies: [],
  },

  // ============================================
  // SEO FEATURES
  // ============================================
  {
    id: 'seo-homepage-domination',
    name: 'Homepage SEO Domination Strategy',
    category: 'seo',
    status: 'complete',
    version: '3.0.0',
    description: 'Consolidated all location authority to homepage with 100+ 301 redirects',
    files: ['next.config.ts', 'src/app/layout.tsx', 'public/robots.txt'],
    dependencies: [],
  },
  {
    id: 'seo-location-consolidation',
    name: 'Location Page Consolidation',
    category: 'seo',
    status: 'complete',
    version: '3.0.0',
    description: 'Reduced from 88 pages to 9 strategic location pages',
    files: ['src/lib/locations.ts', 'src/app/locations/[slug]/page.tsx'],
    dependencies: ['seo-homepage-domination'],
  },
  {
    id: 'seo-service-optimization',
    name: 'Service Page SEO Optimization',
    category: 'seo',
    status: 'complete',
    version: '3.0.0',
    description: 'Geographic context on all service pages for location-based ranking',
    files: [
      'src/components/AreasWeServeSection.tsx',
      'src/app/services/*/page.tsx',
    ],
    dependencies: [],
  },
  {
    id: 'seo-structured-data',
    name: 'Structured Data Implementation',
    category: 'seo',
    status: 'complete',
    version: '3.0.0',
    description: 'JSON-LD structured data for LocalBusiness, Service, and Review',
    files: ['src/components/StructuredData.tsx', 'src/app/layout.tsx'],
    dependencies: [],
  },
  {
    id: 'event-cleaning-service',
    name: 'Event Cleaning Service Page',
    category: 'seo',
    status: 'complete',
    version: '4.0.0',
    description: 'Dedicated event cleaning service page (52,499 impressions). Pre-event, during-event, and post-event cleaning services.',
    files: [
      'src/app/services/event-cleaning/page.tsx',
      'src/app/services/event-cleaning/quote/page.tsx',
      'src/components/EventCleaningService.tsx',
      'src/components/service-specific/EventCleaningHero.tsx',
      'src/components/service-specific/EventFAQSection.tsx',
    ],
    dependencies: ['seo-service-optimization'],
    howItWorks: 'Standalone service page capturing high-value event cleaning traffic. Includes pre-event setup, during-event support, and post-event cleanup services. Added to sitemap and service navigation.',
  },

  // ============================================
  // PLANNED/PARTIAL FEATURES
  // ============================================
  {
    id: 'stripe-payments',
    name: 'Stripe Payment Processing',
    category: 'integration',
    status: 'partial',
    version: '2.0.0',
    description: 'Structure exists for payment tracking, Stripe integration pending',
    files: ['src/app/api/process-payment/route.ts (planned)'],
    dependencies: ['booking-engine'],
    hubspotProps: ['amount_paid', 'amount_owed', 'stripe_transaction_id'],
  },
  {
    id: 'email-automation',
    name: 'HubSpot Email Automation',
    category: 'automation',
    status: 'planned',
    version: '2.1.0',
    description: 'HubSpot workflows for booking confirmations, reminders, receipts',
    files: [],
    dependencies: ['hubspot-integration'],
  },
  {
    id: 'recurring-bookings',
    name: 'Recurring Booking Automation',
    category: 'automation',
    status: 'planned',
    version: '2.2.0',
    description: 'Auto-create future bookings for weekly/bi-weekly/monthly services',
    files: [],
    dependencies: ['booking-engine', 'hubspot-integration'],
  },
  {
    id: 'customer-ratings',
    name: 'Customer Rating & Review System',
    category: 'core',
    status: 'partial',
    version: '2.0.0',
    description: 'Structure exists for ratings, UI for collection pending',
    files: [],
    dependencies: ['booking-engine'],
    hubspotProps: ['rating_value', 'rating_comment'],
  },
  {
    id: 'employee-management',
    name: 'Employee Management System',
    category: 'core',
    status: 'complete',
    version: '2.2.0',
    description: 'Role-based access control with employee/admin management',
    files: [
      'src/config/roles.ts',
      'src/components/dashboard/EmployeeManagement.tsx',
      'src/app/api/employees/route.ts',
      'src/app/api/employees/[id]/route.ts',
    ],
    apiRoutes: ['/api/employees', '/api/employees/[id]'],
    howItWorks: 'Three roles: super_admin (full access), admin (most features), employee (limited access). Employees stored as HubSpot contacts with role property. Dashboard navigation filters based on permissions defined in roles.ts. Super admins can create/edit/deactivate employees.',
    dependencies: ['hubspot-integration', 'admin-dashboard'],
    hubspotProps: ['role', 'active', 'last_login'],
  },
  {
    id: 'authentication',
    name: 'User Authentication System',
    category: 'core',
    status: 'complete',
    version: '3.0.0',
    description: 'NextAuth.js v5 with Google OAuth, email/password, and magic links. Account merging by email. Role-based access control.',
    files: [
      'src/lib/auth.ts',
      'src/app/api/auth/[...nextauth]/route.ts',
      'src/app/api/auth/register/route.ts',
      'src/app/login/page.tsx',
      'src/app/register/page.tsx',
      'src/middleware.ts',
      'sql/schema.sql',
    ],
    apiRoutes: [
      '/api/auth/signin',
      '/api/auth/signout',
      '/api/auth/callback',
      '/api/auth/register',
      '/api/auth/session',
    ],
    howItWorks: 'NextAuth.js with Supabase Postgres adapter. Three login methods: Google OAuth (auto-links accounts by email), email/password (bcrypt hashed), magic links (Resend email). Middleware protects /admin-dashboard, /provider-dashboard, /customer-dashboard routes. Session syncs with HubSpot to fetch user role. 30-day session persistence. Auto-creates customer accounts when bookings/quotes are submitted - customers can immediately log in with magic link or Google.',
    dependencies: ['hubspot-integration'],
    hubspotProps: ['role', 'email'],
  },
];

/**
 * Get features by category
 */
export function getFeaturesByCategory(category: Feature['category']): Feature[] {
  return FEATURES.filter((f) => f.category === category);
}

/**
 * Get features by status
 */
export function getFeaturesByStatus(status: Feature['status']): Feature[] {
  return FEATURES.filter((f) => f.status === status);
}

/**
 * Get feature by ID
 */
export function getFeatureById(id: string): Feature | undefined {
  return FEATURES.find((f) => f.id === id);
}

/**
 * Get features that depend on a given feature
 */
export function getDependentFeatures(featureId: string): Feature[] {
  return FEATURES.filter((f) => f.dependencies?.includes(featureId));
}

/**
 * Get completion percentage
 */
export function getCompletionStats() {
  const total = FEATURES.length;
  const complete = FEATURES.filter((f) => f.status === 'complete').length;
  const partial = FEATURES.filter((f) => f.status === 'partial').length;
  const planned = FEATURES.filter((f) => f.status === 'planned').length;

  return {
    total,
    complete,
    partial,
    planned,
    percentage: Math.round((complete / total) * 100),
  };
}

