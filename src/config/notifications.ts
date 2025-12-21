/**
 * Email Notification Configuration
 * Centralized system for managing all email notifications
 */

export type NotificationCategory = 
  | 'booking_new'
  | 'booking_modified'
  | 'booking_cancelled'
  | 'booking_unassigned'
  | 'provider_account'
  | 'provider_assignment'
  | 'admin_alerts'
  | 'customer_updates';

export interface NotificationTemplate {
  id: string;
  name: string;
  description: string;
  category: NotificationCategory;
  enabled: boolean;
  recipients: 'admin' | 'provider' | 'customer' | 'all';
  trigger: string;
  canDisable: boolean;
  lastSent?: string;
  sentCount?: number;
}

export const NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  // ===== BOOKING: NEW & MODIFIED =====
  {
    id: 'admin_new_booking',
    name: 'New Booking',
    description: 'Sent to admin when a new booking is created',
    category: 'booking_new',
    enabled: true,
    recipients: 'admin',
    trigger: 'Booking created',
    canDisable: false,
  },
  {
    id: 'admin_new_booking_referral',
    name: 'New Booking via Referral',
    description: 'Sent to admin when a new booking comes from a referral',
    category: 'booking_new',
    enabled: true,
    recipients: 'admin',
    trigger: 'Booking created with referral code',
    canDisable: true,
  },
  {
    id: 'admin_booking_modified',
    name: 'Booking Modified',
    description: 'Sent to admin when a booking has been modified',
    category: 'booking_modified',
    enabled: false,
    recipients: 'admin',
    trigger: 'Booking details changed',
    canDisable: true,
  },
  {
    id: 'admin_booking_modified_after_5pm',
    name: 'Booking Modified After 5 PM',
    description: 'Sent to admin when a booking is modified after 5 PM the day before',
    category: 'booking_modified',
    enabled: false,
    recipients: 'admin',
    trigger: 'Booking modified after 5 PM (day before service)',
    canDisable: true,
  },

  // ===== BOOKING: CANCELLED & POSTPONED =====
  {
    id: 'admin_booking_cancelled',
    name: 'Booking Cancelled',
    description: 'Sent to admin when a booking has been cancelled',
    category: 'booking_cancelled',
    enabled: true,
    recipients: 'admin',
    trigger: 'Booking cancelled',
    canDisable: true,
  },
  {
    id: 'admin_booking_cancelled_after_5pm',
    name: 'Booking Cancelled After 5 PM',
    description: 'Sent to admin when a booking is cancelled after 5 PM the day before',
    category: 'booking_cancelled',
    enabled: false,
    recipients: 'admin',
    trigger: 'Booking cancelled after 5 PM (day before service)',
    canDisable: true,
  },
  {
    id: 'admin_booking_cancellation_request',
    name: 'Booking Cancellation Request',
    description: 'Sent to admin when customer requests to cancel',
    category: 'booking_cancelled',
    enabled: true,
    recipients: 'admin',
    trigger: 'Customer requests cancellation',
    canDisable: true,
  },
  {
    id: 'admin_booking_postponed',
    name: 'Booking Postponed',
    description: 'Sent to admin when customer postpones their booking',
    category: 'booking_modified',
    enabled: false,
    recipients: 'admin',
    trigger: 'Booking rescheduled',
    canDisable: true,
  },

  // ===== BOOKING: UNASSIGNED =====
  {
    id: 'admin_new_unassigned',
    name: 'New Booking in Unassigned Folder',
    description: 'Sent to admin when a new booking arrives unassigned',
    category: 'booking_unassigned',
    enabled: true,
    recipients: 'admin',
    trigger: 'New booking without provider',
    canDisable: false,
  },
  {
    id: 'admin_moved_to_unassigned',
    name: 'Booking Moved to Unassigned',
    description: 'Sent to admin when a booking is moved to unassigned folder',
    category: 'booking_unassigned',
    enabled: false,
    recipients: 'admin',
    trigger: 'Provider unassigned from booking',
    canDisable: true,
  },
  {
    id: 'admin_unassigned_12h',
    name: 'Unassigned Booking Starting in 12 Hours',
    description: 'Urgent alert: Unassigned booking starts in less than 12 hours',
    category: 'admin_alerts',
    enabled: false,
    recipients: 'admin',
    trigger: 'Unassigned booking < 12 hours away',
    canDisable: true,
  },
  {
    id: 'admin_unassigned_4h',
    name: 'Unassigned Booking Starting in 4 Hours',
    description: 'Critical alert: Unassigned booking starts in less than 4 hours',
    category: 'admin_alerts',
    enabled: false,
    recipients: 'admin',
    trigger: 'Unassigned booking < 4 hours away',
    canDisable: true,
  },
  {
    id: 'admin_unassigned_1h',
    name: 'Unassigned Booking Starting in 1 Hour',
    description: 'EMERGENCY: Unassigned booking starts in less than 1 hour',
    category: 'admin_alerts',
    enabled: false,
    recipients: 'admin',
    trigger: 'Unassigned booking < 1 hour away',
    canDisable: true,
  },

  // ===== PROVIDER: ASSIGNMENTS =====
  {
    id: 'provider_new_booking',
    name: 'New Booking Assigned',
    description: 'Sent to provider when they are assigned a new booking',
    category: 'provider_assignment',
    enabled: true,
    recipients: 'provider',
    trigger: 'Provider assigned to booking',
    canDisable: false,
  },
  {
    id: 'provider_booking_modified',
    name: 'Booking Modified',
    description: 'Sent to provider when their assigned booking is modified',
    category: 'provider_assignment',
    enabled: true,
    recipients: 'provider',
    trigger: 'Assigned booking details changed',
    canDisable: true,
  },
  {
    id: 'provider_booking_modified_after_5pm',
    name: 'Booking Modified After 5 PM',
    description: 'Sent to provider when booking is modified after 5 PM the day before',
    category: 'provider_assignment',
    enabled: true,
    recipients: 'provider',
    trigger: 'Assigned booking modified after 5 PM',
    canDisable: true,
  },
  {
    id: 'provider_booking_cancelled',
    name: 'Booking Cancelled',
    description: 'Sent to provider when their assigned booking is cancelled',
    category: 'provider_assignment',
    enabled: true,
    recipients: 'provider',
    trigger: 'Assigned booking cancelled',
    canDisable: false,
  },

  // ===== PROVIDER: ACCOUNT =====
  {
    id: 'provider_account_created',
    name: 'New Account',
    description: 'Sent to provider when their account is created',
    category: 'provider_account',
    enabled: true,
    recipients: 'provider',
    trigger: 'Provider account created',
    canDisable: false,
  },
  {
    id: 'provider_how_it_works',
    name: 'How It Works',
    description: 'Sent to provider explaining how to use their account',
    category: 'provider_account',
    enabled: true,
    recipients: 'provider',
    trigger: 'After account creation',
    canDisable: true,
  },
  {
    id: 'provider_password_reset',
    name: 'Reset Password',
    description: 'Sent to provider when they request a password reset',
    category: 'provider_account',
    enabled: true,
    recipients: 'provider',
    trigger: 'Password reset requested',
    canDisable: false,
  },
  {
    id: 'provider_password_changed',
    name: 'Password Changed',
    description: 'Sent to provider when their password is changed',
    category: 'provider_account',
    enabled: true,
    recipients: 'provider',
    trigger: 'Password successfully changed',
    canDisable: false,
  },
  {
    id: 'provider_account_activated',
    name: 'Account Activated',
    description: 'Sent to provider when their account is activated',
    category: 'provider_account',
    enabled: true,
    recipients: 'provider',
    trigger: 'Account status changed to active',
    canDisable: true,
  },
  {
    id: 'provider_account_deactivated',
    name: 'Account Deactivated',
    description: 'Sent to provider when their account is deactivated',
    category: 'provider_account',
    enabled: true,
    recipients: 'provider',
    trigger: 'Account status changed to inactive',
    canDisable: true,
  },

  // ===== CUSTOMER: UPDATES =====
  {
    id: 'customer_booking_confirmed',
    name: 'Booking Confirmed',
    description: 'Sent to customer when their booking is confirmed',
    category: 'customer_updates',
    enabled: true,
    recipients: 'customer',
    trigger: 'Payment method added',
    canDisable: false,
  },
  {
    id: 'customer_booking_reminder_24h',
    name: '24-Hour Reminder',
    description: 'Sent to customer 24 hours before their service',
    category: 'customer_updates',
    enabled: true,
    recipients: 'customer',
    trigger: '24 hours before service',
    canDisable: true,
  },
  {
    id: 'customer_booking_completed',
    name: 'Service Completed',
    description: 'Sent to customer after their service is completed',
    category: 'customer_updates',
    enabled: true,
    recipients: 'customer',
    trigger: 'Booking marked as complete',
    canDisable: false,
  },
];

export function getNotificationsByCategory(category: NotificationCategory) {
  return NOTIFICATION_TEMPLATES.filter(n => n.category === category);
}

export function getEnabledNotifications() {
  return NOTIFICATION_TEMPLATES.filter(n => n.enabled);
}

export function getNotificationById(id: string) {
  return NOTIFICATION_TEMPLATES.find(n => n.id === id);
}

export const NOTIFICATION_CATEGORIES = [
  { id: 'booking_new', name: 'New & Modified Bookings', icon: '📅' },
  { id: 'booking_cancelled', name: 'Cancelled & Postponed', icon: '🚫' },
  { id: 'booking_unassigned', name: 'Unassigned Bookings', icon: '⚠️' },
  { id: 'admin_alerts', name: 'Admin Alerts', icon: '🚨' },
  { id: 'provider_assignment', name: 'Provider Assignments', icon: '👷' },
  { id: 'provider_account', name: 'Provider Account', icon: '👤' },
  { id: 'customer_updates', name: 'Customer Updates', icon: '✉️' },
] as const;


