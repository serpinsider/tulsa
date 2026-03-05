'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BRANDING } from '@/config/branding';
import Logo from './Logo';

export default function HeaderSimple() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <header className="fixed w-full z-50" style={{ top: '48px' }}>
      {/* Main Header */}
      <div 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
        style={isScrolled ? { background: 'rgba(26, 55, 85, 0.95)' } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center h-20 relative">
            {/* Left - Contact Icons */}
            <div className="flex items-center space-x-4">
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

            {/* Center - Logo (absolutely centered) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Logo size="md" />
            </div>

            {/* Right - Book Button */}
            <div className="flex items-center ml-auto">
              <Link
                href="/booking"
                className="button-tertiary px-6 py-2"
              >
                Book Online
              </Link>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <Logo size="sm" />

            {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40" style={{ top: '112px' }}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative backdrop-blur-md border-b border-white/10" style={{ background: 'rgba(26, 55, 85, 0.95)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <nav className="flex flex-col space-y-4">
                {/* Mobile Contact */}
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

                {/* Mobile Book Button */}
                <Link 
                  href="/booking" 
                  className="button-tertiary w-full py-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Online
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}