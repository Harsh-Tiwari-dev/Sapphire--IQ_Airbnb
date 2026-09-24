import express from "express";

import {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} from "../Controller/propertyController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Property
router.post("/", authMiddleware, createProperty);

// Get All Properties
router.get("/", getAllProperties);

// Get Single Property
router.get("/:id", getProperty);

// Update Property
router.put("/:id", authMiddleware, updateProperty);

// Delete Property
router.delete("/:id", authMiddleware, deleteProperty);

export default router;