'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CONTACT_INFO } from '@/lib/contact';
import { ADDONS } from '@/lib/constants/addons';
import SuccessMessage from '@/components/shared/SuccessMessage';
import { COLORS } from '@/styles/colors';

// Helper to get form background color
const getFormBg = () => {
  const primary = COLORS.backgrounds.primary;
  // If it's a CSS variable, fallback to dark background
  if (primary.includes('var(')) {
    return 'rgba(45, 20, 16, 0.5)';
  }
  // Otherwise replace opacity in rgba string
  return primary.replace('0.95', '0.5');
};

type AddonsType = {
  insideFridge: boolean;
  insideOven: boolean;
  carpetCleaning: boolean;
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
  tileAndGrout: boolean;
  officeCleaning: boolean;
  superDeepClean: boolean;
  dishwasher: boolean;
  townhouse: boolean;
  extraHour: boolean;
  washerDryer: boolean;
  stairwayCleaning: boolean;
  movingServices: boolean;
};

const cleaningTypes = [
  { id: 'standard', name: 'Standard Clean', description: 'Regular maintenance' },
  { id: 'deep', name: 'Deep Clean', description: 'Thorough cleaning' },
  { id: 'moveout', name: 'Move Out Clean', description: 'Complete move-out' },
];

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bedrooms: '1',
    bathrooms: '1',
    squareFootage: 'Under 1,000 sqft',
    zipCode: '',
    frequency: 'One Time',
    serviceType: '',
    addons: {
      insideFridge: false,
      insideOven: false,
      carpetCleaning: false,
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
      tileAndGrout: false,
      officeCleaning: false,
      superDeepClean: false,
      dishwasher: false,
      townhouse: false,
      extraHour: false,
      washerDryer: false,
      stairwayCleaning: false,
      movingServices: false,
    } as AddonsType
  });

  const [showAddonsTray, setShowAddonsTray] = useState(false);

  const handleServiceTypeChange = (type: string) => {
    const resetAddons = {
      insideFridge: false,
      insideOven: false,
      carpetCleaning: false,
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
      tileAndGrout: false,
      officeCleaning: false,
      superDeepClean: false,
      dishwasher: false,
      townhouse: false,
      extraHour: false,
      washerDryer: false,
      stairwayCleaning: false,
      movingServices: false,
    };

    const serviceTypeAddons = type === 'deep' ? {
      wallStainRemoval: true,
      tileAndGrout: true,
      baseboardCleaning: true
    } : type === 'moveout' ? {
      bedroomBathroomCabinets: true,
      insideKitchenCabinets: true,
      interiorWindows: true,
      wallStainRemoval: true,
      tileAndGrout: true,
      baseboardCleaning: true
    } : {};

    setFormData(prev => ({
      ...prev,
      serviceType: type,
      frequency: type === 'moveout' ? 'One Time' : prev.frequency,
      addons: {
        ...resetAddons,
        ...serviceTypeAddons
      }
    }));

    setShowAddonsTray(true);
  };

  const formatPhoneNumber = (newValue: string, prevValue: string) => {
    const newDigits = newValue.replace(/\D/g, '');
    const prevDigits = prevValue.replace(/\D/g, '');
    if (newDigits.length < prevDigits.length) {
      const trimmed = prevDigits.slice(0, -1);
      if (trimmed.length === 0) return '';
      if (trimmed.length <= 3) return trimmed;
      if (trimmed.length <= 6) return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
      return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6, 10)}`;
    }
    if (newDigits.length === 0) return '';
    if (newDigits.length <= 3) return newDigits;
    if (newDigits.length <= 6) return `(${newDigits.slice(0, 3)}) ${newDigits.slice(3)}`;
    return `(${newDigits.slice(0, 3)}) ${newDigits.slice(3, 6)}-${newDigits.slice(6, 10)}`;
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
      setIsSubmitting(true);
      setSubmitError('');
      setErrors({});
      const newErrors: Record<string, string> = {};

      // Validate required fields
      if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
      if (!formData.firstName || formData.firstName.trim() === '') newErrors.firstName = 'First name is required';
      if (!formData.lastName || formData.lastName.trim() === '') newErrors.lastName = 'Last name is required';
      if (!formData.email || formData.email.trim() === '') newErrors.email = 'Email is required';
      if (!formData.phone || formData.phone.trim() === '') newErrors.phone = 'Phone is required';
      if (!formData.zipCode || !/^\d{5}$/.test(formData.zipCode)) newErrors.zipCode = 'Please enter a valid 5-digit zip code';

      // Validate email format
      if (formData.email && !isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      // Validate phone format
      if (formData.phone && !isValidPhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }

      // If there are errors, set them and scroll to first error
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        const firstErrorField = document.querySelector('.border-red-500');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const confirmationNumber = 'TM-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      // Define what's included in each service type
      const includedInDeep = ['wallStainRemoval', 'tileAndGrout', 'baseboardCleaning'];
      const includedInMoveOut = ['bedroomBathroomCabinets', 'insideKitchenCabinets', 'interiorWindows', 'wallStainRemoval', 'tileAndGrout', 'baseboardCleaning'];
      
      // Filter out addons that are already included in the selected service
      const includedAddons = formData.serviceType === 'deep' ? includedInDeep :
                            formData.serviceType === 'moveout' ? includedInMoveOut : [];
      
      // Get only the addons that are checked AND not included in the service type
      const extraAddons = Object.entries(formData.addons)
        .filter(([key, value]) => value && !includedAddons.includes(key))
        .map(([key]) => {
          // Make names more readable
          const readableNames: Record<string, string> = {
            insideFridge: 'Inside Fridge',
            insideOven: 'Inside Oven',
            carpetCleaning: 'Carpet Cleaning',
            microwave: 'Microwave',
            organization: 'Organization',
            handymanServices: 'Handyman Services',
            deepClean: 'Deep Clean',
            moveInOut: 'Move In/Out',
            bedroomBathroomCabinets: 'Bedroom & Bathroom Cabinets',
            insideKitchenCabinets: 'Inside Kitchen Cabinets',
            interiorWindows: 'Interior Windows',
            dishes: 'Dishes',
            laundry: 'Laundry',
            hardwood: 'Hardwood Floors',
            basementCleaning: 'Basement Cleaning',
            petCleaning: 'Pet Hair Cleaning',
            wallStainRemoval: 'Wall Stain Removal',
            baseboardCleaning: 'Baseboard Cleaning',
            tileAndGrout: 'Tile & Grout',
            officeCleaning: 'Office Cleaning',
            superDeepClean: 'Super Deep Clean',
            dishwasher: 'Dishwasher Cleaning',
            townhouse: 'Townhouse Clean',
            extraHour: 'Extra Hour',
            washerDryer: 'Washer & Dryer',
            stairwayCleaning: 'Stairway Cleaning',
            movingServices: 'Moving Services'
          };
          return readableNames[key] || key;
        });

      // Get readable service type name
      const serviceTypeNames: Record<string, string> = {
        standard: 'Standard Clean',
        deep: 'Deep Clean',
        moveout: 'Move Out Clean',
      };

      // Create structured data for Formspree
      const cleanFormData = {
        business: 'Tulsa Maids',
        businessId: 'tulsa',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        zipCode: formData.zipCode,
        frequency: formData.frequency,
        serviceType: formData.serviceType,
        squareFootage: formData.squareFootage,
        addons: formData.addons,
        confirmationNumber: confirmationNumber,
        // Display labels for Formspree dashboard
        'First Name': formData.firstName,
        'Last Name': formData.lastName,
        'Email': formData.email,
        'Phone': formData.phone,
        'Bedrooms': formData.bedrooms,
        'Bathrooms': formData.bathrooms,
        'Zip Code': formData.zipCode,
        'Frequency': formData.frequency,
        'Service Type': serviceTypeNames[formData.serviceType] || formData.serviceType,
        'Home Size': formData.squareFootage,
        'Extra Add-ons': extraAddons.length > 0 ? extraAddons.join(', ') : 'None',
        'Confirmation Number': confirmationNumber
      };

      const response = await fetch('https://formspree.io/f/mrbjzvde', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...cleanFormData,
          _subject: `Tulsa Maids - Quote Request from ${formData.firstName} ${formData.lastName} - #${confirmationNumber}`,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit quote');
      }

      setConfirmationNumber(confirmationNumber);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessMessage type="quote" confirmationNumber={confirmationNumber} />;
  }

  // Calculate which addons are included in the selected service type
  const includedInDeep = ['wallStainRemoval', 'tileAndGrout', 'baseboardCleaning'];
  const includedInMoveOut = ['bedroomBathroomCabinets', 'insideKitchenCabinets', 'interiorWindows', 'insideFridge', 'insideOven', 'microwave', 'wallStainRemoval', 'tileAndGrout', 'baseboardCleaning'];
  const includedAddons = formData.serviceType === 'deep' ? includedInDeep :
                        formData.serviceType === 'moveout' ? includedInMoveOut : [];

  return (
    <div className="w-full max-w-full sm:container mx-auto px-4 pt-48 pb-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: getFormBg() }}>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Get a free quote instantly!</h1>
          <p className="text-white/80 mb-6">
            Fill out the form and we&apos;ll send you a detailed quote.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  First Name*
                </label>
                <input
                  type="text"
                  placeholder="ex. Jane"
                  className={`w-full p-3 border rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] ${
                    errors.firstName ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ background: getFormBg() }}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Last Name*
                </label>
                <input
                  type="text"
                  placeholder="ex. Smith"
                  className={`w-full p-3 border rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] ${
                    errors.lastName ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ background: getFormBg() }}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
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
                  className={`w-full p-3 border rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ background: getFormBg() }}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className="h-5 mt-1">
                  {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Phone*
                </label>
                <input
                  type="tel"
                  placeholder={CONTACT_INFO.phone.display}
                  className={`w-full p-3 border rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] ${
                    errors.phone ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ background: getFormBg() }}
                  value={formData.phone}
                  onChange={(e) => {
                    const input = e.target;
                    const raw = input.value;
                    const digits = raw.replace(/\D/g, '').slice(0, 10);
                    let fmt = digits;
                    if (digits.length > 6) fmt = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
                    else if (digits.length > 3) fmt = `(${digits.slice(0,3)}) ${digits.slice(3)}`;
                    else if (digits.length > 0) fmt = digits;
                    setFormData({ ...formData, phone: fmt });
                  }}
                  maxLength={14}
                />
                <div className="h-5 mt-1">
                  {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Bedrooms*
                </label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69]"
                  style={{ background: getFormBg() }}
                >
                  <option value="Studio">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Bathrooms*
                </label>
                <select
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69]"
                  style={{ background: getFormBg() }}
                >
                  <option value="1">1 Bathroom</option>
                  <option value="1.5">1.5 Bathrooms</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="2.5">2.5 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="3.5">3.5 Bathrooms</option>
                  <option value="4">4+ Bathrooms</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Zip Code*
                </label>
                <input
                  type="text"
                  placeholder="e.g. 11201"
                  className={`w-full p-3 border rounded-lg text-white placeholder-white/50 focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69] ${
                    errors.zipCode ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ background: getFormBg() }}
                  value={formData.zipCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setFormData({ ...formData, zipCode: val });
                  }}
                  maxLength={5}
                />
                {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Home Size*
                </label>
                <select
                  value={formData.squareFootage}
                  onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                  className="w-full p-3 border border-white/20 rounded-lg text-white appearance-none focus:border-[#dfbd69] focus:ring-1 focus:ring-[#dfbd69]"
                  style={{ background: getFormBg() }}
                >
                  <option value="Under 1,000 sqft">Under 1,000 sqft</option>
                  <option value="1,000-2,000 sqft">1,000 - 2,000 sqft</option>
                  <option value="2,000-3,000 sqft">2,000 - 3,000 sqft</option>
                  <option value="3,000+ sqft">3,000+ sqft</option>
                </select>
              </div>
            </div>

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
                    onClick={() => handleServiceTypeChange(id)}
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
            </div>

            {/* Frequency Selection - hidden for move out, only shows after service type selected */}
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
                      onClick={() => setFormData(prev => ({ ...prev, frequency: id }))}
                      className={`relative ${
                        formData.frequency === id
                          ? 'ring-2 ring-[#dfbd69] bg-white/40 border border-white'
                          : 'ring-1 ring-white/30 hover:ring-2 hover:ring-[#dfbd69]/50 bg-white/10'
                      } rounded-lg p-4 text-center transition-all duration-300 ease-in-out backdrop-blur-sm`}
                    >
                      {popular && (
                        <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#dfbd69] text-[#1a3755] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
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
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">
                  Add Extra Services (Optional)
                </label>

                {formData.serviceType === 'deep' && (
                  <div className="text-xs text-[#dfbd69] bg-[#dfbd69]/10 border border-[#dfbd69]/30 rounded-lg p-3">
                    <strong>Deep Clean:</strong> Extra time for baseboards, windowsills, doorframes, tile & grout
                  </div>
                )}
                {formData.serviceType === 'moveout' && (
                  <div className="text-xs text-[#dfbd69] bg-[#dfbd69]/10 border border-[#dfbd69]/30 rounded-lg p-3">
                    <strong>Move Out:</strong> Includes all rooms, cabinets, baseboards, and windows
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {ADDONS.filter((addon) => {
                    if (addon.key === 'dishes') return false;
                    if (addon.key === 'superDeepClean' && formData.serviceType === 'moveout') return false;
                    const isAutoIncluded = 
                      (formData.serviceType === 'deep' && 
                        (addon.key === 'wallStainRemoval' || addon.key === 'tileAndGrout' || addon.key === 'baseboardCleaning')) ||
                      (formData.serviceType === 'moveout' && 
                        (addon.key === 'bedroomBathroomCabinets' || addon.key === 'insideKitchenCabinets' || addon.key === 'interiorWindows' || addon.key === 'wallStainRemoval' || addon.key === 'tileAndGrout' || addon.key === 'baseboardCleaning'));
                    return !isAutoIncluded;
                  }).map((addon) => {
                    const isSelected = formData.addons[addon.key as keyof typeof formData.addons];
                    return (
                      <label key={addon.key} className="relative cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.addons[addon.key as keyof typeof formData.addons]}
                          onChange={() => {
                            setFormData(prev => ({
                              ...prev,
                              addons: {
                                ...prev.addons,
                                [addon.key]: !prev.addons[addon.key as keyof typeof prev.addons]
                              }
                            }));
                          }}
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
                            <div className="text-xs font-medium text-white">{addon.label}</div>
                            <div className="text-[10px] text-white/70">{addon.description}</div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-xs text-white/60 text-center mb-4 mt-8">
              By submitting this form, you agree to receive communications from Tulsa Maids regarding your quote request.
            </p>

            {submitError && (
              <p className="text-red-400 text-sm text-center">{submitError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.serviceType || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !isValidEmail(formData.email) || !isValidPhone(formData.phone)}
              className="button-quaternary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            <div className="mt-6 flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-[#dfbd69]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-white/80">4.9 (171 Reviews)</span>
              </div>
              <div className="text-sm text-white/80">
                <span className="font-semibold">171</span> Happy Customers
              </div>
            </div>

            <p className="text-sm text-white/60 text-center mt-4">
              We&apos;ll contact you shortly with your personalized quote!
            </p>
          </div>
        </div>

        <div className="backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: getFormBg() }}>


          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4 text-white">Quote Summary</h3>
              <div className="space-y-4">
                {formData.firstName && formData.lastName && (
                  <div>
                    <span className="text-base font-semibold text-white">Name:</span>
                    <p className="text-base text-white/80">{formData.firstName} {formData.lastName}</p>
                  </div>
                )}
                {formData.email && (
                  <div>
                    <span className="text-base font-semibold text-white">Email:</span>
                    <p className="text-base text-white/80">{formData.email}</p>
                  </div>
                )}
                {formData.phone && (
                  <div>
                    <span className="text-base font-semibold text-white">Phone:</span>
                    <p className="text-base text-white/80">{formData.phone}</p>
                  </div>
                )}
                <div>
                  <span className="text-base font-semibold text-white">Property Size:</span>
                  <p className="text-base text-white/80">{formData.bedrooms} Bedroom{formData.bedrooms !== '1' && 's'}, {formData.bathrooms} Bathroom{formData.bathrooms !== '1' && 's'}</p>
                </div>
                <div>
                  <span className="text-base font-semibold text-white">Home Size:</span>
                  <p className="text-base text-white/80">{formData.squareFootage}</p>
                </div>
                <div>
                  <span className="text-base font-semibold text-white">Service Type:</span>
                  <p className="text-base text-white/80">
                    {cleaningTypes.find(type => type.id === formData.serviceType)?.name}
                  </p>
                </div>
                {formData.serviceType !== 'moveout' && (
                  <div>
                    <span className="text-base font-semibold text-white">Frequency:</span>
                    <p className="text-base text-white/80">{formData.frequency}</p>
                  </div>
                )}
                <div>
                  <span className="text-base font-semibold text-white">Selected Add-ons:</span>
                  <div className="mt-1">
                    {Object.entries(formData.addons).some(([, value]) => value) ? (
                      <ul className="list-disc list-inside text-base text-white/80">
                        {Object.entries(formData.addons).map(([key, value]) => {
                          if (value) {
                            const addonLabel = ADDONS.find(addon => addon.key === key)?.label;
                            const isIncluded = includedAddons.includes(key);
                            return addonLabel && (
                              <li key={key}>
                                {addonLabel}
                                {isIncluded && <span className="text-[#dfbd69] ml-2">(Included)</span>}
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    ) : (
                      <p className="text-white/80">No add-ons selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-serif font-bold mb-4 text-white">Need Help?</h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <a 
                    href={CONTACT_INFO.phone.href} 
                    className="flex items-center space-x-3 text-base text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{CONTACT_INFO.phone.display}</span>
                  </a>
                  <a 
                    href={`sms:${CONTACT_INFO.phone.raw}`} 
                    className="flex items-center space-x-3 text-base text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Text us</span>
                  </a>
                  <a 
                    href={CONTACT_INFO.email.href} 
                    className="flex items-center space-x-3 text-base text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{CONTACT_INFO.email.display}</span>
                  </a>
                </div>

                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-white">Frequently Asked Questions</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white/90">What times are available?</p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        We have flexible scheduling with plenty of availability. Just reach out and we&apos;ll find a time that works for you.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white/90">What areas do you serve?</p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        We serve Tulsa, Broken Arrow, Owasso, Jenks, Bixby, Sand Springs, Sapulpa, Glenpool, Claremore, and Catoosa. Contact us to confirm service in your area.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white/90">What products do you use?</p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        We use eco-friendly, commercial-grade cleaning products that are safe for your home and family.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white/90">Standard vs Deep Clean?</p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Standard is perfect for regular maintenance, while Deep Clean includes extras like baseboards, door frames, and detailed attention to buildup.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white/90">How long is a Deep Clean?</p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Deep Cleans typically take 25-50% longer than Standard Cleans to ensure thorough attention to detail.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white/90">How long does it take?</p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        We typically spend 1 hour per bedroom and 1 hour per bathroom.
                        <br /><br />
                        Deep cleans extend that time to ensure every detail is perfect.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white/90">How do we pay?</p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Payment is collected after service completion via card or Zelle. We ensure you&apos;re completely satisfied before processing payment.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white/90">Are there discounts for regular service?</p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Yes! Save 10% with weekly service, 5% with bi-weekly, or $10 off monthly cleanings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
