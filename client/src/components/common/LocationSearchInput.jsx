import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

const LocationSearchInput = ({ 
  value, 
  onChange, 
  onSelect, 
  placeholder = "Enter location", 
  className = "",
  theme = "light" // 'light' or 'dark'
}) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Sync internal state with prop if it changes from outside
  useEffect(() => {
    if (value !== undefined && value !== query) {
      setQuery(value);
    }
  }, [value]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const fetchLocations = async () => {
      if (!query || query.length < 3) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchLocations();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (onChange) onChange(val);
    setShowDropdown(true);
  };

  const handleSelect = (suggestion) => {
    const displayName = suggestion.display_name.split(',').slice(0, 3).join(','); // Take first 3 parts for cleaner look
    setQuery(displayName);
    if (onChange) onChange(displayName);
    if (onSelect) onSelect(suggestion); // suggestion contains boundingbox: [southLat, northLat, westLon, eastLon]
    setShowDropdown(false);
  };

  const isDark = theme === 'dark';

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex items-center justify-between w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          className={className}
        />
        {isLoading ? (
          <Loader2 size={18} className={`animate-spin ${isDark ? 'text-gray-500' : 'text-gray-500'}`} />
        ) : (
          <MapPin size={18} className={isDark ? 'text-gray-500' : 'text-gray-500'} />
        )}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className={`absolute z-50 w-full mt-2 rounded-lg shadow-xl border overflow-hidden max-h-60 overflow-y-auto ${
          isDark 
            ? 'bg-[#1a2b3c] border-gray-700 shadow-black/50' 
            : 'bg-white border-gray-200'
        }`}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSelect(suggestion)}
              className={`px-4 py-3 cursor-pointer text-sm flex items-start gap-3 transition-colors ${
                isDark 
                  ? 'hover:bg-white/10 text-gray-200 border-b border-gray-700/50 last:border-0' 
                  : 'hover:bg-gray-50 text-gray-700 border-b border-gray-100 last:border-0'
              }`}
            >
              <MapPin size={16} className={`mt-0.5 flex-shrink-0 ${isDark ? 'text-[#D29F54]' : 'text-[#D29F54]'}`} />
              <span className="line-clamp-2 leading-tight">{suggestion.display_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearchInput;
