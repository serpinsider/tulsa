import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const CheckIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path 
      fillRule="evenodd" 
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
      clipRule="evenodd" 
    />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
    />
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
    />
  </svg>
);

export const MessageIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
    />
  </svg>
);

export const LocationIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
    />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path 
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
    />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 9l-7 7-7-7" 
    />
  </svg>
);

export const LightningIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M13 10V3L4 14h7v7l9-11h-7z" 
    />
  </svg>
);

export const SpinnerIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <svg 
    className={`animate-spin ${className}`} 
    width={size} 
    height={size}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);


