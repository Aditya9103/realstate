import Property from '../models/Property.js';

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
  try {
    const { minLat, maxLat, minLon, maxLon, type, status, price, location } = req.query;
    
    let queryConditions = {};

    // 1. Geographic Bounding Box Search (if provided)
    if (minLat && maxLat && minLon && maxLon) {
      queryConditions['coordinates.lat'] = { $gte: parseFloat(minLat), $lte: parseFloat(maxLat) };
      queryConditions['coordinates.lng'] = { $gte: parseFloat(minLon), $lte: parseFloat(maxLon) };
    } 
    // Fallback to text search if no bounding box but text is provided
    else if (location && location.trim() !== '') {
      queryConditions.location = { $regex: location, $options: 'i' };
    }

    // 2. Standard Filters
    if (type && type !== '') queryConditions.type = type;
    if (status && status !== '') queryConditions.status = status;
    
    // Price range parsing (e.g., "0-10000000")
    if (price && price !== '') {
      const [min, max] = price.split('-');
      if (min && max) {
        queryConditions.priceValue = { $gte: parseInt(min), $lte: parseInt(max) };
      }
    }

    const properties = await Property.find(queryConditions)
      .select('title type status priceDisplay priceValue location beds baths sqft image tags coordinates createdAt')
      .sort({ createdAt: -1 })
      .limit(300); // Prevent massive payloads on empty search
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Admin
export const createProperty = async (req, res) => {
  try {
    const { 
      title, location, type, priceValue, priceDisplay, 
      beds, baths, sqft, amenities, tags, status, 
      furnishing, yearBuilt, coordinates 
    } = req.body;

    let imageUrl = '';
    if (req.files && req.files.image) {
      imageUrl = req.files.image[0].location; // AWS S3 URL
    } else if (req.body.image) {
      imageUrl = req.body.image; // Fallback for simple string URL
    } else {
      return res.status(400).json({ message: 'Image is required' });
    }

    let galleryUrls = [];
    if (req.files && req.files.gallery) {
      galleryUrls = req.files.gallery.map(file => file.location);
    } else if (req.body.gallery) {
      try {
        galleryUrls = JSON.parse(req.body.gallery);
      } catch(e) {
        galleryUrls = typeof req.body.gallery === 'string' ? [req.body.gallery] : req.body.gallery;
      }
    }

    // Parse amenities if it's sent as a JSON string from form-data
    let parsedAmenities = amenities;
    if (typeof amenities === 'string') {
      try {
        parsedAmenities = JSON.parse(amenities);
      } catch (e) {
        parsedAmenities = amenities.split(',').map(a => a.trim());
      }
    }

    let parsedTags = [];
    if (tags) {
      if (typeof tags === 'string') {
        try {
          parsedTags = JSON.parse(tags);
        } catch (e) {
          parsedTags = tags.split(',').map(t => t.trim());
        }
      } else {
        parsedTags = tags;
      }
    }

    let parsedCoordinates = { lat: 28.5355, lng: 77.3910 }; // Default to Noida
    if (coordinates) {
      if (typeof coordinates === 'string') {
        try {
          parsedCoordinates = JSON.parse(coordinates);
        } catch (e) {
          // ignore
        }
      } else {
        parsedCoordinates = coordinates;
      }
    }

    const property = new Property({
      title,
      location,
      type,
      priceValue: Number(priceValue),
      priceDisplay,
      beds: beds ? Number(beds) : null,
      baths: baths ? Number(baths) : null,
      sqft: Number(sqft),
      amenities: parsedAmenities,
      tags: parsedTags,
      status,
      furnishing: furnishing || '',
      yearBuilt: yearBuilt ? Number(yearBuilt) : null,
      image: imageUrl,
      gallery: galleryUrls,
      coordinates: {
        lat: Number(parsedCoordinates.lat),
        lng: Number(parsedCoordinates.lng)
      }
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
export const updateProperty = async (req, res) => {
  try {
    const { 
      title, location, type, priceValue, priceDisplay, 
      beds, baths, sqft, amenities, tags, status, 
      furnishing, yearBuilt, coordinates 
    } = req.body;

    const property = await Property.findById(req.params.id);

    if (property) {
      property.title = title || property.title;
      property.location = location || property.location;
      property.type = type || property.type;
      property.priceValue = priceValue ? Number(priceValue) : property.priceValue;
      property.priceDisplay = priceDisplay || property.priceDisplay;
      property.beds = beds ? Number(beds) : property.beds;
      property.baths = baths ? Number(baths) : property.baths;
      property.sqft = sqft ? Number(sqft) : property.sqft;
      
      if (coordinates) {
        let parsedCoordinates = coordinates;
        if (typeof coordinates === 'string') {
          try {
            parsedCoordinates = JSON.parse(coordinates);
          } catch (e) {
            // ignore
          }
        }
        if (parsedCoordinates.lat && parsedCoordinates.lng) {
          property.coordinates = {
            lat: Number(parsedCoordinates.lat),
            lng: Number(parsedCoordinates.lng)
          };
        }
      }
      
      if (amenities) {
        let parsedAmenities = amenities;
        if (typeof amenities === 'string') {
          try {
            parsedAmenities = JSON.parse(amenities);
          } catch (e) {
            parsedAmenities = amenities.split(',').map(a => a.trim());
          }
        }
        property.amenities = parsedAmenities;
      }

      if (tags) {
        let parsedTags = tags;
        if (typeof tags === 'string') {
          try {
            parsedTags = JSON.parse(tags);
          } catch (e) {
            parsedTags = tags.split(',').map(t => t.trim());
          }
        }
        property.tags = parsedTags;
      }

      property.status = status || property.status;
      property.furnishing = furnishing !== undefined ? furnishing : property.furnishing;
      property.yearBuilt = yearBuilt ? Number(yearBuilt) : property.yearBuilt;

      if (req.files && req.files.image) {
        property.image = req.files.image[0].location;
      } else if (req.body.image) {
        property.image = req.body.image;
      }

      if (req.files && req.files.gallery) {
        const newGallery = req.files.gallery.map(file => file.location);
        property.gallery = [...property.gallery, ...newGallery];
      } else if (req.body.gallery) {
        try {
          const newGallery = JSON.parse(req.body.gallery);
          property.gallery = newGallery;
        } catch(e) {
          property.gallery = typeof req.body.gallery === 'string' ? [req.body.gallery] : req.body.gallery;
        }
      }

      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      // NOTE: Here you could add logic to delete the image from AWS S3 using aws-sdk
      await property.deleteOne();
      res.json({ message: 'Property removed' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
