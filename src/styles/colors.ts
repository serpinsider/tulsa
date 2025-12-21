/**
 * Color Standards - Brooklyn Maids V4
 * 
 * Centralized color definitions and background styles.
 * Ensures brand consistency across the entire site.
 */

export const COLORS = {
  // ===== BACKGROUNDS =====
  
  backgrounds: {
    // Primary section background
    primary: "rgba(15, 23, 42, 0.95)",
    
    // Secondary section background (same as primary for consistency)
    secondary: "rgba(15, 23, 42, 0.95)",
    
    // Hero gradient background
    hero: "bg-gradient-to-br from-slate-900 to-slate-800",
    
    // Card background (for service cards, etc)
    card: "bg-[rgba(15,23,42,0.95)]",
    
    // Input field background
    input: "bg-slate-900/50",
    
    // Form container background
    form: "bg-slate-800/50",
  },
  
  // ===== BRAND COLORS =====
  
  brand: {
    // Primary gold gradient
    goldGradientFrom: "#dfbd69",
    goldGradientTo: "#926f34",
    
    // Legacy single gold (fallback)
    gold: "#dfbd69",
    goldRGB: "223, 189, 105",
    
    // Dark slate
    dark: "#283845",
    darkRGB: "40, 56, 69",
    
    // Muted gold (for hover states)
    goldMuted: "#926f34",
  },
  
  // ===== TEXT COLORS =====
  
  text: {
    // Primary white text
    primary: "text-white",
    
    // Secondary white text (80% opacity)
    secondary: "text-white/80",
    
    // Muted white text (70% opacity)
    muted: "text-white/70",
    
    // Very muted (60% opacity)
    veryMuted: "text-white/60",
    
    // Brand gold accent (uses gradient via bg-clip)
    accent: "text-[#dfbd69]",
    accentGradient: "bg-gradient-to-r from-[#dfbd69] to-[#926f34] bg-clip-text text-transparent",
    
    // Gray for descriptions
    gray: "text-gray-100",
  },
  
  // ===== BORDERS & OVERLAYS =====
  
  borders: {
    light: "border-white/10",
    medium: "border-white/20",
    strong: "border-white/30",
    gold: "border-[#dfbd69]",
  },
  
  overlays: {
    // Video/image overlay
    dark: "bg-black/60",
    
    // Light overlay for hover states
    light: "bg-white/10",
    lightHover: "bg-white/15",
    
    // Card hover overlay
    cardHover: "bg-[rgba(15,23,42,0.98)]",
  },
  
  // ===== RING COLORS (for focus states) =====
  
  rings: {
    gold: "ring-[#dfbd69]",
    goldDark: "ring-[rgba(15,23,42,1)]",
    white: "ring-white/20",
  },
};

/**
 * Inline style helpers for cases where Tailwind can't be used
 * NOTE: All sections should use the same background for consistency
 */
export const INLINE_STYLES = {
  // Standard section background (same for all sections)
  primary: { background: 'rgba(15, 23, 42, 0.95)' },
  
  // Legacy secondary (kept for compatibility but should use primary)
  secondary: { background: 'rgba(15, 23, 42, 0.95)' },
  
  // Gold glow shadow
  goldGlow: { boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)' },
  
  // Dark shadow
  darkShadow: { boxShadow: '0 0 20px rgba(15, 23, 42, 0.3)' },
};

