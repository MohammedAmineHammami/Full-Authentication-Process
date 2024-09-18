import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import GoogleUser from "../models/GoogleUser.js";
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
        const user = await GoogleUser.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new GoogleUser({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            isVerified: true,
            lastLogin: new Date(),
          });
          await newUser.save();
          return done(null, newUser);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
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
  GoogleUser.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});
