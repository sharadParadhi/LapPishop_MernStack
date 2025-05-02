// import passport from "passport";
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(
//   new GoogleStrategy({
//     clietId: process.env.Client_Id,
//     clientSecret: process.env.Client_Secret,
//     callbackURL: "http://localhost:5000/api/v1/users/auth/google/callback",
//   },
//   (accessToken,refreshToken,profile,done) =>{
//     console.log("profile: " + profile)
//   }
// )
// );

// passport.serializeUser((user, done) => {
//   //done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     // code deserialization
// })


import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/userModel"; // Adjust path

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/user/auth/google/callback",
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
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
