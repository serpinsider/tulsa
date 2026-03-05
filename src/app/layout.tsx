import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { BRANDING } from "@/config/branding";
import ConditionalLayout from "@/components/ConditionalLayout";
import ScrollRestoration from "@/components/ScrollRestoration";

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
        url: `${BRANDING.url}${BRANDING.assets.ogImage}`,
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
    images: [`${BRANDING.url}${BRANDING.assets.twitterImage}`],
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-[#dfbd69] focus:text-slate-900 focus:px-4 focus:py-2 focus:font-semibold">Skip to main content</a>
        <ScrollRestoration />
        <StructuredData type="local-business" />
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
