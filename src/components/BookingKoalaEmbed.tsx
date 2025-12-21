'use client';

import { useEffect, useRef, useState } from 'react';

export default function BookingKoalaEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState('5800px');

  useEffect(() => {
    // Set height based on screen size
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Small mobile
        setIframeHeight('9000px');
      } else if (width < 768) {
        // Large mobile
        setIframeHeight('8500px');
      } else if (width < 1024) {
        // Tablet
        setIframeHeight('8000px');
      } else {
        // Desktop
        setIframeHeight('5800px');
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Load the external script
    const script = document.createElement('script');
    script.src = 'https://brooklynmaids.bookingkoala.com/resources/embed.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-32 pb-12">
            <iframe 
        ref={iframeRef}
              src="https://brooklynmaids.bookingkoala.com/booknow?embed=true" 
        className="w-full border-none"
        style={{ height: iframeHeight }}
              scrolling="no"
              title="Book Your Cleaning Service"
            />
    </div>
  );
}
