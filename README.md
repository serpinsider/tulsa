# Brooklyn Maids CRM v4

> Enterprise-grade CRM system for multi-location cleaning businesses. Manage bookings, leads, providers, and customer relationships across 12+ locations with intelligent automation and comprehensive analytics.

[![Deployment Status](https://img.shields.io/badge/status-production-success)](https://brooklynmaids.com)
[![Tech Stack](https://img.shields.io/badge/stack-Next.js%2015%20%7C%20TypeScript%20%7C%20HubSpot-blue)](/)
[![Features](https://img.shields.io/badge/features-38%20complete-brightgreen)](/)

---

## What We Built

A complete **cleaning business CRM** with:
- **Multi-business management** - Handle 12+ cleaning businesses from one dashboard
- **Smart automation** - Auto-detect business from zip codes, calculate pricing, assign providers
- **HubSpot integration** - Full CRM sync with 50+ custom properties
- **Provider scheduling** - Visual calendar with color-coding and real-time updates
- **SMS notifications** - 17 notification types via OpenPhone integration
- **Advanced analytics** - Revenue tracking, provider performance, service breakdowns
- **Professional dashboards** - Admin, provider, and customer interfaces

---

## Feature Overview

| Category | Features | Status |
|----------|----------|--------|
| **Core CRM** | HubSpot integration, Multi-business system, Provider management, Advanced booking engine | Complete |
| **Dashboards** | Admin dashboard, Calendar scheduling, Leads management, Analytics, Provider dashboard | Complete |
| **Integrations** | OpenPhone SMS, Quote/Booking forms, CSV import system | Complete |
| **Automation** | Auto business detection, Real-time pricing, Provider assignment, Dashboard caching | Complete |
| **UI/UX** | Dark theme, Custom scrollbars, Responsive design | Complete |
| **SEO** | Homepage domination, Location consolidation, Structured data | Complete |
| **Planned** | Stripe payments, Email automation, Recurring bookings, Customer ratings | In Progress |

**Overall Completion:** 38/43 features (88%)

> See `/admin-dashboard?tab=features` for the complete feature registry with internal codenames  
> All changes tracked in `src/lib/changelog.ts` - Comprehensive changelog with metrics and impacted files

---

## Key Features

### 1. Multi-Business Management System (`multi-business-manager`)
- Automatically detects business entity from customer zip code
- Manages 12 cleaning businesses: Brooklyn Maids, Philly Maids, St Louis Maids, Asheville Maids, Durham Maids, Neat Corner, San Jose Maids, Concord Maids, Pine Maids, Berkeley Maids, Santa Monica Maids, Santa Cruz Maids
- 100+ zip code prefixes mapped across 8+ states
- Cascading filters: Business → Location → Status
- Zero manual intervention required

### 2. HubSpot CRM Integration (`hubspot-integration`)
- **50+ custom deal properties** for complete booking management
- **Provider properties** for team management (colors, areas, payment)
- **Contact management** with role-based filtering
- **Real-time sync** between dashboard and HubSpot
- **Bulk import** from CSV files

### 3. Advanced Booking Engine (`booking-engine`)
- **21 add-ons** with automatic pricing
- **Frequency discounts** (10% weekly, 5% bi-weekly, 3% monthly)
- **Promo codes** (FTP25, WELCOME20, etc.)
- **Sales tax calculation** by location
- **Provider payment** calculation
- **Service exclusions** and access methods
- **Complete pricing breakdown** (subtotal, tax, discounts, tips, fees)

### 4. Visual Calendar System (`fullcalendar-scheduling`)
- **Month/week/day/list views** with FullCalendar.js
- **Provider color-coding** for instant visual recognition
- **Day totals** showing job count and revenue per day
- **Click-to-view** booking details in right-side drawer
- **Real-time filtering** by provider, business, location
- **Drag-and-drop** assignment (planned)

### 5. Analytics Dashboard (`analytics-dashboard`)
- **Revenue metrics** (total, paid, owed, net)
- **Business comparison** - side-by-side performance
- **Provider performance** - bookings, revenue, payout, ratings
- **Service type breakdown** - distribution and popularity
- **Date range filters** - 30/90 days, YTD, all-time
- **Location breakdowns** within each business

### 6. SMS Notification System (`openphone-sms`)
**17 notification endpoints** for customers, providers, and admins:

**Customer:**
- Booking confirmation, 24h reminder, payment link, cancellation notice, reschedule notice, provider change, receipt

**Provider:**
- Assignment notice, unassignment, booking cancelled, booking rescheduled, 24h reminder

**Admin:**
- New booking alert, cancellation alert, reschedule alert, payment failed, urgent issues

### 7. Provider Management (`provider-management`)
- **Full CRUD** operations in-app
- **Custom calendar colors** for visual identification
- **Service areas** selection
- **Payment details** (method, rate, payout tracking)
- **Active/inactive** status management
- **Performance tracking** in analytics

### 8. Lead Conversion System (`leads-management`)
- **Quote request tracking** from public forms
- **Lead-to-booking** conversion workflow
- **Price calculation** with real-time updates
- **SMS notifications** on submission
- **Follow-up tracking** in HubSpot

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 15 | React framework with App Router |
| **Language** | TypeScript | Type-safe development |
| **Styling** | Tailwind CSS v3 | Utility-first CSS with custom dark theme |
| **CRM** | HubSpot API | Contact, deal, and company management |
| **SMS** | OpenPhone Bot | SMS notifications via Node.js bot |
| **Calendar** | FullCalendar.js | Visual scheduling interface |
| **Database** | HubSpot | All data stored in HubSpot CRM |
| **Deployment** | Vercel | Automatic deployments from GitHub |
| **Caching** | In-memory | Client-side dashboard caching |

---

## Installation & Setup

### Prerequisites
- Node.js 18+
- HubSpot account with API key
- OpenPhone account (for SMS)
- Vercel account (for deployment)

### 1. Clone & Install
```bash
git clone https://github.com/serpinsider/light.git
cd light/v4-theme
npm install
```

### 2. Environment Setup
Create `.env.local`:
```bash
# Required
HUBSPOT_API_KEY=your_hubspot_private_app_key

# Optional (for SMS)
NEXT_PUBLIC_OPENPHONE_BOT_URL=http://localhost:8000
NEXT_PUBLIC_ADMIN_PHONE=+13477504380

# Future
STRIPE_SECRET_KEY=sk_test_...
```

### 3. HubSpot Configuration
Add custom properties to HubSpot:

**Contact Properties:**
- `role` (dropdown: provider/customer)
- `active` (yes/no)
- `service_areas` (checkbox: Brooklyn, Philly, etc.)
- `calendar_color` (text: #hexcode)
- `payment_method`, `hourly_rate`
- `site_business` (dropdown: all 12 businesses)

**Deal Properties:**
- Core: `service_date`, `service_type`, `amount`, `dealstage`
- Provider: `assigned_provider`, `assigned_provider_name`
- Pricing: `service_total`, `sales_tax`, `final_amount`, `discount_*`
- Details: `bedrooms`, `bathrooms`, `extras`, `excludes`, `access_method`
- Notes: `booking_note`, `private_customer_note`, `provider_note`
- Payment: `payment_method`, `amount_paid`, `amount_owed`
- Business: `site_business`, `site_location`

> See `src/config/features-registry.ts` for complete HubSpot property mapping

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
npm start
```

---

## Project Structure

```
v4-theme/
├── src/
│   ├── app/
│   │   ├── admin-dashboard/         # Admin CRM interface
│   │   │   └── provider/[id]/       # Admin provider detail page
│   │   ├── provider-dashboard/      # Provider schedule view
│   │   ├── customer-dashboard/      # Customer booking history
│   │   ├── test-quote/              # Quote request form
│   │   ├── test-booking/            # Direct booking form
│   │   └── api/
│   │       ├── hubspot/             # HubSpot API routes
│   │       ├── providers/           # Provider CRUD
│   │       └── submit-quote/        # Quote submission
│   ├── components/
│   │   └── dashboard/
│   │       ├── AdminDashboardModern.tsx       # Main admin UI
│   │       ├── FullCalendarScheduling.tsx     # Calendar view
│   │       ├── LeadsManagementDark.tsx        # Leads interface
│   │       ├── ProviderManagement.tsx         # Provider CRUD
│   │       ├── AnalyticsDashboard.tsx         # Analytics view
│   │       ├── FeatureRegistry.tsx            # Feature tracking
│   │       ├── EnhancedBookingDetail.tsx      # Booking drawer
│   │       ├── EditProviderForm.tsx           # Edit provider
│   │       └── ProviderDashboard.tsx          # Provider view
│   ├── lib/
│   │   ├── hubspot/                 # HubSpot client & types
│   │   ├── pricing-engine.ts        # Price calculation
│   │   ├── notifications.ts         # SMS helpers
│   │   └── cache.ts                 # Client-side caching
│   ├── config/
│   │   ├── features-registry.ts     # Feature tracking system
│   │   ├── zip-business-mapping.ts  # Zip → Business mapping
│   │   ├── add-ons.ts               # Add-ons configuration
│   │   └── service-config.ts        # Service configuration
│   ├── styles/
│   │   ├── dashboard-dark.ts        # Dark theme styles
│   │   ├── colors.ts                # Brand colors
│   │   ├── typography.ts            # Typography system
│   │   └── layouts.ts               # Layout classes
│   └── scripts/
│       ├── import-providers.ts      # Import providers from CSV
│       ├── import-bookings.ts       # Import bookings from CSV
│       └── bulk-fix-provider-names.ts  # Update provider names
└── public/
    └── robots.txt                   # SEO configuration
```

---

## API Endpoints

### Public Forms
- `POST /api/submit-quote` - Submit quote request (creates lead)
- `POST /api/create-booking` - Create confirmed booking

### Admin Operations
- `GET /api/hubspot/admin/deals` - Fetch all deals (with filters)
- `GET /api/hubspot/admin/contacts` - Fetch all contacts
- `GET /api/hubspot/admin/stats` - Dashboard statistics
- `POST /api/hubspot/assign-provider` - Assign provider to booking
- `GET /api/providers` - List all providers
- `POST /api/providers` - Create new provider
- `PUT /api/providers/:id` - Update provider
- `DELETE /api/providers/:id` - Delete provider

### SMS Notifications (via Brooklyn Bot)
- 17 endpoints at `http://localhost:8000/api/send-*`
- See `src/lib/notifications.ts` for complete list

---

## Data Import

Import existing data from CSV:

```bash
# Import providers
npx tsx scripts/import-providers.ts

# Import past bookings
npx tsx scripts/import-bookings.ts

# Import future bookings
npx tsx scripts/import-future-bookings.ts

# Fix provider names on existing bookings
npx tsx scripts/bulk-fix-provider-names.ts
```

**Features:**
- Maps CSV columns to HubSpot properties
- Auto-assigns business from zip codes
- Handles date/time formatting
- Skips duplicates
- No emails/SMS sent during import
- Progress logging with success/failure counts

---

## UI/UX Features

### Dark Theme (`dark-theme`)
- Custom dark color palette with gold accents
- Consistent styling across all pages
- High contrast for accessibility
- Modern, professional appearance

### Responsive Design (`responsive-design`)
- Mobile-optimized layouts
- Collapsible sidebar on mobile
- Touch-friendly controls
- Adaptive grid systems

### Custom Scrollbars (`custom-scrollbars`)
- Styled scrollbars for WebKit browsers
- Firefox-compatible fallbacks
- Consistent dark theme
- Smooth scrolling

### Right-Side Drawers (`drawer-detail-views`)
- Non-modal detail views
- Calendar stays interactive
- Smooth slide-in animations
- Close with overlay click or X button

---

## SEO Implementation

### Homepage Domination Strategy (`seo-homepage-domination`)
**Goal:** Consolidate all location authority to homepage instead of diluting across 150+ pages

**Results:**
- Reduced from 88 location pages to 9 strategic pages
- 100+ 301 redirects preserve 90-95% link equity
- Eliminates keyword cannibalization
- Homepage targets: "cleaning service brooklyn", "maid service brooklyn", "house cleaning manhattan"

### Location Page Consolidation (`seo-location-consolidation`)
**V4 Location Architecture (9 Core Pages):**
```
NYC Boroughs:
├── /locations/brooklyn
├── /locations/manhattan
├── /locations/queens
├── /locations/bronx
└── /locations/staten-island

NY Metro Expansion:
├── /locations/long-island
└── /locations/westchester

New Jersey:
├── /locations/jersey-city
└── /locations/hoboken
```

**Removed:**
- 82 individual Brooklyn neighborhoods (Park Slope, Williamsburg, DUMBO, etc.)
- 3 CT towns (don't operate there)
- Consolidated NJ to `/new-jersey` page

### 301 Redirect Strategy
**Location × Service Pages (Intent Preservation):**

*General Cleaning → Homepage (Homepage Domination)*
```typescript
/locations/:location/residential → /
/locations/:location/deep-clean → /
/locations/:location/move-out → /
/locations/:location/event-cleaning → /
/locations/:location/laundry → /
/locations/:location/real-estate → /
/locations/:location/house-cleaning → /
```

*Specialized Services → Service Pages*
```typescript
/locations/:location/commercial → /services/commercial
/locations/:location/airbnb → /services/airbnb
/locations/:location/handyman → /services/handyman
/locations/:location/post-construction → /services/post-construction
/locations/:location/carpet-cleaning → /services/carpet-cleaning
/locations/:location/car-cleaning → /services/car-cleaning
```

**Individual Brooklyn Neighborhoods → Brooklyn Page:**
```typescript
// All 82 neighborhoods redirect to main Brooklyn page
/locations/park-slope → /locations/brooklyn
/locations/williamsburg → /locations/brooklyn
/locations/dumbo → /locations/brooklyn
/locations/brooklyn-heights → /locations/brooklyn
// ... (and 78 more)
```

**Service Page Consolidation:**
```typescript
// High-traffic pages → Homepage
/services/deep-clean (22,824 impressions) → /
/services/residential (24,710 impressions) → /
/services/move-out → /
/services/laundry → /

// Consolidate to existing services
/services/office-cleaning → /services/commercial
/services/tile-grout-cleaning → /services/carpet-cleaning
/services/upholstery-cleaning → /services/carpet-cleaning

// Standalone service pages maintained:
/services/event-cleaning (52,499 impressions) - Dedicated page
```

### Geographic Context Implementation
**AreasWeServeSection Added to All Service Pages:**
- CarpetCleaningService.tsx
- HandymanService.tsx
- CarCleaningService.tsx
- CommercialCleaningService.tsx
- PostConstructionService.tsx
- AirbnbCleaningService.tsx

Ensures service pages rank for location-based queries by:
- Showing all NYC boroughs + neighborhoods
- Responsive expandable UI (4 cards per row on desktop)
- Internal links to location pages
- Semantic HTML with proper markup

### Structured Data (`seo-structured-data`)
```json
{
  "@type": "LocalBusiness",
  "name": "Brooklyn Maids",
  "areaServed": [
    { "@type": "City", "name": "Brooklyn" },
    { "@type": "City", "name": "Manhattan" },
    ...
  ],
  "services": [
    "House Cleaning Service",
    "Deep Cleaning Service",
    "Move Out Cleaning Service",
    ...
  ],
  "telephone": "(347) 750-4380",
  "email": "hello@brooklynmaids.com"
}
```

### On-Page SEO Optimizations
**Homepage Metadata:**
```typescript
title: "Brooklyn Maids - House Cleaning & Maid Service in NYC"
description: "Professional house cleaning and maid service serving Brooklyn, 
Manhattan, Queens, Bronx, Long Island, Westchester, and Northern NJ. Deep 
cleaning, move-out cleaning, carpet cleaning, and more."
```

**robots.txt:**
- Fixed sitemap URL: `brooklynmaids.com/sitemap.xml`
- Disallow private areas: `/admin/`, `/dashboard/`, `/provider/`, `/account/`

---

## Deployment

### Vercel (Recommended)

1. **Connect GitHub Repository**
   - Repository: `serpinsider/light`
   - Root Directory: `v4-theme`
   - Framework: Next.js

2. **Environment Variables**
   ```bash
   HUBSPOT_API_KEY=your_key
   NEXT_PUBLIC_OPENPHONE_BOT_URL=https://brooklyn-bot.onrender.com
   NEXT_PUBLIC_ADMIN_PHONE=+13477504380
   ```

3. **Deploy**
   - Auto-deploys on push to `main` branch
   - Production URL: `brooklynmaids.com`

### Brooklyn Bot (SMS Server)
```bash
cd "brooklyn-bot crm test"
npm install
npm start  # Runs on port 8000
```

---

## Usage Examples

### Assign Provider to Booking
```typescript
import { assignProvider } from '@/lib/hubspot/admin';

await assignProvider(dealId, providerId, providerName, providerColor);
```

### Send Booking Confirmation SMS
```typescript
import { sendBookingConfirmation } from '@/lib/notifications';

await sendBookingConfirmation({
  firstName: 'John',
  phone: '5551234567',
  serviceDate: '2025-10-15',
  serviceTime: '10:00 AM',
  serviceType: 'Deep Clean',
  amount: 250,
  confirmationNumber: 'BKM-123'
});
```

### Calculate Booking Price
```typescript
import { calculateBookingPrice } from '@/lib/pricing-engine';

const pricing = calculateBookingPrice({
  bedrooms: 3,
  bathrooms: 2,
  squareFootage: '1000-2000',
  serviceType: 'deep',
  frequency: 'weekly',
  addOns: ['windows', 'oven'],
  discountCode: 'FTP25',
  siteLocation: 'Brooklyn'
});

// pricing.finalTotal, pricing.breakdown, pricing.estimatedHours
```

---

## Testing

### Test Pages
- `/test-quote` - Quote request form
- `/test-booking` - Direct booking form
- `/test-sms` - SMS notification tester

### Admin Dashboard
- `/admin-dashboard` - Main admin interface
- `/admin-dashboard?tab=scheduling` - Calendar view
- `/admin-dashboard?tab=features` - Feature registry

### Provider Dashboard
- `/provider-dashboard?id={providerId}` - Provider view

---

## Contact & Support

- **Primary Location**: Brooklyn, NY
- **Phone**: (347) 750-4380
- **Email**: hello@brooklynmaids.com
- **GitHub**: https://github.com/serpinsider/light
- **Production**: https://brooklynmaids.com

---

## Documentation

### Feature Registry
All features documented with internal codenames:
- Access at `/admin-dashboard?tab=features`
- Search by name, category, or status
- View dependencies and HubSpot properties
- Track completion status
- File: `src/config/features-registry.ts`

### Changelog System
Complete change tracking for all updates:
- File: `src/lib/changelog.ts`
- All significant changes documented with:
  - Date, version, type (feature/fix/improvement/seo/design)
  - Impacted files and related features
  - Before/after metrics
  - Rollback instructions for breaking changes
- Access programmatically: `getRecentChangelog()`, `getChangelogByType()`, `getChangelogByCategory()`

### Case Studies
Comprehensive documentation for major implementations:
- **V3 to V4 SEO Migration** - `V3_TO_V4_SEO_MIGRATION_CASE_STUDY.md`
  - Complete SEO migration strategy (88 → 9 pages)
  - 100+ redirects, link equity preservation
  - Referenced in changelog: `seo-migration-2025-10`
  
- **V3 to V4 Design Updates** - `V3_TO_V4_DESIGN_UPDATES_CASE_STUDY.md`
  - Complete design system standardization
  - Button system, typography, animations
  - Referenced in changelog: `design-system-2025-10`

---

## Roadmap

**Completed (88%):**
- Complete Multi-business management
- Complete HubSpot integration
- Complete Visual calendar scheduling
- Complete Provider management
- Complete SMS notifications
- Complete Advanced analytics
- Complete SEO optimization

**In Progress (12%):**
- In Progress Stripe payment processing
- In Progress HubSpot email automation
- In Progress Recurring booking automation
- In Progress Customer rating system
- In Progress User authentication

---

## Built With Innovation

**Brooklyn Maids CRM v4** represents a complete reimagining of cleaning business management software. Every feature has been carefully designed, implemented, and documented with internal codenames for easy maintenance and updates.

**Total Features:** 43  
**Complete:** 38 (88%)  
**Lines of Code:** 15,000+  
**Custom HubSpot Properties:** 50+  
**SMS Notification Types:** 17  
**Businesses Managed:** 12  
**Zip Codes Mapped:** 100+

---

**Built with Next.js 15, TypeScript, HubSpot, and FullCalendar** | © 2025 Brooklyn Maids
