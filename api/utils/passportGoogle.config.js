import passportGoogleOauth20 from "passport-google-oauth20";
import User from "../models/User.js";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const GoogleStrategy = passportGoogleOauth20.Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //create user if we don't have
        if (!user) {
          let newUser = new UserModel({
            googleId: profile.id,
            username: profile.displayName,
          });
          newUser.save();
          return cb(err, newUser);
        }
        return cb(err, user);
      });
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
