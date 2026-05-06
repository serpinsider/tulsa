'use client';

import { useState } from 'react';
import { BRANDING } from '@/config/branding';
import { COLORS, INLINE_STYLES } from '@/styles/colors';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
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
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
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

      const confirmationNumber = 'TM-CONTACT-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      const structuredData = {
        sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
        _subject: `Tulsa Maids - Contact from ${formData.firstName} ${formData.lastName} - #${confirmationNumber}`,
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

      alert('Thank you! We will get back to you shortly.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again or contact us directly.');
    }
  };

  return (
    <section id="contact" className="py-20" style={INLINE_STYLES.primary}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-serif font-bold text-[#dfbd69] mb-6 drop-shadow-lg">
            Contact Us
          </h2>
          <p className="text-base sm:text-base lg:text-medium text-gray-100 leading-relaxed drop-shadow-md max-w-2xl mx-auto">
            Have questions or ready to book? Get in touch with us today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
              
              <div className="space-y-4">
                <a 
                  href={BRANDING.phone.href} 
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-[#dfbd69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{BRANDING.phone.display}</span>
                </a>

                <a 
                  href={BRANDING.phone.smsHref} 
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-[#dfbd69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Text us</span>
                </a>

                <a 
                  href={BRANDING.email.href} 
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-[#dfbd69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{BRANDING.email.display}</span>
                </a>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-white mb-4">Service Hours</h3>
              <div className="space-y-1 text-white/80">
                <p>Monday: 8 AM - 8 PM</p>
                <p>Tuesday: 8 AM - 8 PM</p>
                <p>Wednesday: 8 AM - 8 PM</p>
                <p>Thursday: 8 AM - 8 PM</p>
                <p>Friday: 8 AM - 8 PM</p>
                <p>Saturday: 8 AM - 8 PM</p>
                <p>Sunday: 8 AM - 8 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-md">
            <h3 className="text-lg font-semibold text-white mb-4">Send Us A Message</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name*"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone*"
                  className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d]"
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setFormData({ ...formData, phone: formatted });
                  }}
                  maxLength={14}
                />
              </div>

              <textarea
                placeholder="Your message or questions*"
                className="w-full p-3 border border-white/20 rounded-lg bg-slate-900/50 text-white placeholder-white/50 focus:border-[#b8956d] focus:ring-1 focus:ring-[#b8956d] h-32 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <button
                onClick={handleSubmit}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message || !isValidEmail(formData.email) || !isValidPhone(formData.phone)}
                className="w-full bg-[#dfbd69] text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-[#dfbd69]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>

              <p className="text-xs text-white/60 text-center mt-4 leading-relaxed">
                We'll get back to you within a few hours during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}