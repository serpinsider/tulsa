'use client';

import Image from 'next/image';
import { INLINE_STYLES } from '@/styles/colors';

const commercialReviews = [
  {
    id: 1,
    name: "Mark S.",
    location: "Downtown Office",
    rating: 5,
    text: "They clean our 5,000 sq ft office nightly. Always professional, reliable, and thorough. Our employees love coming to a clean workspace!",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 2,
    name: "Patricia L.",
    location: "Henderson Medical",
    rating: 5,
    text: "We run a dental practice and cleanliness is critical. Vegas Maids understands medical-grade cleaning. Highly professional team!",
    date: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 3,
    name: "James W.",
    location: "Summerlin Retail",
    rating: 5,
    text: "Our retail store needs daily cleaning before opening. They're always done on time and the floors shine. Great for business!",
    date: "5 days ago",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 4,
    name: "Nancy K.",
    location: "Las Vegas Restaurant",
    rating: 5,
    text: "Kitchen deep cleaning every week. They handle the hood, floors, everything. Health inspector was impressed!",
    date: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 5,
    name: "Brian T.",
    location: "North Las Vegas Gym",
    rating: 5,
    text: "Gym cleaning is tough but they handle it perfectly. Equipment wiped, locker rooms spotless, members are happy!",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 6,
    name: "Diana R.",
    location: "Paradise Office",
    rating: 5,
    text: "Flexible scheduling works perfect for our office. After-hours cleaning means zero disruption. Very professional!",
    date: "4 days ago",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  }
];

export default function CommercialReviewsSection() {
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
            Commercial Cleaning Reviews
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto">
            Trusted by Las Vegas businesses for reliable commercial cleaning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {commercialReviews.map((review) => (
            <div key={review.id} className="bg-[rgba(20,25,30,0.98)] backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10 hover:shadow-2xl hover:shadow-black/30 transition-all">
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
                  <h4 className="text-lg font-semibold text-white">{review.name}</h4>
                  <p className="text-sm text-white/70">{review.location}</p>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-white/60">{review.date}</span>
              </div>
              <p className="text-white/90 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-3xl font-bold text-white mb-2">100+</div><div className="text-white">Businesses Served</div></div>
          <div><div className="text-3xl font-bold text-white mb-2">24/7</div><div className="text-white">Scheduling Available</div></div>
          <div><div className="text-3xl font-bold text-white mb-2">Insured</div><div className="text-white">& Bonded</div></div>
          <div><div className="text-3xl font-bold text-white mb-2">5★</div><div className="text-white">Average Rating</div></div>
        </div>
      </div>
    </section>
  );
}
