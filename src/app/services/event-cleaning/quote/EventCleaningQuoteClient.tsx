'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BRANDING } from '@/config/branding';

export default function EventCleaningQuoteClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    serviceNeeded: '',
    notes: ''
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const isValidEmail = (email: string) => email.includes('@') && email.includes('.');
  const isValidPhone = (phone: string) => phone.replace(/\D/g, '').length === 10;

  const handleSubmit = async () => {
    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.eventType || !formData.eventDate || !formData.serviceNeeded) {
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

      const confirmationNumber = 'TM-EVENT-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      const structuredData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        guestCount: formData.guestCount,
        serviceNeeded: formData.serviceNeeded,
        notes: formData.notes,
        service: 'event-cleaning',
        confirmationNumber,
        businessId: 'tulsa',
        business: 'Tulsa Maids',
        _subject: `Tulsa Maids - Event Cleaning Quote from ${formData.firstName} ${formData.lastName} - #${confirmationNumber}`,
      };

      const formspreeResponse = await fetch('https://formspree.io/f/xvzwolek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(structuredData),
      });

      if (!formspreeResponse.ok) {
        throw new Error('Failed to submit form');
      }

      alert('Thank you! We will contact you shortly about your event cleaning needs.');
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a3755] to-[#234b73] pt-48 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif font-semibold text-[#dfbd69] mb-6 drop-shadow-lg">
              Get Your Event Cleaning Quote
            </h1>
            <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md">
              Professional cleaning for your special event
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">First Name*</label>
                <input
                  type="text"
                  placeholder="ex. Jane"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Last Name*</label>
                <input
                  type="text"
                  placeholder="ex. Smith"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Email*</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Phone*</label>
                <input
                  type="tel"
                  placeholder={BRANDING.phone.display}
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                  maxLength={14}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Event Type*</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                >
                  <option value="">Select type</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="holiday">Holiday Party</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Event Date*</label>
                <input
                  type="date"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Expected Guests</label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                >
                  <option value="">Select range</option>
                  <option value="under-25">Under 25</option>
                  <option value="25-50">25-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Service Needed*</label>
                <select
                  value={formData.serviceNeeded}
                  onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white appearance-none focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                >
                  <option value="">Select service</option>
                  <option value="pre-event">Pre-Event Setup & Clean</option>
                  <option value="post-event">Post-Event Cleanup</option>
                  <option value="both">Both Pre & Post Event</option>
                  <option value="during-event">During Event Support</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Additional Details</label>
              <textarea
                placeholder="Venue details, special requirements, setup needs, etc."
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d] h-24 resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.eventType || !formData.eventDate || !formData.serviceNeeded || !isValidEmail(formData.email) || !isValidPhone(formData.phone)}
              className="w-full bg-[#dfbd69] text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-[#dfbd69]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get My Quote
            </button>

            <p className="text-xs text-white/60 text-center mt-4 leading-relaxed">
              By submitting this form, you agree to receive communications from Tulsa Maids regarding your quote request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

