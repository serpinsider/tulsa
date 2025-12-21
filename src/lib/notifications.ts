/**
 * OpenPhone SMS Notification Helper
 * Sends SMS notifications via the Brooklyn Bot OpenPhone integration
 */

const OPENPHONE_BOT_URL = process.env.NEXT_PUBLIC_OPENPHONE_BOT_URL || 'http://localhost:8000';
const ADMIN_PHONE = process.env.NEXT_PUBLIC_ADMIN_PHONE || ''; // Set this in .env.local

// ============================================
// CUSTOMER NOTIFICATIONS
// ============================================

export async function sendBookingConfirmation(data: {
  firstName: string;
  phone: string;
  serviceDate: string;
  serviceTime: string;
  serviceType: string;
  amount: number;
  confirmationNumber: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-booking-confirmation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send booking confirmation:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendBookingReminder(data: {
  firstName: string;
  phone: string;
  serviceDate: string;
  serviceTime: string;
  providerName?: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-booking-reminder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send booking reminder:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendPaymentLink(data: {
  firstName: string;
  phone: string;
  amount: number;
  paymentLink: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-payment-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send payment link:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendBookingCancelled(data: {
  firstName: string;
  phone: string;
  serviceDate: string;
  reason?: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-booking-cancelled`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send cancellation notice:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendBookingRescheduled(data: {
  firstName: string;
  phone: string;
  oldDate: string;
  oldTime: string;
  newDate: string;
  newTime: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-booking-rescheduled`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send reschedule notice:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendProviderChanged(data: {
  firstName: string;
  phone: string;
  newProviderName: string;
  serviceDate: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-provider-changed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send provider change notice:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendReceipt(data: {
  firstName: string;
  phone: string;
  amount: number;
  serviceDate: string;
  receiptLink?: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-receipt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send receipt:', error);
    return { success: false, error: 'Network error' };
  }
}

// ============================================
// PROVIDER NOTIFICATIONS
// ============================================

export async function sendProviderAssigned(data: {
  providerName: string;
  providerPhone: string;
  customerName: string;
  serviceDate: string;
  serviceTime: string;
  address: string;
  serviceType: string;
  amount: number;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-provider-assigned`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send provider assignment:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendProviderUnassigned(data: {
  providerName: string;
  providerPhone: string;
  customerName: string;
  serviceDate: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-provider-unassigned`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send provider unassignment:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendProviderBookingCancelled(data: {
  providerName: string;
  providerPhone: string;
  customerName: string;
  serviceDate: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-provider-booking-cancelled`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send provider cancellation notice:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendProviderBookingRescheduled(data: {
  providerName: string;
  providerPhone: string;
  customerName: string;
  oldDate: string;
  oldTime: string;
  newDate: string;
  newTime: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-provider-booking-rescheduled`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send provider reschedule notice:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendProviderReminder(data: {
  providerName: string;
  providerPhone: string;
  customerName: string;
  serviceDate: string;
  serviceTime: string;
  address: string;
}) {
  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-provider-reminder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send provider reminder:', error);
    return { success: false, error: 'Network error' };
  }
}

// ============================================
// ADMIN NOTIFICATIONS
// ============================================

export async function sendAdminNewBooking(data: {
  customerName: string;
  serviceDate: string;
  serviceTime: string;
  amount: number;
}) {
  if (!ADMIN_PHONE) {
    console.warn('ADMIN_PHONE not configured in environment variables');
    return { success: false, error: 'Admin phone not configured' };
  }

  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-admin-new-booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, adminPhone: ADMIN_PHONE }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send admin new booking notice:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendAdminCancellation(data: {
  customerName: string;
  serviceDate: string;
  amount: number;
}) {
  if (!ADMIN_PHONE) {
    console.warn('ADMIN_PHONE not configured in environment variables');
    return { success: false, error: 'Admin phone not configured' };
  }

  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-admin-cancellation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, adminPhone: ADMIN_PHONE }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send admin cancellation notice:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendAdminReschedule(data: {
  customerName: string;
  oldDate: string;
  newDate: string;
}) {
  if (!ADMIN_PHONE) {
    console.warn('ADMIN_PHONE not configured in environment variables');
    return { success: false, error: 'Admin phone not configured' };
  }

  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-admin-reschedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, adminPhone: ADMIN_PHONE }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send admin reschedule notice:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendAdminPaymentFailed(data: {
  customerName: string;
  amount: number;
  reason?: string;
}) {
  if (!ADMIN_PHONE) {
    console.warn('ADMIN_PHONE not configured in environment variables');
    return { success: false, error: 'Admin phone not configured' };
  }

  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-admin-payment-failed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, adminPhone: ADMIN_PHONE }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send admin payment failure notice:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function sendAdminUrgent(data: {
  subject: string;
  message: string;
}) {
  if (!ADMIN_PHONE) {
    console.warn('ADMIN_PHONE not configured in environment variables');
    return { success: false, error: 'Admin phone not configured' };
  }

  try {
    const response = await fetch(`${OPENPHONE_BOT_URL}/api/send-admin-urgent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, adminPhone: ADMIN_PHONE }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send admin urgent notice:', error);
    return { success: false, error: 'Network error' };
  }
}

