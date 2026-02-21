import { BRANDING } from '@/config/branding';
import { INLINE_STYLES } from '@/styles/colors';

export default function RefundClient() {
  return (
    <main className="pt-48 pb-16 px-4" style={INLINE_STYLES.primary}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[${COLORS.brand.gold}] mb-6 drop-shadow-lg">
            Refunds & Cancellations
          </h1>
          <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md">
            Our commitment to your satisfaction and fair policies
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Satisfaction Guarantee */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">Satisfaction Guarantee</h2>
            <div className="space-y-4 text-white/80">
              <p>We make it right if the clean isn't to your standard.</p>
              <p>After a clean is complete, you can contact us and let us know if there was an issue. Pictures always help us understand the concern better.</p>
              <p>We can offer a re-clean, re-visit, or a partial refund depending on the situation.</p>
              <p>We're open about refunds - we ask that you reach out to let us know if you're unsatisfied and we do our best to fix it.</p>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">Cancellation Policy</h2>
            <div className="space-y-4 text-white/80">
              <p><strong className="text-white">Cancellations:</strong> 10% charge if you cancel less than 24 hours before a booking. No charge otherwise.</p>
              <p><strong className="text-white">Rescheduling:</strong> No charge if you just reschedule your appointment.</p>
              <p>We ask that you let us know as far ahead of time as possible for cancellations or reschedules so we can accommodate other customers.</p>
            </div>
          </section>

          {/* How to Contact Us */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">How to Contact Us for Refunds or Issues</h2>
            <div className="space-y-4">
              <p className="text-white/80">For any refund requests or service issues, please reach out to us:</p>
              
              <div className="space-y-3">
                <a 
                  href={BRANDING.phone.href} 
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-[${COLORS.brand.gold}]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call us: {BRANDING.phone.display}</span>
                </a>

                <a 
                  href={BRANDING.phone.smsHref} 
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-[${COLORS.brand.gold}]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Text us: {BRANDING.phone.display}</span>
                </a>

                <a 
                  href={BRANDING.email.href} 
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-[${COLORS.brand.gold}]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email us: {BRANDING.email.display}</span>
                </a>
              </div>

              <p className="text-sm text-white/70 mt-4">
                We typically respond within a few hours during business hours (8 AM - 8 PM, every day).
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

