import express from "express";

import userRoutes from "./userRoutes.js";
import propertyRoutes from "./propertyRoutes.js";
import bookingRoutes from "./bookingRoutes.js";

const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/properties", propertyRoutes);
router.use("/api/bookings", bookingRoutes);

export default router;