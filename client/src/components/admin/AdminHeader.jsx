import React from 'react';
import { useSelector } from 'react-redux';
import { Search, Bell, User as UserIcon } from 'lucide-react';

const AdminHeader = () => {
  const { adminName, adminEmail, adminPhoto } = useSelector((state) => state.auth);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 font-sans">
      
      {/* Search Bar (Placeholder) */}
      <div className="flex-1 max-w-md hidden md:flex">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input 
            type="text" 
            placeholder="Search properties, messages..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-colors sm:text-sm"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-6 ml-auto">
        
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-600 transition-colors">
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          <Bell className="h-6 w-6" />
        </button>

        <div className="w-px h-8 bg-gray-200"></div>

        {/* Profile Dropdown Trigger */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 bg-[#1a2b3c] rounded-full overflow-hidden flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow">
            {adminPhoto ? (
              <img src={adminPhoto} alt="Admin" className="w-full h-full object-cover" />
            ) : (
              <span className="font-serif font-bold text-lg">
                {adminName ? adminName.charAt(0).toUpperCase() : 'A'}
              </span>
            )}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-700">{adminName || 'Admin'}</p>
            <p className="text-xs text-gray-600">{adminEmail}</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default AdminHeader;
