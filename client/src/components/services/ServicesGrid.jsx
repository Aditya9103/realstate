import React from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from '../../data/servicesData';
import * as Icons from 'lucide-react';

const ServicesGrid = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
      {servicesData.map((service) => {
        const Icon = Icons[service.iconName];
        return (
          <ServiceCard 
            key={service.id}
            title={service.title}
            description={service.description}
            icon={Icon}
            image={service.image}
            slug={service.slug}
          />
        );
      })}
    </div>
  );
};

export default ServicesGrid;
