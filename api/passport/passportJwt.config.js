import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

//custome extract token from cookie
const customExtract = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.accessToken;
    console.log(token);
  }
  return token;
};
var opts = {
  //fromExtractors() here allow us to apply custome extractor
  jwtFromRequest: ExtractJwt.fromExtractors([customExtract]),
  secretOrKey: secretKey,
};

//jwt strategy
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.user_id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
