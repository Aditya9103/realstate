import React from 'react';
import { MapPin, Grid, Search, CreditCard } from 'lucide-react';
import LocationSearchInput from '../common/LocationSearchInput';

const PropertiesHeader = ({ searchParams, setSearchParams, onSearch }) => {
  return (
    <div className="relative pt-15 pb-12 md:pt-25 md:pb-20 px-4 md:px-16 flex items-center border-b border-gray-200/50 bg-[#fbfaf8]">
      {/* Right Side Background Image */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-2/3 lg:w-1/2 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbfaf8] via-[#fbfaf8]/50 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
          alt="Interior"
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col xl:flex-row xl:items-center justify-between gap-4 xl:gap-8">

        {/* Left Side: Text Content */}
        <div className="flex-1 overflow-hidden pr-4">
          <div className="text-sm font-medium text-gray-500 mb-4 xl:mb-6 tracking-wide">
            <span className="hover:text-[#D29F54] cursor-pointer transition-colors">Home</span> &gt; <span className="text-gray-400">Properties</span>
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-[2.4rem] font-medium text-[#1a2b3c] mb-3 xl:mb-4 whitespace-nowrap">
            Find Your Perfect <span className="text-[#D29F54]">Property</span>
          </h1>
          <p className="text-gray-600 max-w-sm text-sm md:text-base leading-relaxed">
            Explore our handpicked properties that match your lifestyle and budget.
            Your dream home is just a click away.
          </p>
        </div>

        {/* Right Side: Inline Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-gray-100 flex-shrink-0 w-full xl:w-[58%]">

          {/* Location */}
          <div className="flex-[1.5] px-4 py-3 md:py-2 w-full md:w-auto md:min-w-[200px]">
            <div className="text-[11px] font-bold text-[#1a2b3c] mb-1.5 uppercase tracking-wider">Location</div>
            <LocationSearchInput
              theme="light"
              value={searchParams.location}
              onChange={(val) => setSearchParams(prev => ({ ...prev, location: val, minLat: '', maxLat: '', minLon: '', maxLon: '' }))}
              onSelect={(suggestion) => {
                if (suggestion && suggestion.boundingbox) {
                  setSearchParams(prev => ({
                    ...prev,
                    location: suggestion.display_name.split(',').slice(0, 3).join(','),
                    minLat: suggestion.boundingbox[0],
                    maxLat: suggestion.boundingbox[1],
                    minLon: suggestion.boundingbox[2],
                    maxLon: suggestion.boundingbox[3]
                  }));
                }
              }}
              className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            />
          </div>

          {/* Property Type */}
          <div className="flex-1 px-4 py-3 md:py-2 w-full md:w-auto">
            <div className="text-[11px] font-bold text-[#1a2b3c] mb-1.5 uppercase tracking-wider">Property Type</div>
            <div className="flex items-center text-gray-500">
              <Grid size={16} className="mr-2 text-gray-400 flex-shrink-0" />
              <select
                className="w-full bg-transparent outline-none text-sm text-gray-600 appearance-none cursor-pointer"
                value={searchParams.type}
                onChange={(e) => setSearchParams(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Townhouse">Townhouse</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex-1 px-4 py-3 md:py-2 w-full md:w-auto">
            <div className="text-[11px] font-bold text-[#1a2b3c] mb-1.5 uppercase tracking-wider">Price Range</div>
            <div className="flex items-center text-gray-500">
              <CreditCard size={16} className="mr-2 text-gray-400 flex-shrink-0" />
              <select
                className="w-full bg-transparent outline-none text-sm text-gray-600 appearance-none cursor-pointer"
                value={searchParams.price}
                onChange={(e) => setSearchParams({ ...searchParams, price: e.target.value })}
              >
                <option value="">Any Price</option>
                <option value="0-10000000">Under ₹ 1 Crore</option>
                <option value="0-20000000">Under ₹ 2 Crore</option>
                <option value="0-50000000">Under ₹ 5 Crore</option>
                <option value="0-100000000">Under ₹ 10 Crore</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto px-2 py-3 md:py-1 md:pl-4">
            <button
              onClick={onSearch}
              className="w-full md:w-auto bg-[#D29F54] text-white px-6 py-3.5 rounded-lg font-semibold text-sm hover:bg-[#b88a44] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Search size={16} /> Search Properties
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PropertiesHeader;
