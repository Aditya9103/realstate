import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ServiceDetailContent = ({ service }) => {
  return (
    <div className="w-full">
      
      {/* Long Description */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b3c] mb-6 font-serif">Overview</h2>
        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          {service.longDescription}
        </p>
      </div>

      {/* Key Features */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 font-serif">What's Included</h2>
        <ul className="space-y-4">
          {service.keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#D29F54] flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 text-base md:text-lg">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Process Timeline */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b3c] mb-8 font-serif">Our Process</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {service.process.map((step, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon / Number */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#1a2b3c] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                {index + 1}
              </div>
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-[#1a2b3c] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ServiceDetailContent;
