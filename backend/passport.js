import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy({
    clietId: process.env.Client_Id,
    clientSecret: process.env.Client_Secret,
    callbackURL: "http://localhost:5000/api/v1/users/auth/google/callback",
  },
  (accessToken,refreshToken,profile,done) =>{
    console.log("profile: " + profile)
  }
)
);

passport.serializeUser((user, done) => {
  //done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // code deserialization
})