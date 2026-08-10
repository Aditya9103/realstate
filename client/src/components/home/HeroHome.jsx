import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Download, Search, MapPin, ChevronDown, Building, Users, Award, Handshake } from 'lucide-react';
import LocationSearchInput from '../common/LocationSearchInput';

const HeroHome = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        location: '',
        type: '',
        status: '',
        price: '',
        bedrooms: '',
        minLat: '',
        maxLat: '',
        minLon: '',
        maxLon: ''
    });

    const handleLocationSelect = (suggestion) => {
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
    };

    const handleLocationChange = (val) => {
        setSearchParams(prev => ({
            ...prev,
            location: val,
            minLat: '',
            maxLat: '',
            minLon: '',
            maxLon: ''
        }));
    };

    const handleSearch = () => {
        navigate('/properties', { state: { searchParams } });
    };
    return (
        <div className="relative min-h-screen bg-black text-white flex flex-col font-sans">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/homeherobackground.png"
                    alt="Luxury Real Estate"
                    className="w-full h-full object-cover opacity-60"
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-16 pt-10 pb-20">
                <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[1400px] mx-auto gap-12 lg:gap-8 mt-12 lg:mt-24">

                    {/* Left Column - Typography & CTAs */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="inline-flex items-center gap-2 border border-[#D29F54]/40 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-sm">
                            <Star size={14} className="text-[#D29F54] fill-[#D29F54]" />
                            <span className="text-xs font-medium tracking-wider uppercase text-gray-200">Premium Real Estate</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Find The Perfect <br />
                            Property <span className="text-[#D29F54]">For You</span>
                        </h1>

                        <p className="text-gray-300 text-lg md:text-xl max-w-lg font-light leading-relaxed">
                            Discover premium properties in prime locations. Your dream home is just a search away.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button onClick={() => navigate('/properties')} className="bg-[#D29F54] text-black font-semibold px-8 py-3.5 rounded-md hover:bg-[#b88a44] cursor-pointer transition-colors tracking-wide flex items-center justify-center gap-2">
                                EXPLORE PROPERTIES
                            </button>
                            <button onClick={() => navigate('/contact')} className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-md hover:bg-white/10 cursor-pointer transition-colors tracking-wide flex items-center justify-center gap-2">
                                <Download size={18} className="rotate-180" /> CONTACT AGENT
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Search Form */}
                    <div className="w-full lg:w-[450px]">
                        <div className="bg-black/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden">
                            {/* subtle gradient effect inside the box */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <h3 className="text-2xl font-semibold mb-2">Find Your <span className="text-[#D29F54]">Dream</span> Property</h3>
                            <p className="text-gray-400 text-sm mb-6">Search from thousands of verified listings</p>

                            <div className="space-y-4">
                                {/* Location Input */}
                                <div className="relative border border-white/20 rounded-lg p-3 bg-white/5 hover:border-white/40 transition-colors">
                                    <label className="block text-[10px] uppercase text-gray-400 font-semibold mb-1">Location</label>
                                    <LocationSearchInput
                                        theme="dark"
                                        value={searchParams.location}
                                        onChange={handleLocationChange}
                                        onSelect={handleLocationSelect}
                                        className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-500"
                                    />
                                </div>

                                {/* Property Type & Status Row */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative border border-white/20 rounded-lg p-3 bg-white/5 hover:border-white/40 transition-colors">
                                        <label className="block text-[10px] uppercase text-gray-400 font-semibold mb-1">Property Type</label>
                                        <div className="flex items-center justify-between text-gray-200">
                                            <select
                                                className="w-full bg-transparent border-none outline-none text-white appearance-none cursor-pointer"
                                                value={searchParams.type}
                                                onChange={(e) => setSearchParams(prev => ({ ...prev, type: e.target.value }))}
                                            >
                                                <option value="" className="text-black">Any Type</option>
                                                <option value="Apartment" className="text-black">Apartment</option>
                                                <option value="Villa" className="text-black">Villa</option>
                                                <option value="House" className="text-black">House</option>
                                                <option value="Penthouse" className="text-black">Penthouse</option>
                                                <option value="Townhouse" className="text-black">Townhouse</option>
                                            </select>
                                            <ChevronDown size={16} className="text-gray-400 pointer-events-none absolute right-3" />
                                        </div>
                                    </div>
                                    <div className="flex-1 relative border border-white/20 rounded-lg p-3 bg-white/5 hover:border-white/40 transition-colors">
                                        <label className="block text-[10px] uppercase text-gray-400 font-semibold mb-1">Status</label>
                                        <div className="flex items-center justify-between text-gray-200">
                                            <select
                                                className="w-full bg-transparent border-none outline-none text-white appearance-none cursor-pointer"
                                                value={searchParams.status}
                                                onChange={(e) => setSearchParams(prev => ({ ...prev, status: e.target.value }))}
                                            >
                                                <option value="" className="text-black">Any Status</option>
                                                <option value="Buy" className="text-black">For Sale</option>
                                                <option value="Rent" className="text-black">For Rent</option>
                                            </select>
                                            <ChevronDown size={16} className="text-gray-400 pointer-events-none absolute right-3" />
                                        </div>
                                    </div>
                                </div>

                                {/* Price Range & Bedrooms Row */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative border border-white/20 rounded-lg p-3 bg-white/5 hover:border-white/40 transition-colors">
                                        <label className="block text-[10px] uppercase text-gray-400 font-semibold mb-1">Price Range</label>
                                        <div className="flex items-center justify-between text-gray-200">
                                            <select
                                                className="w-full bg-transparent outline-none text-gray-200 appearance-none cursor-pointer"
                                                value={searchParams.price}
                                                onChange={(e) => setSearchParams({ ...searchParams, price: e.target.value })}
                                            >
                                                <option value="" className="text-black">Any Price</option>
                                                <option value="0-10000000" className="text-black">Under ₹ 1 Crore</option>
                                                <option value="0-20000000" className="text-black">Under ₹ 2 Crore</option>
                                                <option value="0-50000000" className="text-black">Under ₹ 5 Crore</option>
                                                <option value="0-100000000" className="text-black">Under ₹ 10 Crore</option>
                                            </select>
                                            <ChevronDown size={16} className="text-gray-400 pointer-events-none absolute right-3" />
                                        </div>
                                    </div>
                                    <div className="flex-1 relative border border-white/20 rounded-lg p-3 bg-white/5 hover:border-white/40 transition-colors">
                                        <label className="block text-[10px] uppercase text-gray-400 font-semibold mb-1">Bedrooms</label>
                                        <div className="flex items-center justify-between text-gray-200">
                                            <select
                                                className="w-full bg-transparent outline-none text-gray-200 appearance-none cursor-pointer"
                                                value={searchParams.bedrooms}
                                                onChange={(e) => setSearchParams({ ...searchParams, bedrooms: e.target.value })}
                                            >
                                                <option value="" className="text-black">Any</option>
                                                <option value="1" className="text-black">1+ Bed</option>
                                                <option value="2" className="text-black">2+ Beds</option>
                                                <option value="3" className="text-black">3+ Beds</option>
                                                <option value="4" className="text-black">4+ Beds</option>
                                            </select>
                                            <ChevronDown size={16} className="text-gray-400 pointer-events-none absolute right-3" />
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-[#D29F54] text-black font-semibold py-3.5 rounded-lg hover:bg-[#b88a44] transition-colors mt-2 flex items-center justify-center gap-2"
                                >
                                    <Search size={18} /> SEARCH PROPERTIES
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Stats Section at bottom of hero */}
                <div className="w-full max-w-[1400px] mx-auto mt-16 lg:mt-32">
                    <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 flex flex-wrap md:flex-nowrap py-6 px-8 relative overflow-hidden">
                        {/* inner gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>

                        <div className="w-full md:w-1/4 flex items-center justify-start md:justify-center gap-4 py-4 md:py-0 border-b md:border-b-0 md:border-r border-white/10 last:border-0 relative z-10">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40">
                                <Building className="text-[#D29F54]" size={22} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">2,500+</div>
                                <div className="text-sm text-gray-400">Premium Properties</div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/4 flex items-center justify-start md:justify-center gap-4 py-4 md:py-0 border-b md:border-b-0 md:border-r border-white/10 last:border-0 relative z-10">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40">
                                <Users className="text-[#D29F54]" size={22} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">10,000+</div>
                                <div className="text-sm text-gray-400">Happy Clients</div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/4 flex items-center justify-start md:justify-center gap-4 py-4 md:py-0 border-b md:border-b-0 md:border-r border-white/10 last:border-0 relative z-10">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40">
                                <Award className="text-[#D29F54]" size={22} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">15+</div>
                                <div className="text-sm text-gray-400">Years Experience</div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/4 flex items-center justify-start md:justify-center gap-4 py-4 md:py-0 relative z-10">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40">
                                <Handshake className="text-[#D29F54]" size={22} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">50+</div>
                                <div className="text-sm text-gray-400">Trusted Partners</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroHome;
