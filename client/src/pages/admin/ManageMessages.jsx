import React from 'react';
import { Mail, Check, Trash2, Eye } from 'lucide-react';
import { useGetMessagesQuery, useUpdateMessageStatusMutation, useDeleteMessageMutation } from '../../redux/api/messageApiSlice';

const ManageMessages = () => {
  const { data: response, isLoading, isError, error } = useGetMessagesQuery();
  const [updateStatus] = useUpdateMessageStatusMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const messages = response?.data || [];

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
    } catch (err) {
      alert(err?.data?.message || 'Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id).unwrap();
      } catch (err) {
        alert(err?.data?.message || 'Error deleting message');
      }
    }
  };

  return (
    <div className="font-sans space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c] font-serif">Inbox Messages</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage contact form inquiries.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold shadow-sm flex items-center gap-2">
          <Mail size={16} className="text-[#D29F54]" />
          Total: {messages.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading messages...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">{error?.data?.message || 'Failed to load messages'}</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Your inbox is empty.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-100 uppercase text-xs font-semibold text-gray-500">
                <tr>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <tr key={msg._id} className={`hover:bg-gray-50 transition-colors ${msg.status === 'Unread' ? 'bg-[#fcf9f2]/50 font-medium' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#1a2b3c]">{msg.name}</div>
                      <div className="text-xs text-gray-500">{msg.email}</div>
                      {msg.phone && <div className="text-xs text-gray-500">{msg.phone}</div>}
                    </td>
                    <td className="px-6 py-4 max-w-[300px]">
                      <div className="font-semibold text-gray-800 mb-1">{msg.subject}</div>
                      <div className="text-xs text-gray-500 truncate" title={msg.message}>{msg.message}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={msg.status}
                        onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded outline-none border-none cursor-pointer ${
                          msg.status === 'Unread' ? 'bg-yellow-100 text-yellow-700' :
                          msg.status === 'Read' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => alert(`Message from ${msg.name}:\n\n${msg.message}`)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors" title="View Full Message"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(msg._id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete Message"
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

export default ManageMessages;
