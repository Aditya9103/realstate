import React from 'react';
import { ArrowRight, Home, Key, TrendingUp, Shield, Scale, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, image, icon: Icon, slug }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row border border-gray-100 group">
      {/* Left Image Section */}
      <div className="w-full md:w-[35%] h-48 md:h-auto relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Right Content Section */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#fcf9f2] flex items-center justify-center text-[#D29F54]">
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#1a2b3c] font-serif">{title}</h3>
        </div>
        
        <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6">
          {description}
        </p>

        <Link to={`/services/${slug}`} className="inline-flex items-center gap-2 text-[#D29F54] text-sm font-semibold hover:text-[#b88a44] transition-colors mt-auto w-fit">
          Learn More
          <div className="w-6 h-6 rounded-full bg-[#1a2b3c] flex items-center justify-center text-white group-hover:bg-[#D29F54] transition-colors">
            <ArrowRight size={12} strokeWidth={3} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
