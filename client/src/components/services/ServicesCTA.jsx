import React from 'react';
import { Headset, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesCTA = () => {
  return (
    <div className="bg-[#0a192f] rounded-[24px] p-8 md:p-12 relative overflow-hidden flex flex-col xl:flex-row xl:items-center justify-between gap-8 xl:gap-12 shadow-2xl w-full">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D29F54]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Cityscape Silhouette */}
      <div className="absolute bottom-0 right-10 opacity-20 pointer-events-none hidden md:block">
        <svg width="200" height="60" viewBox="0 0 200 60" fill="currentColor" className="text-white">
          <path d="M10,60 V40 h10 v20 M25,60 V20 h15 v40 M45,60 V10 h20 v50 M70,60 V30 h10 v30 M85,60 V15 h25 v45 M115,60 V5 h20 v55 M140,60 V25 h15 v35 M160,60 V35 h15 v25 M180,60 V20 h10 v40"/>
        </svg>
      </div>

      {/* Left Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 flex-1">
        <div className="w-16 h-16 rounded-full border-2 border-[#D29F54]/30 flex flex-shrink-0 items-center justify-center relative">
          <div className="absolute inset-2 border border-[#D29F54]/60 rounded-full animate-ping opacity-20"></div>
          <Headset size={28} className="text-[#D29F54]" />
        </div>
        
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif">
            Need Expert Guidance?
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-[#D29F54] mb-4">
            We're Here to Help You.
          </h3>
        </div>

        {/* Center Text */}
        <div className="hidden xl:block w-[1px] h-16 bg-white/10 mx-4"></div>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md xl:max-w-sm">
          Our real estate experts are ready to answer your questions and help you make the right move.
        </p>
      </div>

      {/* Right Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 xl:flex-shrink-0">
        <a 
          href="tel:+919876543210" 
          className="bg-[#D29F54] text-[#1a2b3c] font-bold px-8 py-3.5 rounded-lg hover:bg-[#b88a44] transition-colors flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
        >
          <Phone size={18} />
          +91 98765 43210
        </a>
        
        <Link 
          to="/contact" 
          className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          Contact Us
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default ServicesCTA;
