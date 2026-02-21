import { BRANDING } from '@/config/branding';
import { COVERAGE_ZONE } from '@/config/content';

export default function ContactInfoSection() {
  return (
    <section className="py-20" style={{background: 'rgba(15, 23, 42, 0.95)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#dfbd69] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Phone Support</h3>
            <a href={BRANDING.phone.href} className="text-white font-semibold hover:text-[#dfbd69] transition-colors">
              {BRANDING.phone.display}
            </a>
            <p className="text-sm text-white">7 days weekly availability</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#dfbd69] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Digital Contact</h3>
            <a href={BRANDING.email.href} className="text-white font-semibold hover:text-[#dfbd69] transition-colors">
              {BRANDING.email.display}
            </a>
            <p className="text-sm text-white">Same-day email replies</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#dfbd69] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Coverage Zone</h3>
            <p className="text-white font-semibold">{COVERAGE_ZONE.title}</p>
            <p className="text-sm text-white">{COVERAGE_ZONE.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
