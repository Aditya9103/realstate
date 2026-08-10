import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertiesHeader from '../components/properties/PropertiesHeader';
import PropertiesSidebar from '../components/properties/PropertiesSidebar';
import PropertyGrid from '../components/properties/PropertyGrid';
import PropertiesMap from '../components/properties/PropertiesMap';
import { useGetPropertiesQuery } from '../redux/api/propertyApiSlice';
import { LayoutGrid, Map as MapIcon } from 'lucide-react';

const initialFilters = {
  location: '',
  types: [],
  minPrice: 0,
  maxPrice: 100000000,
  bedrooms: null,
  bathrooms: null,
  status: '',
  furnishing: [],
  tags: [],
  maxAge: null,
  amenities: [],
  minSize: 0,
  maxSize: 10000,
  minLat: '',
  maxLat: '',
  minLon: '',
  maxLon: ''
};

const Properties = () => {
  const location = useLocation();
  const [filters, setFilters] = useState(initialFilters);

  // Build API Query params for backend-level filtering
  const queryParams = {
    ...(filters.minLat && { minLat: filters.minLat }),
    ...(filters.maxLat && { maxLat: filters.maxLat }),
    ...(filters.minLon && { minLon: filters.minLon }),
    ...(filters.maxLon && { maxLon: filters.maxLon }),
    ...(filters.location && !filters.minLat && { location: filters.location }),
    ...(filters.types.length === 1 && { type: filters.types[0] }),
    ...(filters.status && { status: filters.status }),
  };

  const { data: propertiesData = [], isLoading, isError } = useGetPropertiesQuery(queryParams);
  
  const [headerSearch, setHeaderSearch] = useState({ location: '', type: '', price: '' });
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

  // Initialize filters from navigation state (e.g., from HeroHome search)
  useEffect(() => {
    if (location.state?.searchParams) {
      const { location: loc, type, status, price, bedrooms, minLat, maxLat, minLon, maxLon } = location.state.searchParams;
      let minPrice = 0;
      let maxPrice = 100000000;
      if (price) {
        const parts = price.split('-');
        if (parts.length > 1) {
          minPrice = parseInt(parts[0], 10);
          maxPrice = parseInt(parts[1], 10);
        }
      }

      setFilters(prev => ({
        ...prev,
        location: loc || prev.location,
        types: type ? [type] : prev.types,
        status: status || prev.status,
        minPrice,
        maxPrice,
        bedrooms: bedrooms ? parseInt(bedrooms, 10) : prev.bedrooms,
        minLat: minLat || prev.minLat,
        maxLat: maxLat || prev.maxLat,
        minLon: minLon || prev.minLon,
        maxLon: maxLon || prev.maxLon
      }));
      
      setHeaderSearch({ location: loc || '', type: type || '', price: price || '' });
    }
  }, [location.state]);

  // Sync header search to sidebar filters when "Search Properties" is clicked
  const handleHeaderSearch = () => {
    let minPrice = 0;
    let maxPrice = 100000000;
    if (headerSearch.price) {
      const parts = headerSearch.price.split('-');
      if (parts.length > 1) {
        minPrice = parseInt(parts[0], 10);
        maxPrice = parseInt(parts[1], 10);
      }
    }

    setFilters({
      ...filters,
      location: headerSearch.location,
      minLat: headerSearch.minLat || '',
      maxLat: headerSearch.maxLat || '',
      minLon: headerSearch.minLon || '',
      maxLon: headerSearch.maxLon || '',
      types: headerSearch.type ? [headerSearch.type] : [],
      minPrice: minPrice,
      maxPrice: maxPrice
    });
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setHeaderSearch({ location: '', type: '', price: '', minLat: '', maxLat: '', minLon: '', maxLon: '' });
  };

  // Apply filters to data whenever filters state changes
  useEffect(() => {
    let result = propertiesData;

    // Location Filter (Only needed if backend didn't do it)
    if (filters.location && !filters.minLat && Object.keys(queryParams).length === 0) {
      const term = filters.location.toLowerCase();
      result = result.filter(p => p.location.toLowerCase().includes(term) || p.title.toLowerCase().includes(term));
    }

    // Type Filter
    if (filters.types.length > 0) {
      result = result.filter(p => filters.types.includes(p.type));
    }

    // Price Filter
    result = result.filter(p => p.priceValue <= filters.maxPrice);

    // Bedrooms Filter
    if (filters.bedrooms) {
      result = result.filter(p => p.beds >= filters.bedrooms);
    }

    // Bathrooms Filter
    if (filters.bathrooms) {
      result = result.filter(p => p.baths >= filters.bathrooms);
    }

    // Status Filter
    if (filters.status) {
      result = result.filter(p => p.status === filters.status);
    }

    // Furnishing Filter
    if (filters.furnishing.length > 0) {
      result = result.filter(p => filters.furnishing.includes(p.furnishing));
    }

    // Tags Filter
    if (filters.tags.length > 0) {
      result = result.filter(p => p.tags && p.tags.some(tag => filters.tags.includes(tag)));
    }

    // Age / Year Built Filter
    if (filters.maxAge) {
      const currentYear = new Date().getFullYear();
      result = result.filter(p => p.yearBuilt && (currentYear - p.yearBuilt) <= filters.maxAge);
    }

    // Amenities Filter
    if (filters.amenities.length > 0) {
      result = result.filter(p => 
        filters.amenities.every(amenity => p.amenities && p.amenities.includes(amenity))
      );
    }

    // Price Filter
    if (filters.minPrice !== null && filters.minPrice !== undefined) {
      result = result.filter(p => p.priceValue >= filters.minPrice);
    }
    if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
      result = result.filter(p => p.priceValue <= filters.maxPrice);
    }

    // Size Filter
    if (filters.minSize > 0) {
      result = result.filter(p => p.sqft >= filters.minSize);
    }
    if (filters.maxSize < 10000) {
      result = result.filter(p => p.sqft <= filters.maxSize);
    }

    setFilteredProperties(result);
  }, [filters, propertiesData]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-[#1a2b3c] font-bold text-xl">Loading Properties...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-red-500 font-bold text-xl">Failed to load properties.</div>;
  }

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <PropertiesHeader 
        searchParams={headerSearch} 
        setSearchParams={setHeaderSearch} 
        onSearch={handleHeaderSearch} 
      />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 py-12 lg:py-20 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <PropertiesSidebar 
            filters={filters} 
            setFilters={setFilters} 
            onReset={handleReset} 
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="font-bold text-[#1a2b3c] font-serif">
              Showing {filteredProperties.length} Properties
            </h2>
            <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
              <button 
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors ${viewMode === 'grid' ? 'bg-white text-[#D29F54] shadow-sm' : 'text-gray-600 hover:text-gray-700'}`}
              >
                <LayoutGrid size={16} /> Grid
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors ${viewMode === 'map' ? 'bg-white text-[#D29F54] shadow-sm' : 'text-gray-600 hover:text-gray-700'}`}
              >
                <MapIcon size={16} /> Map
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <PropertyGrid properties={filteredProperties} />
          ) : (
            <PropertiesMap properties={filteredProperties} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
