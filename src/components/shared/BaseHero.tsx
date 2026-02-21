'use client';

import StepWizard from '../StepWizard';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { TYPOGRAPHY } from '@/styles/typography';
import { COLORS, INLINE_STYLES } from '@/styles/colors';
import { LAYOUTS } from '@/styles/layouts';

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
];

interface BaseHeroProps {
  title: string;
  description: string;
  location?: string;
  showWizard?: boolean;
  quoteUrl?: string;
  CustomWizard?: React.ComponentType<{ onFormExpand?: (expanded: boolean, immediate?: boolean) => void }>;
}

export default function BaseHero({ 
  title, 
  description, 
  location = "Near You",
  showWizard = true,
  quoteUrl,
  CustomWizard
}: BaseHeroProps) {
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [immediateTransition, setImmediateTransition] = useState(false);
  
  const handleFormExpand = useCallback((expanded: boolean, immediate: boolean = false) => {
    console.log("Form expansion status:", expanded, "Immediate:", immediate);
    
    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    
    const lockScroll = () => {
      window.scrollTo({ top: currentScrollY, left: currentScrollX, behavior: 'auto' });
    };
    
    window.addEventListener('scroll', lockScroll);
    
    setIsFormExpanded(expanded);
    setImmediateTransition(immediate);
    
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
    
    setTimeout(() => {
      window.removeEventListener('scroll', lockScroll);
    }, 600);
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
      </video>
      
      {/* Dark overlay */}
      <div className={`absolute inset-0 ${COLORS.overlays.dark}`}></div>
      
      <div className={`relative z-10 mx-auto ${isFormExpanded ? 'w-full px-2' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
        <div className={`${LAYOUTS.hero.content} ${
          isFormExpanded ? LAYOUTS.hero.contentExpanded : LAYOUTS.hero.contentNormal
        }`}>
          {/* Hero Content */}
          <div className={`${LAYOUTS.hero.textContainer} ${
            isFormExpanded ? LAYOUTS.hero.textHidden : LAYOUTS.hero.textVisible
          }`}>
            <h1 className={TYPOGRAPHY.heroTitle}>
              {title}
            </h1>
            <p className={TYPOGRAPHY.heroDescription}>
              {description}
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
                href="tel:+17254254620" 
                className={`flex items-center justify-center h-12 px-8 text-sm ${COLORS.text.secondary} hover:text-white transition-colors min-w-[160px]`}
              >
                call or text <span className={`${COLORS.text.accent} font-semibold ml-1`}>(725) 425-4620</span>
              </a>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
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
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#dfbd69]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className={`text-xs ${COLORS.text.primary} drop-shadow-md whitespace-nowrap`}>
                  <span className="font-semibold">4.9/5</span> <span>(500+ customers)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step Wizard or Quote Button */}
          {showWizard ? (
            <div 
              id="quote-form-container"
              className={`${LAYOUTS.hero.formContainer} ${
                isFormExpanded ? LAYOUTS.hero.formExpanded : LAYOUTS.hero.formNormal
              }`}
              style={{
                transformOrigin: "center center"
              }}
            >
              <div className={LAYOUTS.hero.formCard}>
                {CustomWizard ? <CustomWizard onFormExpand={handleFormExpand} /> : <StepWizard onFormExpand={handleFormExpand} />}
              </div>
            </div>
          ) : quoteUrl ? (
            <div className="w-full lg:w-auto flex flex-col items-center lg:items-start mt-8 lg:mt-0">
              <div className="backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: 'rgba(20, 25, 30, 0.8)' }}>
                <h3 className="text-xl font-serif font-bold text-[#dfbd69] mb-4 text-center">Get a Free Quote</h3>
                <p className="text-white/80 text-sm mb-6 text-center max-w-xs">
                  Fill out our quick form and we'll get back to you with a customized quote for your specific needs.
                </p>
                <Link 
                  href={quoteUrl}
                  className="block w-full bg-[#dfbd69] text-[#1a1f24] font-bold py-4 px-8 rounded-lg hover:bg-[#c9a84f] transition-colors text-center shadow-lg"
                >
                  Get Your Quote
                </Link>
                <p className="text-white/60 text-xs mt-4 text-center">
                  Or call <a href="tel:+17254254620" className="text-[#dfbd69] hover:underline">(725) 425-4620</a>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
