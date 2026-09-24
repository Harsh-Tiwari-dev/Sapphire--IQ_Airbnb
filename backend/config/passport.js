import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, {
            message: "User not found",
          });
        }

        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordCorrect) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Store user ID in session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Get user from database using session ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;