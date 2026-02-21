import { BRANDING } from '@/config/branding';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-48 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[${COLORS.brand.gold}] mb-6 drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md">
              Get in touch for quotes, questions, or to schedule your service
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
                
                <div className="space-y-4">
                  <a 
                    href={BRANDING.phone.href} 
                    className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5 text-[${COLORS.brand.gold}]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{BRANDING.phone.display}</span>
                  </a>

                  <a 
                    href={BRANDING.email.href} 
                    className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5 text-[${COLORS.brand.gold}]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{BRANDING.email.display}</span>
                  </a>

                  <div className="flex items-start space-x-3 text-white/80">
                    <svg className="w-5 h-5 text-[${COLORS.brand.gold}] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p>Service Areas:</p>
                      <p className="text-sm text-white/70">Tulsa, Broken Arrow, Owasso, Jenks, Bixby, Sand Springs</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-white/80">
                    <svg className="w-5 h-5 text-[${COLORS.brand.gold}] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p>Hours:</p>
                      <p className="text-sm text-white/70">Every day, 8 AM - 8 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <a href="/quote" className="block text-[${COLORS.brand.gold}] hover:text-[${COLORS.brand.gold}]/80 transition-colors">
                    → Get a cleaning quote
                  </a>
                  <a href="/services/carpet-cleaning/quote" className="block text-[${COLORS.brand.gold}] hover:text-[${COLORS.brand.gold}]/80 transition-colors">
                    → Get a carpet cleaning quote
                  </a>
                  <a href="/services/handyman/quote" className="block text-[${COLORS.brand.gold}] hover:text-[${COLORS.brand.gold}]/80 transition-colors">
                    → Get a handyman quote
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Send Us A Message</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
                  />
                </div>

                <textarea
                  placeholder="Your message or questions..."
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}] h-32 resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-[${COLORS.brand.gold}] text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-[${COLORS.brand.gold}]/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
