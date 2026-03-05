import Link from 'next/link';
import { BRANDING } from '@/config/branding';
import { locations } from '@/lib/locations';
import { FOOTER_DESCRIPTION } from '@/config/content';
import { COLORS } from '@/styles/colors';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a3755] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold text-white/60 mb-3">Services</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-xs text-white/80 hover:text-white">House Cleaning</Link></li>
              <li><Link href="/services/deep-clean" className="text-xs text-white/80 hover:text-white">Deep Cleaning</Link></li>
              <li><Link href="/services/move-out" className="text-xs text-white/80 hover:text-white">Move Out Cleaning</Link></li>
              <li><Link href="/services/commercial" className="text-xs text-white/80 hover:text-white">Commercial</Link></li>
              <li><Link href="/services/carpet-cleaning" className="text-xs text-white/80 hover:text-white">Carpet Cleaning</Link></li>
              <li><Link href="/services/handyman" className="text-xs text-white/80 hover:text-white">Handyman</Link></li>
              <li><Link href="/services/car-cleaning" className="text-xs text-white/80 hover:text-white">Car Detailing</Link></li>
              <li><Link href="/services/airbnb" className="text-xs text-white/80 hover:text-white">Airbnb Cleaning</Link></li>
              <li><Link href="/services/event-cleaning" className="text-xs text-white/80 hover:text-white">Event Cleaning</Link></li>
              <li><Link href="/services/post-construction" className="text-xs text-white/80 hover:text-white">Post-Construction</Link></li>
            </ul>
          </div>

          {/* Primary Locations */}
          <div>
            <h3 className="text-xs font-semibold text-white/60 mb-3">Service Areas</h3>
            <ul className="space-y-2.5">
              {locations.slice(0, 5).map((location) => (
                <li key={location.slug}>
                  <Link href={`/locations/${location.slug}`} className="text-xs text-white/80 hover:text-white">
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Locations */}
          {locations.length > 5 && (
            <div>
              <h3 className="text-xs font-semibold text-white/60 mb-3">More Areas</h3>
              <ul className="space-y-2.5">
                {locations.slice(5, 10).map((location) => (
                  <li key={location.slug}>
                    <Link href={`/locations/${location.slug}`} className="text-xs text-white/80 hover:text-white">
                      {location.name}
                    </Link>
                  </li>
                ))}
                {locations.length > 10 && (
                  <li><Link href="/locations" className="text-xs text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold">View All Areas →</Link></li>
                )}
              </ul>
            </div>
          )}

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-white/60 mb-3">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/#areas" className="text-xs text-white/80 hover:text-white">Service Areas</Link></li>
              <li><Link href="/#reviews" className="text-xs text-white/80 hover:text-white">Reviews</Link></li>
              <li><Link href="/#faq" className="text-xs text-white/80 hover:text-white">FAQ</Link></li>
              <li><Link href="/join-our-team" className="text-xs text-white/80 hover:text-white">Careers</Link></li>
              <li><Link href="/gift-cards" className="text-xs text-white/80 hover:text-white">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xs font-semibold text-white/60 mb-3">Customer Service</h3>
            <ul className="space-y-2.5">
              <li><Link href="/quote" className="text-xs text-white/80 hover:text-white">Get Quote</Link></li>
              <li><Link href="/booking" className="text-xs text-white/80 hover:text-white">Book Online</Link></li>
              <li><Link href="/login" className="text-xs text-white/80 hover:text-white">Account</Link></li>
              <li><Link href="/privacy" className="text-xs text-white/80 hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="text-xs text-white/80 hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 py-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-8">
              <Logo size="sm" className="opacity-80" />
              <p className="text-xs text-white/40">
                Professional cleaning services across {BRANDING.serviceAreaLong}.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href={BRANDING.phone.href} className="text-xs text-white/60 hover:text-white">{BRANDING.phone.display}</a>
              <Link href="/refund" className="text-xs text-white/40 hover:text-white">Refund Policy</Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-white/40">
              Copyright &copy; {currentYear} {BRANDING.businessName}. All rights reserved.
            </p>
            <p className="text-xs text-white/30 mt-2">
              {FOOTER_DESCRIPTION}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}