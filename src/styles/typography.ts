/**
 * Typography Standards - Brooklyn Maids V4
 * 
 * Centralized typography classes to ensure consistency across the entire site.
 * Based on the homepage design standards.
 */

export const TYPOGRAPHY = {
  // ===== PAGE & SECTION TITLES =====
  
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
  
  // ===== FAQ SPECIFIC =====
  
  // FAQ question (button text)
  faqQuestion: "text-base font-semibold text-white pr-4",
  
  // FAQ answer text
  faqAnswer: "text-sm text-white/70 leading-relaxed space-y-3",
  
  // ===== SPECIAL CASES =====
  
  // Hero title (can be different from page title)
  heroTitle: "hero-title font-serif mb-6",
  
  // Hero description
  heroDescription: "text-base sm:text-base lg:text-medium text-gray-100 mb-8 leading-relaxed drop-shadow-md",
  
  // Quote wizard step title
  wizardStepTitle: "text-xl font-serif font-bold text-white mb-2",
  
  // Quote wizard step description
  wizardStepDescription: "text-white/80 text-xs sm:text-sm",
  
  // Review author name
  reviewAuthor: "text-lg font-semibold text-white drop-shadow-lg",
  
  // Review location
  reviewLocation: "text-sm text-white/70",
  
  // Review text
  reviewText: "text-white/90 leading-relaxed drop-shadow-md",
};

/**
 * Helper function to combine typography classes with custom classes
 */
export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

