import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Property from './models/Property.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const properties = [
  {
    title: 'Luxury Villa in Whitefield',
    location: 'Whitefield, Bangalore',
    type: 'Villa',
    priceValue: 28500000,
    priceDisplay: '₹ 2.85 Crore',
    beds: 4,
    baths: 4,
    sqft: 3200,
    amenities: ['Pool', 'Gym', 'Security', 'Parking', 'Balcony'],
    tags: ['Featured', 'Premium'],
    status: 'Buy',
    furnishing: 'Fully Furnished',
    yearBuilt: 2021,
    coordinates: { lat: 12.9698, lng: 77.7499 },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    title: 'Premium 3BHK Apartment',
    location: 'Sector 45, Gurgaon',
    type: 'Apartment',
    priceValue: 16500000,
    priceDisplay: '₹ 1.65 Crore',
    beds: 3,
    baths: 3,
    sqft: 1850,
    amenities: ['Gym', 'Security', 'Parking', 'Elevator'],
    tags: ['New'],
    status: 'Buy',
    furnishing: 'Semi-Furnished',
    yearBuilt: 2023,
    coordinates: { lat: 28.4418, lng: 77.0601 },
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    gallery: []
  },
  {
    title: 'Modern Villa with Pool',
    location: 'Sarjapur Road, Bangalore',
    type: 'Villa',
    priceValue: 37500000,
    priceDisplay: '₹ 3.75 Crore',
    beds: 5,
    baths: 5,
    sqft: 4100,
    amenities: ['Pool', 'Security', 'Parking', 'Garden', 'Balcony'],
    tags: ['Hot Deal'],
    status: 'Rent',
    furnishing: 'Fully Furnished',
    yearBuilt: 2018,
    coordinates: { lat: 12.9244, lng: 77.6508 },
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    gallery: []
  },
  {
    title: 'Cozy Townhouse',
    location: 'Andheri West, Mumbai',
    type: 'House',
    priceValue: 22000000,
    priceDisplay: '₹ 2.20 Crore',
    beds: 2,
    baths: 2,
    sqft: 1500,
    amenities: ['Security', 'Parking'],
    tags: [],
    status: 'Buy',
    furnishing: 'Unfurnished',
    yearBuilt: 2015,
    coordinates: { lat: 19.1363, lng: 72.8277 },
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    gallery: []
  },
  {
    title: 'Seaside Penthouse',
    location: 'Marine Drive, Mumbai',
    type: 'Penthouse',
    priceValue: 95000000,
    priceDisplay: '₹ 9.50 Crore',
    beds: 4,
    baths: 5,
    sqft: 4500,
    amenities: ['Pool', 'Gym', 'Security', 'Parking', 'Balcony', 'Elevator'],
    tags: ['Premium', 'Featured'],
    status: 'Buy',
    furnishing: 'Fully Furnished',
    yearBuilt: 2022,
    coordinates: { lat: 18.9431, lng: 72.8227 },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    gallery: []
  }
];

const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/realestate';
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');

    await Property.deleteMany({});
    console.log('Existing properties removed');

    await Property.insertMany(properties);
    console.log('5 sample properties added successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
