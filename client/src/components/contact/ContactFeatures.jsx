import React from 'react';
import { Shield, Building2, Handshake, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactFeatures = () => {
  return (
    <div className="bg-[#051120] rounded-[24px] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
      
      {/* Left Side: 4 Features */}
      <div className="flex-1 p-8 lg:p-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        
        {/* Feature 1 */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Shield size={32} className="text-[#D29F54]" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-1">100% Trusted</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              Transparent & reliable<br/>real estate services
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Building2 size={32} className="text-[#D29F54]" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-1">Wide Property Options</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              Residential, commercial,<br/>and luxury properties
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Handshake size={32} className="text-[#D29F54]" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-1">Expert Guidance</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              Personalized advice from<br/>industry professionals
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Star size={32} className="text-[#D29F54]" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-1">Customer First</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              Your satisfaction is<br/>our top priority
            </p>
          </div>
        </div>

      </div>

      {/* Right Side: CTA */}
      <div className="w-full lg:w-[35%] bg-gradient-to-br from-[#0a192f] to-[#051120] p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col justify-center">
        <h3 className="text-xl md:text-2xl font-bold text-[#D29F54] mb-3 font-serif leading-tight">
          Ready to Find<br/>Your Dream Property?
        </h3>
        <p className="text-gray-300 text-sm mb-6">
          Let our experts help you every step of the way.
        </p>
        <Link 
          to="/services" 
          className="inline-flex items-center justify-center gap-2 bg-[#D29F54] text-[#1a2b3c] font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#b88a44] transition-colors w-fit"
        >
          Schedule a Free Consultation
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
};

export default ContactFeatures;
