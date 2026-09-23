import express from "express";

import userRoutes from "./userRoutes.js";
import propertyRoutes from "./propertyRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import reviewRoutes from "./reviewRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/bookings", bookingRoutes);
router.use("/reviews", reviewRoutes);

export default router;