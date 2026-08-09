import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import LocationSearchInput from '../common/LocationSearchInput';

const propertyTypesList = [
  { name: 'Apartment', count: 128 },
  { name: 'Villa', count: 86 },
  { name: 'House', count: 64 },
  { name: 'Penthouse', count: 24 },
  { name: 'Townhouse', count: 32 }
];

const PropertiesSidebar = ({ filters, setFilters, onReset }) => {
  const [expanded, setExpanded] = useState({
    location: true,
    propertyType: true,
    priceRange: true,
    bedrooms: true,
    bathrooms: false,
    status: false,
    furnishing: false,
    tags: false,
    yearBuilt: false,
    amenities: false,
    propertySize: false
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTypeToggle = (type) => {
    setFilters(prev => {
      const types = prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type];
      return { ...prev, types };
    });
  };

  const AccordionItem = ({ title, section, children }) => (
    <div className="mb-2 border-b border-gray-100 pb-4 last:border-0 last:mb-0 last:pb-0">
      <div
        className="flex items-center justify-between cursor-pointer group mb-2"
        onClick={() => toggleSection(section)}
      >
        <h3 className="text-sm font-bold text-[#1a2b3c] group-hover:text-[#D29F54] transition-colors">{title}</h3>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-300 ${expanded[section] ? 'rotate-180' : ''}`}
        />
      </div>
      <div className={`transition-all duration-300 ${expanded[section] ? 'max-h-[800px] opacity-100 mt-3 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm sticky top-28">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-[#1a2b3c] flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters
        </h2>
        <button onClick={onReset} className="text-[#D29F54] text-sm font-semibold hover:underline">
          Clear All
        </button>
      </div>

      <AccordionItem title="Location" section="location">
        <div className="relative">
          <LocationSearchInput
            theme="light"
            value={filters.location}
            onChange={(val) => setFilters(prev => ({ ...prev, location: val, minLat: '', maxLat: '', minLon: '', maxLon: '' }))}
            onSelect={(suggestion) => {
              if (suggestion && suggestion.boundingbox) {
                setFilters(prev => ({
                  ...prev,
                  location: suggestion.display_name.split(',').slice(0, 3).join(','),
                  minLat: suggestion.boundingbox[0],
                  maxLat: suggestion.boundingbox[1],
                  minLon: suggestion.boundingbox[2],
                  maxLon: suggestion.boundingbox[3]
                }));
              }
            }}
            className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm outline-none focus:border-[#D29F54] transition-colors pr-10"
          />
        </div>
      </AccordionItem>

      <AccordionItem title="Property Type" section="propertyType">
        <div className="space-y-2.5">
          {propertyTypesList.map((type) => (
            <label key={type.name} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div
                  onClick={() => handleTypeToggle(type.name)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.types.includes(type.name) ? 'bg-[#D29F54] border-[#D29F54]' : 'border-gray-300 group-hover:border-[#D29F54]'}`}
                >
                  {filters.types.includes(type.name) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                </div>
                <span className="text-sm text-gray-600 group-hover:text-[#1a2b3c] transition-colors">{type.name}</span>
              </div>
              <span className="text-xs text-gray-400">{type.count}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Price Range" section="priceRange">
        <div className="relative w-full h-1.5 mb-6 mt-6 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-[#D29F54] rounded-full"
            style={{
              left: `${(filters.minPrice / 100000000) * 100}%`,
              right: `${100 - (filters.maxPrice / 100000000) * 100}%`
            }}
          ></div>
          <input
            type="range"
            min="0"
            max="100000000"
            step="1000000"
            className="absolute w-full -top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#D29F54] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: Math.min(Number(e.target.value), filters.maxPrice - 1000000) })}
          />
          <input
            type="range"
            min="0"
            max="100000000"
            step="1000000"
            className="absolute w-full -top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#D29F54] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Math.max(Number(e.target.value), filters.minPrice + 1000000) })}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>₹ {filters.minPrice === 0 ? '0' : (filters.minPrice / 10000000).toFixed(1)} Cr</span>
          <span>₹ {filters.maxPrice >= 100000000 ? '10 Cr+' : (filters.maxPrice / 10000000).toFixed(1) + ' Cr'}</span>
        </div>
      </AccordionItem>

      <AccordionItem title="Bedrooms" section="bedrooms">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setFilters({ ...filters, bedrooms: filters.bedrooms === num ? null : num })}
              className={`flex-1 py-1.5 rounded-md border text-sm font-medium transition-colors ${filters.bedrooms === num ? 'bg-[#D29F54] border-[#D29F54] text-white' : 'border-gray-200 text-gray-600 hover:border-[#D29F54] hover:text-[#D29F54]'}`}
            >
              {num}+
            </button>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Bathrooms" section="bathrooms">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setFilters({ ...filters, bathrooms: filters.bathrooms === num ? null : num })}
              className={`flex-1 py-1.5 rounded-md border text-sm font-medium transition-colors ${filters.bathrooms === num ? 'bg-[#D29F54] border-[#D29F54] text-white' : 'border-gray-200 text-gray-600 hover:border-[#D29F54] hover:text-[#D29F54]'}`}
            >
              {num}+
            </button>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Property Status" section="status">
        <div className="flex gap-2">
          {['Buy', 'Rent'].map((status) => (
            <button
              key={status}
              onClick={() => setFilters({ ...filters, status: filters.status === status ? '' : status })}
              className={`flex-1 py-1.5 rounded-md border text-sm font-medium transition-colors ${filters.status === status ? 'bg-[#D29F54] border-[#D29F54] text-white' : 'border-gray-200 text-gray-600 hover:border-[#D29F54] hover:text-[#D29F54]'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Furnishing" section="furnishing">
        <div className="space-y-2.5">
          {['Fully Furnished', 'Semi-Furnished', 'Unfurnished'].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => {
                  setFilters(prev => {
                    const furnishing = prev.furnishing.includes(type)
                      ? prev.furnishing.filter(a => a !== type)
                      : [...prev.furnishing, type];
                    return { ...prev, furnishing };
                  });
                }}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.furnishing.includes(type) ? 'bg-[#D29F54] border-[#D29F54]' : 'border-gray-300 group-hover:border-[#D29F54]'}`}
              >
                {filters.furnishing.includes(type) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
              <span className="text-sm text-gray-600 group-hover:text-[#1a2b3c] transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Property Tags" section="tags">
        <div className="flex flex-wrap gap-2">
          {['Featured', 'New', 'Hot Deal'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setFilters(prev => {
                  const tags = prev.tags.includes(tag)
                    ? prev.tags.filter(t => t !== tag)
                    : [...prev.tags, tag];
                  return { ...prev, tags };
                });
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filters.tags.includes(tag) ? 'bg-[#D29F54] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Property Age" section="yearBuilt">
        <select
          className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm outline-none focus:border-[#D29F54] text-gray-600 bg-white cursor-pointer"
          value={filters.maxAge || ''}
          onChange={(e) => setFilters({ ...filters, maxAge: e.target.value ? parseInt(e.target.value) : null })}
        >
          <option value="">Any Age</option>
          <option value="1">Under 1 Year (New Build)</option>
          <option value="5">Under 5 Years</option>
          <option value="10">Under 10 Years</option>
          <option value="20">Under 20 Years</option>
        </select>
      </AccordionItem>

      <AccordionItem title="Amenities" section="amenities">
        <div className="space-y-2.5">
          {['Pool', 'Gym', 'Security', 'Parking', 'Elevator', 'Balcony', 'Garden'].map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => {
                  setFilters(prev => {
                    const amenities = prev.amenities.includes(amenity)
                      ? prev.amenities.filter(a => a !== amenity)
                      : [...prev.amenities, amenity];
                    return { ...prev, amenities };
                  });
                }}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.amenities.includes(amenity) ? 'bg-[#D29F54] border-[#D29F54]' : 'border-gray-300 group-hover:border-[#D29F54]'}`}
              >
                {filters.amenities.includes(amenity) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
              <span className="text-sm text-gray-600 group-hover:text-[#1a2b3c] transition-colors">{amenity}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Property Size (Sq.Ft)" section="propertySize">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block">Min Size</label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none focus:border-[#D29F54] transition-colors"
              value={filters.minSize || ''}
              onChange={(e) => setFilters({ ...filters, minSize: e.target.value ? parseInt(e.target.value) : 0 })}
              placeholder="e.g. 500"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block">Max Size</label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none focus:border-[#D29F54] transition-colors"
              value={filters.maxSize === 10000 ? '' : filters.maxSize}
              onChange={(e) => setFilters({ ...filters, maxSize: e.target.value ? parseInt(e.target.value) : 10000 })}
              placeholder="Any"
            />
          </div>
        </div>
      </AccordionItem>

      <div className="mt-6">
        <button className="w-full bg-[#D29F54] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#b88a44] transition-colors mb-3">
          Apply Filters
        </button>
        <button onClick={onReset} className="w-full bg-transparent text-[#D29F54] py-2 rounded-lg font-bold text-sm hover:bg-[#fcf9f2] transition-colors">
          Reset All
        </button>
      </div>

    </div>
  );
};

export default PropertiesSidebar;
