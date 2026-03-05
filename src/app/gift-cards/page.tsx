'use client';

import Script from 'next/script';

export default function GiftCardsPage() {
  return (
    <main className="min-h-screen pt-48 pb-16 px-4" style={{ background: 'rgba(30, 35, 40, 0.98)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: 'rgba(20, 25, 30, 0.5)' }}>
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Gift Cards</h1>
          <p className="text-white/80 mb-8 text-center">Give the gift of a spotless home</p>
          
          <div className="bg-white rounded-lg overflow-hidden" style={{ minHeight: '1000px' }}>
            <iframe 
              src="https://pine.bookingkoala.com/gift-cards/send?embed=true" 
              style={{
                border: 'none',
                height: '1000px',
                width: '100%'
              }}
              scrolling="no"
              title="Gift Cards"
            />
            <Script 
              src="https://pine.bookingkoala.com/resources/embed.js" 
              strategy="lazyOnload"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
