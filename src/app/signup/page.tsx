'use client';

import Script from 'next/script';

export default function SignupPage() {
  return (
    <main className="min-h-screen pt-48 pb-16 px-4" style={{ background: 'rgba(15, 23, 42, 1)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: 'rgba(20, 25, 30, 0.5)' }}>
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Sign Up</h1>
          <p className="text-white/80 mb-8 text-center">Create your account</p>
          
          <div className="bg-white rounded-lg overflow-hidden" style={{ minHeight: '800px' }}>
            <iframe 
              src="https://pine.bookingkoala.com/signup?embed=true" 
              style={{
                border: 'none',
                height: '800px',
                width: '100%'
              }}
              scrolling="no"
              title="Sign Up"
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
