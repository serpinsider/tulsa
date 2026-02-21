import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";
import PostHogProvider from "@/components/PostHogProvider";
import { BRANDING } from "@/config/branding";

import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRANDING.url),
  title: {
    default: BRANDING.seo.metaTitle,
    template: "%s"
  },
  description: BRANDING.seo.metaDescription,
  authors: [{ name: BRANDING.businessName }],
  creator: BRANDING.businessName,
  publisher: BRANDING.businessName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 160,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BRANDING.url,
    title: BRANDING.seo.metaTitle,
    description: BRANDING.seo.metaDescription,
    siteName: BRANDING.businessName,
    images: [
      {
        url: BRANDING.assets.ogImage,
        width: 1200,
        height: 630,
        alt: `${BRANDING.businessName} - House Cleaning Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRANDING.seo.metaTitle,
    description: BRANDING.seo.metaDescription,
    creator: `@${BRANDING.businessId}`,
    images: [BRANDING.assets.twitterImage],
  },
  icons: {
    icon: BRANDING.assets.favicon,
    shortcut: BRANDING.assets.favicon,
    apple: BRANDING.assets.appleTouchIcon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning={true}>
      <head>
        {/* Modern browsers - ICO */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* Fallback - ICO */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        {/* iOS/macOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Android/Chrome */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Fathom - beautiful, simple website analytics */}
        {/* TODO: Add Tulsa's Fathom site ID when available */}
        {/* <Script 
          src="https://cdn.usefathom.com/script.js" 
          data-site="YOUR_FATHOM_ID" 
          strategy="afterInteractive"
        /> */}
        <ErrorBoundary>
          <PostHogProvider>
            <StructuredData type="local-business" />
            <StructuredData type="organization" />
            <StructuredData type="website" />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </PostHogProvider>
        </ErrorBoundary>

      </body>
    </html>
  );
}