import { BRANDING } from '@/config/branding';
import { INLINE_STYLES } from '@/styles/colors';

export default function TermsClient() {
  return (
    <main className="pt-48 pb-16 px-4" style={INLINE_STYLES.primary}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[${COLORS.brand.gold}] mb-6 drop-shadow-lg">
            Terms of Service
          </h1>
          <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md">
            Our service agreement and policies
          </p>
        </div>

        <div className="space-y-12">
          
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">Service Agreement</h2>
            <div className="space-y-4 text-white/80">
              <p>By booking our services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information about your cleaning needs</li>
                <li>Grant access to your property at the scheduled time</li>
                <li>Pay for services as agreed upon completion</li>
                <li>Communicate any special requirements or concerns</li>
                <li>Allow us to contact you via phone, text, or email regarding your service</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">Our Commitment</h2>
            <div className="space-y-4 text-white/80">
              <p>We commit to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Arrive within the scheduled time window</li>
                <li>Provide quality cleaning services</li>
                <li>Use eco-friendly cleaning products and equipment</li>
                <li>Respect your property and privacy</li>
                <li>Carry appropriate insurance coverage</li>
                <li>Communicate clearly about any service changes</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">Service Limitations</h2>
            <div className="space-y-4 text-white/80">
              <p>Our services do not include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Moving heavy furniture</li>
                <li>Cleaning biohazardous materials</li>
                <li>Exterior window cleaning above ground level</li>
                <li>Pest control services</li>
                <li>Repairs or maintenance work (unless specifically booked as handyman service)</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">Payment Terms</h2>
            <div className="space-y-4 text-white/80">
              <p>Payment is due upon completion of service. We accept:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit and debit cards</li>
                <li>Zelle payments</li>
                <li>Cash (for regular customers)</li>
              </ul>
              <p>No upfront payment is required. We charge only after you're satisfied with the service.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">Liability and Insurance</h2>
            <div className="space-y-4 text-white/80">
              <p>Tulsa Maids is fully insured and bonded. However:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Report any damages within 24 hours of service completion</li>
                <li>We're insured for accidental damages during normal cleaning operations</li>
                <li>We're not liable for pre-existing conditions or damage</li>
                <li>Claims must be reported promptly with photos for investigation</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">Service Areas</h2>
            <div className="space-y-4 text-white/80">
              <p>We currently serve:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tulsa (all neighborhoods)</li>
                <li>Manhattan</li>
                <li>Queens</li>
                <li>Bronx</li>
                <li>Staten Island</li>
                <li>Jersey City and surrounding areas</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[${COLORS.brand.gold}] mb-6">Contact Us</h2>
            <div className="space-y-4 text-white/80">
              <p>For questions about these terms, please contact us:</p>
              <div className="space-y-2">
                <p>Email: {BRANDING.email.display}</p>
                <p>Phone: {BRANDING.phone.display}</p>
                <p>Hours: Monday-Sunday, 8 AM - 8 PM</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

