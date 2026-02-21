'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BRANDING } from '@/config/branding';
import { COLORS } from '@/styles/colors';
import Logo from './Logo';

interface HeaderProps {
  forceCollapsed?: boolean;
}

export default function Header({ forceCollapsed = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 100, 1);
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // If forceCollapsed is true, always show collapsed state
  const effectiveScrollProgress = forceCollapsed ? 1 : scrollProgress;

  return (
    <header 
      className="fixed w-full z-50"
      style={{ 
        height: 'auto',
        top: '48px'
      }}
    >
      <div className="relative">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Main row with logo and actions - Full width background */}
          <div 
            className="relative w-full transition-all duration-700 ease-in-out"
            style={{ 
              height: effectiveScrollProgress > 0.1 ? "64px" : "96px",
              background: effectiveScrollProgress > 0.1 ? `rgba(15, 23, 42, 0.85)` : 'transparent',
              backdropFilter: effectiveScrollProgress > 0.1 ? 'blur(12px)' : 'none',
              borderBottom: effectiveScrollProgress > 0.1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
            }}
          >
            {/* Centered content container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex items-center justify-between w-full h-full">
                {/* Left - Contact Icons */}
                <div className="w-1/4 flex items-center space-x-4">
                  <a href={BRANDING.phone.href} className="text-[#dfbd69] hover:text-[#dfbd69]/80 transition-all duration-300 hover:-translate-y-[1px] group">
                    <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                  <a href={BRANDING.phone.smsHref} className="text-[#dfbd69] hover:text-[#dfbd69]/80 transition-all duration-300 hover:-translate-y-[1px] group">
                    <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </a>
                </div>

                {/* Centered Logo */}
                <div className="w-1/2 flex justify-center">
                  <Logo size={isScrolled ? "md" : "lg"} />
                </div>

                {/* Right - Book Now Button */}
                <div className="w-1/4 flex justify-end">
                  <Link 
                    href="/booking" 
                    className={`button-tertiary ${
                      isScrolled ? "px-4 py-2 text-sm" : "px-5 py-2.5"
                    }`}
                  >
                    Book Online
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu - Collapses on scroll */}
          <div 
            className="w-full bg-transparent transition-all duration-500 ease-in-out"
            style={{
              marginTop: effectiveScrollProgress > 0.1 ? "-48px" : "0",
              height: effectiveScrollProgress > 0.1 ? "0" : "48px",
              opacity: Math.max(0, 1 - (effectiveScrollProgress * 15)),
              overflow: "hidden"
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center justify-center w-full pb-4 space-x-8">
                <Link href="/#services" scroll={true} className="text-white/80 hover:text-white font-medium transition-colors">
                  Services
                </Link>
                <Link href="/#how-it-works" scroll={true} className="text-white/80 hover:text-white font-medium transition-colors">
                  Process
                </Link>
                <Link href="/#areas" scroll={true} className="text-white/80 hover:text-white font-medium transition-colors">
                  Areas
                </Link>
                <Link href="/#faq" scroll={true} className="text-white/80 hover:text-white font-medium transition-colors">
                  FAQ
                </Link>
                <Link href="/#contact" scroll={true} className="text-white/80 hover:text-white font-medium transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div 
            className="relative w-full transition-all duration-700 ease-in-out"
            style={{ 
              background: effectiveScrollProgress > 0.1 ? `rgba(15, 23, 42, 0.85)` : 'transparent',
              backdropFilter: effectiveScrollProgress > 0.1 ? 'blur(12px)' : 'none',
              borderBottom: effectiveScrollProgress > 0.1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between h-20 relative px-4">
                {/* Left empty space */}
                <div className="w-8"></div>

                {/* Centered Logo */}
                <div className="flex-1 flex justify-center">
                  <Logo size="md" />
                </div>

                {/* Hamburger Menu - Right aligned */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white/80 hover:text-white focus:outline-none p-2"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div 
            className={`fixed left-0 right-0 z-[60] transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
            style={{
              top: '112px', // Account for announcement bar + header
              background: 'rgba(15, 23, 42, 0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="py-6 flex flex-col space-y-4">
                <Link 
                  href="/#services" 
                  className="text-white/90 hover:text-white font-medium text-lg py-2 border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  href="/#how-it-works" 
                  className="text-white/90 hover:text-white font-medium text-lg py-2 border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Process
                </Link>
                <Link 
                  href="/#areas" 
                  className="text-white/90 hover:text-white font-medium text-lg py-2 border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Areas
                </Link>
                <Link 
                  href="/#faq" 
                  className="text-white/90 hover:text-white font-medium text-lg py-2 border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link 
                  href="/#contact" 
                  className="text-white/90 hover:text-white font-medium text-lg py-2 border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>

                <div className="flex items-center justify-center space-x-6 py-4">
                  <a 
                    href={BRANDING.phone.href} 
                    className="flex items-center text-[#dfbd69] hover:text-[#dfbd69]/80 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </a>
                  <a 
                    href={BRANDING.phone.smsHref} 
                    className="flex items-center text-[#dfbd69] hover:text-[#dfbd69]/80 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Text
                  </a>
                </div>

                <Link 
                  href="/booking" 
                  className="button-tertiary w-full py-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}