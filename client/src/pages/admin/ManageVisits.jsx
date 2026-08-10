import React from 'react';
import { Calendar, Trash2, Home, User, Clock } from 'lucide-react';
import { useGetVisitsQuery, useUpdateVisitStatusMutation, useDeleteVisitMutation } from '../../redux/api/visitApiSlice';

const ManageVisits = () => {
  const { data: response, isLoading, isError, error } = useGetVisitsQuery();
  const [updateStatus] = useUpdateVisitStatusMutation();
  const [deleteVisit] = useDeleteVisitMutation();

  const visits = response?.data || [];

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
    } catch (err) {
      alert(err?.data?.message || 'Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this visit request?')) {
      try {
        await deleteVisit(id).unwrap();
      } catch (err) {
        alert(err?.data?.message || 'Error deleting visit request');
      }
    }
  };

  return (
    <div className="font-sans space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c] font-serif">Visit Requests</h1>
          <p className="text-gray-600 text-sm mt-1">Manage property tour and visit requests.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold shadow-sm flex items-center gap-2">
          <Calendar size={16} className="text-[#D29F54]" />
          Total: {visits.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-600">Loading visit requests...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">{error?.data?.message || 'Failed to load visits'}</div>
        ) : visits.length === 0 ? (
          <div className="p-8 text-center text-gray-600">No visit requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-100 uppercase text-xs font-semibold text-gray-600">
                <tr>
                  <th className="px-6 py-4">Visitor Info</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Requested Date/Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visits.map((visit) => (
                  <tr key={visit._id} className={`hover:bg-gray-50 transition-colors ${visit.status === 'Pending' ? 'bg-[#fcf9f2]/30' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-[#1a2b3c] mb-1">
                        <User size={14} className="text-gray-500" /> {visit.name}
                      </div>
                      <div className="text-xs text-gray-600">{visit.email}</div>
                      <div className="text-xs text-gray-600">{visit.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      {visit.propertyId ? (
                        <div className="flex items-center gap-3">
                          <img src={visit.propertyId.image || visit.propertyId.priceDisplay} alt="" className="w-12 h-12 rounded object-cover border border-gray-100" />
                          <div>
                            <div className="font-semibold text-gray-800 text-xs mb-1">{visit.propertyId.title}</div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-600">
                              <Home size={10} /> {visit.propertyId.location}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-red-400 text-xs italic">Property Deleted</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-semibold text-gray-800 mb-1">
                        <Calendar size={14} className="text-[#D29F54]" /> 
                        {new Date(visit.preferredDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock size={14} /> {visit.preferredTime}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={visit.status}
                        onChange={(e) => handleStatusChange(visit._id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded outline-none border-none cursor-pointer ${
                          visit.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          visit.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                          visit.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDelete(visit._id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete Request"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageVisits;
