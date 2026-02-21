'use client';

import Image from 'next/image';
import { INLINE_STYLES } from '@/styles/colors';

const carReviews = [
  {
    id: 1,
    name: "Marcus J.",
    location: "Summerlin",
    rating: 5,
    text: "Amazing car detailing! My SUV looks like it just came off the lot. Interior was spotless and they got rid of that pet smell completely.",
    date: "3 days ago",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 2,
    name: "Sarah K.",
    location: "Henderson",
    rating: 5,
    text: "Best mobile detailing service! They came to my office and detailed my car while I worked. So convenient and the results were incredible.",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 3,
    name: "Tony M.",
    location: "Las Vegas",
    rating: 5,
    text: "Had my truck detailed before a road trip. They cleaned every inch inside and out. The leather conditioning made my seats look brand new!",
    date: "5 days ago",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 4,
    name: "Jessica R.",
    location: "Spring Valley",
    rating: 5,
    text: "Professional and thorough! They removed coffee stains from my seats that I thought were permanent. Highly recommend for interior detailing.",
    date: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 5,
    name: "Chris D.",
    location: "North Las Vegas",
    rating: 5,
    text: "Full detail on my sports car - they were careful with the paint and the wax job is beautiful. Engine bay looks factory fresh!",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  },
  {
    id: 6,
    name: "Amanda L.",
    location: "Paradise",
    rating: 5,
    text: "Mobile service is a game changer! They detailed my minivan at home while I watched the kids. Car seats are finally clean!",
    date: "4 days ago",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
  }
];

export default function CarCleaningReviewsSection() {
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
            Car Detailing Reviews
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto">
            See what Las Vegas car owners say about our mobile detailing services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {carReviews.map((review) => (
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
          <div><div className="text-3xl font-bold text-white mb-2">500+</div><div className="text-white">Cars Detailed</div></div>
          <div><div className="text-3xl font-bold text-white mb-2">100%</div><div className="text-white">Mobile Service</div></div>
          <div><div className="text-3xl font-bold text-white mb-2">Same</div><div className="text-white">Day Available</div></div>
          <div><div className="text-3xl font-bold text-white mb-2">5★</div><div className="text-white">Average Rating</div></div>
        </div>
      </div>
    </section>
  );
}
