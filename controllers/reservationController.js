import Reservation from '../models/Reservation.js';
import Hotel from '../models/Hotel.js';
import User from '../models/User.js';

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Manager
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Hotel,
          attributes: ['id', 'name', 'location', 'price']
        }
      ]
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user reservations
// @route   GET /api/reservations/myreservations
// @access  Private
export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Hotel,
          attributes: ['id', 'name', 'image', 'location', 'price']
        }
      ]
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reservation by ID
// @route   GET /api/reservations/:id
// @access  Private
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Hotel,
          attributes: ['id', 'name', 'image', 'location', 'price']
        }
      ]
    });
    
    // Check if reservation exists
    if (reservation) {
      // Make sure the logged in user is the owner of the reservation or a manager
      if (req.user.role === 'manager' || reservation.userId === req.user.id) {
        res.json(reservation);
      } else {
        res.status(403).json({ message: 'Not authorized to access this reservation' });
      }
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Private
export const createReservation = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, price } = req.body;
    
    // Check if hotel exists
    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    const reservation = await Reservation.create({
      userId: req.user.id,
      hotelId,
      checkIn,
      checkOut,
      price,
      status: 'confirmed'
    });
    
    const fullReservation = await Reservation.findByPk(reservation.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Hotel,
          attributes: ['id', 'name', 'image', 'location', 'price']
        }
      ]
    });
    
    res.status(201).json(fullReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update reservation status
// @route   PUT /api/reservations/:id
// @access  Private
export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const reservation = await Reservation.findByPk(req.params.id);
    
    if (reservation) {
      // Only allow managers to update or the user who made the reservation
      if (req.user.role === 'manager' || reservation.userId === req.user.id) {
        reservation.status = status || reservation.status;
        
        const updatedReservation = await reservation.save();
        res.json(updatedReservation);
      } else {
        res.status(403).json({ message: 'Not authorized to update this reservation' });
      }
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a reservation
// @route   DELETE /api/reservations/:id
// @access  Private
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    
    if (reservation) {
      // Only allow managers to delete or the user who made the reservation
      if (req.user.role === 'manager' || reservation.userId === req.user.id) {
        await reservation.destroy();
        res.json({ message: 'Reservation removed' });
      } else {
        res.status(403).json({ message: 'Not authorized to delete this reservation' });
      }
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};