import Review from "../models/Review.model.js";
import Property from "../models/Property.model.js";

// Create Review
export const createReview = async (req, res) => {
  try {
    const { property, rating, comment } = req.body;

    // Check property exists
    const existingProperty = await Property.findById(property);

    if (!existingProperty) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Create review
    const review = await Review.create({
      property,
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Reviews of a Property
export const getPropertyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      property: req.params.propertyId,
    }).populate("user", "name");

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // Check ownership
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this review",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};