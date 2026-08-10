import React, { useState } from 'react';
import { useGetAdminTestimonialsQuery, useUpdateTestimonialStatusMutation, useDeleteTestimonialMutation } from '../../redux/api/testimonialApiSlice';
import { Star, CheckCircle, XCircle, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

const ManageTestimonials = () => {
  const [filter, setFilter] = useState('all'); // all, pending, approved
  const { data: testimonialsData, isLoading, refetch } = useGetAdminTestimonialsQuery(filter !== 'all' ? filter : undefined);
  const testimonials = testimonialsData?.data || [];

  const [updateStatus, { isLoading: isUpdating }] = useUpdateTestimonialStatusMutation();
  const [deleteTestimonial, { isLoading: isDeleting }] = useDeleteTestimonialMutation();

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await updateStatus({ id, isApproved: !currentStatus }).unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to update status', err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id).unwrap();
        refetch();
      } catch (err) {
        console.error('Failed to delete testimonial', err);
        alert('Failed to delete testimonial');
      }
    }
  };

  return (
    <div className="font-sans space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c] font-serif">Manage Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">Review and approve customer testimonials.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${filter === 'all' ? 'bg-[#1a2b3c] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${filter === 'pending' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${filter === 'approved' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Approved
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Review</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <Loader2 size={32} className="animate-spin text-[#D29F54] mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Loading testimonials...</p>
                  </td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500">
                    <p>No testimonials found.</p>
                  </td>
                </tr>
              ) : (
                testimonials.map((test) => (
                  <tr key={test._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-200">
                          {test.image ? (
                            <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={16} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1a2b3c] text-sm">{test.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{test.role} • {test.location}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{new Date(test.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 align-top">
                      <p className="text-sm text-gray-600 line-clamp-3 max-w-md" title={test.text}>
                        {test.text}
                      </p>
                    </td>
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < test.rating ? 'fill-current' : 'text-gray-200'} />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 align-top">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        test.isApproved 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {test.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-6 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleToggleStatus(test._id, test.isApproved)}
                          disabled={isUpdating}
                          className={`p-2 rounded-lg transition-colors border ${
                            test.isApproved 
                              ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' 
                              : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                          }`}
                          title={test.isApproved ? "Hide from public" : "Approve and show"}
                        >
                          {test.isApproved ? <XCircle size={18} /> : <CheckCircle size={18} />}
                        </button>
                        <button 
                          onClick={() => handleDelete(test._id)}
                          disabled={isDeleting}
                          className="p-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
                          title="Delete permanently"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTestimonials;
