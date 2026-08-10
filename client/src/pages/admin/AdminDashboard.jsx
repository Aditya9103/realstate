import React from 'react';
import { Building2, MessageSquare, CalendarCheck, TrendingUp, Users, MapPin, Loader2 } from 'lucide-react';
import { useGetPropertiesQuery } from '../../redux/api/propertyApiSlice';
import { useGetMessagesQuery } from '../../redux/api/messageApiSlice';
import { useGetVisitsQuery } from '../../redux/api/visitApiSlice';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { data: properties = [], isLoading: propsLoading } = useGetPropertiesQuery({});
  
  const { data: messagesData, isLoading: msgsLoading } = useGetMessagesQuery();
  const messages = messagesData?.data || [];

  const { data: visitsData, isLoading: visitsLoading } = useGetVisitsQuery();
  const visits = visitsData?.data || [];

  const stats = [
    { title: 'Total Properties', value: propsLoading ? '...' : properties.length, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'New Messages', value: msgsLoading ? '...' : messages.length, icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Visit Requests', value: visitsLoading ? '...' : visits.length, icon: CalendarCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Active Services', value: '6', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50' }, // Hardcoded for now
  ];

  return (
    <div className="font-sans space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c] font-serif">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your properties today.</p>
        </div>
        <Link to="/admin/properties/add" className="bg-[#D29F54] hover:bg-[#b88a44] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
          + Add Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mr-4`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#1a2b3c]">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Properties */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#1a2b3c]">Recent Properties</h2>
            <Link to="/admin/properties" className="text-sm font-semibold text-[#D29F54] hover:underline">View All</Link>
          </div>
          
          {propsLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="animate-spin text-[#D29F54]" size={32} />
            </div>
          ) : properties.length > 0 ? (
            <div className="space-y-4">
              {properties.slice(0, 5).map(property => (
                <div key={property._id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src={property.image || 'https://via.placeholder.com/150'} alt={property.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#1a2b3c] truncate text-sm">{property.title}</h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin size={12} className="mr-1" />
                      <span className="truncate">{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#D29F54] text-sm">{property.priceDisplay}</div>
                    <div className="text-xs text-gray-500 mt-1">{property.status}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <Building2 size={48} className="mb-4 text-gray-200" />
              <p>No properties added yet.</p>
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#1a2b3c]">Recent Inquiries</h2>
            <Link to="/admin/messages" className="text-sm font-semibold text-[#D29F54] hover:underline">View All</Link>
          </div>

          {msgsLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="animate-spin text-[#D29F54]" size={32} />
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.slice(0, 5).map(msg => (
                <div key={msg._id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#1a2b3c] truncate text-sm">{msg.name}</h4>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{msg.subject || 'General Inquiry'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <MessageSquare size={48} className="mb-4 text-gray-200" />
              <p>No recent messages.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
