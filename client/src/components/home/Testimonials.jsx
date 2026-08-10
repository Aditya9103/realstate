import React, { useState, useEffect, useRef } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight, Users, Home, Award, Handshake, X, Loader2, Upload } from 'lucide-react';
import { useGetTestimonialsQuery, useSubmitTestimonialMutation } from '../../redux/api/testimonialApiSlice';

const Testimonials = () => {
  const { data: testimonialsData, isLoading: isFetching } = useGetTestimonialsQuery();
  const [submitTestimonial, { isLoading: isSubmitting }] = useSubmitTestimonialMutation();
  
  // Use fetched data or empty array
  const testimonials = testimonialsData?.data || [];
  
  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length).toFixed(1)
    : '5.0';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    location: '',
    text: '',
    rating: 5,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (testimonials.length <= 1) return;
    
    timerRef.current = setInterval(() => {
      handleNext();
    }, 4000);
  };

  useEffect(() => {
    if (!isHovered && !isModalOpen) {
      startTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovered, isModalOpen, testimonials.length]);

  useEffect(() => {
    if (testimonials.length > 0 && currentIndex >= testimonials.length) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex % testimonials.length);
      }, 500);
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, testimonials.length]);

  const handlePrev = () => {
    if (testimonials.length <= 1) return;
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(testimonials.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(testimonials.length - 1);
      }, 50);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (testimonials.length <= 1) return;
    if (currentIndex >= testimonials.length * 2 - 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('role', formData.role);
    submitData.append('location', formData.location);
    submitData.append('text', formData.text);
    submitData.append('rating', formData.rating);
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    try {
      await submitTestimonial(submitData).unwrap();
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({ name: '', role: '', location: '', text: '', rating: 5 });
        setImageFile(null);
        setImagePreview('');
      }, 3000);
    } catch (err) {
      console.error(err);
      setSubmitError(err?.data?.message || 'Failed to submit review. Please try again.');
    }
  };

  return (
    <section className="bg-[#fafafa] py-12 md:py-16 px-4 md:px-16 text-[#1a2b3c] font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-4">
            CLIENT TESTIMONIALS
          </h4>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a2b3c] font-serif mb-6 leading-tight">
            What Our <span className="text-[#D29F54]">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mb-6">
            Real stories from real people who found their dream properties with Luxora Real Estate.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#1a2b3c] font-bold text-lg mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className={i < Math.round(parseFloat(averageRating)) ? "text-[#D29F54] fill-[#D29F54]" : "text-gray-300 fill-gray-300"} 
                />
              ))}
            </div>
            <span className="ml-2">{averageRating}/5</span>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D29F54] hover:bg-[#b88a44] text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg shadow-[#D29F54]/20"
          >
            Leave a Review
          </button>
        </div>

        {/* Slider Section */}
        {isFetching ? (
          <div className="flex justify-center items-center h-64 mb-20">
            <Loader2 size={48} className="animate-spin text-[#D29F54]" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-gray-500 mb-20 h-32 flex items-center justify-center">
            No testimonials yet. Be the first to leave a review!
          </div>
        ) : (
          <>
            <div 
              className="relative mb-20 px-4 md:px-12"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              
              {/* Left Arrow */}
              {testimonials.length > 1 && (
                <button 
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#1a2b3c] hover:bg-[#D29F54] hover:text-white transition-all z-10"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Cards Track Container */}
              <div className="overflow-hidden">
                <div className="flex">
                  {(testimonials.length > 1 ? [...testimonials, ...testimonials, ...testimonials] : testimonials).map((testimonial, idx) => (
                    <div 
                      key={`${testimonial._id}-${idx}`} 
                      className={`w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-full h-[320px]">
                        
                        {/* Top Row: Quote Mark & Stars */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="text-[#D29F54] text-7xl font-serif leading-none h-12">
                            “
                          </div>
                          <div className="flex items-center gap-0.5 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className={i < testimonial.rating ? "text-[#D29F54] fill-[#D29F54]" : "text-gray-200 fill-gray-200"} />
                            ))}
                          </div>
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-[#1a2b3c] text-sm md:text-base leading-relaxed flex-grow font-medium">
                          {testimonial.text}
                        </p>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-gray-100 my-6"></div>

                        {/* Client Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                            {testimonial.image ? (
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                                {testimonial.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1a2b3c] text-sm leading-tight mb-1">{testimonial.name}</h4>
                            <p className="text-gray-500 text-xs mb-1">{testimonial.role}</p>
                            <div className="flex items-center text-[#D29F54] text-[10px] font-semibold">
                              <MapPin size={10} className="mr-1" /> {testimonial.location}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              {testimonials.length > 1 && (
                <button 
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#1a2b3c] hover:bg-[#D29F54] hover:text-white transition-all z-10"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Dots Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-2 mb-20">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      (currentIndex % testimonials.length) === idx 
                        ? 'w-2.5 h-2.5 bg-[#D29F54]' 
                        : 'w-2.5 h-2.5 bg-gray-200 hover:bg-[#D29F54]/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Bottom Stats Banner */}
        <div className="bg-[#fff9f0] rounded-3xl flex flex-col lg:flex-row overflow-hidden shadow-sm border border-[#f5e6ce]">
          
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 md:p-12 items-center divide-x divide-[#D29F54]/20">
            
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center mb-4">
                <Users size={24} className="text-[#D29F54]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2b3c] mb-1">2,800+</h3>
              <p className="text-gray-600 text-xs font-semibold">Happy Clients</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center mb-4">
                <Home size={24} className="text-[#D29F54]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2b3c] mb-1">5,000+</h3>
              <p className="text-gray-600 text-xs font-semibold">Properties Sold</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center mb-4">
                <Award size={24} className="text-[#D29F54]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2b3c] mb-1">10+</h3>
              <p className="text-gray-600 text-xs font-semibold">Years of Experience</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center mb-4">
                <Handshake size={24} className="text-[#D29F54]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2b3c] mb-1">25+</h3>
              <p className="text-gray-600 text-xs font-semibold">Expert Agents</p>
            </div>

          </div>

          {/* Right Image Fade */}
          <div className="w-full lg:w-[400px] h-64 lg:h-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff9f0] to-transparent z-10 hidden lg:block"></div>
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" 
              alt="Living Room" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2b3c]/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-10 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#1a2b3c] transition-colors"
            >
              <X size={24} />
            </button>
            
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star size={40} className="fill-current" />
                </div>
                <h3 className="text-3xl font-bold text-[#1a2b3c] font-serif mb-4">Thank You!</h3>
                <p className="text-gray-600 text-lg">
                  Your review has been submitted successfully and is pending approval by our team.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#1a2b3c] font-serif mb-2">Leave a Review</h3>
                <p className="text-gray-500 text-sm mb-8">Share your experience with Luxora Real Estate.</p>
                
                {submitError && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-100">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-6">
                  {/* Rating Selection */}
                  <div className="flex flex-col items-center justify-center py-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Overall Rating</span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({...formData, rating: star})}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            size={36} 
                            className={`${star <= formData.rating ? 'text-[#D29F54] fill-[#D29F54]' : 'text-gray-300 fill-gray-300'} transition-colors`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Your Role</label>
                      <input 
                        type="text" 
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        placeholder="e.g., Home Buyer, Investor"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Location</label>
                    <input 
                      type="text" 
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g., Bandra West, Mumbai"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Your Review</label>
                    <textarea 
                      required
                      rows="4"
                      value={formData.text}
                      onChange={(e) => setFormData({...formData, text: e.target.value})}
                      placeholder="Tell us about your experience..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Profile Photo (Optional)</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Upload size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <input 
                          type="file" 
                          id="review-image" 
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label 
                          htmlFor="review-image"
                          className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg cursor-pointer transition-colors border border-gray-200"
                        >
                          Choose Photo
                        </label>
                        <p className="text-xs text-gray-400 mt-1">All image types allowed. Max 5MB.</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#1a2b3c] text-white font-bold px-6 py-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mt-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
