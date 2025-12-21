'use client';

import Image from 'next/image';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

const carpetReviews = [
  {
    id: 1,
    name: "Jennifer S.",
    location: "Park Slope, Brooklyn",
    rating: 5,
    text: "Amazing carpet cleaning! Removed wine stains I thought were permanent. My carpets look brand new again.",
    date: "3 days ago",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 2,
    name: "Robert M.",
    location: "Williamsburg, Brooklyn",
    rating: 5,
    text: "Professional carpet cleaning service. They removed pet odors completely and the carpets dried quickly. Highly recommend!",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 3,
    name: "Lisa K.",
    location: "Brooklyn Heights, Brooklyn",
    rating: 5,
    text: "Excellent upholstery cleaning! My sofa looks like new. They were careful with the fabric and very professional.",
    date: "5 days ago",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 4,
    name: "Michael T.",
    location: "DUMBO, Brooklyn",
    rating: 5,
    text: "Great area rug cleaning service. They picked up my Persian rug and returned it looking perfect. Very trustworthy.",
    date: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 5,
    name: "Sarah D.",
    location: "Crown Heights, Brooklyn",
    rating: 5,
    text: "Best carpet cleaning in Brooklyn! They removed years of stains and traffic patterns. Carpets look amazing!",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 6,
    name: "David L.",
    location: "Gowanus, Brooklyn",
    rating: 5,
    text: "Professional service from start to finish. Steam cleaning was thorough and my carpets dried fast. Will use again!",
    date: "4 days ago",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  }
];

export default function CarpetReviewsSection() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-[#dfbd69]' : 'text-white/30'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="reviews" className="py-20" style={INLINE_STYLES.primary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#dfbd69] mb-4">
            Carpet Cleaning Reviews
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto">
            See what Brooklyn residents say about our carpet cleaning services.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {carpetReviews.map((review) => (
            <div key={review.id} className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10 hover:bg-[rgba(15,23,42,0.98)] hover:shadow-2xl hover:shadow-black/30 transition-all">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white drop-shadow-lg">{review.name}</h4>
                  <p className="text-sm text-white/70">{review.location}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-white/60">{review.date}</span>
              </div>
              
              <p className="text-white/90 leading-relaxed drop-shadow-md">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Carpet Cleaning Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">200+</div>
            <div className="text-white">Carpets Cleaned Monthly</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">99%</div>
            <div className="text-white">Stain Removal Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">24hr</div>
            <div className="text-white">Same-Day Service</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">5★</div>
            <div className="text-white">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}


