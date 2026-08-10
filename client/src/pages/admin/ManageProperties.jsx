import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useGetPropertiesQuery, useDeletePropertyMutation } from '../../redux/api/propertyApiSlice';

const ManageProperties = () => {
  const { data: properties, isLoading, isError, error } = useGetPropertiesQuery();
  const [deleteProperty] = useDeletePropertyMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id).unwrap();
        // The list will automatically refetch due to RTK Query tags
      } catch (err) {
        alert(err?.data?.message || err.error || 'Error deleting property');
      }
    }
  };

  return (
    <div className="font-sans space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c] font-serif">Manage Properties</h1>
          <p className="text-gray-600 text-sm mt-1">Add, edit, or remove properties from the portal.</p>
        </div>
        <Link 
          to="/admin/properties/add" 
          className="flex items-center bg-[#D29F54] hover:bg-[#c2914c] text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-sm"
        >
          <Plus size={18} className="mr-2" />
          Add Property
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-600">Loading properties...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">{error?.data?.message || 'Failed to load properties'}</div>
        ) : properties?.length === 0 ? (
          <div className="p-8 text-center text-gray-600">No properties found. Add one to get started!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-100 uppercase text-xs font-semibold text-gray-600">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 rounded bg-gray-200 overflow-hidden">
                        <img 
                          src={property.image} 
                          alt={property.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#1a2b3c]">{property.title}</td>
                    <td className="px-6 py-4">{property.location}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        {property.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{property.priceDisplay}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link 
                        to={`/admin/properties/edit/${property._id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(property._id)}
                        className="inline-flex items-center text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
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

export default ManageProperties;
