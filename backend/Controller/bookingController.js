import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const {
      property,
      checkIn,
      checkOut,
      totalPrice,
    } = req.body;

    const existingProperty = await Property.findById(property);

    if (!existingProperty) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const booking = await Booking.create({
      property,
      guest: req.user._id,
      checkIn,
      checkOut,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      guest: req.user._id,
    }).populate("property");

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.guest.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to cancel this booking",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};