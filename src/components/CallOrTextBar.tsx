'use client';

import React from 'react';
import Link from 'next/link';
import { BRANDING } from '@/config/branding';
import { COLORS } from '@/styles/colors';

interface CallOrTextBarProps {
  quoteLink?: string;
  bookingLink?: string;
}

/**
 * Reusable component for displaying the CALL OR TEXT US AT bar
 * Used across the site to maintain consistent appearance
 */
const CallOrTextBar: React.FC<CallOrTextBarProps> = ({
  quoteLink = "/quote",
  bookingLink = "/booking"
}) => {

  return (
    <div className="bg-[rgba(22,48,75,1)] backdrop-blur-sm w-full border-t border-b border-[#dfbd69]/30">
      <div className="py-6 px-4 sm:px-6 max-w-4xl mx-auto call-text-cta flex items-center justify-center text-white gap-x-1">
        <svg className="w-4 h-4 text-white/90 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="text-white/90 mx-1 text-[10px] sm:text-sm">CALL/TEXT</span>
        <a 
          href={BRANDING.phone.href} 
          className="font-bold text-white hover:text-white/80 transition-colors text-[10px] sm:text-sm"
        >
          {BRANDING.phone.display}
        </a>
        <span className="text-white/50 mx-1 text-[10px] sm:text-sm">OR</span>
        <Link 
          href={bookingLink} 
          className="font-semibold hover:text-white/80 transition-colors text-[10px] sm:text-sm"
        >
          BOOK ONLINE
        </Link>
      </div>
    </div>
  );
};

export default CallOrTextBar;
