'use client';

import { useState, useEffect } from 'react';

interface FormData {
  // Step 1 - Contact
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  
  // Step 2 - Property & Service Details
  bedrooms: string;
  bathrooms: string;
  serviceType: string;
  frequency: string;
  
  // Step 3 - Additional Details
  additionalNotes: string;
}

interface StepWizardProps {
  onFormExpand?: (expanded: boolean, immediate?: boolean) => void;
}

export default function StepWizardSimple({ onFormExpand }: StepWizardProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    bedrooms: '2',
    bathrooms: '1',
    serviceType: '',
    frequency: 'Once',
    additionalNotes: ''
  });

  // Phone number formatting
  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (step === 2) {
      if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 && onFormExpand) {
        onFormExpand(true);
      }
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    if (currentStep === 2 && onFormExpand) {
      onFormExpand(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Here you would normally submit to your API
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-white/80 mb-4">
          We've received your request and will contact you within 24 hours with your free quote.
        </p>
        <p className="text-sm text-white/60">
          Check your email for confirmation details.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/60">Step {currentStep} of 3</span>
          <span className="text-xs text-white/60">{Math.round((currentStep / 3) * 100)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-[#ED8936] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">
        {currentStep === 1 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full p-3 rounded-lg bg-white/10 border text-white placeholder-white/50 ${
                      errors.firstName ? 'border-red-400' : 'border-white/20'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full p-3 rounded-lg bg-white/10 border text-white placeholder-white/50 ${
                      errors.lastName ? 'border-red-400' : 'border-white/20'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full p-3 rounded-lg bg-white/10 border text-white placeholder-white/50 ${
                    errors.phone ? 'border-red-400' : 'border-white/20'
                  }`}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-3 rounded-lg bg-white/10 border text-white placeholder-white/50 ${
                    errors.email ? 'border-red-400' : 'border-white/20'
                  }`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Property & Service Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-white/70 mb-2">Bedrooms</label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                  >
                    <option value="Studio">Studio</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Bathrooms</label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                  >
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4+">4+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Service Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: 'standard', label: 'House Cleaning' },
                    { value: 'deep', label: 'Deep Cleaning' },
                    { value: 'moveout', label: 'Move Out Cleaning' }
                  ].map((service) => (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() => handleInputChange('serviceType', service.value)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        formData.serviceType === service.value
                          ? 'bg-[#ED8936] border-[#ED8936] text-white'
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
                {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType}</p>}
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => handleInputChange('frequency', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                >
                  <option value="Once">One Time</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Additional Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">
                  Any specific requests or areas of focus? (Optional)
                </label>
                <textarea
                  placeholder="Tell us about any specific cleaning needs, problem areas, or special instructions..."
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 resize-none"
                />
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">What happens next?</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• We'll contact you within 24 hours</li>
                  <li>• Free quote based on your specific needs</li>
                  <li>• Schedule your cleaning at your convenience</li>
                  <li>• 100% satisfaction guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 pt-6 border-t border-white/20">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Back
          </button>
        )}
        
        <div className="ml-auto">
          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-[#ED8936] text-white rounded-lg hover:bg-[#DD6B20] transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#ED8936] text-white rounded-lg hover:bg-[#DD6B20] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
