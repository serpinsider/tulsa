'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ADDONS } from '@/lib/constants/addons';
import { BRANDING, getFormspreeEndpoint } from '@/config/branding';
import { COLORS } from '@/styles/colors';
import SuccessMessage from '@/components/shared/SuccessMessage';
import { trackEvent } from '@/lib/posthog/client';

interface FormData {
  // Step 1 - Contact
  phone: string;
  
  // Step 2 - Property & Service Details
  firstName: string;
  lastName: string;
  email: string;
  bedrooms: string;
  bathrooms: string;
  zipCode: string;
  squareFootage: string;
  frequency: string;
  serviceType: string;
  
  // Confirmation
  confirmationNumber?: string;
  
  // Step 3 - Add-ons (Boolean Object)
  addons: {
    insideFridge: boolean;
    insideOven: boolean;
    carpet: boolean;
    microwave: boolean;
    organization: boolean;
    handymanServices: boolean;
    deepClean: boolean;
    moveInOut: boolean;
    bedroomBathroomCabinets: boolean;
    insideKitchenCabinets: boolean;
    interiorWindows: boolean;
    dishes: boolean;
    laundry: boolean;
    hardwood: boolean;
    basementCleaning: boolean;
    petCleaning: boolean;
    wallStainRemoval: boolean;
    baseboardCleaning: boolean;
    carpetCleaning: boolean;
    tileAndGrout: boolean;
    officeCleaning: boolean;
    townhouse: boolean;
    extraHour: boolean;
      washerDryer: boolean; // Using for stair cleaning
    movingServices: boolean;
    superDeepClean: boolean;
  };
}

interface StepWizardProps {
  onFormExpand?: (expanded: boolean, immediate?: boolean) => void;
}

export default function StepWizard({ onFormExpand }: StepWizardProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [showAddonsTray, setShowAddonsTray] = useState(false);
  const prevExpandedStateRef = useRef<boolean | undefined>(undefined);
  
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    bedrooms: '1',
    bathrooms: '1',
    zipCode: '',
    squareFootage: 'Under 1,000 sqft',
    frequency: 'One Time',
    serviceType: '',
    addons: {
      insideFridge: false,
      insideOven: false,
      carpet: false,
      microwave: false,
      organization: false,
      handymanServices: false,
      deepClean: false,
      moveInOut: false,
      bedroomBathroomCabinets: false,
      insideKitchenCabinets: false,
      interiorWindows: false,
      dishes: false,
      laundry: false,
      hardwood: false,
      basementCleaning: false,
      petCleaning: false,
      wallStainRemoval: false,
      baseboardCleaning: false,
      carpetCleaning: false,
      tileAndGrout: false,
      officeCleaning: false,
      townhouse: false,
      extraHour: false,
      washerDryer: false,
      movingServices: false,
      superDeepClean: false,
    }
  });

  // Initialize mounted state
  useEffect(() => {
    setIsMounted(true);
    // Track wizard start
    trackEvent('quote_wizard_started');
  }, []);

  // Phone number formatting
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length >= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length >= 3) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length > 0) {
      return `(${cleaned}`;
    }
    return cleaned;
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove formatting and check if we have exactly 10 digits
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const validateStep = (step: number): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhoneNumber(formData.phone)) {
        newErrors.phone = 'Please enter a complete 10-digit phone number';
      }
    }

    if (step === 2) {
      if (!formData.serviceType) {
        newErrors.serviceType = 'Please select a service type';
      }
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.zipCode || formData.zipCode.trim() === '') {
        newErrors.zipCode = 'Zip code is required';
      } else if (!/^\d{5}$/.test(formData.zipCode.trim())) {
        newErrors.zipCode = 'Please enter a valid 5-digit zip code';
      }
    }

    // Step 3 is summary - no validation needed

    return newErrors;
  };

  // Notify parent when form expands beyond step 1
  useEffect(() => {
    if (onFormExpand && isMounted) {
      const isCurrentlyExpanded = currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 5;
      // Always notify on step 5 to ensure success message stays in expanded container
      if (currentStep === 5 || typeof prevExpandedStateRef.current === 'undefined' || prevExpandedStateRef.current !== isCurrentlyExpanded) {
        prevExpandedStateRef.current = isCurrentlyExpanded;
        onFormExpand(isCurrentlyExpanded, true); // immediate=true for step changes
      }
    }
  }, [currentStep, onFormExpand, isMounted]);

  // Scroll to top when reaching success step
  useEffect(() => {
    if (currentStep === 4 && isMounted) {
      // Immediate scroll
      window.scrollTo(0, 0);
      // Also scroll after lock releases for reliability
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 650);
    }
  }, [currentStep, isMounted]);

  const updateFormData = (field: string, value: string) => {
    // If changing service type to deep or moveout, reset and auto-enable required addons
    if (field === 'serviceType') {
      const resetAddons = {
        insideFridge: false,
        insideOven: false,
        carpet: false,
        microwave: false,
        organization: false,
        handymanServices: false,
        deepClean: false,
        moveInOut: false,
        bedroomBathroomCabinets: false,
        insideKitchenCabinets: false,
        interiorWindows: false,
        dishes: false,
        laundry: false,
        hardwood: false,
        basementCleaning: false,
        petCleaning: false,
        wallStainRemoval: false,
        baseboardCleaning: false,
        carpetCleaning: false,
        tileAndGrout: false,
        officeCleaning: false,
        townhouse: false,
        extraHour: false,
        washerDryer: false,
        movingServices: false,
        superDeepClean: false,
      };
      
      const serviceTypeAddons = value === 'deep' ? {
        wallStainRemoval: true,
        tileAndGrout: true,
        baseboardCleaning: true
      } : value === 'moveout' ? {
        bedroomBathroomCabinets: true,
        wallStainRemoval: true,
        tileAndGrout: true,
        baseboardCleaning: true
      } : {};
      
      setFormData(prev => ({
        ...prev,
        [field]: value,
        // Move out is always one-time, no frequency discounts
        frequency: value === 'moveout' ? 'One Time' : prev.frequency,
        addons: {
          ...resetAddons,
          ...serviceTypeAddons
        }
      }));

      // Show addons tray after service type is selected (except for services without addons)
      if (value !== 'post-construction' && value !== 'carpet' && value !== 'handyman') {
        setShowAddonsTray(true);
      } else {
        setShowAddonsTray(false);
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Real-time validation
    if (field === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (field === 'phone') {
      if (value && !validatePhoneNumber(value)) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a complete 10-digit phone number' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    } else if (field === 'serviceType') {
      if (errors.serviceType) {
        setErrors(prev => ({ ...prev, serviceType: '' }));
      }
    } else {
      // Clear error for other fields when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    }
    
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const toggleAddOn = (addonKey: string) => {
    // Prevent unchecking auto-included addons
    const isAutoIncluded = 
      (formData.serviceType === 'deep' && 
        (addonKey === 'wallStainRemoval' || addonKey === 'tileAndGrout' || addonKey === 'baseboardCleaning')) ||
      (formData.serviceType === 'moveout' && 
        (addonKey === 'bedroomBathroomCabinets' || addonKey === 'wallStainRemoval' || addonKey === 'tileAndGrout' || addonKey === 'baseboardCleaning'));
    
    // If trying to uncheck an auto-included addon, do nothing
    if (isAutoIncluded && formData.addons[addonKey as keyof typeof formData.addons]) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      addons: {
        ...prev.addons,
        [addonKey]: !prev.addons[addonKey as keyof typeof prev.addons]
      }
    }));
  };



  const scrollToForm = () => {
    // First scroll to top of form container
    const formElement = document.getElementById('quote-form-container');
    if (formElement) {
      const formRect = formElement.getBoundingClientRect();
      const absoluteFormTop = window.pageYOffset + formRect.top - 20; // 20px padding
      window.scrollTo({
        top: absoluteFormTop,
        behavior: 'smooth'
      });
    }
  };

  const nextStep = async () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    // Track step completion
    trackEvent('quote_wizard_step_completed', {
      step: currentStep,
      step_name: currentStep === 1 ? 'phone' : 'property_and_contact',
    });
    
    if (currentStep < 3) {
      setErrors({});
      setCurrentStep(currentStep + 1);
      // Don't scroll - keep user where they are
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // If going back to step 1, notify parent to collapse form and scroll to hero
      if (currentStep - 1 === 1 && onFormExpand) {
        onFormExpand(false, true);
        // Scroll to top of hero section
        setTimeout(() => {
          const heroElement = document.querySelector('#hero') || document.querySelector('main');
          if (heroElement) {
            heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  };

  const handleCloseSuccess = () => {
    // Reset form and go back to hero
    setCurrentStep(1);
    setFormData({
      phone: '',
      firstName: '',
      lastName: '',
      email: '',
      bedrooms: '1',
      bathrooms: '1',
      zipCode: '',
      squareFootage: 'Under 1,000 sqft',
      frequency: 'One Time',
      serviceType: '',
      addons: {
        insideFridge: false,
        insideOven: false,
        carpet: false,
        microwave: false,
        organization: false,
        handymanServices: false,
        deepClean: false,
        moveInOut: false,
        bedroomBathroomCabinets: false,
        insideKitchenCabinets: false,
        interiorWindows: false,
        dishes: false,
        laundry: false,
        hardwood: false,
        basementCleaning: false,
        petCleaning: false,
        wallStainRemoval: false,
        baseboardCleaning: false,
        carpetCleaning: false,
        tileAndGrout: false,
        officeCleaning: false,
        townhouse: false,
        extraHour: false,
        washerDryer: false,
        movingServices: false,
        superDeepClean: false,
      }
    });
    if (onFormExpand) {
      onFormExpand(false);
    }
  };

  const handleSubmit = async (retryCount = 0) => {
    // No validation needed for step 4 (summary) - already validated in step 3
    setIsSubmitting(true);
    setSubmitError('');
    setErrors({});

    try {
      const confirmationNumber = 'TM-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      // Prepare selected addons
      const selectedAddons = Object.entries(formData.addons)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(', ');

      // Prepare data for Formspree - NO price calculation, bot handles pricing
      const formspreeData = {
        business: BRANDING.businessName,
        businessId: BRANDING.businessId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        zipCode: formData.zipCode,
        squareFootage: formData.squareFootage,
        frequency: formData.frequency,
        serviceType: formData.serviceType,
        addons: formData.addons,
        confirmationNumber,
        'Selected Add-ons': selectedAddons || 'None',
        _subject: `${BRANDING.businessName} - Quote Request from ${formData.firstName} ${formData.lastName}`,
      };

      // Submit to Formspree
      console.log('Submitting to Formspree:', formspreeData);
      
      let response;
      try {
        response = await fetch(getFormspreeEndpoint(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formspreeData)
        });
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Network error submitting form. Please check:\n1. Your internet connection\n2. Any ad blockers or extensions\n3. Form is activated in Formspree');
        setSubmitError('Network error. Please try again or contact us directly.');
        setIsSubmitting(false);
        return;
      }

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Formspree response:', result);

      if (response.ok) {
        // Track successful quote submission
        trackEvent('quote_submitted', {
          service_type: formData.serviceType,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          confirmation_number: confirmationNumber,
        });
        
        // Scroll to top IMMEDIATELY
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        setFormData(prev => ({ ...prev, confirmationNumber }));
        setCurrentStep(4);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Retry logic for network errors
      if (retryCount < 2 && (error instanceof TypeError || error.message.includes('fetch'))) {
        setTimeout(() => handleSubmit(retryCount + 1), 1000);
        return;
      }
      
      // Show user-friendly error message
      if (error.message.includes('fetch') || error instanceof TypeError) {
        setSubmitError('Network error. Please check your connection and try again.');
      } else if (error.message.includes('400')) {
        setSubmitError('Please check your information and try again.');
      } else {
        setSubmitError('Something went wrong. Please try again or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-sm sm:text-base text-white/70 mb-2">
                We&apos;ll send a rough estimate in 60 seconds
              </h3>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  updateFormData('phone', formatted);
                }}
                placeholder="(918) 900-8470"
                maxLength={14}
                className={`w-full px-3 py-3 border rounded-lg bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-[#dfbd69] focus:border-white backdrop-blur-sm ${
                  errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-white/30'
                }`}
                required
              />
              {errors.phone && (
                <p className="absolute left-0 -bottom-5 text-xs text-red-300">{errors.phone}</p>
              )}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Tell us more about your property
              </h3>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Bedrooms*
                </label>
                <div className="relative">
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => updateFormData('bedrooms', e.target.value)}
                    className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm"
                  >
                    <option value="Studio">Studio</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Bathrooms*
                </label>
                <div className="relative">
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => updateFormData('bathrooms', e.target.value)}
                    className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm"
                  >
                    <option value="1">1 Bathroom</option>
                    <option value="1.5">1.5 Bathrooms</option>
                    <option value="2">2 Bathrooms</option>
                    <option value="2.5">2.5 Bathrooms</option>
                    <option value="3">3 Bathrooms</option>
                    <option value="3.5">3.5 Bathrooms</option>
                    <option value="4">4+ Bathrooms</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Square Footage & Zip Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Square Footage*
                </label>
                <div className="relative">
                  <select
                    value={formData.squareFootage}
                    onChange={(e) => updateFormData('squareFootage', e.target.value)}
                    className="w-full p-3 pr-10 border border-white/20 rounded-lg bg-white/10 text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm"
                  >
                    <option value="Under 1,000 sqft">Under 1,000 sqft</option>
                    <option value="1,000-2,000 sqft">1,000-2,000 sqft</option>
                    <option value="2,000-3,000 sqft">2,000-3,000 sqft</option>
                    <option value="3,000+ sqft">3,000+ sqft</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/70">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Zip Code*
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="12345"
                  className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/40 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${
                    errors.zipCode ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'
                  }`}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-300">{errors.zipCode}</p>
                )}
              </div>
            </div>

            {/* Service Type - REQUIRED FIRST */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-white">
                Select Your Cleaning Type* 
                <span className="text-[#dfbd69] ml-2 text-xs">(Choose one to continue)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'standard', name: 'Standard Clean', description: 'Regular maintenance' },
                  { id: 'deep', name: 'Deep Clean', description: 'Thorough cleaning' },
                  { id: 'moveout', name: 'Move Out Clean', description: 'Complete move-out' }
                ].map(({ id, name, description }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => updateFormData('serviceType', id)}
                    className={`relative cursor-pointer group ${
                      formData.serviceType === id
                        ? 'ring-2 ring-[#dfbd69] bg-white/40'
                        : 'ring-1 ring-white/30 hover:ring-2 hover:ring-[#dfbd69]/50 bg-white/10'
                    } rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
                  >
                    <span className="text-sm font-semibold text-white mb-1">{name}</span>
                    <span className="text-xs text-white/70">{description}</span>
                  </button>
                ))}
              </div>
              {errors.serviceType && (
                <p className="mt-2 text-sm text-red-300">{errors.serviceType}</p>
              )}
            </div>

            {/* Frequency Selection - hidden for move out */}
            {formData.serviceType && formData.serviceType !== 'moveout' && (
              <div>
                <label className="block text-sm font-semibold mb-3 text-white">
                  How often do you need cleaning?*
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'One Time', name: 'One Time', popular: false },
                    { id: 'Weekly', name: 'Weekly', popular: false },
                    { id: 'Monthly', name: 'Monthly', popular: true },
                    { id: 'Quarterly', name: 'Quarterly', popular: false }
                  ].map(({ id, name, popular }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => updateFormData('frequency', id)}
                      className={`relative cursor-pointer group ${
                        formData.frequency === id
                          ? 'ring-2 ring-[#dfbd69] bg-white/40 border border-white'
                          : 'ring-1 ring-white/30 hover:ring-2 hover:ring-[#dfbd69]/50 bg-white/10'
                      } rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
                    >
                      {popular && (
                        <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#dfbd69] text-[#283845] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                          MOST POPULAR
                        </span>
                      )}
                      <span className="text-sm font-semibold text-white">{name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add-ons Tray - Only shows after service type selected */}
            {showAddonsTray && (
              <div className="space-y-3 transition-all duration-700 ease-out animate-slideDown">
                <label className="block text-sm font-semibold text-white">
                  Add Extra Services (Optional)
                </label>

                {formData.serviceType === 'deep' && (
                  <div className="text-xs text-[#dfbd69] bg-[#dfbd69]/10 border border-[#dfbd69]/30 rounded-lg p-3">
                    <strong>Included:</strong> Baseboards, Wall Stains, Tile & Grout
                  </div>
                )}
                {formData.serviceType === 'moveout' && (
                  <div className="text-xs text-[#dfbd69] bg-[#dfbd69]/10 border border-[#dfbd69]/30 rounded-lg p-3">
                    <strong>Included:</strong> Cabinets, Baseboards, Wall Stains, Tile & Grout
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {ADDONS.filter((addon) => {
                    // Hide dishes from all service types
                    if (addon.key === 'dishes') return false;
                    
                    // Super Deep Clean only available for Standard and Deep cleans
                    if (addon.key === 'superDeepClean' && formData.serviceType === 'moveout') return false;
                    
                    const isAutoIncluded = 
                      (formData.serviceType === 'deep' && 
                        (addon.key === 'wallStainRemoval' || addon.key === 'tileAndGrout' || addon.key === 'baseboardCleaning')) ||
                      (formData.serviceType === 'moveout' && 
                        (addon.key === 'bedroomBathroomCabinets' || addon.key === 'wallStainRemoval' || addon.key === 'tileAndGrout' || addon.key === 'baseboardCleaning'));
                    return !isAutoIncluded;
                  }).map((addon) => {
                    const isSelected = formData.addons[addon.key as keyof typeof formData.addons];
                    
                    return (
                      <label key={addon.key} className="relative cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.addons[addon.key as keyof typeof formData.addons]}
                          onChange={() => toggleAddOn(addon.key)}
                          className="sr-only peer"
                        />
                        <div className={`w-full p-3 rounded-lg text-center transition-all duration-300 ease-in-out backdrop-blur-sm ${
                          isSelected
                            ? 'ring-2 ring-[#dfbd69] bg-white/40'
                            : 'ring-1 ring-white/20 bg-white/10 hover:ring-2 hover:ring-[#dfbd69]/50'
                        }`}>
                          <div className="flex flex-col gap-2">
                            <div className="w-8 h-8 mx-auto">
                              <Image
                                src={`/icons/addons/${addon.icon}`}
                                alt={addon.label}
                                width={32}
                                height={32}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="text-xs font-medium text-white">
                              {addon.label}
                            </div>
                            <div className="text-[10px] text-white/70">
                              {addon.description}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Contact Information - Shows after addons */}
                <div className="pt-8 mt-8 border-t border-white/20">
                  <h4 className="text-base font-semibold text-white mb-6">Your Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-semibold mb-2 text-white">
                        First Name*
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        placeholder="ex. Jane"
                        className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${
                          errors.firstName ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'
                        }`}
                        required
                      />
                      {errors.firstName && (
                        <p className="absolute left-0 -bottom-5 text-xs text-red-300">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-semibold mb-2 text-white">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        placeholder="ex. Smith"
                        className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${
                          errors.lastName ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'
                        }`}
                        required
                      />
                      {errors.lastName && (
                        <p className="absolute left-0 -bottom-5 text-xs text-red-300">{errors.lastName}</p>
                      )}
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-semibold mb-2 text-white">
                        Email*
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="email@example.com"
                        className={`w-full p-3 border rounded-lg bg-white/10 text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] backdrop-blur-sm ${
                          errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-white/20'
                        }`}
                        required
                      />
                      {errors.email && (
                        <p className="absolute left-0 -bottom-5 text-xs text-red-300">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 3:
        // Calculate estimated price for display
        const bedrooms = parseInt(formData.bedrooms) || 1;
        const bathrooms = parseFloat(formData.bathrooms) || 1;
        let estimatedPrice = 100 + (bedrooms - 1) * 20 + (bathrooms - 1) * 15;
        
        const serviceMultipliers: Record<string, number> = {
          'standard': 1.0,
          'deep': 1.6,
          'moveout': 1.8,
        };
        estimatedPrice *= serviceMultipliers[formData.serviceType] || 1.0;

        const selectedAddons = Object.entries(formData.addons)
          .filter(([_, value]) => value)
          .map(([key]) => ADDONS.find(addon => addon.key === key))
          .filter(Boolean);

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Review Your Quote
              </h3>
              <p className="text-sm text-white/70">
                Please review your information before submitting
              </p>
            </div>

            {/* Quote Summary - Modern Grid Layout */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-white/60 uppercase tracking-wide">Name</p>
                  <p className="text-base font-medium text-white">{formData.firstName} {formData.lastName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/60 uppercase tracking-wide">Phone</p>
                  <p className="text-base font-medium text-white">{formData.phone}</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-xs text-white/60 uppercase tracking-wide">Email</p>
                  <p className="text-base font-medium text-white">{formData.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/60 uppercase tracking-wide">Property</p>
                  <p className="text-base font-medium text-white">
                    {formData.bedrooms} Bed, {formData.bathrooms} Bath
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/60 uppercase tracking-wide">Service</p>
                  <p className="text-base font-medium text-[#dfbd69]">
                    {formData.serviceType === 'standard' && 'Standard Clean'}
                    {formData.serviceType === 'deep' && 'Deep Clean'}
                    {formData.serviceType === 'moveout' && 'Move Out Clean'}
                  </p>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="space-y-1 md:col-span-2 pt-3 border-t border-white/10">
                    <p className="text-xs text-white/60 uppercase tracking-wide">Add-ons</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedAddons.map((addon) => addon && (
                        <span key={addon.key} className="px-3 py-1 bg-[#dfbd69]/20 border border-[#dfbd69]/40 rounded-full text-xs font-medium text-[#dfbd69]">
                          {addon.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Error Display */}
            {submitError && (
              <div className="bg-red-500/20 border border-red-400 rounded-lg p-4">
                <p className="text-red-300 text-sm text-center">{submitError}</p>
              </div>
            )}

            <p className="text-[10px] sm:text-xs text-white/60 text-center leading-relaxed">
              By submitting, you agree to receive communications from {BRANDING.businessName} regarding your quote request.
            </p>
          </div>
        );
        

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.phone && validatePhoneNumber(formData.phone);
      case 2:
        // Move out doesn't require frequency selection
        const frequencyValid = formData.serviceType === 'moveout' || formData.frequency;
        return formData.serviceType && frequencyValid && formData.firstName && formData.lastName && formData.email && validateEmail(formData.email);
      case 3:
        return true; // Summary step - always can proceed
      default:
        return false;
    }
  };

  if (currentStep === 4) {
    return <SuccessMessage type="quote" confirmationNumber={formData.confirmationNumber}  inline={true} onClose={handleCloseSuccess} />;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 drop-shadow-lg">
          Get a free quote instantly!
        </h2>
        
      </div>
      


      {/* Step Content */}
      <div className="max-w-2xl mx-auto">
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="flex-1 p-3 rounded-lg font-semibold bg-white/30 text-white hover:bg-white/40 transition-all duration-300 hover:-translate-y-[1px]"
          >
            Back
          </button>
        )}
        
        {currentStep === 3 ? (
          <button
            onClick={() => handleSubmit()}
            disabled={!canProceed() || isSubmitting}
            className={`${currentStep === 1 ? 'w-full' : 'flex-1'} p-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              canProceed() && !isSubmitting
                ? 'bg-[#dfbd69] text-[#283845] hover:bg-[#dfbd69]/90 hover:-translate-y-[1px]'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Get Your Quote'
            )}
          </button>
        ) : (
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`${currentStep === 1 ? 'w-full' : 'flex-1'} p-3 rounded-lg font-semibold transition-all duration-300 ${
              canProceed()
                ? 'bg-[#dfbd69] text-[#283845] hover:bg-[#dfbd69]/90 hover:-translate-y-[1px]'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        )}
      </div>

      {/* Help Text - Only show on steps 2, 3 */}
      {currentStep > 1 && (
        <div className="text-center mt-6 pt-4 border-t border-white/10">
          <p className="text-sm text-white/70">
            Need help?{' '}
            <a 
              href={BRANDING.phone.smsHref}
              className="text-[#dfbd69] hover:text-[#dfbd69]/80 font-semibold transition-colors duration-200"
            >
              Text {BRANDING.phone.display}
            </a>
          </p>
        </div>
      )}

      {/* Reviews Section - Only show on step 3 (last step before submission) */}
      {currentStep === 3 && (
        <div className="mt-6 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map((star) => (
                <svg key={star} className="w-4 h-4 text-[#dfbd69]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-white/80">4.9 (141 Reviews)</span>
          </div>
          <div className="text-sm text-white/80">
            <span className="font-semibold">141</span> Happy Customers
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
 



