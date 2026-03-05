import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gift Cards - Tulsa Maids',
  description: 'Give the gift of a clean home. Purchase a Tulsa Maids gift card for house cleaning services in Tulsa & OK.',
  openGraph: {
    title: 'Gift Cards - Tulsa Maids',
    description: 'Give the gift of a clean home. Purchase a Tulsa Maids gift card for house cleaning services in Tulsa & OK.',
    url: 'https://www.tulsamaids.com/gift-cards',
    siteName: 'Tulsa Maids',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gift Cards - Tulsa Maids',
    description: 'Give the gift of a clean home. Purchase a Tulsa Maids gift card for house cleaning services in Tulsa & OK.',
  },
  alternates: {
    canonical: 'https://www.tulsamaids.com/gift-cards',
  },
};

export default function GiftCardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
