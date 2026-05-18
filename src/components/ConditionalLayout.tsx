'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import HeaderSimple from '@/components/HeaderSimple';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Define paths that should have NO layout (auth pages + standalone
  // quote-confirm page, which renders its own brand chrome).
  const isAppRoute = pathname && (
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname === '/q' ||
    pathname.startsWith('/q/')
  );

  // Define paths that should have SIMPLE header (booking/quote pages).
  const isBookingOrQuotePage = pathname && (
    pathname.startsWith('/booking') ||
    pathname.startsWith('/quote')
  );

  // For app routes (dashboards), render without any chrome
  if (isAppRoute) {
    return <>{children}</>;
  }

  // For booking/quote pages, render with simple header and footer
  if (isBookingOrQuotePage) {
    return (
      <>
        <div className="sticky top-0 z-50">
          <AnnouncementBar />
          <HeaderSimple />
        </div>
        {children}
        <Footer />
      </>
    );
  }

  // For main site routes, render with full header and footer
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div className="sticky top-0 z-50">
        <AnnouncementBar />
        <Header />
      </div>
      {children}
      <Footer />
    </div>
  );
}
