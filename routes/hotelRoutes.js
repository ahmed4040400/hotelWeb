import express from 'express';
import {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
} from '../controllers/hotelController.js';
import { protect, isManager } from '../controllers/authController.js';

const router = express.Router();

// @route   GET /api/hotels
router.route('/').get(getHotels).post(protect, isManager, createHotel);

// @route   GET/PUT/DELETE /api/hotels/:id
router
  .route('/:id')
  .get(getHotelById)
  .put(protect, isManager, updateHotel)
  .delete(protect, isManager, deleteHotel);

export default router;