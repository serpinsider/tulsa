'use client';

import React from 'react';

interface QuoteBarProps {
  containerClass?: string;
  inline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const QuoteBar: React.FC<QuoteBarProps> = ({
  containerClass = "py-6 px-4 sm:px-6 max-w-4xl mx-auto",
  inline = false,
  size = 'md',
  className = ""
}) => {
  const containerStyles = inline 
    ? `inline-flex ${containerClass} ${className}`
    : `w-full ${containerClass} ${className}`;

  const textSizeClasses = {
    sm: "text-[10px]",
    md: "text-[10px] sm:text-sm",
    lg: "text-xs md:text-base"
  };
  
  const textSize = textSizeClasses[size];

  return (
    <div className="bg-[rgba(22,48,75,1)] backdrop-blur-sm w-full border-t border-b border-[#dfbd69]/30">
      <div className={`${containerStyles} quote-cta flex items-center justify-center text-white flex-wrap gap-x-2`}>
        <svg className="w-4 h-4 text-white/90 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <a 
          href="/quote" 
          className={`text-white hover:text-white/80 transition-colors ${textSize} flex items-center gap-x-2`}
        >
          GET A FREE QUOTE IN 60 SECONDS
        </a>
      </div>
    </div>
  );
};

export default QuoteBar;
