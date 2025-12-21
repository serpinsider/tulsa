'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

export default function DeepCleanReviewsSection() {
  const reviews = [
    {
      name: "Sarah M.",
      location: "Park Slope",
      rating: 5,
      text: "The deep clean was incredible! They got into every corner and crevice. My apartment hasn't looked this good since I moved in. The team was professional, thorough, and respectful of my space.",
      date: "2 weeks ago",
      avatar: "https://i.imgur.com/ukM3Rqz.png"
    },
    {
      name: "Michael T.",
      location: "Williamsburg",
      rating: 5,
      text: "Booked a deep clean before hosting family for the holidays. Brooklyn Maids exceeded expectations - baseboards, window sills, everything was spotless. Worth every penny!",
      date: "1 month ago",
      avatar: "https://i.imgur.com/exzvuey.png"
    },
    {
      name: "Jennifer L.",
      location: "Brooklyn Heights",
      rating: 5,
      text: "After a renovation, my place was covered in dust. The deep clean service was exactly what I needed. They cleaned inside cabinets, wiped down all surfaces, and made my home livable again.",
      date: "3 weeks ago",
      avatar: "https://i.imgur.com/Yxgv0pk.png"
    },
    {
      name: "David R.",
      location: "Carroll Gardens",
      rating: 5,
      text: "I get a deep clean every season and Brooklyn Maids never disappoints. They're consistent, reliable, and always do an amazing job. Highly recommend!",
      date: "1 week ago",
      avatar: "https://i.imgur.com/cdhxfCD.png"
    }
  ];

  return (
    <section className="py-20" style={INLINE_STYLES.primary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            What Our Customers Say
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-2xl mx-auto`}>
            Real reviews from real customers who chose our deep cleaning service
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-6 hover:bg-[rgba(15,23,42,0.98)] transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full border-2 border-[#dfbd69]"
                />
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-base">
                    {review.name}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {review.location}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-white/40 text-xs">
                  {review.date}
                </span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-white/60">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-base">
              <span className="text-white font-semibold">4.9/5</span> from 267+ verified customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

