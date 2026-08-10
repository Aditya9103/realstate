import React from 'react';
import { Building2, MessageSquare, CalendarCheck, TrendingUp, Users } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Properties', value: '0', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'New Messages', value: '0', icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Visit Requests', value: '0', icon: CalendarCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Active Services', value: '0', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="font-sans space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c] font-serif">Dashboard Overview</h1>
          <p className="text-gray-600 text-sm mt-1">Here's what's happening with your properties today.</p>
        </div>
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
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#1a2b3c]">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area (e.g. Chart or Table) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#1a2b3c] mb-4">Recent Properties</h2>
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Building2 size={48} className="mb-4 text-gray-200" />
            <p>No properties added yet.</p>
          </div>
        </div>

        {/* Sidebar Content Area (e.g. Recent Activity Feed) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#1a2b3c] mb-4">Recent Activity</h2>
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Users size={48} className="mb-4 text-gray-200" />
            <p>No recent activity.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
