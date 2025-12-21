/**
 * Button Standards - Brooklyn Maids V4
 * 
 * Centralized button styling to ensure consistency.
 * Based on the homepage button designs.
 */

export const BUTTONS = {
  // ===== PRIMARY BUTTONS =====
  
  // Main CTA button (gold gradient background) - uses button-quaternary for gradient
  primary: "button-quaternary",
  
  // Primary button (smaller variant)
  primarySmall: "button-quaternary px-6 py-3",
  
  // ===== SECONDARY BUTTONS =====
  
  // Secondary button (white/transparent)
  secondary: "bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-white/30 transition-colors border border-white/30",
  
  // Secondary button (larger)
  secondaryLarge: "bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/30 transition-colors border border-white/30",
  
  // ===== TERTIARY BUTTONS =====
  
  // Tertiary button (outlined, uses global CSS class)
  tertiary: "button-tertiary",
  
  // ===== QUATERNARY BUTTONS =====
  
  // Quaternary button (uses global CSS class)
  quaternary: "button-quaternary",
  
  // ===== SPECIAL BUTTONS =====
  
  // Hero "Get A Quote" style button with glow (uses button-tertiary as base)
  heroQuote: "button-tertiary animate-glow flex items-center justify-center h-12 px-8 font-semibold min-w-[160px] gap-2",
  
  // Service type selection button (for forms)
  serviceType: {
    base: "relative cursor-pointer rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all backdrop-blur-sm",
    selected: "ring-2 ring-[rgba(15,23,42,1)] bg-white/40 animate-glow border-[0.5px] border-white animate-selected-pulse",
    unselected: "ring-1 ring-white/20 bg-white/10 hover:ring-2 hover:ring-white/40",
  },
  
  // Addon selection button (for forms)
  addon: {
    base: "w-full p-3 rounded-lg text-center transition-all backdrop-blur-sm",
    selected: "ring-2 ring-[rgba(15,23,42,1)] bg-white/40 animate-glow border-[0.5px] border-white animate-selected-pulse",
    unselected: "ring-1 ring-white/20 bg-white/10 hover:ring-2 hover:ring-white/40",
  },
  
  // ===== DISABLED STATES =====
  
  disabled: "opacity-50 cursor-not-allowed",
  
  // ===== LINK STYLES (button-like links) =====
  
  // Link styled as primary button (uses button-quaternary)
  linkPrimary: "inline-block button-quaternary",
  
  // Link styled as secondary button
  linkSecondary: "inline-block bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-white/30 transition-colors border border-white/30",
};

/**
 * Button inline styles (for cases where Tailwind can't handle it)
 */
export const BUTTON_INLINE_STYLES = {
  // Gold glow shadow for hero quote button
  goldGlow: { boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)' },
  
  // Dark shadow for selected service types
  darkShadow: { boxShadow: '0 0 20px rgba(15, 23, 42, 0.3)' },
  
  // Hover shadow for unselected items
  hoverShadow: { boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)' },
};

