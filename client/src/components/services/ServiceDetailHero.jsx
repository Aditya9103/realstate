import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ServiceDetailHero = ({ service }) => {
  return (
    <div className="w-full mb-12">
      
      {/* Breadcrumbs */}
      <div className="text-sm font-medium text-gray-600 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-[#D29F54] transition-colors">Home</Link>
        <ChevronRight size={14} className="text-gray-500" />
        <Link to="/services" className="hover:text-[#D29F54] transition-colors">Services</Link>
        <ChevronRight size={14} className="text-gray-500" />
        <span className="text-gray-500">{service.title}</span>
      </div>

      {/* Hero Image Container */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-[24px] overflow-hidden shadow-2xl">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/60 to-transparent"></div>

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-4 font-serif leading-tight">
              {service.title}
            </h1>
            <div className="w-16 h-[2px] bg-[#D29F54] mb-6"></div>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ServiceDetailHero;
