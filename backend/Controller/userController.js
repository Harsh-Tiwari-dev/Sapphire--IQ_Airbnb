import User from "../Models/User.js";
import bcrypt from "bcryptjs";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login User
export const loginUser = (req, res) => {
  res.status(200).json({
    message: "Login successful",
    user: req.user,
  });
};

// Logout User
export const logoutUser = (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({
          message: error.message,
        });
      }

      res.clearCookie("connect.sid");

      res.status(200).json({
        message: "Logout successful",
      });
    });
  });
};

// Get Current User
export const getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  res.status(200).json({
    user: req.user,
  });
};