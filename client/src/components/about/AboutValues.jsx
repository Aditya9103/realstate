import React from 'react';
import { Shield, Users, Award, Heart } from 'lucide-react';

const AboutValues = () => {
  const values = [
    {
      id: 1,
      icon: Shield,
      title: 'Integrity',
      description: 'We operate with honesty and transparency in every interaction.'
    },
    {
      id: 2,
      icon: Users,
      title: 'Client First',
      description: "Our clients' goals come first, always."
    },
    {
      id: 3,
      icon: Award,
      title: 'Excellence',
      description: 'We are committed to delivering the highest standards.'
    },
    {
      id: 4,
      icon: Heart,
      title: 'Trust',
      description: 'We build lasting relationships based on trust and reliability.'
    }
  ];

  return (
    <div>
      <div className="text-center mb-16">
        <h4 className="text-[#D29F54] font-bold text-sm tracking-widest uppercase mb-4">
          Our Values
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3c] font-serif">
          The Principles That Define Us
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {values.map((val) => {
          const Icon = val.icon;
          return (
            <div 
              key={val.id}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-transparent border-2 border-[#D29F54]/20 flex items-center justify-center text-[#D29F54] mb-6">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#1a2b3c] mb-3">{val.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{val.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutValues;
