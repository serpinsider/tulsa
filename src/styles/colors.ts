/**
 * Tulsa Maids Color Palette
 * Pacific Ocean-inspired colors: Deep ocean blues and vibrant teals
 */

export const COLORS = {
  // ===== BACKGROUNDS =====
  
  backgrounds: {
    primary: "rgba(26, 55, 85, 0.95)",
    secondary: "rgba(26, 55, 85, 0.95)",
    hero: "bg-gradient-to-br from-[#1a3755] to-[#234b73]",
    card: "bg-[rgba(22,48,75,0.95)]",
    input: "bg-[#1a3755]/50",
    form: "bg-[#1a3755]/50",
  },
  
  // ===== BRAND COLORS =====
  
  brand: {
    goldGradientFrom: "#dfbd69",
    goldGradientTo: "#b8956d",
    gold: "#dfbd69",
    goldRGB: "223, 189, 105",
    dark: "#1a3755",
    darkRGB: "26, 55, 85",
    goldMuted: "#b8956d",
  },
  
  // ===== TEXT COLORS =====
  
  text: {
    primary: "text-white",
    secondary: "text-white/80",
    muted: "text-white/70",
    veryMuted: "text-white/60",
    accent: "text-[#dfbd69]",
    accentGradient: "bg-gradient-to-r from-[#dfbd69] to-[#b8956d] bg-clip-text text-transparent",
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
    dark: "bg-black/60",
    light: "bg-white/10",
    lightHover: "bg-white/15",
    cardHover: "bg-[rgba(26,55,85,0.98)]",
  },
  
  // ===== RING COLORS (for focus states) =====
  
  rings: {
    gold: "ring-[#dfbd69]",
    goldDark: "ring-[rgba(26,55,85,1)]",
    white: "ring-white/20",
  },
};

/**
 * Inline style helpers for cases where Tailwind can't be used
 */
export const INLINE_STYLES = {
  primary: { background: 'rgba(26, 55, 85, 0.95)' },
  secondary: { background: 'rgba(26, 55, 85, 0.95)' },
  goldGlow: { boxShadow: '0 0 20px rgba(223, 189, 105, 0.15)' },
  darkShadow: { boxShadow: '0 0 20px rgba(26, 55, 85, 0.3)' },
};
