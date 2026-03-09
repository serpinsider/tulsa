'use client';

import StepWizard from '../StepWizard';
import { STEP_WIZARD_CONFIG } from '@/lib/step-wizard-config';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { TYPOGRAPHY } from '@/styles/typography';
import { COLORS, INLINE_STYLES } from '@/styles/colors';
import { LAYOUTS } from '@/styles/layouts';
import { CONTACT_INFO } from '@/lib/contact';

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
}

export default function BaseHero({ 
  title, 
  description, 
  location = "Tulsa, OK",
  showWizard = true 
}: BaseHeroProps) {
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [immediateTransition, setImmediateTransition] = useState(false);
  
  const handleFormExpand = useCallback((expanded: boolean, immediate: boolean = false) => {
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
      } else {
        formContainer.classList.remove('expand');
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
                href={CONTACT_INFO.phone.href}
                className={`flex items-center justify-center h-12 px-8 text-sm ${COLORS.text.secondary} hover:text-white transition-colors min-w-[160px]`}
              >
                call or text <span className={`${COLORS.text.accent} font-semibold ml-1`}>{CONTACT_INFO.phone.display}</span>
              </a>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex">
                {avatars.map((avatar, index) => (
                  <Image
                    key={index}
                    src={avatar}
                    alt={`Tulsa Maids customer ${index + 1}`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border border-white/20 object-cover -ml-1 first:ml-0"
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#926f34]" fill="currentColor" viewBox="0 0 20 20">
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

          {/* Step Wizard */}
          {showWizard && (
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
                <StepWizard onFormExpand={handleFormExpand} config={STEP_WIZARD_CONFIG} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

