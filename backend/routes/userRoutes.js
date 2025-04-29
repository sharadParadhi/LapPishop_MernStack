import express from "express";
import {body,param} from "express-validator"
import { register,login, logout,resetPasswordReq,resetPassword } from "../controllers/userController.js";
import validationRequest from "../middleware/validator.js";
import { auth } from "../middleware/authMiddleware.js";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";





const userRoutes=express.Router();

const validator={
    checkNewUser:[
        body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email"),
        body('password').trim().isString().notEmpty().withMessage("Password is not Empty")
    ],
    checkLogin: [
        body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
        body('password').trim().isString().notEmpty().withMessage('Password is Empty')
      ],
      resetPasswordRequest: [
        body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address")
      ],
      resetPassword: [
        body('password').trim().notEmpty().withMessage('Password is Required').escape().bail()
          .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id'),
        param('token').trim().notEmpty().withMessage('Token is Required')
      ]
}


userRoutes.route('/register')
    .post(validator.checkNewUser,validationRequest,register)

userRoutes.post('/login',validator.checkLogin,validationRequest,login);
userRoutes.post('/logout',logout)
userRoutes.post('/reset-password/request',validator.resetPasswordRequest,validationRequest,resetPasswordReq)
userRoutes.post('/reset-password/reset/:id/:token',validator.resetPassword,validationRequest,resetPassword)



userRoutes.use(
  session({
    secret: process.env.Client_Secret,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
userRoutes.use(passport.initialize());
userRoutes.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Client_Id,
      clientSecret: process.env.Client_Secret,
      callbackURL: "/api/v1/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        console.log("email form google: " + email);
        console.log(profile);
        let password = Math.floor(100000 + Math.random() * 900000);
        const user = await User.findOne({ email });
        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
            console.log("User updated with googleId");
            return done(null, user);
          }
        } else {
          const newUser = new User({
            email,
            name: profile.displayName,
            googleId: profile.id,
          });

          console.log("newuser", newUser);
          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        console.log("errror", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

userRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("req.body.user-",req.user)
    // res.redirect("/"); // Redirect to frontend home page // Redirect after successful login
    res.send(req.body)
  }
);




export {userRoutes}

