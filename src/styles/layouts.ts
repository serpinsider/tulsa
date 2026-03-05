/**
 * Layout Standards - Tulsa Maids
 * 
 * Centralized layout classes for sections, containers, and spacing.
 */

export const LAYOUTS = {
  // ===== SECTION LAYOUTS =====
  
  section: {
    // Standard section
    base: "py-20",
    
    // Section with primary background
    primary: "py-20",
    
    // Section with secondary background
    secondary: "py-20",
    
    // Hero section - header overlays it, extra top padding for header clearance
    hero: "relative pt-60 pb-20 lg:pt-64 lg:pb-24 overflow-hidden",
  },
  
  // ===== CONTAINERS =====
  
  container: {
    // Standard max-width container
    standard: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    
    // Narrow container (for text-heavy content)
    narrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
    
    // Wide container
    wide: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
    
    // Form container
    form: "max-w-4xl mx-auto px-4",
  },
  
  // ===== SECTION HEADERS =====
  
  sectionHeader: {
    // Standard section header
    base: "text-center mb-16",
    
    // Narrow section header
    narrow: "text-center mb-12",
  },
  
  // ===== GRIDS =====
  
  grid: {
    // 2 columns
    two: "grid md:grid-cols-2 gap-8",
    
    // 3 columns
    three: "grid md:grid-cols-1 lg:grid-cols-3 gap-8",
    
    // 4 columns
    four: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
    
    // Service cards (3 columns, wider)
    serviceCards: "grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto",
    
    // Reviews (3 columns)
    reviews: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12",
    
    // FAQ (single column)
    faq: "space-y-4",
  },
  
  // ===== CARDS =====
  
  card: {
    // Standard service card
    service: "bg-[rgba(22,48,75,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8 hover:bg-[rgba(22,48,75,0.98)] hover:shadow-2xl hover:shadow-black/30 transition-all relative flex flex-col h-full",
    
    // Review card
    review: "bg-[rgba(22,48,75,0.95)] backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10 hover:bg-[rgba(22,48,75,0.98)] hover:shadow-2xl hover:shadow-black/30 transition-all",
    
    // FAQ item
    faq: "bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden",
    
    // Info card (for "What We Provide" etc)
    info: "bg-white/10 rounded-lg p-6 border border-white/20",
  },
  
  // ===== HERO SPECIFIC =====
  
  hero: {
    // Hero content container
    content: "relative gap-16 xl:gap-20",
    contentExpanded: "flex justify-center items-start",
    contentNormal: "grid grid-cols-1 lg:grid-cols-2 items-center",
    
    // Hero text container
    textContainer: "text-center lg:text-left transition-all duration-500 ease-out",
    textHidden: "opacity-0 pointer-events-none scale-95 absolute",
    textVisible: "opacity-100 pointer-events-auto scale-100 relative",
    
    // Quote form container
    formContainer: "quote-form-container transition-all duration-500 ease-out",
    formExpanded: "w-full max-w-[98%] md:max-w-3xl mx-auto",
    formNormal: "w-full max-w-lg mx-auto lg:mx-0",
    
    // Form card
    formCard: "bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-4 sm:p-6 relative w-full min-w-0 sm:min-w-[400px]",
  },
  
  // ===== SPACING =====
  
  spacing: {
    // Section spacing
    sectionGap: "space-y-8",
    sectionGapLarge: "space-y-12",
    
    // Card content spacing
    cardContent: "space-y-4",
    cardContentSmall: "space-y-2",
    
    // Form spacing
    formFields: "space-y-6",
    formFieldsSmall: "space-y-4",
  },
};

/**
 * Inline style objects for backgrounds
 */
export const INLINE_STYLES = {
  primary: { background: 'rgba(26, 55, 85, 0.95)' },
  secondary: { background: 'rgba(26, 55, 85, 0.95)' },
};

