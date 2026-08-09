import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icon for properties
const propertyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const PropertiesMap = ({ properties }) => {
  // Center map on India / Noida if no properties, else center on first property
  const center = properties.length > 0 && properties[0].coordinates?.lat 
    ? [properties[0].coordinates.lat, properties[0].coordinates.lng] 
    : [28.5355, 77.3910];

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative z-0">
      <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => {
          if (!property.coordinates || !property.coordinates.lat || !property.coordinates.lng) return null;
          
          return (
            <Marker 
              key={property._id} 
              position={[property.coordinates.lat, property.coordinates.lng]}
              icon={propertyIcon}
            >
              <Popup className="property-popup">
                <div className="w-[240px] overflow-hidden rounded-lg">
                  <div className="h-32 w-full overflow-hidden relative">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-[#D29F54] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {property.status}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-bold text-[#1a2b3c] text-sm mb-1 line-clamp-1">{property.title}</div>
                    <div className="text-[#D29F54] font-bold text-sm mb-2">{property.priceDisplay}</div>
                    
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-2">
                      <MapPin size={10} className="text-[#D29F54]" /> {property.location}
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 font-medium mb-3">
                      {property.beds && <div className="flex items-center gap-1"><Bed size={10} className="text-[#D29F54]" /> {property.beds}</div>}
                      {property.baths && <div className="flex items-center gap-1"><Bath size={10} className="text-[#D29F54]" /> {property.baths}</div>}
                      <div className="flex items-center gap-1"><Square size={10} className="text-[#D29F54]" /> {property.sqft} sqft</div>
                    </div>
                    
                    <Link 
                      to={`/properties/${property._id}`}
                      className="block text-center w-full bg-[#1a2b3c] text-white text-[11px] font-bold py-2 rounded hover:bg-[#D29F54] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PropertiesMap;
