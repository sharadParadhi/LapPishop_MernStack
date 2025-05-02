

import express from "express";
import { body, param } from "express-validator";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import {
  register,
  login,
  logout,
  resetPasswordReq,
  resetPassword,
  updateProfile,
} from "../controllers/userController.js";
import validationRequest from "../middleware/validator.js";
import tokenGenerator from "../utils/tokenGenerateor.js";
import router from "./auth.js";
import { auth } from "../middleware/authMiddleware.js";

// Load env vars
dotenv.config();

const userRoutes = express.Router();

// ✅ 1. Validators
const validator = {
  checkNewUser: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .bail()
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("password")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Password is not Empty"),
  ],
  checkUpdateUser: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('name').trim().notEmpty().withMessage('Name is Required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  checkLogin: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .bail()
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("password")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Password is Empty"),
  ],
  resetPasswordRequest: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .bail()
      .isEmail()
      .withMessage("Please enter a valid email address"),
  ],
  resetPassword: [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is Required")
      .escape()
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    param("id")
      .exists()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("Invalid Id"),
    param("token").trim().notEmpty().withMessage("Token is Required"),
  ],
};

// ✅ 2. Normal Auth Routes
userRoutes.post(
  "/register",
  validator.checkNewUser,
  validationRequest,
  register
);
userRoutes.post("/login", validator.checkLogin, validationRequest, login);
userRoutes.post("/logout", logout);
userRoutes.post(
  "/reset-password/request",
  validator.resetPasswordRequest,
  validationRequest,
  resetPasswordReq
);
userRoutes.post(
  "/reset-password/reset/:id/:token",
  validator.resetPassword,
  validationRequest,
  resetPassword
);

userRoutes.put('/profile',validator.checkUpdateUser,validationRequest,auth,updateProfile)

// ✅ 3. Configure Express Session & Passport
userRoutes.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboardcat",
    resave: false,
    saveUninitialized: true,
  })
);

userRoutes.use(passport.initialize());
userRoutes.use(passport.session());

// ✅ 4. Google OAuth Strategy Setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Client_Id,
      clientSecret: process.env.Client_Secret,
      callbackURL: "http://localhost:5000/api/v1/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }

        const newUser = new User({
          email,
          name: profile.displayName,
          googleId: profile.id,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// ✅ 5. Google Auth Routes
userRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  async (req, res) => {
    const user = req.user;

    // ⬇️ Generate JWT
    const token = tokenGenerator(req, res, user._id);
    // Send user data in URL (you can encode for security)
    const redirectUrl = `http://localhost:3000`;

    res.redirect(redirectUrl);
  }
);

userRoutes.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000");
  });
});

export { userRoutes };
