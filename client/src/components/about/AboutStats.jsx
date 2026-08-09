import React from 'react';
import { Building2, Users, Home, MapPin } from 'lucide-react';

const AboutStats = () => {
  const stats = [
    {
      id: 1,
      icon: Building2,
      value: '10+',
      label: 'Years of Excellence',
    },
    {
      id: 2,
      icon: Users,
      value: '2,500+',
      label: 'Happy Clients',
    },
    {
      id: 3,
      icon: Home,
      value: '1,200+',
      label: 'Properties Sold',
    },
    {
      id: 4,
      icon: MapPin,
      value: '15+',
      label: 'Cities Served',
    },
  ];

  return (
    <div className="bg-white rounded-[16px] shadow-2xl shadow-gray-200/50 p-4 lg:p-6 border border-gray-100 w-max">
      <div className="flex items-center divide-x divide-gray-100">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.id} 
              className="flex flex-col items-center text-center px-4 lg:px-8"
            >
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#fcf9f2] flex items-center justify-center text-[#D29F54] mb-3">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#1a2b3c] leading-none mb-1 font-serif">{stat.value}</h3>
              <p className="text-gray-500 text-[10px] lg:text-xs font-medium whitespace-nowrap">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutStats;
