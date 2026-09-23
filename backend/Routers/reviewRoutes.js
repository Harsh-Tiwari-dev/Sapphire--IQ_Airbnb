import express from "express";

import {
  createReview,
  getPropertyReviews,
  deleteReview,
} from "../Controller/reviewController.js";

import authMiddleware from "./Middleware/authMiddleware.js";

const router = express.Router();

// Create Review
router.post("/", authMiddleware, createReview);

// Get all reviews of a property
router.get("/:propertyId", getPropertyReviews);

// Delete Review
router.delete("/:id", authMiddleware, deleteReview);

export default router;