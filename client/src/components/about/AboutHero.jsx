import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import AboutStats from './AboutStats';

const AboutHero = () => {
  return (
    <div className="relative pt-15 pb-12 md:pt-20 md:pb-20 px-4 md:px-16 flex items-center bg-[#fafafa]">

      {/* Right Side Background Image */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-2/3 lg:w-1/2 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/70 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury modern living room"
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col xl:flex-row justify-between xl:items-end gap-8 pt-8">

        {/* Left Side: Text Content */}
        <div className="flex-1 w-full max-w-2xl pr-4 relative z-10">
          <div className="text-sm font-medium text-gray-500 mb-4 xl:mb-6 tracking-wide">
            <Link to="/" className="hover:text-[#D29F54] transition-colors">Home</Link> &gt; <span className="text-gray-400">About Us</span>
          </div>

          <h4 className="text-[#D29F54] font-bold text-sm tracking-widest uppercase mb-2">
            About Us
          </h4>

          <h1 className="text-3xl md:text-4xl xl:text-[2.4rem] font-medium text-[#1a2b3c] mb-3 xl:mb-4 font-serif">
            Building Relationships.<br />
            Delivering <span className="text-[#D29F54]">Dreams.</span>
          </h1>

          <p className="text-gray-600 max-w-sm text-sm md:text-base leading-relaxed mb-6">
            At Horizon Real Estate, we believe that a home is more than just a property – it's where life happens. Since our inception, we've been committed to helping people find spaces that inspire, elevate, and truly feel like home.
          </p>

          <button className="bg-[#0f172a] hover:bg-[#1a2b3c] text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-3 transition-colors shadow-sm w-max text-sm">
            <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
              <Play size={10} fill="currentColor" className="ml-0.5" />
            </div>
            Watch Our Story
          </button>
        </div>

        {/* Right Side: Stats - Absolutely Positioned */}
        <div className="absolute bottom-0 right-0 z-20 hidden xl:block">
          <AboutStats />
        </div>

      </div>
    </div>
  );
};

export default AboutHero;
