import Testimonial from '../models/Testimonial.js';

// @desc    Get testimonials
// @route   GET /api/testimonials
// @access  Public (only approved) / Private (all for admin)
export const getTestimonials = async (req, res) => {
  try {
    const filter = {};
    
    // If not admin, only fetch approved testimonials
    if (!req.admin) {
      filter.isApproved = true;
    } else {
      // Admin might want to filter by status
      if (req.query.status === 'pending') {
        filter.isApproved = false;
      } else if (req.query.status === 'approved') {
        filter.isApproved = true;
      }
    }

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Submit a new testimonial
// @route   POST /api/testimonials
// @access  Public
export const submitTestimonial = async (req, res) => {
  try {
    const { name, role, location, text, rating } = req.body;

    let imageUrl = '';
    if (req.files && req.files.image) {
      imageUrl = req.files.image[0].location; // AWS S3 URL
    } else if (req.body.image) {
      imageUrl = req.body.image; // Fallback
    }

    if (!name || !role || !location || !text) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      location,
      text,
      rating: rating || 5,
      image: imageUrl,
      isApproved: false, // Explicitly false by default
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update testimonial approval status
// @route   PUT /api/testimonials/:id/status
// @access  Private (Admin)
export const updateTestimonialStatus = async (req, res) => {
  try {
    const { isApproved } = req.body;

    if (typeof isApproved !== 'boolean') {
      return res.status(400).json({ message: 'Please provide a boolean isApproved status' });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await testimonial.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
