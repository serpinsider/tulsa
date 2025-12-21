'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CONTACT_INFO } from '@/lib/contact';

export default function CommercialQuotePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessAddress: '',
    businessType: '',
    squareFootage: '',
    serviceType: '',
    frequency: '',
    employeeCount: '',
    notes: ''
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const isValidEmail = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  const isValidPhone = (phone: string) => {
    const numericPhone = phone.replace(/\D/g, '');
    return numericPhone.length === 10;
  };

  const handleSubmit = async () => {
    try {
      if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone || !formData.businessAddress || !formData.serviceType) {
        alert('Please fill in all required fields');
        return;
      }

      if (!isValidEmail(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }

      if (!isValidPhone(formData.phone)) {
        alert('Please enter a valid phone number');
        return;
      }

      const confirmationNumber = 'BK-COMMERCIAL-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      const structuredData = {
        businessName: formData.businessName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        businessAddress: formData.businessAddress,
        businessType: formData.businessType,
        squareFootage: formData.squareFootage,
        serviceType: formData.serviceType,
        frequency: formData.frequency,
        employeeCount: formData.employeeCount,
        notes: formData.notes,
        confirmationNumber,
        _subject: `Commercial Cleaning Quote Request from ${formData.contactName} (${formData.businessName}) - #${confirmationNumber}`,
      };

      const formspreeResponse = await fetch('https://formspree.io/f/mqazolgp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(structuredData),
      });

      if (!formspreeResponse.ok) {
        throw new Error('Failed to submit form');
      }

      alert('Thank you! We will contact you shortly with a commercial cleaning quote.');
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-48 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[#dfbd69] mb-6 drop-shadow-lg">
              Get Your Commercial Cleaning Quote
            </h1>
            <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md">
              Office cleaning, janitorial services, and commercial maintenance
            </p>
          </div>

          {/* Service Description */}
          <div className="bg-white/10 rounded-lg p-6 mb-8 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-3">What We Provide:</h3>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• Daily office cleaning and maintenance</li>
              <li>• Janitorial services and supply management</li>
              <li>• Floor care (vacuuming, mopping, stripping, waxing)</li>
              <li>• Restroom cleaning and restocking</li>
              <li>• Trash and recycling removal</li>
              <li>• Window cleaning (interior)</li>
              <li>• After-hours and weekend service available</li>
            </ul>
          </div>

          <div className="space-y-6">
            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Business Name*
                </label>
                <input
                  type="text"
                  placeholder="Your Business Name"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Contact Name*
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Email*
                </label>
                <input
                  type="email"
                  placeholder="business@example.com"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Phone*
                </label>
                <input
                  type="tel"
                  placeholder="(347) 750-4380"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setFormData({ ...formData, phone: formatted });
                  }}
                  maxLength={14}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Business Address*
              </label>
              <input
                type="text"
                placeholder="123 Business St, Brooklyn, NY"
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
              />
            </div>

            {/* Business Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Business Type*
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                >
                  <option value="">Select type</option>
                  <option value="office">Office/Corporate</option>
                  <option value="retail">Retail Store</option>
                  <option value="restaurant">Restaurant/Food Service</option>
                  <option value="medical">Medical/Dental Office</option>
                  <option value="real-estate">Real Estate/Property</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Square Footage
                </label>
                <select
                  value={formData.squareFootage}
                  onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                >
                  <option value="">Select size</option>
                  <option value="under-1000">Under 1,000 sqft</option>
                  <option value="1000-3000">1,000-3,000 sqft</option>
                  <option value="3000-5000">3,000-5,000 sqft</option>
                  <option value="5000-10000">5,000-10,000 sqft</option>
                  <option value="over-10000">Over 10,000 sqft</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Service Type*
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                >
                  <option value="">Select service</option>
                  <option value="office-cleaning">Office Cleaning</option>
                  <option value="janitorial">Janitorial Services</option>
                  <option value="turnover">Realtor/Turnover Cleaning</option>
                  <option value="post-construction">Post-Construction</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Cleaning Frequency*
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi_weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="one_time">One-Time</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Approximate Employee Count
              </label>
              <select
                value={formData.employeeCount}
                onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
              >
                <option value="">Select range</option>
                <option value="1-5">1-5 employees</option>
                <option value="6-15">6-15 employees</option>
                <option value="16-30">16-30 employees</option>
                <option value="31-50">31-50 employees</option>
                <option value="50+">50+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Additional Details
              </label>
              <textarea
                placeholder="Describe your cleaning needs, special requirements, preferred schedule, etc."
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34] h-32 resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!formData.businessName || !formData.contactName || !formData.email || !formData.phone || !formData.businessAddress || !formData.serviceType || !isValidEmail(formData.email) || !isValidPhone(formData.phone)}
              className="w-full bg-[#dfbd69] text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-[#dfbd69]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get My Commercial Quote
            </button>

            <p className="text-xs text-white/60 text-center mt-4 leading-relaxed">
              By submitting this form, you agree to receive communications from Brooklyn Maids regarding your quote request.
              <br />
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
