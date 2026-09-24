import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";

import connectDB from "./config/db.js";
import routes from "./Routers/index.js";

dotenv.config();

const app = express();

// MongoDB
connectDB();

// Body parser
app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});