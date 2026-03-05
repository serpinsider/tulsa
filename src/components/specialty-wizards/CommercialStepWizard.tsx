'use client';

import { useState, useEffect, useRef } from 'react';
import { CONTACT_INFO } from '@/lib/contact';
import SuccessMessage from '@/components/shared/SuccessMessage';

interface FormData {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  notes: string;
  confirmationNumber?: string;
}

interface CommercialStepWizardProps {
  onFormExpand?: (expanded: boolean, immediate?: boolean) => void;
}

export default function CommercialStepWizard({ onFormExpand }: CommercialStepWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const prevExpandedStateRef = useRef<boolean | undefined>(undefined);
  
  const [formData, setFormData] = useState<FormData>({
    phone: '', firstName: '', lastName: '', email: '',
    businessName: '', notes: '',
  });

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (onFormExpand && isMounted) {
      const isCurrentlyExpanded = currentStep >= 2;
      if (currentStep === 4 || typeof prevExpandedStateRef.current === 'undefined' || prevExpandedStateRef.current !== isCurrentlyExpanded) {
        prevExpandedStateRef.current = isCurrentlyExpanded;
        onFormExpand(isCurrentlyExpanded, true);
      }
    }
  }, [currentStep, onFormExpand, isMounted]);

  useEffect(() => { if (currentStep === 4 && isMounted) { window.scrollTo(0, 0); setTimeout(() => window.scrollTo(0, 0), 650); } }, [currentStep, isMounted]);

  const formatPhoneNumber = (value: string): string => {
    const c = value.replace(/\D/g, '');
    if (c.length >= 10) return `(${c.slice(0,3)}) ${c.slice(3,6)}-${c.slice(6,10)}`;
    if (c.length >= 6) return `(${c.slice(0,3)}) ${c.slice(3,6)}-${c.slice(6)}`;
    if (c.length >= 3) return `(${c.slice(0,3)}) ${c.slice(3)}`;
    return c.length > 0 ? `(${c}` : c;
  };

  const validateEmail = (email: string) => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone: string) => phone.replace(/\D/g, '').length === 10;

  const validateStep = (step: number): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (step === 1 && (!formData.phone.trim() || !validatePhoneNumber(formData.phone))) errs.phone = 'Please enter a complete 10-digit phone number';
    if (step === 2) {
      if (!formData.firstName.trim()) errs.firstName = 'First name is required';
      if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
      if (!formData.email.trim() || !validateEmail(formData.email)) errs.email = 'Please enter a valid email address';
    }
    return errs;
  };

  const updateFormData = (field: string, value: string) => { setFormData(prev => ({ ...prev, [field]: value })); if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' })); };
  const nextStep = () => { const e = validateStep(currentStep); if (Object.keys(e).length > 0) { setErrors(e); return; } if (currentStep < 3) { setErrors({}); setCurrentStep(currentStep + 1); } };
  const prevStep = () => { if (currentStep > 1) { setCurrentStep(currentStep - 1); if (currentStep - 1 === 1 && onFormExpand) onFormExpand(false, true); } };
  const handleCloseSuccess = () => { setCurrentStep(1); setFormData({ phone: '', firstName: '', lastName: '', email: '', businessName: '', notes: '' }); if (onFormExpand) onFormExpand(false); };

  const handleSubmit = async () => {
    const e = validateStep(2); if (Object.keys(e).length > 0) { setErrors(e); return; }
    setIsSubmitting(true); setSubmitError('');
    try {
      const confirmationNumber = 'TM-COMM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const response = await fetch('https://formspree.io/f/mrbjzvde', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          business: 'Tulsa Maids', 
          businessId: 'tulsa',
          serviceType: 'Commercial Cleaning', 
          firstName: formData.firstName, 
          lastName: formData.lastName, 
          email: formData.email, 
          phone: formData.phone,
          businessName: formData.businessName || 'Not provided', 
          notes: formData.notes || 'No additional notes', 
          confirmationNumber,
          _subject: `Tulsa Maids - Commercial Cleaning Quote from ${formData.firstName} ${formData.lastName} - #${confirmationNumber}`, 
          _gotcha: '' 
        }) 
      });
      if (response.ok) { window.scrollTo(0, 0); setFormData(prev => ({ ...prev, confirmationNumber })); setCurrentStep(4); } else throw new Error('Server error');
    } catch { setSubmitError('Something went wrong. Please try again or contact us directly.'); } finally { setIsSubmitting(false); }
  };

  const canProceed = () => { 
    switch (currentStep) { 
      case 1: return formData.phone && validatePhoneNumber(formData.phone); 
      case 2: return formData.firstName && formData.lastName && formData.email && validateEmail(formData.email); 
      case 3: return true; 
      default: return false; 
    } 
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6"><h3 className="text-sm sm:text-base text-white/70 mb-2">Get a quote for commercial cleaning</h3></div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
              <input type="tel" value={formData.phone} onChange={(e) => updateFormData('phone', formatPhoneNumber(e.target.value))} placeholder="[PHONE_NUMBER]" maxLength={14}
                className={`w-full px-3 py-3 border rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-[#dfbd69] focus:border-white backdrop-blur-sm ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-white/30'}`} />
              <div className="h-5 mt-1">{errors.phone && <p className="text-sm text-red-300">{errors.phone}</p>}</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6"><h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Your Information</h3></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-2 text-white">First Name*</label><input type="text" value={formData.firstName} onChange={(e) => updateFormData('firstName', e.target.value)} placeholder="ex. Jane" className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${errors.firstName ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'}`} /><div className="h-5 mt-1">{errors.firstName && <p className="text-sm text-red-300">{errors.firstName}</p>}</div></div>
              <div><label className="block text-sm font-semibold mb-2 text-white">Last Name*</label><input type="text" value={formData.lastName} onChange={(e) => updateFormData('lastName', e.target.value)} placeholder="ex. Smith" className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${errors.lastName ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'}`} /><div className="h-5 mt-1">{errors.lastName && <p className="text-sm text-red-300">{errors.lastName}</p>}</div></div>
            </div>
            <div><label className="block text-sm font-semibold mb-2 text-white">Email*</label><input type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} placeholder="email@example.com" className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'}`} /><div className="h-5 mt-1">{errors.email && <p className="text-sm text-red-300">{errors.email}</p>}</div></div>
            <div><label className="block text-sm font-semibold mb-2 text-white">Business Name (Optional)</label><input type="text" value={formData.businessName} onChange={(e) => updateFormData('businessName', e.target.value)} placeholder="Your Company Name" className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm" /></div>
            <div><label className="block text-sm font-semibold mb-2 text-white">Tell us about your needs (Optional)</label><textarea value={formData.notes} onChange={(e) => updateFormData('notes', e.target.value)} rows={3} placeholder="Facility type, size, scheduling needs..." className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm" /></div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6"><h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Review Your Request</h3><p className="text-sm text-white/70">We'll contact you to discuss your commercial cleaning needs</p></div>
            <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div><span className="text-sm font-semibold text-white">Name:</span><p className="text-sm text-white/80">{formData.firstName} {formData.lastName}</p></div>
              <div><span className="text-sm font-semibold text-white">Email:</span><p className="text-sm text-white/80">{formData.email}</p></div>
              <div><span className="text-sm font-semibold text-white">Phone:</span><p className="text-sm text-white/80">{formData.phone}</p></div>
              {formData.businessName && <div><span className="text-sm font-semibold text-white">Business:</span><p className="text-sm text-white/80">{formData.businessName}</p></div>}
              {formData.notes && <div><span className="text-sm font-semibold text-white">Details:</span><p className="text-sm text-white/80">{formData.notes}</p></div>}
            </div>
            {submitError && <div className="bg-red-500/20 border border-red-400 rounded-lg p-4"><p className="text-red-300 text-sm text-center">{submitError}</p></div>}
            <p className="text-[10px] sm:text-xs text-white/60 text-center leading-relaxed">By submitting, you agree to receive communications from Tulsa Maids regarding your quote request.</p>
          </div>
        );
      default: return null;
    }
  };

  if (!isMounted) return null;
  if (currentStep === 4) return <SuccessMessage type="quote" confirmationNumber={formData.confirmationNumber} inline={true} onClose={handleCloseSuccess} />;

  return (
    <div className="w-full">
      <div className="text-center mb-6"><h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 drop-shadow-lg">Commercial Cleaning Quote</h2></div>
      <div className="max-w-2xl mx-auto">
        {renderStep()}
        <div className="flex gap-4 mt-8">
          {currentStep > 1 && <button onClick={prevStep} className="flex-1 p-3 rounded-lg font-semibold bg-white/30 text-white hover:bg-white/40 transition-all duration-300 hover:-translate-y-[1px]">Back</button>}
          {currentStep === 3 ? (
            <button onClick={handleSubmit} disabled={!canProceed() || isSubmitting} className={`${currentStep === 1 ? 'w-full' : 'flex-1'} p-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${canProceed() && !isSubmitting ? 'bg-[#dfbd69] text-[#1a3755] hover:bg-[#dfbd69]/90 hover:-translate-y-[1px]' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}>
              {isSubmitting ? (<><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Submitting...</>) : 'Submit Request'}
            </button>
          ) : <button onClick={nextStep} disabled={!canProceed()} className={`${currentStep === 1 ? 'w-full' : 'flex-1'} p-3 rounded-lg font-semibold transition-all duration-300 ${canProceed() ? 'bg-[#dfbd69] text-[#1a3755] hover:bg-[#dfbd69]/90 hover:-translate-y-[1px]' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}>Continue</button>}
        </div>
        {currentStep > 1 && <div className="mt-6 text-center pt-4 border-t border-white/20"><p className="text-xs sm:text-sm text-white/80 mb-2">Need help?</p><p className="text-sm sm:text-base text-white font-semibold">Call or text us! <a href={CONTACT_INFO.phone.href} className="text-[#dfbd69] hover:text-[#dfbd69]/80 transition-colors duration-200 underline">{CONTACT_INFO.phone.display}</a></p></div>}
        {currentStep === 3 && <div className="mt-6 flex items-center justify-center gap-8"><div className="flex items-center gap-2"><div className="flex">{[1,2,3,4,5].map(star => <svg key={star} className="w-4 h-4 text-[#dfbd69]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div><span className="text-sm text-white/80">4.9 (141 Reviews)</span></div><div className="text-sm text-white/80"><span className="font-semibold">141</span> Happy Customers</div></div>}
      </div>
    </div>
  );
}
