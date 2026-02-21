/**
 * Color System - Tailwind Class Strings
 * 
 * Each site defines its colors in globals.css as CSS variables.
 * This file maps those variables to Tailwind utility classes for easy use in components.
 * 
 * To change site colors: Edit globals.css :root variables
 */

export const COLORS = {
  // ===== BACKGROUNDS =====
  
  backgrounds: {
    // Primary section background
    primary: "rgba(15, 23, 42, 0.95)",
    
    // Secondary section background
    secondary: "rgba(15, 23, 42, 0.95)",
    
    // Hero gradient background
    hero: "bg-gradient-to-br from-slate-900 to-slate-800",
    
    // Card background
    card: "bg-[rgba(30,41,59,0.95)]",
    
    // Input field background
    input: "bg-slate-900/50",
    
    // Form container background
    form: "bg-slate-800/50",
  },
  
  // ===== BRAND COLORS =====
  
  brand: {
    // Gold gradient colors
    goldGradientFrom: "#dfbd69",
    goldGradientTo: "#926f34",
    
    // Single gold (for simple uses)
    gold: "#dfbd69",
    goldRGB: "223, 189, 105",
    
    // Navy/dark
    dark: "#283845",
    darkRGB: "40, 56, 69",
    
    // Muted gold
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
    
    // Brand gold accent
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
    // Dark overlay for video/images
    dark: "bg-black/60",
    
    // Light overlay for hover states
    light: "bg-white/10",
    lightHover: "bg-white/15",
    
    // Card hover overlay
    cardHover: "bg-[rgba(30,41,59,0.98)]",
  },
  
  // ===== RING COLORS (for focus states) =====
  
  rings: {
    gold: "ring-[#dfbd69]",
    goldDark: "ring-[#926f34]",
    white: "ring-white/20",
  },
};

/**
 * INLINE_STYLES - For use in style={{}} props
 * Use these when you need inline styles instead of className
 */
export const INLINE_STYLES = {
  // Primary section background
  primary: {
    background: 'rgba(15, 23, 42, 0.95)',
  },
  
  // Secondary section background
  secondary: {
    background: 'rgba(15, 23, 42, 0.95)',
  },
  
  // Gold gradient for text/backgrounds
  goldGradient: {
    background: 'linear-gradient(135deg, #dfbd69 0%, #926f34 100%)',
  },
  
  // Text with gold gradient
  goldGradientText: {
    background: 'linear-gradient(135deg, #dfbd69 0%, #926f34 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
};

/**
 * CSS_VARIABLES - For use in globals.css
 * Define these in your site's globals.css :root {}
 */
export const CSS_VARIABLES = {
  '--primary-gold': '#dfbd69',
  '--secondary-gold': '#926f34',
  '--primary-dark': '#283845',
  '--slate-dark': '#0f172a',
  '--slate-card': '#1e293b',
};

/**
 * TAILWIND_COLORS - For use in tailwind.config.ts
 * Extend Tailwind's color palette with site-specific colors
 */
export const TAILWIND_COLORS = {
  'brand-gold': '#dfbd69',
  'brand-gold-muted': '#926f34',
  'brand-dark': '#283845',
  'slate-primary': '#0f172a',
  'slate-card': '#1e293b',
};