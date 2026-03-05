'use client'

import { useEffect, useRef, useState } from 'react'
import { getBookingKoalaUrl } from '@/config/branding'

export default function BookingKoalaEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState('5800px')
  const embedUrl = getBookingKoalaUrl()

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth
      if (width < 640) {
        setIframeHeight('9000px')
      } else if (width < 768) {
        setIframeHeight('8500px')
      } else if (width < 1024) {
        setIframeHeight('8000px')
      } else {
        setIframeHeight('5800px')
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    const script = document.createElement('script')
    script.src = 'https://pine.bookingkoala.com/resources/embed.js'
    script.defer = true
    document.body.appendChild(script)

    const handleResize = (event: MessageEvent) => {
      if (event.origin.includes('bookingkoala.com') && iframeRef.current) {
        if (event.data.height) {
          iframeRef.current.style.height = event.data.height + 'px'
        } else if (event.data.type === 'resize' && event.data.value) {
          iframeRef.current.style.height = event.data.value + 'px'
        }
      }
    }

    window.addEventListener('message', handleResize)

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script)
      }
      window.removeEventListener('message', handleResize)
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-32 pb-12">
      <iframe 
        ref={iframeRef}
        src={embedUrl}
        className="w-full border-none"
        style={{ height: iframeHeight, minHeight: '100vh' }}
        scrolling="no"
        title="Book Your Cleaning Service"
      />
    </div>
  )
}
