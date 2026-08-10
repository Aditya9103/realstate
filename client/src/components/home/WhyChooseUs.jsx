import React from 'react';
import { Home, MapPin, ShieldCheck, BarChart2, ChevronRight } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: <Home size={28} className="text-[#D29F54]" strokeWidth={1.5} />,
    title: 'Curated Listings',
    description: 'Access handpicked, verified properties in the best locations.'
  },
  {
    id: 2,
    icon: <MapPin size={28} className="text-[#D29F54]" strokeWidth={1.5} />,
    title: 'Local Expertise',
    description: 'Our agents know the market, neighborhoods, and opportunities.'
  },
  {
    id: 3,
    icon: <ShieldCheck size={28} className="text-[#D29F54]" strokeWidth={1.5} />,
    title: 'Trusted & Transparent',
    description: 'Honest advice, clear process, and your goals first.'
  },
  {
    id: 4,
    icon: <BarChart2 size={28} className="text-[#D29F54]" strokeWidth={1.5} />,
    title: 'Smarter Search',
    description: 'Advanced tools to help you find the right property, faster.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-16 text-[#1a2b3c] font-sans">
      <div className="max-w-[1400px] mx-auto">

        {/* Top Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-4">
            WHY CHOOSE US
          </h4>

          <h2 className="text-3xl md:text-5xl font-bold text-[#1a2b3c] font-serif mb-6 leading-tight">
            A Better Way to Find Your <span className="text-[#D29F54]">Dream Property</span>
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            We combine local expertise, cutting-edge technology, and a client-first approach to make your real estate journey simple, transparent, and rewarding.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-b border-gray-200 pb-24 mb-24">
          {features.map((feature, index) => (
            <div key={feature.id} className={`flex flex-col items-center text-center px-6 ${index !== 0 ? 'pt-8 md:pt-0' : ''}`}>
              <div className="w-20 h-20 rounded-full bg-[#f6ebd8] flex items-center justify-center mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Section with Image */}
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Image */}
          <div className="w-full lg:w-3/5">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative h-[400px] md:h-[500px]">
              <img
                src="./homeherobackground.png"
                alt="Premium Living"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/5">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#D29F54] font-semibold tracking-widest text-sm uppercase">Premium Living</span>
              <div className="w-16 h-[1px] bg-[#D29F54]"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Exceptional Properties.<br />
              <span className="text-[#D29F54]">Extraordinary Lives.</span>
            </h2>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              From modern city apartments to breathtaking waterfront villas, we bring you a curated selection of properties that match your lifestyle and aspirations.
            </p>

            <button className="bg-[#b88a44] text-white font-semibold px-8 py-3.5 rounded-md hover:bg-[#D29F54] transition-colors tracking-wide flex items-center justify-center gap-2 uppercase text-sm shadow-md">
              EXPLORE PROPERTIES <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
