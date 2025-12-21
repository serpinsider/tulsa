// Email Service using Resend
import { Resend } from 'resend';

let resend: Resend | null = null;

function getResendClient() {
  // Return null if no API key is available (e.g., during build)
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  
  // Initialize client if not already done
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  
  return resend;
}

export interface BookingConfirmationData {
  customerEmail: string;
  customerName: string;
  confirmationNumber: string;
  serviceDate: string;
  serviceTime: string;
  serviceType: string;
  address: string;
  totalPrice: number;
  paymentMethod: string;
  siteBusiness: string;
  dashboardLink: string;
}

// Generic email sending function
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions) {
  const resendClient = getResendClient();
  
  if (!resendClient) {
    console.warn('Resend API key not configured, skipping email send');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const response = await resendClient.emails.send({
      from: options.from || 'Brooklyn Maids <bookings@brooklynmaids.com>',
      to: [options.to],
      subject: options.subject,
      html: options.html,
    });

    return { success: true, emailId: response.data?.id };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export async function sendBookingConfirmation(data: BookingConfirmationData) {
  try {
    const resendClient = getResendClient();
    
    if (!resendClient) {
      console.warn('Resend API key not configured, skipping email send');
      return { success: false, error: 'Email service not configured' };
    }
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 40px 30px; text-center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
    .header p { margin: 10px 0 0; font-size: 16px; color: #dfbd69; }
    .content { padding: 40px 30px; }
    .success-badge { background-color: #10b981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-size: 14px; font-weight: 600; margin-bottom: 20px; }
    .info-box { background-color: #f8fafc; border-left: 4px solid #dfbd69; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .info-row:last-child { border-bottom: none; }
    .info-label { font-weight: 600; color: #64748b; }
    .info-value { color: #1e293b; font-weight: 500; }
    .cta-button { display: inline-block; background-color: #dfbd69; color: #1e293b; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .cta-button:hover { background-color: #c9a959; }
    .footer { background-color: #f8fafc; padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
    .alert-box { background-color: #dbeafe; border-left: 4px solid: #3b82f6; padding: 16px; margin: 20px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${data.siteBusiness}</h1>
      <p>Booking Confirmation</p>
    </div>
    
    <div class="content">
      <div class="success-badge">✓ Booking Received</div>
      
      <h2 style="margin-top: 0; color: #1e293b;">Hi ${data.customerName}!</h2>
      <p style="font-size: 16px; color: #475569;">
        Thank you for booking with ${data.siteBusiness}! Your booking inquiry has been received.
      </p>
      
      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #92400e;">⚠️ Action Required: Confirm Your Booking</h3>
        <p style="margin: 0; color: #78350f; font-size: 14px;">
          <strong>Please add your payment method to confirm your booking.</strong> Your booking will remain as an inquiry until payment information is added.
        </p>
      </div>

      <div class="info-box">
        <h3 style="margin-top: 0; color: #1e293b;">Booking Details</h3>
        <div class="info-row">
          <span class="info-label">Confirmation Number</span>
          <span class="info-value">${data.confirmationNumber}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Service Type</span>
          <span class="info-value">${data.serviceType}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date & Time</span>
          <span class="info-value">${data.serviceDate} at ${data.serviceTime}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Address</span>
          <span class="info-value">${data.address}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Estimated Total</span>
          <span class="info-value">$${data.totalPrice}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Payment Method</span>
          <span class="info-value">${data.paymentMethod === 'card' ? 'Credit/Debit Card' : data.paymentMethod === 'zelle' ? 'Zelle' : 'Pending'}</span>
        </div>
      </div>

      <div class="alert-box">
        <p style="margin: 0; font-size: 14px; color: #1e40af;">
          <strong>Important:</strong> This is a reservation. Our team will contact you within 24 hours to confirm your appointment details.
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.dashboardLink}" class="cta-button">
          View & Manage Booking
        </a>
      </div>

      <h3 style="color: #1e293b; margin-top: 30px;">What Happens Next?</h3>
      <ul style="color: #475569; line-height: 1.8;">
        <li>You'll receive a confirmation call or text within 24 hours</li>
        <li>Our team will confirm your appointment time and answer any questions</li>
        <li>Payment will be processed after your cleaning is complete</li>
        <li>We'll send a reminder 24 hours before your service</li>
      </ul>

      <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #1e40af;">Access Your Dashboard</h4>
        <p style="margin: 5px 0 10px; color: #1e3a8a; font-size: 14px;">
          Click the "View & Manage Booking" button above to access your customer dashboard.
        </p>
        <p style="margin: 5px 0; color: #1e3a8a; font-size: 14px;"><strong>From your dashboard you can:</strong></p>
        <ul style="margin: 10px 0; padding-left: 20px; color: #1e3a8a; font-size: 14px;">
          <li>View all your bookings</li>
          <li>Reschedule or cancel appointments</li>
          <li>Update your contact information</li>
          <li>Add or change payment method</li>
          <li>View cleaning history and receipts</li>
        </ul>
        <p style="margin: 10px 0 0; color: #1e3a8a; font-size: 13px;">
          <strong>First time logging in?</strong> Use the email address you booked with (${data.customerEmail}). If you haven't set a password yet, click "Forgot Password" on the login page.
        </p>
      </div>

      ${data.paymentMethod === 'card' ? `
      <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #1e40af;">⚠️ Action Required: Add Payment Method</h4>
        <p style="margin: 0; color: #1e3a8a; font-size: 14px;">
          Please add your card details in your dashboard before your appointment. You'll only be charged after your cleaning is complete.
        </p>
        <a href="${data.dashboardLink}" style="display: inline-block; margin-top: 12px; background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">Add Payment Method Now</a>
      </div>
      ` : data.paymentMethod === 'zelle' ? `
      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #92400e;">Payment Instructions (After Service)</h4>
        <p style="margin: 0; color: #78350f; font-size: 14px;">
          After your cleaning, you'll receive Zelle/CashApp payment instructions via text and email.
        </p>
      </div>
      ` : `
      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #92400e;">Payment (After Service)</h4>
        <p style="margin: 0; color: #78350f; font-size: 14px;">
          Please add your payment method in your dashboard. You'll only be charged after your cleaning is complete.
        </p>
        <a href="${data.dashboardLink}" style="display: inline-block; margin-top: 12px; background-color: #f59e0b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">Add Payment Method</a>
      </div>
      `}

      <h3 style="color: #1e293b; margin-top: 30px;">Need to Make Changes?</h3>
      <p style="color: #475569;">
        You can modify your booking, reschedule, or cancel anytime through your customer dashboard or by replying to this email.
      </p>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 30px;">
        <h4 style="margin-top: 0; color: #1e293b;">Questions?</h4>
        <p style="margin: 5px 0; color: #475569;">Call or text: <strong>${data.siteBusiness === 'Brooklyn Maids' ? '(347) 750-4380' : '(480) 520-0202'}</strong></p>
        <p style="margin: 5px 0; color: #475569;">Email: <strong>${data.siteBusiness === 'Brooklyn Maids' ? 'hello@brooklynmaids.com' : 'hello@mesamaids.com'}</strong></p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>${data.siteBusiness}</strong></p>
      <p>Professional House Cleaning Services</p>
      <p style="margin-top: 20px;">
        This email was sent regarding booking #${data.confirmationNumber}<br>
        <a href="${data.dashboardLink}" style="color: #dfbd69;">Manage Your Booking</a>
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const response = await resendClient.emails.send({
      from: `${data.siteBusiness} <bookings@${data.siteBusiness === 'Brooklyn Maids' ? 'brooklynmaids.com' : 'mesamaids.com'}>`,
      to: [data.customerEmail],
      subject: `Booking Confirmed - ${data.siteBusiness} - #${data.confirmationNumber}`,
      html: emailHtml,
    });

    return { success: true, emailId: response.data?.id };
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error);
    return { success: false, error };
  }
}

