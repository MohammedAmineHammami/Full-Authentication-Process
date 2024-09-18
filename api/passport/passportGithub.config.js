import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import GithubUser from "../models/GithubUser.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
      scope: ["email", "profile"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await GithubUser.findOne({ githubId: profile.id });
        if (!user) {
          const newUser = new GithubUser({
            githubId: profile.id,
            username: profile.displayName,
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
  GithubUser.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});
