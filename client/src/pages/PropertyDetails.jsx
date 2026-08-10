import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPropertyByIdQuery } from '../redux/api/propertyApiSlice';
import { MapPin, Share, ArrowLeftRight, Heart, ChevronRight } from 'lucide-react';
import PropertyGallery from '../components/property-details/PropertyGallery';
import PropertyTabs from '../components/property-details/PropertyTabs';
import PropertySidebar from '../components/property-details/PropertySidebar';

const PropertyDetails = () => {
  const { id } = useParams();
  const { data: property, isLoading, isError } = useGetPropertyByIdQuery(id);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Scroll to top when loading a new property
    window.scrollTo(0, 0);
  }, [id]);

  const handleViewOnMap = () => {
    setActiveTab('location');
    const tabsElement = document.getElementById('property-tabs');
    if (tabsElement) {
      tabsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <div className="min-h-screen pt-32 pb-16 flex items-center justify-center font-bold text-[#1a2b3c] text-xl">Loading Property Details...</div>;
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">Property Not Found</h2>
          <Link to="/properties" className="text-[#D29F54] hover:underline">Return to Properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen pt-15 pb-12 lg:pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16">

        {/* Breadcrumbs */}
        <div className="text-sm font-medium text-gray-600 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#D29F54] transition-colors">Home</Link>
          <ChevronRight size={14} className="text-gray-500" />
          <Link to="/properties" className="hover:text-[#D29F54] transition-colors">Properties</Link>
          <ChevronRight size={14} className="text-gray-500" />
          <span className="text-gray-500">{property.title}</span>
        </div>

        {/* Title Area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            {property.tags && property.tags.length > 0 && (
              <span className="inline-block border border-[#D29F54] text-[#D29F54] text-xs font-semibold px-2 py-0.5 rounded mb-3">
                {property.tags[0]}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#1a2b3c] mb-3">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-600 text-sm md:text-base gap-4">
              <span className="flex items-center">
                <MapPin size={18} className="mr-1.5 text-[#D29F54]" />
                {property.location}
              </span>
              <button 
                onClick={handleViewOnMap}
                className="flex items-center gap-1.5 border border-gray-300 rounded px-3 py-1 hover:border-[#D29F54] hover:text-[#D29F54] transition-colors bg-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                <span className="text-xs font-semibold">View on Map</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#1a2b3c] transition-colors group">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#1a2b3c] bg-white transition-colors">
                <Share size={18} />
              </div>
              <span className="text-xs font-semibold">Share</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#1a2b3c] transition-colors group">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#1a2b3c] bg-white transition-colors">
                <ArrowLeftRight size={18} />
              </div>
              <span className="text-xs font-semibold">Compare</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-500 transition-colors group">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-red-500 bg-white transition-colors">
                <Heart size={18} />
              </div>
              <span className="text-xs font-semibold">Save</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Left Column */}
          <div className="w-full lg:w-[65%]">
            <PropertyGallery property={property} />
            <PropertyTabs property={property} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[35%]">
            <PropertySidebar property={property} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;
