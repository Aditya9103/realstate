import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, Calendar } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 py-6 px-4 md:px-16 flex items-center justify-between text-white border-b transition-all duration-300 bg-[#0a192f] border-[#1a2b3c]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-end text-[#D29F54]">
          {/* Logo icon representation */}
          <div className="w-1.5 h-6 bg-[#D29F54] mx-0.5 rounded-t-sm"></div>
          <div className="w-1.5 h-10 bg-[#D29F54] mx-0.5 rounded-t-sm"></div>
          <div className="w-1.5 h-8 bg-[#D29F54] mx-0.5 rounded-t-sm"></div>
        </Link>
        <Link to="/" className="flex flex-col tracking-wider">
          <span className="text-xl md:text-2xl font-semibold uppercase leading-none tracking-[0.2em]">Luxora</span>
          <span className="text-[0.6rem] text-gray-400 uppercase tracking-[0.3em] mt-1">Real Estate</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link to="/" className={`${location.pathname === '/' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>HOME</Link>
        <Link to="/properties" className={`${location.pathname === '/properties' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>PROPERTIES</Link>
        <Link to="/about" className={`${location.pathname === '/about' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>ABOUT US</Link>
        <Link to="/services" className={`${location.pathname === '/services' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>SERVICES</Link>
        <Link to="/contact" className={`${location.pathname === '/contact' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>CONTACT</Link>
      </div>

      {/* Action Button */}
      <div className="hidden md:block">
        <Link 
          to="/schedule-visit" 
          className="flex items-center gap-2 border border-[#D29F54] bg-[#D29F54] text-white px-5 py-2.5 rounded text-sm font-bold hover:bg-[#b88a44] transition-colors"
        >
          <Calendar size={16} />
          Schedule a Visit
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button className="text-white hover:text-[#D29F54]">
          <Menu size={28} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
