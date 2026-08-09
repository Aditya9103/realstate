import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90'],
      default: 28.5355 // Default to Noida
    },
    lng: {
      type: Number,
      required: true,
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180'],
      default: 77.3910
    }
  },
  type: {
    type: String,
    required: true,
    enum: ['Villa', 'Apartment', 'Penthouse', 'House', 'Plot'],
  },
  priceValue: {
    type: Number,
    required: true,
  },
  priceDisplay: {
    type: String,
    required: true,
  },
  beds: {
    type: Number,
    default: null,
  },
  baths: {
    type: Number,
    default: null,
  },
  sqft: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
  tags: {
    type: [String],
    default: [], // e.g., 'Featured', 'Hot Deal', 'New'
  },
  status: {
    type: String,
    required: true,
    enum: ['Buy', 'Rent'],
  },
  furnishing: {
    type: String,
    default: '',
  },
  yearBuilt: {
    type: Number,
    default: null,
  },
  image: {
    type: String,
    required: true, // Stores the URL of the main hero image
  },
  gallery: {
    type: [String],
    default: [], // Stores URLs for additional images
  }
}, { timestamps: true });

// Low-cost numeric compound index for bounding box geospatial searches
propertySchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

export default mongoose.model('Property', propertySchema);
