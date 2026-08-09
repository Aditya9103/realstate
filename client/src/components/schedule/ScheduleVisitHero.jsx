import React from 'react';
import { Calendar, User, ShieldCheck, Phone } from 'lucide-react';

const ScheduleVisitHero = () => {
  return (
    <div className="relative pt-12 pb-10 md:pt-20 md:pb-12 px-4 md:px-16 flex items-center bg-[#fafafa] overflow-hidden">
      
      {/* Right Side Background Image */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-2/3 lg:w-1/2 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Villa" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* Floating Dark Card overlay on image */}
        <div className="absolute bottom-10 right-10 z-20 bg-[#051120] text-white py-4 px-6 rounded-2xl shadow-2xl hidden lg:flex flex-row items-center gap-6 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D29F54]/10 border border-[#D29F54]/20 flex items-center justify-center text-[#D29F54]">
              <Phone size={18} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Need Help?</h4>
              <p className="text-xs text-gray-400">Talk to our property expert</p>
            </div>
          </div>
          
          <div className="h-8 w-[1px] bg-gray-800"></div>
          
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-[#D29F54]" />
            <p className="font-bold text-[#D29F54] text-lg tracking-wide">+91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col justify-between pt-8">
        
        {/* Left Side: Text Content */}
        <div className="w-full max-w-2xl pr-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-gray-100">
            <Calendar size={14} className="text-[#D29F54]" />
            <span className="text-[#D29F54] font-bold text-[10px] tracking-widest uppercase">SCHEDULE A VISIT</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a2b3c] leading-[1.2] mb-6 font-serif">
            Let's Find Your<br/>
            <span className="text-[#D29F54]">Perfect Property</span>
          </h1>
          
          <p className="text-gray-600 max-w-md text-sm leading-relaxed mb-10">
            Schedule a personalized visit and explore the property that fits your needs. Our experts are here to guide you every step of the way.
          </p>

          {/* Badges Container */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D29F54]/30 shadow-sm flex items-center justify-center flex-shrink-0">
                <Calendar size={18} className="text-[#D29F54]" />
              </div>
              <div>
                <h4 className="text-[#1a2b3c] font-bold text-xs mb-1">Easy Scheduling</h4>
                <p className="text-gray-500 text-[11px] leading-snug">Pick your preferred<br/>date & time</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D29F54]/30 shadow-sm flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-[#D29F54]" />
              </div>
              <div>
                <h4 className="text-[#1a2b3c] font-bold text-xs mb-1">Expert Guidance</h4>
                <p className="text-gray-500 text-[11px] leading-snug">Get personalized<br/>assistance</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D29F54]/30 shadow-sm flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={18} className="text-[#D29F54]" />
              </div>
              <div>
                <h4 className="text-[#1a2b3c] font-bold text-xs mb-1">No Obligation</h4>
                <p className="text-gray-500 text-[11px] leading-snug">Visit with no pressure<br/>to commit</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ScheduleVisitHero;
