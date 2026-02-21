'use client';

import Script from 'next/script';
import { INLINE_STYLES } from '@/styles/colors';
import { getBookingKoalaUrl } from '@/config/branding';

export default function LoginClient() {
  return (
    <main className="min-h-screen pt-48 pb-16 px-4" style={INLINE_STYLES.primary}>
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={INLINE_STYLES.primary}>
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Log In</h1>
          <p className="text-white/80 mb-8 text-center">Access your account</p>
          
          <div className="bg-white rounded-lg overflow-hidden" style={{ minHeight: '650px' }}>
            <iframe 
              src={getBookingKoalaUrl('login')} 
              style={{
                border: 'none',
                height: '650px',
                width: '100%'
              }}
              scrolling="no"
              title="Log In"
            />
            <Script 
              src={getBookingKoalaUrl('resources/embed.js')} 
              strategy="lazyOnload"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

