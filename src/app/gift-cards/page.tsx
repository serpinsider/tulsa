import type { Metadata } from 'next';
import { BRANDING, getBookingKoalaUrl } from '@/config/branding';

export const metadata: Metadata = {
  title: `Gift Cards - ${BRANDING.businessName}`,
  description: `Send the gift of a clean home! Purchase ${BRANDING.businessName} gift cards for friends, family, or clients. Perfect for housewarmings, holidays, or any special occasion.`,
};

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen pt-48 pb-12" style={{ background: 'rgba(15, 23, 42, 0.95)' }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[#dfbd69] mb-6 drop-shadow-lg">
            Gift Cards
          </h1>
          <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md">
            Give the gift of a spotless home to someone you care about
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden">
          <iframe 
            src={getBookingKoalaUrl('gift-cards/send')}
            style={{ border: 'none', height: '1000px' }} 
            width="100%" 
            scrolling="no"
            title="Gift Cards"
          />
        </div>
      </div>
      <script src={`https://${BRANDING.integrations.bookingKoalaSubdomain}.bookingkoala.com/resources/embed.js`} defer />
    </div>
  );
}
