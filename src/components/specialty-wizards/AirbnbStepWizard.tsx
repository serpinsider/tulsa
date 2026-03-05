'use client';

import { useState, useEffect, useRef } from 'react';
import { CONTACT_INFO } from '@/lib/contact';
import SuccessMessage from '@/components/shared/SuccessMessage';

interface FormData {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  turnoverFrequency: string;
  addons: {
    laundryLinens: boolean;
    restocking: boolean;
    applianceCleaning: boolean;
  };
  notes: string;
  confirmationNumber?: string;
}

interface AirbnbStepWizardProps {
  onFormExpand?: (expanded: boolean, immediate?: boolean) => void;
}

export default function AirbnbStepWizard({ onFormExpand }: AirbnbStepWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const prevExpandedStateRef = useRef<boolean | undefined>(undefined);
  
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    propertyType: '',
    bedrooms: '1',
    bathrooms: '1',
    turnoverFrequency: '',
    addons: {
      laundryLinens: false,
      restocking: false,
      applianceCleaning: false,
    },
    notes: '',
  });

  useEffect(() => { setIsMounted(true); }, []);

  // Notify parent when form expands beyond step 1
  useEffect(() => {
    if (onFormExpand && isMounted) {
      const isCurrentlyExpanded = currentStep >= 2;
      if (currentStep === 5 || typeof prevExpandedStateRef.current === 'undefined' || prevExpandedStateRef.current !== isCurrentlyExpanded) {
        prevExpandedStateRef.current = isCurrentlyExpanded;
        onFormExpand(isCurrentlyExpanded, true);
      }
    }
  }, [currentStep, onFormExpand, isMounted]);

  useEffect(() => {
    if (currentStep === 5 && isMounted) {
      window.scrollTo(0, 0);
      setTimeout(() => window.scrollTo(0, 0), 650);
    }
  }, [currentStep, isMounted]);

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 10) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    if (cleaned.length >= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    if (cleaned.length >= 3) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return cleaned.length > 0 ? `(${cleaned}` : cleaned;
  };

  const validateEmail = (email: string) => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone: string) => phone.replace(/\D/g, '').length === 10;

  const validateStep = (step: number): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!validatePhoneNumber(formData.phone)) newErrors.phone = 'Please enter a complete 10-digit phone number';
    }
    if (step === 2) {
      if (!formData.propertyType) newErrors.propertyType = 'Please select a property type';
    }
    if (step === 3) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
    }
    return newErrors;
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    if (submitError) setSubmitError('');
  };

  const toggleAddOn = (key: keyof FormData['addons']) => {
    setFormData(prev => ({ ...prev, addons: { ...prev.addons, [key]: !prev.addons[key] } }));
  };

  const nextStep = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
    if (currentStep < 4) { setErrors({}); setCurrentStep(currentStep + 1); }
  };

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

  const handleCloseSuccess = () => {
    setCurrentStep(1);
    setFormData({
      phone: '', firstName: '', lastName: '', email: '', propertyType: '', bedrooms: '1', bathrooms: '1',
      turnoverFrequency: '', addons: { laundryLinens: false, restocking: false, applianceCleaning: false }, notes: '',
    });
    if (onFormExpand) onFormExpand(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const confirmationNumber = 'TM-AIRBNB-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const selectedAddons = Object.entries(formData.addons).filter(([_, v]) => v).map(([k]) => k.replace(/([A-Z])/g, ' $1').trim()).join(', ');
      
      const response = await fetch('https://formspree.io/f/mrbjzvde', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: 'Tulsa Maids',
          businessId: 'tulsa',
          serviceType: 'Airbnb/Vacation Rental Cleaning',
          firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone,
          propertyType: formData.propertyType, bedrooms: formData.bedrooms, bathrooms: formData.bathrooms,
          turnoverFrequency: formData.turnoverFrequency, addons: selectedAddons || 'None', notes: formData.notes, confirmationNumber,
          _subject: `Tulsa Maids - Airbnb Quote from ${formData.firstName} ${formData.lastName} - #${confirmationNumber}`,
          _gotcha: '',
        }),
      });
      
      if (response.ok) {
        window.scrollTo(0, 0);
        setFormData(prev => ({ ...prev, confirmationNumber }));
        setCurrentStep(5);
      } else throw new Error('Server error');
    } catch (error) {
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.phone && validatePhoneNumber(formData.phone);
      case 2: return formData.propertyType;
      case 3: return formData.firstName && formData.lastName && formData.email && validateEmail(formData.email);
      case 4: return true;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-sm sm:text-base text-white/70 mb-2">Get a quote for your Airbnb property</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', formatPhoneNumber(e.target.value))}
                placeholder="[PHONE_NUMBER]"
                maxLength={14}
                className={`w-full px-3 py-3 border rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-[#dfbd69] focus:border-white backdrop-blur-sm ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-white/30'}`}
              />
              <div className="h-5 mt-1">{errors.phone && <p className="text-sm text-red-300">{errors.phone}</p>}</div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Tell us about your property</h3>
            </div>
            
            {/* Property Type */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-white">
                Property Type* <span className="text-[#dfbd69] ml-2 text-xs">(Choose one to continue)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'apartment', name: 'Apartment/Condo' },
                  { id: 'house', name: 'House' },
                  { id: 'townhouse', name: 'Townhouse' },
                  { id: 'studio', name: 'Studio' },
                  { id: 'luxury', name: 'Luxury Property' },
                  { id: 'other', name: 'Other' }
                ].map(({ id, name }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => updateFormData('propertyType', id)}
                    className={`relative cursor-pointer group ${
                      formData.propertyType === id
                        ? 'ring-2 ring-[#dfbd69] bg-white/40 border border-white'
                        : 'ring-1 ring-white/30 hover:ring-2 hover:ring-[#dfbd69]/50 bg-white/10'
                    } rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
                  >
                    <span className="text-sm font-semibold text-white">{name}</span>
                  </button>
                ))}
              </div>
              <div className="h-5 mt-2">{errors.propertyType && <p className="text-sm text-red-300">{errors.propertyType}</p>}</div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Bedrooms</label>
                <div className="relative">
                  <select value={formData.bedrooms} onChange={(e) => updateFormData('bedrooms', e.target.value)}
                    className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm">
                    <option value="Studio">Studio</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5+">5+ Bedrooms</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Bathrooms</label>
                <div className="relative">
                  <select value={formData.bathrooms} onChange={(e) => updateFormData('bathrooms', e.target.value)}
                    className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm">
                    <option value="1">1 Bathroom</option>
                    <option value="1.5">1.5 Bathrooms</option>
                    <option value="2">2 Bathrooms</option>
                    <option value="2.5">2.5 Bathrooms</option>
                    <option value="3">3 Bathrooms</option>
                    <option value="4+">4+ Bathrooms</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Turnover Frequency */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Turnover Frequency</label>
              <div className="relative">
                <select value={formData.turnoverFrequency} onChange={(e) => updateFormData('turnoverFrequency', e.target.value)}
                  className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm">
                  <option value="">Select frequency</option>
                  <option value="multiple-week">Multiple per week</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="ondemand">On-demand</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white">Additional Services (Optional)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: 'laundryLinens', label: 'Laundry/Linens' },
                  { key: 'restocking', label: 'Restock Supplies' },
                  { key: 'applianceCleaning', label: 'Appliance Cleaning' },
                ].map(({ key, label }) => (
                  <label key={key} className="relative cursor-pointer">
                    <input type="checkbox" checked={formData.addons[key as keyof FormData['addons']]} onChange={() => toggleAddOn(key as keyof FormData['addons'])} className="sr-only peer" />
                    <div className={`w-full p-3 rounded-lg text-center transition-all duration-300 ease-in-out backdrop-blur-sm ${
                      formData.addons[key as keyof FormData['addons']]
                        ? 'ring-2 ring-[#dfbd69] bg-white/40 border border-white'
                        : 'ring-1 ring-white/20 bg-white/10 hover:ring-2 hover:ring-[#dfbd69]/50'
                    }`}>
                      <div className="text-xs font-medium text-white">{label}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Who are we servicing?</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">First Name*</label>
                <input type="text" value={formData.firstName} onChange={(e) => updateFormData('firstName', e.target.value)} placeholder="ex. Jane"
                  className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${errors.firstName ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'}`} />
                <div className="h-5 mt-1">{errors.firstName && <p className="text-sm text-red-300">{errors.firstName}</p>}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Last Name*</label>
                <input type="text" value={formData.lastName} onChange={(e) => updateFormData('lastName', e.target.value)} placeholder="ex. Smith"
                  className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${errors.lastName ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'}`} />
                <div className="h-5 mt-1">{errors.lastName && <p className="text-sm text-red-300">{errors.lastName}</p>}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Email*</label>
                <input type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} placeholder="email@example.com"
                  className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'}`} />
                <div className="h-5 mt-1">{errors.email && <p className="text-sm text-red-300">{errors.email}</p>}</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Special Instructions (Optional)</label>
              <textarea value={formData.notes} onChange={(e) => updateFormData('notes', e.target.value)} rows={3} placeholder="Any special requirements..."
                className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm" />
            </div>
          </div>
        );

      case 4:
        const selectedAddons = Object.entries(formData.addons).filter(([_, v]) => v).map(([k]) => k.replace(/([A-Z])/g, ' $1').trim());
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Review Your Quote</h3>
              <p className="text-sm text-white/70">Please review your information before submitting</p>
            </div>
            <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div><span className="text-sm font-semibold text-white">Name:</span><p className="text-sm text-white/80">{formData.firstName} {formData.lastName}</p></div>
              <div><span className="text-sm font-semibold text-white">Email:</span><p className="text-sm text-white/80">{formData.email}</p></div>
              <div><span className="text-sm font-semibold text-white">Phone:</span><p className="text-sm text-white/80">{formData.phone}</p></div>
              <div><span className="text-sm font-semibold text-white">Property:</span><p className="text-sm text-white/80">{formData.propertyType} - {formData.bedrooms} BR, {formData.bathrooms} BA</p></div>
              <div><span className="text-sm font-semibold text-white">Turnover:</span><p className="text-sm text-white/80">{formData.turnoverFrequency || 'Not specified'}</p></div>
              {selectedAddons.length > 0 && (
                <div><span className="text-sm font-semibold text-white">Add-ons:</span>
                  <ul className="list-disc list-inside text-sm text-white/80 mt-1">{selectedAddons.map(a => <li key={a}>{a}</li>)}</ul>
                </div>
              )}
              {formData.notes && <div><span className="text-sm font-semibold text-white">Notes:</span><p className="text-sm text-white/80">{formData.notes}</p></div>}
            </div>
            {submitError && <div className="bg-red-500/20 border border-red-400 rounded-lg p-4"><p className="text-red-300 text-sm text-center">{submitError}</p></div>}
            <p className="text-[10px] sm:text-xs text-white/60 text-center leading-relaxed">By submitting, you agree to receive communications from Tulsa Maids regarding your quote request.</p>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isMounted) return null;

  if (currentStep === 5) {
    return <SuccessMessage type="quote" confirmationNumber={formData.confirmationNumber} inline={true} onClose={handleCloseSuccess} />;
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 drop-shadow-lg">Airbnb Cleaning Quote</h2>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {renderStep()}

        <div className="flex gap-4 mt-8">
          {currentStep > 1 && (
            <button onClick={prevStep} className="flex-1 p-3 rounded-lg font-semibold bg-white/30 text-white hover:bg-white/40 transition-all duration-300 hover:-translate-y-[1px]">Back</button>
          )}
          
          {currentStep === 4 ? (
            <button onClick={handleSubmit} disabled={!canProceed() || isSubmitting}
              className={`${currentStep === 1 ? 'w-full' : 'flex-1'} p-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${canProceed() && !isSubmitting ? 'bg-[#dfbd69] text-[#1a3755] hover:bg-[#dfbd69]/90 hover:-translate-y-[1px]' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}>
              {isSubmitting ? (<><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Submitting...</>) : 'Get Your Quote'}
            </button>
          ) : (
            <button onClick={nextStep} disabled={!canProceed()}
              className={`${currentStep === 1 ? 'w-full' : 'flex-1'} p-3 rounded-lg font-semibold transition-all duration-300 ${canProceed() ? 'bg-[#dfbd69] text-[#1a3755] hover:bg-[#dfbd69]/90 hover:-translate-y-[1px]' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}>
              Continue
            </button>
          )}
        </div>

        {currentStep > 1 && (
          <div className="mt-6 text-center pt-4 border-t border-white/20">
            <p className="text-xs sm:text-sm text-white/80 mb-2">Need help?</p>
            <p className="text-sm sm:text-base text-white font-semibold">Call or text us! <a href={CONTACT_INFO.phone.href} className="text-[#dfbd69] hover:text-[#dfbd69]/80 transition-colors duration-200 underline">{CONTACT_INFO.phone.display}</a></p>
          </div>
        )}

        {currentStep === 4 && (
          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex">{[1,2,3,4,5].map(star => <svg key={star} className="w-4 h-4 text-[#dfbd69]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
              <span className="text-sm text-white/80">4.9 (141 Reviews)</span>
            </div>
            <div className="text-sm text-white/80"><span className="font-semibold">141</span> Happy Customers</div>
          </div>
        )}
      </div>
    </div>
  );
}
