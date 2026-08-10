import React from 'react';
import { servicesData } from '../../data/servicesData';
import ServiceCard from '../services/ServiceCard';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomeServices = () => {
  // Take top 4 services for the home page to keep it balanced
  const featuredServices = servicesData.slice(0, 4);

  return (
    <section className="py-12 md:py-16 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-4">
              WHAT WE DO
            </h4>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2b3c] font-serif mb-6 leading-tight">
              Comprehensive Real<br />
              Estate Solutions
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
              We offer a complete suite of real estate services designed to meet your every need. From buying your first home to managing large commercial portfolios, our experts are here to guide you.
            </p>
          </div>
          
          <Link to="/services" className="inline-flex items-center gap-2 border border-[#D29F54] text-[#D29F54] hover:bg-[#D29F54] hover:text-white px-6 py-3 rounded-lg text-sm font-bold transition-colors">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {featuredServices.map((service) => {
            const Icon = Icons[service.iconName];
            return (
              <ServiceCard 
                key={service.id}
                title={service.title}
                description={service.description}
                icon={Icon}
                image={service.image}
                slug={service.slug}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
