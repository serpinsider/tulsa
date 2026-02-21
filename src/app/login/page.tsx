import { Metadata } from 'next';
import { BRANDING, getBookingKoalaUrl } from '@/config/branding';

export const metadata: Metadata = {
  title: `Login to Your Account - ${BRANDING.businessName}`,
  description: `Access your ${BRANDING.businessName} account to manage bookings, view history, and update preferences.`,
  openGraph: {
    title: `Login to Your Account - ${BRANDING.businessName}`,
    description: `Access your ${BRANDING.businessName} account to manage bookings, view history, and update preferences.`,
    url: `${BRANDING.url}/login`,
    siteName: BRANDING.businessName,
    type: 'website',
  },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen pt-36 pb-20" style={{ background: 'rgba(15, 23, 42, 0.95)' }}>
      <div className="max-w-2xl mx-auto px-6">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ 
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <iframe
            src={getBookingKoalaUrl('login')}
            width="100%"
            height="600"
            frameBorder="0"
            title={`${BRANDING.businessName} Login`}
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}
