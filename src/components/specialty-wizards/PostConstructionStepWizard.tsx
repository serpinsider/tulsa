'use client';

import { useState, useEffect, useRef } from 'react';
import { CONTACT_INFO } from '@/lib/contact';
import SuccessMessage from '@/components/shared/SuccessMessage';

interface PostConstructionStepWizardProps {
  onFormExpand?: (expanded: boolean, immediate?: boolean) => void;
}

export default function PostConstructionStepWizard({ onFormExpand }: PostConstructionStepWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const prevExpandedStateRef = useRef<boolean | undefined>(undefined);

  const [formData, setFormData] = useState({
    phone: '', firstName: '', lastName: '', email: '', zipCode: '',
    constructionType: '', squareFootage: '', bedrooms: '', bathrooms: '',
    notes: '', confirmationNumber: '',
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

  useEffect(() => {
    if (currentStep >= 2 && isMounted) {
      window.scrollTo(0, 0);
    }
  }, [currentStep, isMounted]);

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

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (typeof value === 'string') {
      if (field === 'phone') {
        if (value && !validatePhoneNumber(value)) {
          setErrors(prev => ({ ...prev, phone: 'Please enter a complete 10-digit phone number' }));
        } else {
          setErrors(prev => ({ ...prev, phone: '' }));
        }
      } else if (field === 'email') {
        if (value && !validateEmail(value)) {
          setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
        } else {
          setErrors(prev => ({ ...prev, email: '' }));
        }
      } else if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    }
    if (submitError) setSubmitError('');
  };
  const nextStep = () => { const e = validateStep(currentStep); if (Object.keys(e).length > 0) { setErrors(e); return; } if (currentStep < 3) { setErrors({}); setCurrentStep(currentStep + 1); } };
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep - 1 === 1 && onFormExpand) {
        onFormExpand(false, true);
        setTimeout(() => {
          const heroElement = document.querySelector('#hero') || document.querySelector('main');
          if (heroElement) heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };
  const handleCloseSuccess = () => { setCurrentStep(1); setFormData({ phone: '', firstName: '', lastName: '', email: '', zipCode: '', constructionType: '', squareFootage: '', bedrooms: '', bathrooms: '', notes: '', confirmationNumber: '' }); if (onFormExpand) onFormExpand(false); };

  const handleSubmit = async (retryCount = 0) => {
    const e = validateStep(2); if (Object.keys(e).length > 0) { setErrors(e); return; }
    setIsSubmitting(true); setSubmitError('');
    try {
      const confirmationNumber = 'TM-POSTCON-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const response = await fetch('https://formspree.io/f/mrbjzvde', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: 'Tulsa Maids',
          businessId: 'tulsa',
          serviceType: 'Post-Construction Cleaning',
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          'Email': formData.email,
          'Phone': formData.phone,
          'Zip Code': formData.zipCode || 'Not provided',
          'Construction Type': formData.constructionType || 'Not specified',
          'Square Footage': formData.squareFootage || 'Not specified',
          'Bedrooms': formData.bedrooms || 'Not specified',
          'Bathrooms': formData.bathrooms || 'Not specified',
          'Notes': formData.notes || 'No additional notes',
          'Confirmation Number': confirmationNumber,
          _subject: `Tulsa Maids - Post-Construction Quote from ${formData.firstName} ${formData.lastName} - #${confirmationNumber}`,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
          _gotcha: '',
        })
      });
      if (response.ok) { window.scrollTo(0, 0); setFormData(prev => ({ ...prev, confirmationNumber })); setCurrentStep(4); } else { const errorData = await response.json().catch(() => ({})); throw new Error(errorData.message || `Server error: ${response.status}`); }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      if (retryCount < 2 && (error instanceof TypeError || message.includes('fetch'))) { setTimeout(() => handleSubmit(retryCount + 1), 1000); return; }
      if (message.includes('fetch') || error instanceof TypeError) { setSubmitError('Network error. Please check your connection and try again.'); }
      else if (message.includes('400')) { setSubmitError('Please check your information and try again.'); }
      else { setSubmitError('Something went wrong. Please try again or contact us directly.'); }
    } finally { setIsSubmitting(false); }
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
            <div className="text-center mb-6"><h3 className="text-sm sm:text-base text-white/70 mb-2">Get a quote for post-construction cleaning</h3></div>
            <div className="relative">
              <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
              <input type="tel" value={formData.phone} onChange={(e) => updateFormData('phone', formatPhoneNumber(e.target.value))} placeholder={CONTACT_INFO.phone.display} maxLength={14}
                className={`w-full px-3 py-3 border rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-[#dfbd69] focus:border-white backdrop-blur-sm ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-white/30'}`} />
              {errors.phone && <p className="absolute left-0 -bottom-5 text-xs text-red-300">{errors.phone}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6"><h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Contact & Property Details</h3></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-2 text-white">First Name*</label><input type="text" value={formData.firstName} onChange={(e) => updateFormData('firstName', e.target.value)} placeholder="ex. Jane" className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${errors.firstName ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'}`} /><div className="h-5 mt-1">{errors.firstName && <p className="text-sm text-red-300">{errors.firstName}</p>}</div></div>
              <div><label className="block text-sm font-semibold mb-2 text-white">Last Name*</label><input type="text" value={formData.lastName} onChange={(e) => updateFormData('lastName', e.target.value)} placeholder="ex. Smith" className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${errors.lastName ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'}`} /><div className="h-5 mt-1">{errors.lastName && <p className="text-sm text-red-300">{errors.lastName}</p>}</div></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-2 text-white">Email*</label><input type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} placeholder="email@example.com" className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'}`} /><div className="h-5 mt-1">{errors.email && <p className="text-sm text-red-300">{errors.email}</p>}</div></div>
              <div><label className="block text-sm font-semibold mb-2 text-white">Zip Code</label><input type="text" value={formData.zipCode} onChange={(e) => updateFormData('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="11201" maxLength={5} className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Construction Type</label>
                <div className="relative">
                  <select value={formData.constructionType} onChange={(e) => updateFormData('constructionType', e.target.value)} className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm">
                    <option value="">Select...</option><option value="New Build">New Build</option><option value="Renovation">Renovation/Remodel</option><option value="Addition">Addition</option><option value="Commercial Build-Out">Commercial Build-Out</option><option value="Other">Other</option><option value="Not Sure">Not Sure</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Square Footage</label>
                <div className="relative">
                  <select value={formData.squareFootage} onChange={(e) => updateFormData('squareFootage', e.target.value)} className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm">
                    <option value="">Select...</option><option value="Under 1,000">Under 1,000 sqft</option><option value="1,000-2,000">1,000-2,000 sqft</option><option value="2,000-3,500">2,000-3,500 sqft</option><option value="3,500-5,000">3,500-5,000 sqft</option><option value="5,000+">5,000+ sqft</option><option value="Not Sure">Not Sure</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Bedrooms</label>
                <div className="relative">
                  <select value={formData.bedrooms} onChange={(e) => updateFormData('bedrooms', e.target.value)} className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm">
                    <option value="">Select...</option><option value="Studio">Studio</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5+">5+</option><option value="Not Sure">Not Sure</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Bathrooms</label>
                <div className="relative">
                  <select value={formData.bathrooms} onChange={(e) => updateFormData('bathrooms', e.target.value)} className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm">
                    <option value="">Select...</option><option value="1">1</option><option value="1.5">1.5</option><option value="2">2</option><option value="2.5">2.5</option><option value="3">3</option><option value="3+">3+</option><option value="Not Sure">Not Sure</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                </div>
              </div>
            </div>
            <div><label className="block text-sm font-semibold mb-2 text-white">Additional Details (Optional)</label><textarea value={formData.notes} onChange={(e) => updateFormData('notes', e.target.value)} rows={3} placeholder="Type of construction, timeline, special requirements..." className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm" /></div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6"><h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Review Your Request</h3><p className="text-sm text-white/70">We'll contact you to discuss your post-construction cleaning needs</p></div>
            <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div><span className="text-sm font-semibold text-white">Name:</span><p className="text-sm text-white/80">{formData.firstName} {formData.lastName}</p></div>
              <div><span className="text-sm font-semibold text-white">Email:</span><p className="text-sm text-white/80">{formData.email}</p></div>
              <div><span className="text-sm font-semibold text-white">Phone:</span><p className="text-sm text-white/80">{formData.phone}</p></div>
              {formData.zipCode && <div><span className="text-sm font-semibold text-white">Zip Code:</span><p className="text-sm text-white/80">{formData.zipCode}</p></div>}
              {formData.constructionType && <div><span className="text-sm font-semibold text-white">Type:</span><p className="text-sm text-white/80">{formData.constructionType}</p></div>}
              {formData.squareFootage && <div><span className="text-sm font-semibold text-white">Size:</span><p className="text-sm text-white/80">{formData.squareFootage}</p></div>}
              {(formData.bedrooms || formData.bathrooms) && <div><span className="text-sm font-semibold text-white">Property:</span><p className="text-sm text-white/80">{formData.bedrooms || '?'} bed / {formData.bathrooms || '?'} bath</p></div>}
              {formData.notes && <div><span className="text-sm font-semibold text-white">Details:</span><p className="text-sm text-white/80">{formData.notes}</p></div>}
            </div>
            {submitError && <div className="bg-red-500/20 border border-red-400 rounded-lg p-4"><p className="text-red-300 text-sm text-center">{submitError}</p></div>}
            <p className="text-[10px] sm:text-xs text-white/60 text-center leading-relaxed">By submitting, you agree to receive communications from Brooklyn Maids regarding your quote request.</p>
          </div>
        );
      default: return null;
    }
  };

  if (currentStep === 4) return <SuccessMessage type="quote" confirmationNumber={formData.confirmationNumber} serviceLabel="post-construction cleaning" inline={true} onClose={handleCloseSuccess} />;

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white mb-3 drop-shadow-lg">Post-Construction Cleaning Quote</h2>
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 rounded-full transition-all duration-300" style={{ backgroundColor: currentStep >= 1 ? '#dfbd69' : 'rgba(255,255,255,0.2)' }} />
            <div className="h-1 w-12 rounded-full transition-all duration-300" style={{ backgroundColor: currentStep >= 2 ? '#dfbd69' : 'rgba(255,255,255,0.2)' }} />
          </div>
          <span className="text-white/40 text-xs">Step {Math.min(currentStep, 2)} of 2</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        {renderStep()}
        <div className="flex gap-4 mt-8">
          {currentStep > 1 && <button onClick={prevStep} className="flex-1 p-3 rounded-lg font-semibold bg-white/30 text-white hover:bg-white/40 transition-all duration-300 hover:-translate-y-[1px]">Back</button>}
          {currentStep === 3 ? (
            <button onClick={handleSubmit} disabled={!canProceed() || isSubmitting} className={`${currentStep === 1 ? 'w-full' : 'flex-1'} p-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${canProceed() && !isSubmitting ? 'hover:-translate-y-[1px]' : 'bg-white/20 text-white/50 cursor-not-allowed'}`} style={canProceed() && !isSubmitting ? { backgroundColor: '#dfbd69', color: '#283845' } : undefined}>
              {isSubmitting ? (<><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Submitting...</>) : 'Get Your Quote'}
            </button>
          ) : <button onClick={nextStep} disabled={!canProceed()} className={`${currentStep === 1 ? 'w-full' : 'flex-1'} p-3 rounded-lg font-semibold transition-all duration-300 ${canProceed() ? 'hover:-translate-y-[1px]' : 'bg-white/20 text-white/50 cursor-not-allowed'}`} style={canProceed() ? { backgroundColor: '#dfbd69', color: '#283845' } : undefined}>Continue</button>}
        </div>
        {currentStep > 1 && (
          <div className="text-center mt-6 pt-4 border-t border-white/10">
            <p className="text-sm text-white/70">Need help?{' '}<a href={`sms:${CONTACT_INFO.phone.raw}`} className="font-semibold transition-colors duration-200" style={{ color: '#dfbd69' }}>Text {CONTACT_INFO.phone.display}</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
