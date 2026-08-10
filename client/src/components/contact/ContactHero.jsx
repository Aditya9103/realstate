import React from 'react';
import { Headset, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactHero = () => {
  return (
    <div className="relative pt-20 pb-32 md:pt-28 md:pb-40 px-4 md:px-16 flex flex-col bg-[#051120] overflow-hidden">
      
      {/* Background Image & Gradients */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Property at Night"
          className="w-full h-full object-cover object-right opacity-60"
        />
        {/* Left-to-Right dark gradient to fade into image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#051120] via-[#051120]/90 to-[#051120]/20"></div>
        {/* Bottom gradient to soften the overlap area */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#051120] via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full pt-8">
        
        {/* Breadcrumb */}
        <div className="text-sm font-medium text-gray-300 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-300">Contact Us</span>
        </div>

        {/* Text Content */}
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 font-serif">
            Let's Connect & <br/>
            Find Your <span className="text-[#D29F54]">Perfect Space</span>
          </h1>
          
          <div className="w-16 h-[2px] bg-[#D29F54] mb-6"></div>
          
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            We're here to answer your questions, understand your needs, and help you take the next step toward your dream property.
          </p>

          {/* Trust Indicators (Horizontal) */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 text-white">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center flex-shrink-0">
                <Headset size={20} className="text-[#D29F54]" />
              </div>
              <div>
                <p className="font-semibold text-sm">Quick Response</p>
                <p className="text-xs text-gray-300">We reply within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} className="text-[#D29F54]" />
              </div>
              <div>
                <p className="font-semibold text-sm">Trusted by 2,500+</p>
                <p className="text-xs text-gray-300">Happy customers</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-[#D29F54]" />
              </div>
              <div>
                <p className="font-semibold text-sm">Expert Support</p>
                <p className="text-xs text-gray-300">From our real estate experts</p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactHero;
