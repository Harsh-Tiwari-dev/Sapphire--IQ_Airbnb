import express from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../Controller/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Booking
router.post("/", authMiddleware, createBooking);

// Get My Bookings
router.get("/my", authMiddleware, getMyBookings);

// Cancel Booking
router.patch("/:id/cancel", authMiddleware, cancelBooking);

export default router;