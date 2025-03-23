import Hotel from '../models/Hotel.js';

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get hotel by ID
// @route   GET /api/hotels/:id
// @access  Public
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new hotel
// @route   POST /api/hotels
// @access  Private/Manager
export const createHotel = async (req, res) => {
  try {
    const { name, image, title, description, rating, reviews, location, distance, price } = req.body;
    
    const hotel = await Hotel.create({
      name,
      image,
      title,
      description,
      rating,
      reviews,
      location,
      distance,
      price
    });
    
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a hotel
// @route   PUT /api/hotels/:id
// @access  Private/Manager
export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    
    if (hotel) {
      const { name, image, title, description, rating, reviews, location, distance, price } = req.body;
      
      hotel.name = name || hotel.name;
      hotel.image = image || hotel.image;
      hotel.title = title || hotel.title;
      hotel.description = description || hotel.description;
      hotel.rating = rating || hotel.rating;
      hotel.reviews = reviews || hotel.reviews;
      hotel.location = location || hotel.location;
      hotel.distance = distance || hotel.distance;
      hotel.price = price || hotel.price;
      
      const updatedHotel = await hotel.save();
      res.json(updatedHotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a hotel
// @route   DELETE /api/hotels/:id
// @access  Private/Manager
export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    
    if (hotel) {
      await hotel.destroy();
      res.json({ message: 'Hotel removed' });
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};