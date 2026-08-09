import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import ServiceDetailHero from '../components/services/ServiceDetailHero';
import ServiceDetailContent from '../components/services/ServiceDetailContent';
import ServiceDetailSidebar from '../components/services/ServiceDetailSidebar';

const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Scroll to top when loading a new service
    window.scrollTo(0, 0);
    const foundService = servicesData.find(s => s.slug === slug);
    if (foundService) {
      setService(foundService);
    }
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">Service Not Found</h2>
          <Link to="/services" className="text-[#D29F54] hover:underline">Return to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen pt-28 pb-12 lg:pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 w-full">
        
        {/* Hero Banner */}
        <ServiceDetailHero service={service} />

        {/* Main Content Layout (2 Columns) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column (Content) */}
          <div className="w-full lg:w-[65%]">
            <ServiceDetailContent service={service} />
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[35%]">
            <ServiceDetailSidebar service={service} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
