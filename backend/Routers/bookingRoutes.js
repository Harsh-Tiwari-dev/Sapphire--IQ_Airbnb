import express from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../Controller/bookingController.js";



const router = express.Router();

// Create Booking
router.post("/",  createBooking);

// Get My Bookings
router.get("/my",  getMyBookings);

// Cancel Booking
router.patch("/:id/cancel", cancelBooking);

export default router;