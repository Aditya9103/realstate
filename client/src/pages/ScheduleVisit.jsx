import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ScheduleVisitHero from '../components/schedule/ScheduleVisitHero';
import ScheduleVisitForm from '../components/schedule/ScheduleVisitForm';
import ScheduleVisitSidebar from '../components/schedule/ScheduleVisitSidebar';
import ScheduleVisitProcess from '../components/schedule/ScheduleVisitProcess';
import ScheduleVisitCTA from '../components/schedule/ScheduleVisitCTA';
import { useGetPropertiesQuery } from '../redux/api/propertyApiSlice';
import { useSubmitVisitMutation } from '../redux/api/visitApiSlice';

const ScheduleVisit = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('propertyId');

  const { data: propertiesData = [] } = useGetPropertiesQuery();

  // Find the property if an ID was passed, otherwise default to the first one (or null)
  const selectedProperty = propertyId 
    ? propertiesData.find(p => p._id === propertyId) 
    : propertiesData.length > 0 ? propertiesData[0] : null;

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState('2:00 PM');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    visitType: 'in-person'
  });

  const [submitVisit, { isLoading, isSuccess, isError, error }] = useSubmitVisitMutation();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!selectedProperty) return;
    
    // Construct Date object based on currentDate (month/year) and selectedDate
    const preferredDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate);
    
    try {
      await submitVisit({
        ...formData,
        propertyId: selectedProperty._id,
        preferredDate,
        preferredTime: selectedTime
      }).unwrap();
      
      setFormData({ name: '', email: '', phone: '', message: '', visitType: 'in-person' });
    } catch (err) {
      console.error('Failed to submit visit request', err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen pb-12 lg:pb-20">
      
      {/* Top Hero Section */}
      <ScheduleVisitHero />

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 mt-8">
        
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Form */}
          <div className="w-full lg:w-[60%]">
            <ScheduleVisitForm 
              formData={formData} 
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              error={error}
            />
          </div>

          {/* Right Column: Dynamic Sidebar with real Date/Time picker */}
          <div className="w-full lg:w-[40%]">
            <ScheduleVisitSidebar 
              property={selectedProperty} 
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </div>

        </div>

        {/* Timeline Process */}
        <ScheduleVisitProcess />

        {/* Bottom CTA Banner */}
        <ScheduleVisitCTA />

      </div>
    </div>
  );
};

export default ScheduleVisit;
