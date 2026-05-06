'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { INLINE_STYLES } from '@/styles/colors';
import { BRANDING } from '@/config/branding';

export default function JoinOurTeamClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    availability: '',
    transportation: '',
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
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.experience) {
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

      const applicationNumber = 'TM-APP-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      const structuredData = {
        "First Name": formData.firstName,
        "Last Name": formData.lastName,
        "Email": formData.email,
        "Phone": formData.phone,
        "Address": formData.address,
        "Experience": formData.experience,
        "Availability": formData.availability,
        "Transportation": formData.transportation,
        "Notes": formData.notes,
        "Application Number": applicationNumber,
        _subject: `Tulsa Maids - Application from ${formData.firstName} ${formData.lastName} - #${applicationNumber}`,
      };

      const formspreeResponse = await fetch('https://formspree.io/f/xvzwolek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(structuredData),
      });

      if (!formspreeResponse.ok) {
        throw new Error('Failed to submit form');
      }

      alert('Thank you for your application! We will contact you shortly.');
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen pt-48 pb-12" style={INLINE_STYLES.primary}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[${COLORS.brand.gold}] mb-6 drop-shadow-lg">
              Join Our Team
            </h1>
            <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md">
              Become part of our trusted housekeeping team
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-white/10 rounded-lg p-6 mb-8 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-3">Why Work With Us:</h3>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• Competitive pay and flexible scheduling</li>
              <li>• Supplies and equipment provided</li>
              <li>• Ongoing training and support</li>
              <li>• Work in beautiful homes across Tulsa</li>
              <li>• Build lasting relationships with clients</li>
              <li>• Background check and insurance provided</li>
            </ul>
          </div>

          <div className="space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  First Name*
                </label>
                <input
                  type="text"
                  placeholder="ex. Jane"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Last Name*
                </label>
                <input
                  type="text"
                  placeholder="ex. Smith"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                  placeholder="email@example.com"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
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
                  placeholder={BRANDING.phone.display}
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
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
                Address
              </label>
              <input
                type="text"
                placeholder="123 Main St, Tulsa, OK"
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Cleaning Experience*
              </label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
              >
                <option value="">Select experience level</option>
                <option value="none">No experience</option>
                <option value="some">Some experience</option>
                <option value="experienced">Very experienced</option>
                <option value="professional">Professional maid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
              >
                <option value="">Select availability</option>
                <option value="weekdays">Weekdays only</option>
                <option value="weekends">Weekends only</option>
                <option value="flexible">Flexible schedule</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Transportation
              </label>
              <select
                value={formData.transportation}
                onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}]"
              >
                <option value="">Select transportation</option>
                <option value="car">Own car</option>
                <option value="public">Public transportation</option>
                <option value="bike">Bike</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Tell Us About Yourself
              </label>
              <textarea
                placeholder="Tell us about your experience, why you want to work with us, your strengths, availability details, etc."
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[${COLORS.brand.goldMuted}] focus:ring-1 focus:ring-[${COLORS.brand.goldMuted}] h-32 resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.experience || !isValidEmail(formData.email) || !isValidPhone(formData.phone)}
              className="w-full button-quaternary px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Application
            </button>

            <p className="text-xs text-white/60 text-center mt-4 leading-relaxed">
              By submitting this form, you agree to receive communications from Tulsa Maids regarding your application.
              <br />
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

