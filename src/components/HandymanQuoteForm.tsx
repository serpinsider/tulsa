'use client';

import { useState } from 'react';
import { CONTACT_INFO } from '@/lib/contact';
import SuccessMessage from '@/components/shared/SuccessMessage';
import { COLORS } from '@/styles/colors';

const getFormBg = () => {
  const primary = COLORS.backgrounds.primary;
  if (primary.includes('var(')) return 'rgba(45, 20, 16, 0.5)';
  return primary.replace('0.95', '0.5');
};

export default function HandymanQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    jobType: '',
    jobDescription: '',
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
    setErrors({});
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (formData.email && !isValidEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.phone && !isValidPhone(formData.phone)) newErrors.phone = 'Please enter a valid 10-digit phone number';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const confirmNum = 'TM-HANDY-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
      const response = await fetch('https://formspree.io/f/[FORMSPREE_ID]', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: '[BUSINESS_NAME]',
          serviceType: 'Handyman Services',
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          'Email': formData.email,
          'Phone': formData.phone,
          'Zip Code': formData.zipCode || 'Not provided',
          'Job Type': formData.jobType || 'Not specified',
          'Job Description': formData.jobDescription || 'Not provided',
          'Notes': formData.notes || 'No additional notes',
          'Confirmation Number': confirmNum,
          _subject: `[BUSINESS_NAME] - Handyman Quote from ${formData.firstName} ${formData.lastName} - #${confirmNum}`,
          _gotcha: ''
        })
      });
      if (!response.ok) throw new Error('Failed to submit');
      setConfirmationNumber(confirmNum);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch { alert('There was an error submitting the form. Please try again or contact us directly.'); }
  };

  if (submitted) return <SuccessMessage type="quote" confirmationNumber={confirmationNumber} />;
  const canSubmit = formData.firstName && formData.lastName && formData.email && formData.phone && isValidEmail(formData.email) && isValidPhone(formData.phone);

  return (
    <div className="w-full max-w-full sm:container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: getFormBg() }}>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Handyman Services Quote</h1>
          <p className="text-[#dfbd69] font-medium mb-6">We'll text you a quote within 10 minutes</p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-2 text-white">First Name*</label><input type="text" placeholder="ex. Jane" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className={`w-full p-3 border rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] ${errors.firstName ? 'border-red-500' : 'border-white/20'}`} style={{ background: getFormBg() }} /><div className="h-5 mt-1">{errors.firstName && <p className="text-red-400 text-sm">{errors.firstName}</p>}</div></div>
              <div><label className="block text-sm font-semibold mb-2 text-white">Last Name*</label><input type="text" placeholder="ex. Smith" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className={`w-full p-3 border rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] ${errors.lastName ? 'border-red-500' : 'border-white/20'}`} style={{ background: getFormBg() }} /><div className="h-5 mt-1">{errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}</div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="block text-sm font-semibold mb-2 text-white">Email*</label><input type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full p-3 border rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] ${errors.email ? 'border-red-500' : 'border-white/20'}`} style={{ background: getFormBg() }} /><div className="h-5 mt-1">{errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}</div></div>
              <div><label className="block text-sm font-semibold mb-2 text-white">Phone*</label><input type="tel" placeholder={CONTACT_INFO.phone.display} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })} maxLength={14} className={`w-full p-3 border rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] ${errors.phone ? 'border-red-500' : 'border-white/20'}`} style={{ background: getFormBg() }} /><div className="h-5 mt-1">{errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}</div></div>
              <div><label className="block text-sm font-semibold mb-2 text-white">Zip Code</label><input type="text" placeholder="74103" value={formData.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '').slice(0, 5) })} maxLength={5} className="w-full p-3 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69]" style={{ background: getFormBg() }} /><div className="h-5 mt-1"></div></div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <h3 className="text-lg font-semibold text-[#dfbd69] mb-4">What do you need help with?</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Furniture Assembly', 'TV Mounting', 'Minor Repairs', 'Picture/Shelf Hanging', 'Light Fixtures', 'Caulking/Sealing', 'Other'].map((option) => (
                  <button key={option} type="button" onClick={() => setFormData({ ...formData, jobType: formData.jobType === option ? '' : option })} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.jobType === option ? 'bg-[#dfbd69] text-[#1a1f24]' : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'}`}>{option}</button>
                ))}
              </div>
              <div><label className="block text-sm font-semibold mb-2 text-white">Describe the Job (Optional)</label><textarea value={formData.jobDescription} onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })} rows={3} placeholder="What do you need done? (e.g., assemble IKEA bed frame, mount 55-inch TV on wall...)" className="w-full p-3 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69]" style={{ background: getFormBg() }} /></div>
            </div>

            <div><label className="block text-sm font-semibold mb-2 text-white">Additional Details (Optional)</label><textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={2} placeholder="Access codes, parking info, anything else we should know..." className="w-full p-3 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69]" style={{ background: getFormBg() }} /></div>
            <p className="text-xs text-white/60 text-center mb-4 mt-8">By submitting this form, you agree to receive communications from Vegas Maids regarding your quote request.</p>
            <button onClick={handleSubmit} disabled={!canSubmit} className="button-quaternary w-full">Submit</button>
            <div className="mt-6 flex items-center justify-center gap-8"><div className="flex items-center gap-2"><div className="flex">{[1,2,3,4,5].map((star) => (<svg key={star} className="w-4 h-4 text-[#dfbd69]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div><span className="text-sm text-white/80">4.9 (141 Reviews)</span></div><div className="text-sm text-white/80"><span className="font-semibold">141</span> Happy Customers</div></div>
          </div>
        </div>

        <div className="backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: getFormBg() }}>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4 text-white">Quote Summary</h3>
              <div className="space-y-4">
                {formData.firstName && formData.lastName && <div><span className="text-base font-semibold text-white">Name:</span><p className="text-base text-white/80">{formData.firstName} {formData.lastName}</p></div>}
                <div><span className="text-base font-semibold text-white">Job Type:</span><p className="text-base text-white/80">{formData.jobType || 'Not specified'}</p></div>
                {formData.jobDescription && <div><span className="text-base font-semibold text-white">Description:</span><p className="text-base text-white/80">{formData.jobDescription.substring(0, 100)}{formData.jobDescription.length > 100 ? '...' : ''}</p></div>}
              </div>
            </div>
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-serif font-bold mb-4 text-white">Need Help?</h3>
              <div className="space-y-3">
                <a href={CONTACT_INFO.phone.href} className="flex items-center space-x-3 text-base text-white/80 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><span>{CONTACT_INFO.phone.display}</span></a>
                <a href={`sms:${CONTACT_INFO.phone.raw}`} className="flex items-center space-x-3 text-base text-white/80 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg><span>Text us</span></a>
                <a href={CONTACT_INFO.email.href} className="flex items-center space-x-3 text-base text-white/80 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><span>{CONTACT_INFO.email.display}</span></a>
              </div>
              <div className="mt-6 space-y-4">
                <h4 className="text-base font-semibold text-white">Handyman FAQ</h4>
                <div className="space-y-4">
                  <div className="space-y-1"><p className="text-sm font-medium text-white/90">How much does it cost?</p><p className="text-xs text-white/70 leading-relaxed">We charge by the job, not the hour. Get a free quote first!</p></div>
                  <div className="space-y-1"><p className="text-sm font-medium text-white/90">What can you fix?</p><p className="text-xs text-white/70 leading-relaxed">Assembly, mounting, minor repairs, installations, and more.</p></div>
                  <div className="space-y-1"><p className="text-sm font-medium text-white/90">Same-day available?</p><p className="text-xs text-white/70 leading-relaxed">Yes, depending on availability. Let us know if it's urgent!</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
