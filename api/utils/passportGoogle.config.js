import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            isVerified: true,
            lastLogin: new Date(),
          });
          await user.save();
          done(null, user);
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

//persists user data inside session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//fetches session details using session id
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});
