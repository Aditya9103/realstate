import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import LocationSearchInput from '../common/LocationSearchInput';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle map clicks and fly to new position
const LocationPicker = ({ position, setPosition }) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  useEffect(() => {
    if (position && position.lat && position.lng) {
      map.flyTo([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const PropertyMapPicker = ({ formData, setFormData }) => {
  // Default to Noida if no coordinates
  const defaultPosition = { lat: 28.5355, lng: 77.3910 };
  
  const initialPosition = formData.coordinates?.lat && formData.coordinates?.lng 
    ? { lat: formData.coordinates.lat, lng: formData.coordinates.lng } 
    : defaultPosition;

  const [position, setPosition] = useState(initialPosition);

  // Update formData when position changes
  useEffect(() => {
    if (position && position.lat && position.lng) {
      setFormData(prev => ({
        ...prev,
        coordinates: { lat: position.lat, lng: position.lng }
      }));
    }
  }, [position, setFormData]);

  const handleLocationSelect = (suggestion) => {
    if (suggestion && suggestion.lat && suggestion.lon) {
      const newPos = { lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) };
      setPosition(newPos);
      
      const displayName = suggestion.display_name.split(',').slice(0, 3).join(',');
      
      setFormData(prev => ({
        ...prev,
        location: displayName,
        coordinates: newPos
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Search Location (Auto-pins map)</label>
        <div className="relative border border-gray-300 rounded-lg p-2.5 bg-white focus-within:border-[#D29F54] transition-colors">
          <LocationSearchInput 
            theme="light"
            value={formData.location}
            onChange={(val) => setFormData(prev => ({ ...prev, location: val }))}
            onSelect={handleLocationSelect}
            className="w-full bg-transparent border-none outline-none text-gray-800"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-gray-700">Property Location (Map)</label>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
          <MapPin size={12} />
          {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
        </div>
      </div>
      
      <p className="text-xs text-gray-500">Click on the map to pin the exact location of the property.</p>
      
      <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200 z-0">
        <MapContainer center={initialPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationPicker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyMapPicker;
