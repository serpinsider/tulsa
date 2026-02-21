'use client';

import StepWizard from './StepWizard';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { TYPOGRAPHY } from '@/styles/typography';
import { COLORS, INLINE_STYLES } from '@/styles/colors';
import { LAYOUTS } from '@/styles/layouts';
import { BRANDING } from '@/config/branding';

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
];

interface HeroSectionProps {
  location?: string;
}

export default function HeroSection({ location }: HeroSectionProps) {
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [immediateTransition, setImmediateTransition] = useState(false);
  
  const handleFormExpand = useCallback((expanded: boolean, immediate: boolean = false) => {
    console.log("Form expansion status:", expanded, "Immediate:", immediate);
    
    // Preserve scroll position and prevent scroll during transition
    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    
    // Lock scroll position temporarily
    const lockScroll = () => {
      window.scrollTo({ top: currentScrollY, left: currentScrollX, behavior: 'auto' });
    };
    
    // Add scroll lock listener
    window.addEventListener('scroll', lockScroll);
    
    setIsFormExpanded(expanded);
    setImmediateTransition(immediate);
    
    // Direct DOM manipulation for immediate effect
    const formContainer = document.getElementById('quote-form-container');
    if (formContainer) {
      if (expanded) {
        formContainer.classList.add('expand');
        console.log('Added expand class from handleFormExpand');
      } else {
        formContainer.classList.remove('expand');
        console.log('Removed expand class from handleFormExpand');
      }
    }
    
    // Remove scroll lock after transition completes
    setTimeout(() => {
      window.removeEventListener('scroll', lockScroll);
    }, 600); // Slightly longer than the 500ms transition duration
  }, []);

  return (
    <section className={`${LAYOUTS.section.hero} ${COLORS.backgrounds.hero}`}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-vid.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className={`absolute inset-0 ${COLORS.overlays.dark}`}></div>
      
      <div className={`relative z-10 mx-auto ${isFormExpanded ? 'w-full px-2' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
        <div className={`relative gap-16 xl:gap-20 ${
          isFormExpanded ? 'flex justify-center items-start' : 'grid grid-cols-1 lg:grid-cols-2 items-center'
        }`}>
          {/* Hero Content - Hide when form is expanded */}
          <div className={`text-center lg:text-left transition-all duration-500 ease-out max-w-xl ${
            isFormExpanded 
              ? 'opacity-0 pointer-events-none scale-95 absolute' 
              : 'opacity-100 pointer-events-auto scale-100 relative'
          }`}>
            <h1 className={TYPOGRAPHY.heroTitle}>
              {location 
                ? `Book a Housekeeper in ${location} in 60 Seconds.`
                : "Book a Housekeeper in 60 Seconds."
              }
            </h1>
            <p className={TYPOGRAPHY.heroDescription}>
              No contracts. No hidden fees. We bring all supplies. 100% satisfaction guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link 
                href="#services"
                className="button-tertiary h-12 px-8 min-w-[160px]"
                scroll={true}
              >
                Services
              </Link>
              <a 
                href={BRANDING.phone.href} 
                className="flex items-center justify-center h-12 px-8 text-sm text-white/80 hover:text-white transition-all duration-300 min-w-[160px] hover:-translate-y-[1px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                call or text <span className="text-[#dfbd69] font-semibold ml-1 transition-all duration-300 hover:text-[#dfbd69]/80">{BRANDING.phone.display}</span>
              </a>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              {/* Avatars */}
              <div className="flex">
                {avatars.map((avatar, index) => (
                  <Image
                    key={index}
                    src={avatar}
                    alt={`Customer ${index + 1}`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border border-white/20 object-cover -ml-1 first:ml-0"
                  />
                ))}
              </div>
              
              {/* Rating Container */}
              <div className="flex items-center gap-2">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 text-[#926f34]`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Rating Text */}
                <div className="text-xs text-white drop-shadow-md whitespace-nowrap">
                  <span className="font-semibold">4.9/5</span> <span>(3,000+ customers)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step Wizard */}
          <div 
            id="quote-form-container"
            className={`quote-form-container transition-all duration-500 ease-out
              ${isFormExpanded 
                ? 'w-full max-w-[98%] md:max-w-3xl mx-auto' 
                : 'w-full max-w-lg mx-auto lg:mx-0'
              }`}
            style={{
              transformOrigin: "center center"
            }}
          >
            <div 
              className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-4 sm:p-6 relative w-full min-w-0 sm:min-w-[400px]"
            >
              <StepWizard onFormExpand={handleFormExpand} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}