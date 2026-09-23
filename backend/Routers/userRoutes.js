import express from "express";
import passport from "passport";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../Controller/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post(
  "/login",
  passport.authenticate("local"),
  loginUser
);

// Logout
router.post("/logout", authMiddleware, logoutUser);

// Current logged-in user
router.get("/me", authMiddleware, getCurrentUser);

export default router;