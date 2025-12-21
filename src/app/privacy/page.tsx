import { CONTACT_INFO } from '@/lib/contact';

export default function PrivacyPolicy() {
  return (
    <main className="pt-48 pb-16 px-4" style={{ background: 'rgba(15, 23, 42, 0.95)' }}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[#dfbd69] mb-6 drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md">
            How we protect and use your information
          </p>
        </div>

        <div className="space-y-12">
          
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[#dfbd69] mb-6">Information We Collect</h2>
            <div className="space-y-4 text-white/80">
              <p>We collect information you provide directly to us when you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request a quote through our website or phone</li>
                <li>Book a cleaning service</li>
                <li>Contact us with questions</li>
                <li>Apply to work with us</li>
              </ul>
              <p>This information may include your name, phone number, email address, service address, access instructions, payment information, and service preferences.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[#dfbd69] mb-6">Text Message Communications</h2>
            <div className="space-y-4 text-white/80">
              <p>By providing your phone number, you consent to receive text messages from Brooklyn Maids regarding:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Quote confirmations and follow-ups</li>
                <li>Service appointment confirmations and reminders</li>
                <li>Arrival notifications and service updates</li>
                <li>Payment confirmations and receipts</li>
                <li>Customer service communications</li>
              </ul>
              <p><strong className="text-white">Important:</strong> We may need to contact you outside of normal business hours (8 AM - 8 PM) for urgent matters related to your scheduled service, such as arrival delays, emergency rescheduling, or access issues.</p>
              <p>You can opt out of non-essential text messages at any time by replying STOP. Essential service-related messages (confirmations, arrival notifications) may still be sent as they are necessary for service delivery.</p>
              <p>Message and data rates may apply depending on your mobile carrier plan.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[#dfbd69] mb-6">How We Use Your Information</h2>
            <div className="space-y-4 text-white/80">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and coordinate our cleaning services</li>
                <li>Process your payments</li>
                <li>Send you service updates, reminders, and confirmations</li>
                <li>Respond to your requests and questions</li>
                <li>Improve our services and customer experience</li>
                <li>Send promotional offers (with your consent)</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[#dfbd69] mb-6">Information Sharing</h2>
            <div className="space-y-4 text-white/80">
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our cleaning team members who will be providing your service</li>
                <li>Payment processors for transaction processing</li>
                <li>Service providers who assist in our business operations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[#dfbd69] mb-6">Data Security</h2>
            <div className="space-y-4 text-white/80">
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              <p>However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[#dfbd69] mb-6">Your Rights</h2>
            <div className="space-y-4 text-white/80">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Opt-out of non-essential text messages</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[#dfbd69] mb-6">Contact Us</h2>
            <div className="space-y-4 text-white/80">
              <p>If you have questions about our privacy practices, please contact us:</p>
              <div className="space-y-2">
                <p>Email: {CONTACT_INFO.email.display}</p>
                <p>Phone: {CONTACT_INFO.phone.display}</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}