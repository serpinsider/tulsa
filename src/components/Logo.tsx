import Link from 'next/link';
import { BRANDING } from '@/config/branding';
import { COLORS } from '@/styles/colors';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  linkToHome?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'text-xl md:text-2xl',
  md: 'text-2xl md:text-3xl',
  lg: 'text-3xl md:text-4xl',
  xl: 'text-4xl md:text-5xl'
};

export default function Logo({ size = 'md', linkToHome = true, className = '' }: LogoProps) {
  const logoText = (
    <span 
      className={`font-[family-name:var(--font-playfair)] font-semibold ${sizeClasses[size]} ${className}`}
      style={{
        background: `linear-gradient(135deg, #dfbd69 0%, #b8956d 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {BRANDING.businessName}
    </span>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="flex items-center">
        {logoText}
        <span className="sr-only">{BRANDING.businessName} - Home</span>
      </Link>
    );
  }

  return logoText;
}

