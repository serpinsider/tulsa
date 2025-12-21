/**
 * Role-Based Access Control System
 * Defines permissions for different user types
 */

export type UserRole = 'super_admin' | 'admin' | 'employee' | 'provider' | 'customer';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export const PERMISSIONS: Record<string, Permission> = {
  // Booking Permissions
  VIEW_BOOKINGS: {
    id: 'view_bookings',
    name: 'View Bookings',
    description: 'Can view all bookings',
  },
  EDIT_BOOKINGS: {
    id: 'edit_bookings',
    name: 'Edit Bookings',
    description: 'Can edit booking details',
  },
  CREATE_BOOKINGS: {
    id: 'create_bookings',
    name: 'Create Bookings',
    description: 'Can create new bookings',
  },
  DELETE_BOOKINGS: {
    id: 'delete_bookings',
    name: 'Delete Bookings',
    description: 'Can delete bookings',
  },
  ASSIGN_PROVIDERS: {
    id: 'assign_providers',
    name: 'Assign Providers',
    description: 'Can assign/reassign cleaners to jobs',
  },

  // Lead Permissions
  VIEW_LEADS: {
    id: 'view_leads',
    name: 'View Leads',
    description: 'Can view quote requests',
  },
  EDIT_LEADS: {
    id: 'edit_leads',
    name: 'Edit Leads',
    description: 'Can edit lead information',
  },
  CONVERT_LEADS: {
    id: 'convert_leads',
    name: 'Convert Leads',
    description: 'Can convert leads to bookings',
  },

  // Customer Permissions
  VIEW_CUSTOMERS: {
    id: 'view_customers',
    name: 'View Customers',
    description: 'Can view customer information',
  },
  EDIT_CUSTOMERS: {
    id: 'edit_customers',
    name: 'Edit Customers',
    description: 'Can edit customer details',
  },

  // Provider Permissions
  VIEW_PROVIDERS: {
    id: 'view_providers',
    name: 'View Providers',
    description: 'Can view provider list',
  },
  EDIT_PROVIDERS: {
    id: 'edit_providers',
    name: 'Edit Providers',
    description: 'Can edit provider details',
  },
  CREATE_PROVIDERS: {
    id: 'create_providers',
    name: 'Create Providers',
    description: 'Can add new providers',
  },
  DELETE_PROVIDERS: {
    id: 'delete_providers',
    name: 'Delete Providers',
    description: 'Can remove providers',
  },

  // Report Permissions
  VIEW_BASIC_REPORTS: {
    id: 'view_basic_reports',
    name: 'View Basic Reports',
    description: 'Can view basic revenue and booking stats',
  },
  VIEW_ADVANCED_ANALYTICS: {
    id: 'view_advanced_analytics',
    name: 'View Advanced Analytics',
    description: 'Can view full analytics dashboard',
  },

  // System Permissions
  MANAGE_EMPLOYEES: {
    id: 'manage_employees',
    name: 'Manage Employees',
    description: 'Can add/edit/remove employees',
  },
  VIEW_SYSTEM_SETTINGS: {
    id: 'view_system_settings',
    name: 'View System Settings',
    description: 'Can view system configuration',
  },
  EDIT_SYSTEM_SETTINGS: {
    id: 'edit_system_settings',
    name: 'Edit System Settings',
    description: 'Can modify system settings',
  },
  VIEW_FEATURE_REGISTRY: {
    id: 'view_feature_registry',
    name: 'View Feature Registry',
    description: 'Can view internal feature tracking',
  },
};

/**
 * Role Definitions with Permissions
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  // Super Admin - Full Access
  super_admin: [
    'view_bookings',
    'edit_bookings',
    'create_bookings',
    'delete_bookings',
    'assign_providers',
    'view_leads',
    'edit_leads',
    'convert_leads',
    'view_customers',
    'edit_customers',
    'view_providers',
    'edit_providers',
    'create_providers',
    'delete_providers',
    'view_basic_reports',
    'view_advanced_analytics',
    'manage_employees',
    'view_system_settings',
    'edit_system_settings',
    'view_feature_registry',
  ],

  // Admin - Most Permissions, No Employee/Provider Management
  admin: [
    'view_bookings',
    'edit_bookings',
    'create_bookings',
    'delete_bookings',
    'assign_providers',
    'view_leads',
    'edit_leads',
    'convert_leads',
    'view_customers',
    'edit_customers',
    'view_providers', // Can see providers
    'view_basic_reports',
    'view_advanced_analytics',
  ],

  // Employee - Basic Operations Only
  employee: [
    'view_bookings',
    'edit_bookings',
    'create_bookings',
    'assign_providers',
    'view_leads',
    'edit_leads',
    'convert_leads',
    'view_customers',
    'view_providers', // Can see providers to assign
    'view_basic_reports',
  ],

  // Provider - Their Own Jobs Only
  provider: [
    'view_bookings', // Only their assigned bookings
  ],

  // Customer - Their Own Bookings Only
  customer: [
    'view_bookings', // Only their own bookings
    'create_bookings',
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permissionId: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permissionId) || false;
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  const permissionIds = ROLE_PERMISSIONS[role] || [];
  return permissionIds
    .map((id) => Object.values(PERMISSIONS).find((p) => p.id === id))
    .filter(Boolean) as Permission[];
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    employee: 'Employee',
    provider: 'Provider',
    customer: 'Customer',
  };
  return names[role] || role;
}

/**
 * Get role color for UI
 */
export function getRoleColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    super_admin: '#dfbd69', // Gold
    admin: '#3b82f6', // Blue
    employee: '#10b981', // Green
    provider: '#8b5cf6', // Purple
    customer: '#6b7280', // Gray
  };
  return colors[role] || '#6b7280';
}

/**
 * Check if role can access a dashboard tab
 */
export function canAccessTab(role: UserRole, tabId: string): boolean {
  const tabPermissions: Record<string, string[]> = {
    scheduling: ['view_bookings'],
    leads: ['view_leads'],
    bookings: ['view_bookings'],
    customers: ['view_customers'],
    providers: ['view_providers'],
    analytics: ['view_advanced_analytics'],
    reports: ['view_basic_reports'],
    features: ['view_feature_registry'],
    employees: ['manage_employees'],
    notifications: ['manage_employees'], // Same as employees - admin/super_admin only
    settings: ['view_system_settings'],
  };

  const requiredPermissions = tabPermissions[tabId] || [];
  return requiredPermissions.some((perm) => hasPermission(role, perm));
}

/**
 * Get available tabs for a role
 */
export function getAvailableTabs(role: UserRole): string[] {
  const allTabs = [
    'scheduling',
    'leads',
    'bookings',
    'customers',
    'providers',
    'analytics',
    'reports',
    'features',
    'employees',
    'settings',
  ];

  return allTabs.filter((tab) => canAccessTab(role, tab));
}

