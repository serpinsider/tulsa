'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

export default function MoveOutReviewsSection() {
  const reviews = [
    {
      name: "Amanda K.",
      location: "Bedford-Stuyvesant",
      rating: 5,
      text: "Used Brooklyn Maids for my move-out clean and got my full security deposit back! They cleaned inside every cabinet, the oven, fridge, everything. My landlord was impressed. Highly recommend!",
      date: "1 week ago",
      avatar: "https://i.imgur.com/ukM3Rqz.png"
    },
    {
      name: "Robert P.",
      location: "Manhattan",
      rating: 5,
      text: "Moving is stressful enough - Brooklyn Maids made the cleaning part easy. They were thorough, professional, and left my old apartment spotless. Worth every dollar.",
      date: "2 weeks ago",
      avatar: "https://i.imgur.com/exzvuey.png"
    },
    {
      name: "Lisa M.",
      location: "Carroll Gardens",
      rating: 5,
      text: "Booked a move-in clean for my new apartment. The previous tenants left it dirty, but Brooklyn Maids made it feel brand new. They cleaned inside all the cabinets and even the inside of the dishwasher!",
      date: "3 weeks ago",
      avatar: "https://i.imgur.com/Yxgv0pk.png"
    },
    {
      name: "James T.",
      location: "Downtown Brooklyn",
      rating: 5,
      text: "Best move-out cleaning service in NYC. They arrived on time, worked efficiently, and the apartment looked better than when I moved in. My landlord had zero complaints.",
      date: "1 month ago",
      avatar: "https://i.imgur.com/cdhxfCD.png"
    }
  ];

  return (
    <section className="py-20" style={INLINE_STYLES.primary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            Move-Out Cleaning Reviews
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-2xl mx-auto`}>
            See why customers trust us for their move-in and move-out cleaning
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

