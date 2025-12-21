/**
 * Unified Color System - Brooklyn Admin Dashboard
 * Uses EXACT colors from colors.ts - NO MADE UP COLORS
 */

export const UNIFIED_COLORS = {
  // === BACKGROUNDS (Using EXACT website colors) ===
  bg: {
    primary: 'rgba(15, 23, 42, 0.95)',    // EXACT from website
    secondary: 'rgba(15, 23, 42, 0.95)',  // EXACT from website
    card: 'rgba(15, 23, 42, 0.98)',       // Slight transparency variant
    cardHover: 'rgba(15, 23, 42, 1)',     // Full opacity on hover
    input: 'rgba(15, 23, 42, 0.8)',       // More transparent for inputs
    sidebar: 'rgba(15, 23, 42, 0.95)',    // Match primary
  },
  
  // === BRAND (Gold accent throughout) ===
  brand: {
    gold: '#dfbd69',
    goldDark: '#926f34',
    goldGradient: 'linear-gradient(135deg, #dfbd69 0%, #926f34 100%)',
    goldLight: '#e8ca85',
  },
  
  // === TEXT ===
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    muted: 'rgba(255, 255, 255, 0.6)',
    disabled: 'rgba(255, 255, 255, 0.4)',
    gold: '#dfbd69',
  },
  
  // === BORDERS (All gold-tinted) ===
  border: {
    default: 'rgba(255, 255, 255, 0.1)',   // White borders like website
    light: 'rgba(255, 255, 255, 0.2)',     // Lighter white border
    gold: '#dfbd69',                        // Full gold
  },
  
  // === STATUS COLORS ===
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    pending: '#dfbd69',
  },
  
  // === BACKGROUND (Alias for bg, for compatibility) ===
  background: {
    primary: 'rgba(15, 23, 42, 0.95)',
    secondary: 'rgba(15, 23, 42, 0.95)',
  },
  
  // === ACCENT (Alias for brand, for compatibility) ===
  accent: {
    secondary: '#926f34',
  },
};

// Helper functions
export const getCardStyle = () => ({
  backgroundColor: UNIFIED_COLORS.bg.card,
  border: `1px solid ${UNIFIED_COLORS.border.default}`,
});

export const getButtonPrimaryStyle = () => ({
  background: UNIFIED_COLORS.brand.goldGradient,
  color: '#000000',
});

export const getButtonSecondaryStyle = () => ({
  background: 'transparent',
  color: UNIFIED_COLORS.brand.gold,
  border: `1px solid ${UNIFIED_COLORS.brand.gold}`,
});

export const getInputStyle = () => ({
  backgroundColor: UNIFIED_COLORS.bg.input,
  border: `1px solid ${UNIFIED_COLORS.border.default}`,
  color: UNIFIED_COLORS.text.primary,
});
