/**
 * Email Templates for Brooklyn Maids
 * 
 * All email templates in one place for consistency and easy maintenance
 */

import { UNIFIED_COLORS } from '@/styles/unified-colors';

interface BookingData {
  customerName: string;
  customerEmail: string;
  serviceType: string;
  serviceDate: string;
  serviceTime: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: string;
  frequency?: string;
  totalPrice?: number;
  addOns?: string[];
  specialInstructions?: string;
  bookingId?: string;
  providerName?: string;
  providerPhone?: string;
}

const BRAND_COLORS = {
  gold: '#926f34',
  darkGold: '#7a5a2a',
  lightGold: '#b8924a',
  background: '#1a1a1a',
  cardBg: '#2a2a2a',
};

/**
 * Base email wrapper with Brooklyn Maids branding
 */
function emailWrapper(content: string, preheader?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${preheader ? `<meta name="description" content="${preheader}">` : ''}
  <title>Brooklyn Maids</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, ${BRAND_COLORS.gold} 0%, ${BRAND_COLORS.darkGold} 100%); padding: 40px 20px; text-align: center; }
    .header h1 { margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; }
    .content { padding: 40px 30px; color: #1f2937; }
    .button { display: inline-block; padding: 14px 32px; background: ${BRAND_COLORS.gold}; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .button:hover { background: ${BRAND_COLORS.darkGold}; }
    .info-box { background-color: #f9fafb; border-left: 4px solid ${BRAND_COLORS.gold}; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .footer { background-color: #f9fafb; padding: 30px 20px; text-align: center; color: #6b7280; font-size: 14px; }
    .divider { height: 1px; background-color: #e5e7eb; margin: 30px 0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px 0; }
    .label { font-weight: 600; color: #4b5563; }
    .value { color: #1f2937; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Brooklyn Maids</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p><strong>Brooklyn Maids</strong></p>
      <p>Phone: <a href="tel:3477504380" style="color: ${BRAND_COLORS.gold};">(347) 750-4380</a></p>
      <p>Email: <a href="mailto:brooklynmaidsny@gmail.com" style="color: ${BRAND_COLORS.gold};">brooklynmaidsny@gmail.com</a></p>
      <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
        You're receiving this email because you have an account with Brooklyn Maids.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * CUSTOMER NOTIFICATIONS
 */

export function customerBookingInquiryEmail(data: BookingData): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Booking Inquiry Received!</h2>
    
    <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #92400e;">
        ⚠️ Action Required: Confirm Your Booking
      </p>
      <p style="margin: 10px 0 0 0; color: #92400e;">
        Please add your payment method to confirm your booking.
      </p>
    </div>

    <p>Hi ${data.customerName},</p>
    
    <p>Thank you for choosing Brooklyn Maids! We've received your booking inquiry and are excited to help you.</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Booking Details</h3>
      <table>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">Time:</td><td class="value">${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}${data.city ? `, ${data.city}` : ''}${data.state ? `, ${data.state}` : ''}${data.zip ? ` ${data.zip}` : ''}</td></tr>
        ${data.bedrooms ? `<tr><td class="label">Bedrooms:</td><td class="value">${data.bedrooms}</td></tr>` : ''}
        ${data.bathrooms ? `<tr><td class="label">Bathrooms:</td><td class="value">${data.bathrooms}</td></tr>` : ''}
        ${data.squareFeet ? `<tr><td class="label">Square Feet:</td><td class="value">${data.squareFeet}</td></tr>` : ''}
        ${data.frequency ? `<tr><td class="label">Frequency:</td><td class="value">${data.frequency}</td></tr>` : ''}
        ${data.totalPrice ? `<tr><td class="label">Total Price:</td><td class="value">$${data.totalPrice}</td></tr>` : ''}
      </table>
      ${data.addOns && data.addOns.length > 0 ? `
        <div style="margin-top: 15px;">
          <p class="label" style="margin-bottom: 5px;">Add-ons:</p>
          <ul style="margin: 0; padding-left: 20px;">
            ${data.addOns.map(addon => `<li>${addon}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/customer-dashboard" class="button">
        Add Payment Method & Confirm Booking
      </a>
    </div>

    <p><strong>Next Steps:</strong></p>
    <ol>
      <li>Click the button above to access your dashboard</li>
      <li>Add your payment method (Credit Card or Zelle)</li>
      <li>Your booking will be confirmed automatically</li>
      <li>We'll contact you 24 hours before your service</li>
    </ol>

    <p>Questions? Reply to this email or call us at <a href="tel:3477504380" style="color: ${BRAND_COLORS.gold};">(347) 750-4380</a></p>

    <p>Looking forward to serving you!</p>
    <p><strong>The Brooklyn Maids Team</strong></p>
  `;

  return {
    subject: 'Action Required: Confirm Your Brooklyn Maids Booking',
    html: emailWrapper(content, 'Please add your payment method to confirm your booking'),
  };
}

export function customerBookingConfirmedEmail(data: BookingData): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Booking Confirmed!</h2>
    
    <div style="background-color: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
      <p style="margin: 0; font-size: 18px; font-weight: 600; color: #065f46;">
        ✅ Your booking is confirmed!
      </p>
    </div>

    <p>Hi ${data.customerName},</p>
    
    <p>Great news! Your booking with Brooklyn Maids is now confirmed. We'll contact you 24 hours before your scheduled service.</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Booking Details</h3>
      <table>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">Time:</td><td class="value">${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}${data.city ? `, ${data.city}` : ''}${data.state ? `, ${data.state}` : ''}${data.zip ? ` ${data.zip}` : ''}</td></tr>
        ${data.totalPrice ? `<tr><td class="label">Total Price:</td><td class="value">$${data.totalPrice}</td></tr>` : ''}
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/customer-dashboard" class="button">
        View Booking Details
      </a>
    </div>

    <p><strong>What's Next:</strong></p>
    <ul>
      <li>We'll send you a reminder 24 hours before your service</li>
      <li>Your assigned cleaner will arrive at the scheduled time</li>
      <li>You can reschedule or cancel anytime from your dashboard</li>
    </ul>

    <p>Need to make changes? Visit your dashboard or call us at <a href="tel:3477504380" style="color: ${BRAND_COLORS.gold};">(347) 750-4380</a></p>

    <p>Thank you for choosing Brooklyn Maids!</p>
    <p><strong>The Brooklyn Maids Team</strong></p>
  `;

  return {
    subject: 'Booking Confirmed - Brooklyn Maids',
    html: emailWrapper(content, 'Your booking is confirmed!'),
  };
}

export function customerBookingReminderEmail(data: BookingData): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Reminder: Your Service is Tomorrow</h2>
    
    <p>Hi ${data.customerName},</p>
    
    <p>This is a friendly reminder that your cleaning service is scheduled for tomorrow!</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Service Details</h3>
      <table>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">Time:</td><td class="value">${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}</td></tr>
        ${data.providerName ? `<tr><td class="label">Your Cleaner:</td><td class="value">${data.providerName}</td></tr>` : ''}
        ${data.providerPhone ? `<tr><td class="label">Cleaner Phone:</td><td class="value">${data.providerPhone}</td></tr>` : ''}
      </table>
    </div>

    <p><strong>Please ensure:</strong></p>
    <ul>
      <li>Someone is home to provide access, or leave instructions for entry</li>
      <li>Any pets are secured or informed us about them</li>
      <li>Clear any valuable or fragile items from cleaning areas</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/customer-dashboard" class="button">
        View Booking Details
      </a>
    </div>

    <p>Need to reschedule? Please contact us as soon as possible at <a href="tel:3477504380" style="color: ${BRAND_COLORS.gold};">(347) 750-4380</a></p>

    <p>See you tomorrow!</p>
    <p><strong>The Brooklyn Maids Team</strong></p>
  `;

  return {
    subject: 'Reminder: Your Brooklyn Maids Service is Tomorrow',
    html: emailWrapper(content, 'Your cleaning service is scheduled for tomorrow'),
  };
}

export function customerBookingCancelledEmail(data: BookingData): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Booking Cancelled</h2>
    
    <p>Hi ${data.customerName},</p>
    
    <p>Your booking has been cancelled as requested.</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Cancelled Booking</h3>
      <table>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">Time:</td><td class="value">${data.serviceTime}</td></tr>
      </table>
    </div>

    <p>We're sorry to see you go! If there's anything we could have done better, please let us know.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/booking" class="button">
        Book Another Service
      </a>
    </div>

    <p>We hope to serve you again soon!</p>
    <p><strong>The Brooklyn Maids Team</strong></p>
  `;

  return {
    subject: 'Booking Cancelled - Brooklyn Maids',
    html: emailWrapper(content, 'Your booking has been cancelled'),
  };
}

export function customerBookingRescheduledEmail(data: BookingData): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Booking Rescheduled</h2>
    
    <p>Hi ${data.customerName},</p>
    
    <p>Your booking has been rescheduled. Here are your new service details:</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Updated Service Details</h3>
      <table>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">New Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">New Time:</td><td class="value">${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}</td></tr>
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/customer-dashboard" class="button">
        View Booking Details
      </a>
    </div>

    <p>We'll send you a reminder 24 hours before your new service date.</p>

    <p>Questions? Call us at <a href="tel:3477504380" style="color: ${BRAND_COLORS.gold};">(347) 750-4380</a></p>

    <p>Thank you!</p>
    <p><strong>The Brooklyn Maids Team</strong></p>
  `;

  return {
    subject: 'Booking Rescheduled - Brooklyn Maids',
    html: emailWrapper(content, 'Your booking has been rescheduled'),
  };
}

/**
 * PROVIDER NOTIFICATIONS
 */

export function providerAssignedEmail(data: BookingData & { providerEmail: string }): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">New Job Assignment</h2>
    
    <p>Hi ${data.providerName},</p>
    
    <p>You've been assigned to a new cleaning job!</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Job Details</h3>
      <table>
        <tr><td class="label">Customer:</td><td class="value">${data.customerName}</td></tr>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">Time:</td><td class="value">${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}${data.city ? `, ${data.city}` : ''}${data.state ? `, ${data.state}` : ''}${data.zip ? ` ${data.zip}` : ''}</td></tr>
        ${data.bedrooms ? `<tr><td class="label">Bedrooms:</td><td class="value">${data.bedrooms}</td></tr>` : ''}
        ${data.bathrooms ? `<tr><td class="label">Bathrooms:</td><td class="value">${data.bathrooms}</td></tr>` : ''}
        ${data.squareFeet ? `<tr><td class="label">Square Feet:</td><td class="value">${data.squareFeet}</td></tr>` : ''}
      </table>
      ${data.addOns && data.addOns.length > 0 ? `
        <div style="margin-top: 15px;">
          <p class="label" style="margin-bottom: 5px;">Add-ons:</p>
          <ul style="margin: 0; padding-left: 20px;">
            ${data.addOns.map(addon => `<li>${addon}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      ${data.specialInstructions ? `
        <div style="margin-top: 15px;">
          <p class="label" style="margin-bottom: 5px;">Special Instructions:</p>
          <p style="margin: 0;">${data.specialInstructions}</p>
        </div>
      ` : ''}
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/provider-dashboard" class="button">
        View Job Details
      </a>
    </div>

    <p>Please confirm your availability and contact the customer if needed.</p>

    <p>Questions? Call us at <a href="tel:3477504380" style="color: ${BRAND_COLORS.gold};">(347) 750-4380</a></p>

    <p>Thank you!</p>
    <p><strong>Brooklyn Maids</strong></p>
  `;

  return {
    subject: 'New Job Assignment - Brooklyn Maids',
    html: emailWrapper(content, 'You have a new job assignment'),
  };
}

export function providerJobCancelledEmail(data: BookingData & { providerEmail: string }): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Job Cancelled</h2>
    
    <p>Hi ${data.providerName},</p>
    
    <p>The following job has been cancelled:</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Cancelled Job</h3>
      <table>
        <tr><td class="label">Customer:</td><td class="value">${data.customerName}</td></tr>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">Time:</td><td class="value">${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}</td></tr>
      </table>
    </div>

    <p>This job has been removed from your schedule.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/provider-dashboard" class="button">
        View Your Schedule
      </a>
    </div>

    <p>Questions? Call us at <a href="tel:3477504380" style="color: ${BRAND_COLORS.gold};">(347) 750-4380</a></p>

    <p>Thank you!</p>
    <p><strong>Brooklyn Maids</strong></p>
  `;

  return {
    subject: 'Job Cancelled - Brooklyn Maids',
    html: emailWrapper(content, 'A job has been cancelled'),
  };
}

export function providerJobRescheduledEmail(data: BookingData & { providerEmail: string; oldDate: string; oldTime: string }): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Job Rescheduled</h2>
    
    <p>Hi ${data.providerName},</p>
    
    <p>A job has been rescheduled. Please note the new date and time:</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Updated Job Details</h3>
      <table>
        <tr><td class="label">Customer:</td><td class="value">${data.customerName}</td></tr>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label" style="color: #ef4444;">Old Date:</td><td class="value" style="text-decoration: line-through; color: #6b7280;">${data.oldDate} at ${data.oldTime}</td></tr>
        <tr><td class="label" style="color: #10b981;">New Date:</td><td class="value" style="font-weight: 600;">${data.serviceDate} at ${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}</td></tr>
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/provider-dashboard" class="button">
        View Your Schedule
      </a>
    </div>

    <p>Please confirm your availability for the new date and time.</p>

    <p>Questions? Call us at <a href="tel:3477504380" style="color: ${BRAND_COLORS.gold};">(347) 750-4380</a></p>

    <p>Thank you!</p>
    <p><strong>Brooklyn Maids</strong></p>
  `;

  return {
    subject: 'Job Rescheduled - Brooklyn Maids',
    html: emailWrapper(content, 'A job has been rescheduled'),
  };
}

/**
 * ADMIN NOTIFICATIONS
 */

export function adminNewBookingInquiryEmail(data: BookingData): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">New Booking Inquiry</h2>
    
    <div style="background-color: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1e40af;">
        📋 New booking inquiry received - Awaiting payment confirmation
      </p>
    </div>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Customer Information</h3>
      <table>
        <tr><td class="label">Name:</td><td class="value">${data.customerName}</td></tr>
        <tr><td class="label">Email:</td><td class="value">${data.customerEmail}</td></tr>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">Time:</td><td class="value">${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}${data.city ? `, ${data.city}` : ''}${data.state ? `, ${data.state}` : ''}${data.zip ? ` ${data.zip}` : ''}</td></tr>
        ${data.bedrooms ? `<tr><td class="label">Bedrooms:</td><td class="value">${data.bedrooms}</td></tr>` : ''}
        ${data.bathrooms ? `<tr><td class="label">Bathrooms:</td><td class="value">${data.bathrooms}</td></tr>` : ''}
        ${data.totalPrice ? `<tr><td class="label">Total Price:</td><td class="value">$${data.totalPrice}</td></tr>` : ''}
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/admin-dashboard?tab=bookings" class="button">
        View in Admin Dashboard
      </a>
    </div>

    <p><strong>Next Steps:</strong></p>
    <ul>
      <li>Customer will add payment method to confirm</li>
      <li>Once confirmed, assign a cleaner</li>
      <li>Send reminder 24 hours before service</li>
    </ul>
  `;

  return {
    subject: `New Booking Inquiry - ${data.customerName} - ${data.serviceDate}`,
    html: emailWrapper(content, 'New booking inquiry received'),
  };
}

export function adminBookingConfirmedEmail(data: BookingData): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Booking Confirmed</h2>
    
    <div style="background-color: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #065f46;">
        ✅ Payment method added - Booking confirmed
      </p>
    </div>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Booking Information</h3>
      <table>
        <tr><td class="label">Customer:</td><td class="value">${data.customerName}</td></tr>
        <tr><td class="label">Email:</td><td class="value">${data.customerEmail}</td></tr>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">Time:</td><td class="value">${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}</td></tr>
        ${data.totalPrice ? `<tr><td class="label">Total Price:</td><td class="value">$${data.totalPrice}</td></tr>` : ''}
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/admin-dashboard?tab=bookings" class="button">
        Assign Cleaner
      </a>
    </div>

    <p><strong>Action Required:</strong> Assign a cleaner to this booking.</p>
  `;

  return {
    subject: `Booking Confirmed - ${data.customerName} - ${data.serviceDate}`,
    html: emailWrapper(content, 'Booking confirmed - assign cleaner'),
  };
}

export function adminBookingCancelledEmail(data: BookingData): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Booking Cancelled</h2>
    
    <p>A booking has been cancelled by the customer:</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Cancelled Booking</h3>
      <table>
        <tr><td class="label">Customer:</td><td class="value">${data.customerName}</td></tr>
        <tr><td class="label">Email:</td><td class="value">${data.customerEmail}</td></tr>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label">Date:</td><td class="value">${data.serviceDate}</td></tr>
        <tr><td class="label">Time:</td><td class="value">${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}</td></tr>
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/admin-dashboard?tab=bookings" class="button">
        View Dashboard
      </a>
    </div>

    <p>The assigned provider (if any) has been notified.</p>
  `;

  return {
    subject: `Booking Cancelled - ${data.customerName} - ${data.serviceDate}`,
    html: emailWrapper(content, 'A booking has been cancelled'),
  };
}

export function adminBookingRescheduledEmail(data: BookingData & { oldDate: string; oldTime: string }): { subject: string; html: string } {
  const content = `
    <h2 style="color: ${BRAND_COLORS.gold}; margin-top: 0;">Booking Rescheduled</h2>
    
    <p>A booking has been rescheduled by the customer:</p>

    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLORS.gold};">Rescheduled Booking</h3>
      <table>
        <tr><td class="label">Customer:</td><td class="value">${data.customerName}</td></tr>
        <tr><td class="label">Email:</td><td class="value">${data.customerEmail}</td></tr>
        <tr><td class="label">Service:</td><td class="value">${data.serviceType}</td></tr>
        <tr><td class="label" style="color: #ef4444;">Old Date:</td><td class="value" style="text-decoration: line-through; color: #6b7280;">${data.oldDate} at ${data.oldTime}</td></tr>
        <tr><td class="label" style="color: #10b981;">New Date:</td><td class="value" style="font-weight: 600;">${data.serviceDate} at ${data.serviceTime}</td></tr>
        <tr><td class="label">Address:</td><td class="value">${data.address}</td></tr>
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://light-one-iota.vercel.app/admin-dashboard?tab=bookings" class="button">
        Re-assign Cleaner
      </a>
    </div>

    <p><strong>Action Required:</strong> The booking has been moved to "Needs Attention". Please re-assign a cleaner.</p>
  `;

  return {
    subject: `Booking Rescheduled - ${data.customerName} - New Date: ${data.serviceDate}`,
    html: emailWrapper(content, 'A booking has been rescheduled'),
  };
}
