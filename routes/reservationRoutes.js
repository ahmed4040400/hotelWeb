import express from 'express';
import {
  getReservations,
  getMyReservations,
  getReservationById,
  createReservation,
  updateReservationStatus,
  deleteReservation
} from '../controllers/reservationController.js';
import { protect, isManager } from '../controllers/authController.js';

const router = express.Router();

// @route   GET /api/reservations
router.route('/').get(protect, isManager, getReservations).post(protect, createReservation);

// @route   GET /api/reservations/myreservations
router.route('/myreservations').get(protect, getMyReservations);

// @route   GET/PUT/DELETE /api/reservations/:id
router
  .route('/:id')
  .get(protect, getReservationById)
  .put(protect, updateReservationStatus)
  .delete(protect, deleteReservation);

export default router;