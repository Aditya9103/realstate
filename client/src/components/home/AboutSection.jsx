import React from 'react';
import { Building, ShieldCheck, Users, Home, Award, MapPin, Play } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-16 text-[#1a2b3c] font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
        
        {/* Left Content Column */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-8">
          
          {/* Label */}
          <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-4">
            ABOUT LUXORA REAL ESTATE
          </h4>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a2b3c] font-serif mb-6 leading-tight">
            Building Trust.<br />
            Delivering <span className="text-[#D29F54]">Excellence.</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-12 max-w-xl">
            Luxora Real Estate is a leading real estate company dedicated to helping individuals and families find properties that truly feel like home. With a client-first approach and deep market knowledge, we make every step of your real estate journey seamless and successful.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mb-12 border-b border-gray-100 pb-12">
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#f6ebd8] flex items-center justify-center mb-4">
                <ShieldCheck size={20} className="text-[#D29F54]" strokeWidth={2} />
              </div>
              <h4 className="font-bold text-[#1a2b3c] mb-2 text-sm md:text-base">Integrity</h4>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Honest advice and transparent deals.</p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#f6ebd8] flex items-center justify-center mb-4">
                <Users size={20} className="text-[#D29F54]" strokeWidth={2} />
              </div>
              <h4 className="font-bold text-[#1a2b3c] mb-2 text-sm md:text-base">Client Focused</h4>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Your goals are at the heart of what we do.</p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#f6ebd8] flex items-center justify-center mb-4">
                <Home size={20} className="text-[#D29F54]" strokeWidth={2} />
              </div>
              <h4 className="font-bold text-[#1a2b3c] mb-2 text-sm md:text-base">Market Experts</h4>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">In-depth knowledge for smarter real estate decisions.</p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#f6ebd8] flex items-center justify-center mb-4">
                <Award size={20} className="text-[#D29F54]" strokeWidth={2} />
              </div>
              <h4 className="font-bold text-[#1a2b3c] mb-2 text-sm md:text-base">Proven Results</h4>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Delivering value and satisfaction every time.</p>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-wrap md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-gray-100 py-6 px-4">
            
            <div className="w-1/2 md:w-1/4 flex flex-col items-center text-center p-2">
              <Building size={24} className="text-[#D29F54] mb-3" strokeWidth={1.5} />
              <div className="text-xl md:text-2xl font-bold text-[#1a2b3c] mb-1">10+</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Years of Experience</div>
            </div>
            
            <div className="w-1/2 md:w-1/4 flex flex-col items-center text-center p-2">
              <Users size={24} className="text-[#D29F54] mb-3" strokeWidth={1.5} />
              <div className="text-xl md:text-2xl font-bold text-[#1a2b3c] mb-1">2,500+</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Happy Clients</div>
            </div>

            <div className="w-1/2 md:w-1/4 flex flex-col items-center text-center p-2">
              <Home size={24} className="text-[#D29F54] mb-3" strokeWidth={1.5} />
              <div className="text-xl md:text-2xl font-bold text-[#1a2b3c] mb-1">5,000+</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Properties Sold</div>
            </div>

            <div className="w-1/2 md:w-1/4 flex flex-col items-center text-center p-2">
              <MapPin size={24} className="text-[#D29F54] mb-3" strokeWidth={1.5} />
              <div className="text-xl md:text-2xl font-bold text-[#1a2b3c] mb-1">25+</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Prime Locations</div>
            </div>

          </div>

        </div>

        {/* Right Image Column */}
        <div className="w-full lg:w-1/2 h-[600px] lg:h-[800px] relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" 
            alt="Luxury Interior View" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Play size={32} className="text-[#1a2b3c] ml-2" fill="currentColor" />
            </div>
            <span className="font-bold tracking-widest text-sm uppercase drop-shadow-md">Watch Our Story</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
