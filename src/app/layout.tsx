import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import SessionProvider from "@/components/SessionProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import PostHogProvider from "@/components/PostHogProvider";

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
  metadataBase: new URL('https://brooklynmaids.com'),
  title: {
    default: "Brooklyn Maids - House Cleaning & Maid Service in NYC",
    template: "%s"
  },
  description: "Professional house cleaning and maid service serving Brooklyn, Manhattan, Queens, Bronx, Long Island, Westchester, and Northern NJ. Deep cleaning, move-out cleaning, carpet cleaning, and more. Same-day service available. Book online today!",
  authors: [{ name: "Brooklyn Maids" }],
  creator: "Brooklyn Maids",
  publisher: "Brooklyn Maids",
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
    url: "https://brooklynmaids.com",
    title: "Brooklyn Maids - House Cleaning & Maid Service in NYC",
    description: "Professional house cleaning and maid service serving Brooklyn, Manhattan, Queens, Bronx, Long Island, Westchester, and Northern NJ. Same-day service available.",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brooklyn Maids - House Cleaning Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brooklyn Maids - House Cleaning & Maid Service in NYC",
    description: "Professional house cleaning and maid service in Brooklyn, Manhattan, Queens, Bronx, Long Island, Westchester, and Northern NJ. Same-day service available.",
    creator: "@brooklynmaids",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: "https://brooklynmaids.com",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Fathom - beautiful, simple website analytics */}
        <Script 
          src="https://cdn.usefathom.com/script.js" 
          data-site="QJHZPKBB" 
          strategy="afterInteractive"
        />
        <ErrorBoundary>
          <PostHogProvider>
            <SessionProvider>
              <StructuredData type="local-business" />
              <StructuredData type="organization" />
              <StructuredData type="website" />
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </SessionProvider>
          </PostHogProvider>
        </ErrorBoundary>

      </body>
    </html>
  );
}