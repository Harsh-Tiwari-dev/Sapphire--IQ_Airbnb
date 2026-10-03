import express from "express";

import {
  createReview,
  getPropertyReviews,
  deleteReview,
} from "../Controller/reviewController.js";



const router = express.Router();

// Create Review
router.post("/",  createReview);

// Get all reviews of a property
router.get("/:propertyId", getPropertyReviews);

// Delete Review
router.delete("/:id",  deleteReview);

export default router;