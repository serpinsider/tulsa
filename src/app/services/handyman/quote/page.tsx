'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CONTACT_INFO } from '@/lib/contact';

export default function HandymanQuotePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    services: [] as string[],
    notes: ''
  });

  const handymanServices = [
    'Furniture Assembly',
    'TV Mounting',
    'Picture Hanging',
    'Minor Repairs',
    'Shelf Installation',
    'Light Fixture Installation'
  ];

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

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
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

      const confirmationNumber = 'BK-HANDYMAN-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      const structuredData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        services: formData.services,
        notes: formData.notes,
        confirmationNumber,
        _subject: `Handyman Quote Request from ${formData.firstName} ${formData.lastName} - #${confirmationNumber}`,
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

      alert('Thank you! We will contact you shortly with a handyman quote.');
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
              Get Your Handyman Quote
            </h1>
            <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md">
              Furniture assembly, mounting, repairs, and home improvements
            </p>
          </div>

          {/* Service Description */}
          <div className="bg-white/10 rounded-lg p-6 mb-8 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-3">What We Provide:</h3>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• Furniture assembly (IKEA, Amazon, etc.)</li>
              <li>• TV mounting and entertainment center setup</li>
              <li>• Picture and mirror hanging</li>
              <li>• Minor repairs (loose handles, squeaky doors)</li>
              <li>• Shelf and bracket installation</li>
              <li>• Light fixture installation and bulb changes</li>
              <li>• Basic home maintenance tasks</li>
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
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
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
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
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
                Address*
              </label>
              <input
                type="text"
                placeholder="123 Main St, Brooklyn, NY"
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34]"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Services Needed */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-white">
                What services do you need? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {handymanServices.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      formData.services.includes(service)
                        ? 'bg-[#dfbd69]/20 ring-2 ring-[#dfbd69] text-white'
                        : 'bg-white/10 ring-1 ring-white/20 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Project Details
              </label>
              <textarea
                placeholder="Describe your project in detail - what needs to be done, any special requirements, timeline, etc."
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#926f34] focus:ring-1 focus:ring-[#926f34] h-32 resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !isValidEmail(formData.email) || !isValidPhone(formData.phone)}
              className="w-full bg-[#dfbd69] text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-[#dfbd69]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get My Handyman Quote
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
