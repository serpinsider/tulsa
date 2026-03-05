import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Enable experimental features
  experimental: {
    optimizePackageImports: ['@prisma/client'],
  },
  
  // Configure remote images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy - controls what resources can load
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.usefathom.com https://accounts.google.com https://apis.google.com https://maps.googleapis.com https://us-assets.i.posthog.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "media-src 'self' blob:",
              "connect-src 'self' https://cdn.usefathom.com https://*.googleapis.com https://*.googleusercontent.com https://us.i.posthog.com https://us-assets.i.posthog.com https://formspree.io",
              "frame-src 'self' https://accounts.google.com https://*.bookingkoala.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://formspree.io",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Enable browser XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Require HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          // Control browser features and APIs
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ];
  },
  
  // SEO-preserving redirects from V3 to V4
  async redirects() {
    return [
      // ==============================================
      // LOCATION x SERVICE PAGES → PARENT LOCATION
      // ==============================================
      // All location x service combinations redirect to the parent location page
      // This eliminates 820+ thin content pages while preserving URLs
      {
        source: '/locations/:location/residential',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/deep-clean',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/move-out',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/commercial',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/airbnb',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/handyman',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/post-construction',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/carpet-cleaning',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/car-cleaning',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/event-cleaning',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/laundry',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/real-estate',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/house-cleaning',
        destination: '/locations/:location',
        permanent: true,
      },
      {
        source: '/locations/:location/business',
        destination: '/locations/:location',
        permanent: true,
      },

      // ==============================================
      // LOW-TRAFFIC SERVICE PAGES → APPROPRIATE DESTINATION
      // ==============================================
      // /services/residential → Homepage (recurring is a booking option, not a page)
      {
        source: '/services/residential',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/residential/:path*',
        destination: '/',
        permanent: true,
      },
      
      // /services/laundry → Homepage
      {
        source: '/services/laundry',
        destination: '/',
        permanent: true,
      },
      
      // /services/real-estate → Commercial
      {
        source: '/services/real-estate',
        destination: '/services/commercial',
        permanent: true,
      },
      
      // /services/office-cleaning → Commercial
      {
        source: '/services/office-cleaning',
        destination: '/services/commercial',
        permanent: true,
      },
      {
        source: '/services/office-cleaning/:path*',
        destination: '/services/commercial',
        permanent: true,
      },
      
      // /services/business → Commercial
      {
        source: '/services/business',
        destination: '/services/commercial',
        permanent: true,
      },
      
      // Other low-traffic service redirects
      {
        source: '/services/green-cleaning',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/holiday-cleaning',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/spring-cleaning',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/tile-grout-cleaning',
        destination: '/services/carpet-cleaning',
        permanent: true,
      },
      {
        source: '/services/upholstery-cleaning',
        destination: '/services/carpet-cleaning',
        permanent: true,
      },
      {
        source: '/services/moving',
        destination: '/services/handyman',
        permanent: true,
      },
      {
        source: '/services/house-cleaning',
        destination: '/',
        permanent: true,
      },

      // ==============================================
      // CONTENT PAGES → HOMEPAGE WITH ANCHORS
      // ==============================================
      {
        source: '/faq',
        destination: '/#faq',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/offers',
        destination: '/',
        permanent: true,
      },
      {
        source: '/what-we-clean',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },

      // ==============================================
      // MISC PAGE REDIRECTS
      // ==============================================
      {
        source: '/become-a-cleaner',
        destination: '/join-our-team',
        permanent: true,
      },
      {
        source: '/commercial-quote',
        destination: '/services/commercial',
        permanent: true,
      },
      {
        source: '/quote-bk',
        destination: '/quote',
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/dashboard-login',
        permanent: true,
      },
      {
        source: '/reddit-communities',
        destination: '/',
        permanent: true,
      },
      {
        source: '/site-map',
        destination: '/',
        permanent: true,
      },

      // ==============================================
      // BLOG REDIRECTS
      // ==============================================
      // Blog gets 0 clicks from 43k impressions - redirect to homepage
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/',
        permanent: true,
      },

      // ==============================================
      // CATCH-ALL SERVICE PAGE
      // ==============================================
      {
        source: '/services',
        destination: '/#services',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;