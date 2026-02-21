/**
 * Typography Standards - Base Theme
 * 
 * Centralized typography classes to ensure consistency across the entire site.
 * All classes use hardcoded hex colors that match CSS variables in globals.css
 */

export const TYPOGRAPHY = {
  // ===== PAGE & SECTION TITLES =====
  
  // Hero title - uses CSS class from globals.css for gold gradient
  heroTitle: "hero-title font-serif mb-6",
  
  // Main page title (H1)
  pageTitle: "text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[#dfbd69] mb-6 drop-shadow-lg",
  
  // Section title (H2)
  sectionTitle: "text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[#dfbd69] mb-6 drop-shadow-lg",
  
  // Subsection title (H3)
  subsectionTitle: "text-xl font-semibold text-[#dfbd69] mb-6",
  
  // Card/Service title (H3)
  cardTitle: "text-lg font-serif font-bold text-[#dfbd69] mb-3 drop-shadow-lg",
  
  // ===== DESCRIPTIONS & BODY TEXT =====
  
  // Main description text (under titles)
  description: "text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md",
  
  // Hero description
  heroDescription: "text-base sm:text-base lg:text-medium text-gray-100 mb-8 leading-relaxed drop-shadow-md",
  
  // Body text
  body: "text-white/80",
  bodyLarge: "text-base text-white/80",
  bodySmall: "text-sm text-white/70",
  bodyTiny: "text-xs text-white/60",
  
  // ===== FORM LABELS & INPUTS =====
  
  // Form labels
  label: "block text-sm font-semibold mb-2 text-white",
  
  // Input placeholder style (for reference)
  placeholder: "placeholder-white/50",
  
  // Error messages
  error: "text-sm text-red-300",
  
  // Success messages
  success: "text-sm text-green-300",
  
  // ===== FAQ SPECIFIC =====
  
  // FAQ question (button text)
  faqQuestion: "text-base font-semibold text-white pr-4",
  
  // FAQ answer text
  faqAnswer: "text-sm text-white/70 leading-relaxed space-y-3",
  
  // ===== REVIEWS =====
  
  // Review author name
  reviewAuthor: "text-lg font-semibold text-white drop-shadow-lg",
  
  // Review location
  reviewLocation: "text-sm text-white/70",
  
  // Review text
  reviewText: "text-white/90 leading-relaxed drop-shadow-md",
  
  // ===== QUOTE WIZARD =====
  
  // Quote wizard step title
  wizardStepTitle: "text-xl font-serif font-bold text-white mb-2",
  
  // Quote wizard step description
  wizardStepDescription: "text-white/80 text-xs sm:text-sm",
  
  // ===== BUTTONS =====
  
  // Button text
  button: "font-semibold text-center",
  buttonLarge: "text-base font-semibold text-center",
  buttonSmall: "text-sm font-semibold text-center",
  
  // ===== LINKS =====
  
  // Standard link
  link: "text-[#dfbd69] hover:text-[#dfbd69]/80 transition-colors",
  linkUnderline: "text-[#dfbd69] hover:text-[#dfbd69]/80 underline transition-colors",
  
  // ===== HEADER & NAVIGATION =====
  
  // Logo text
  logo: "font-serif font-bold",
  
  // Navigation link
  navLink: "text-sm font-medium text-white hover:text-[#dfbd69] transition-colors",
  
  // ===== FOOTER =====
  
  // Footer heading
  footerHeading: "text-xs font-semibold text-white/60 mb-3 uppercase tracking-wide",
  
  // Footer link
  footerLink: "text-xs text-white/80 hover:text-white transition-colors",
  
  // Footer copyright
  footerCopyright: "text-xs text-white/40",
  
  // ===== SPECIAL CASES =====
  
  // Announcement bar
  announcementBar: "text-xs sm:text-sm font-medium text-[#283845] leading-none",
  
  // Badge/Pill text
  badge: "text-xs font-semibold uppercase tracking-wide",
  
  // Price text
  price: "text-2xl md:text-3xl lg:text-4xl font-bold text-[#dfbd69]",
  priceSmall: "text-lg md:text-xl font-bold text-[#dfbd69]",
};

/**
 * Helper function to combine typography classes with custom classes
 */
export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
