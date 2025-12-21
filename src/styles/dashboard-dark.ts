/**
 * Dark Modern Dashboard Theme
 * Inspired by Linear/Notion style interfaces
 */

export const DASHBOARD_COLORS = {
  // Backgrounds
  bg: {
    primary: '#1a1a1a',      // Main background
    secondary: '#0a0a0a',    // Darker sections
    card: '#252525',         // Card background
    cardHover: '#2a2a2a',    // Card hover
    input: '#1f1f1f',        // Input fields
    sidebar: '#0f0f0f',      // Sidebar background
  },
  
  // Text
  text: {
    primary: '#ffffff',
    secondary: '#a0a0a0',
    muted: '#666666',
    disabled: '#404040',
  },
  
  // Borders
  border: {
    default: '#2a2a2a',
    light: '#333333',
    focus: '#404040',
  },
  
  // Status colors
  status: {
    urgent: { bg: '#ff4444', text: '#ffffff' },
    high: { bg: '#ff9500', text: '#ffffff' },
    normal: { bg: '#ffa500', text: '#000000' },
    low: { bg: '#00c853', text: '#ffffff' },
    info: { bg: '#2196f3', text: '#ffffff' },
  },
  
  // State colors
  state: {
    backlog: '#6b7280',
    progress: '#3b82f6',
    validation: '#8b5cf6',
    done: '#10b981',
    cancelled: '#ef4444',
  },
  
  // Accent
  accent: {
    primary: '#dfbd69',     // Keep your gold
    secondary: '#926f34',
    blue: '#3b82f6',
    purple: '#8b5cf6',
    green: '#10b981',
    red: '#ef4444',
    orange: '#f59e0b',
  }
};

export const DASHBOARD_SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
};

// Helper functions for consistent styling
export const getCardStyle = () => ({
  backgroundColor: DASHBOARD_COLORS.bg.card,
  border: `1px solid ${DASHBOARD_COLORS.border.default}`,
});

export const getInputStyle = () => ({
  backgroundColor: DASHBOARD_COLORS.bg.card,
  borderColor: DASHBOARD_COLORS.border.default,
  color: DASHBOARD_COLORS.text.primary,
});

export const getButtonPrimaryStyle = () => ({
  background: `linear-gradient(135deg, ${DASHBOARD_COLORS.accent.primary}, ${DASHBOARD_COLORS.accent.secondary})`,
  color: '#000000',
});

export const getTableHeaderStyle = () => ({
  backgroundColor: DASHBOARD_COLORS.bg.primary,
  borderBottom: `1px solid ${DASHBOARD_COLORS.border.default}`,
});
