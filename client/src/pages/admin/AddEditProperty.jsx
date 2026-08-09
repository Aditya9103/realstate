import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useCreatePropertyMutation, 
  useUpdatePropertyMutation, 
  useGetPropertyByIdQuery 
} from '../../redux/api/propertyApiSlice';
import PropertyMapPicker from '../../components/admin/PropertyMapPicker';

const AddEditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: existingProperty, isLoading: isFetching } = useGetPropertyByIdQuery(id, {
    skip: !isEditMode
  });
  
  const [createProperty, { isLoading: isCreating }] = useCreatePropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] = useUpdatePropertyMutation();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Villa',
    priceValue: '',
    priceDisplay: '',
    beds: '',
    baths: '',
    sqft: '',
    amenities: '',
    tags: [],
    status: 'Buy',
    furnishing: '',
    yearBuilt: '',
    coordinates: { lat: 28.5355, lng: 77.3910 }
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  useEffect(() => {
    if (existingProperty) {
      setFormData({
        title: existingProperty.title,
        location: existingProperty.location,
        type: existingProperty.type,
        priceValue: existingProperty.priceValue,
        priceDisplay: existingProperty.priceDisplay,
        beds: existingProperty.beds || '',
        baths: existingProperty.baths || '',
        sqft: existingProperty.sqft,
        amenities: existingProperty.amenities?.join(', ') || '',
        tags: existingProperty.tags || [],
        status: existingProperty.status,
        furnishing: existingProperty.furnishing || '',
        yearBuilt: existingProperty.yearBuilt || '',
        coordinates: existingProperty.coordinates || { lat: 28.5355, lng: 77.3910 }
      });
      setImagePreview(existingProperty.image);
      setGalleryPreviews(existingProperty.gallery || []);
    }
  }, [existingProperty]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'tags') {
      setFormData(prev => {
        if (checked) return { ...prev, tags: [...prev.tags, value] };
        return { ...prev, tags: prev.tags.filter(t => t !== value) };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'tags') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === 'coordinates') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    if (imageFile) {
      data.append('image', imageFile);
    }
    galleryFiles.forEach(file => {
      data.append('gallery', file);
    });

    try {
      if (isEditMode) {
        await updateProperty({ id, data }).unwrap();
      } else {
        await createProperty(data).unwrap();
      }
      navigate('/admin/properties');
    } catch (err) {
      alert(err?.data?.message || err.error || 'Something went wrong');
    }
  };

  if (isEditMode && isFetching) return <div className="p-8">Loading property details...</div>;

  const isLoading = isCreating || isUpdating;

  return (
    <div className="font-sans space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c] font-serif">
            {isEditMode ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Fill out the details below to publish to the portal.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-bold text-[#1a2b3c] mb-4 border-b border-gray-100 pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Property Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] outline-none" placeholder="e.g. Luxury Villa in Whitefield" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location *</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] outline-none" placeholder="e.g. Whitefield, Bangalore" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Property Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] outline-none bg-white">
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="House">House</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] outline-none bg-white">
                <option value="Buy">Buy (For Sale)</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location Map */}
        <div>
          <h3 className="text-lg font-bold text-[#1a2b3c] mb-4 border-b border-gray-100 pb-2">Map Location</h3>
          <PropertyMapPicker formData={formData} setFormData={setFormData} />
        </div>

        {/* Pricing & Size */}
        <div>
          <h3 className="text-lg font-bold text-[#1a2b3c] mb-4 border-b border-gray-100 pb-2">Pricing & Dimensions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price Value (Number) *</label>
              <input type="number" name="priceValue" value={formData.priceValue} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] outline-none" placeholder="e.g. 28500000" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price Display (Text) *</label>
              <input type="text" name="priceDisplay" value={formData.priceDisplay} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] outline-none" placeholder="e.g. ₹ 2.85 Crore" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Square Ft *</label>
              <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] outline-none" placeholder="e.g. 3200" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Year Built</label>
              <input type="number" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] outline-none" placeholder="e.g. 2021" />
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-bold text-[#1a2b3c] mb-4 border-b border-gray-100 pb-2">Features & Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bedrooms</label>
              <input type="number" name="beds" value={formData.beds} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] outline-none" placeholder="e.g. 4" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bathrooms</label>
              <input type="number" name="baths" value={formData.baths} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] outline-none" placeholder="e.g. 4" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Furnishing</label>
              <select name="furnishing" value={formData.furnishing} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] outline-none bg-white">
                <option value="">Select Furnishing</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Amenities (Comma separated)</label>
              <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:border-[#D29F54] outline-none" placeholder="Pool, Gym, Security, Balcony" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Marketing Tags</label>
              <div className="flex flex-wrap gap-4">
                {['Featured', 'Hot Deal', 'New', 'Premium'].map(tag => (
                  <label key={tag} className="flex items-center gap-2 text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      name="tags" 
                      value={tag} 
                      checked={formData.tags.includes(tag)} 
                      onChange={handleChange}
                      className="rounded text-[#D29F54] focus:ring-[#D29F54]"
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Media */}
        <div>
          <h3 className="text-lg font-bold text-[#1a2b3c] mb-4 border-b border-gray-100 pb-2">Media</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Main Property Image (Hero) {isEditMode ? '' : '*'}</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                required={!isEditMode && !formData.image && !imagePreview}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D29F54]/10 file:text-[#D29F54] hover:file:bg-[#D29F54]/20 cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-4 w-64 h-40 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Property Gallery (Multiple Images)</label>
              <input 
                type="file" 
                accept="image/*" 
                multiple
                onChange={handleGalleryChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D29F54]/10 file:text-[#D29F54] hover:file:bg-[#D29F54]/20 cursor-pointer"
              />
              {galleryPreviews.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {galleryPreviews.map((src, index) => (
                    <div key={index} className="w-32 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img src={src} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/admin/properties')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-6 py-2.5 bg-[#D29F54] text-white font-bold rounded-lg hover:bg-[#c2914c] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : isEditMode ? 'Update Property' : 'Publish Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProperty;
