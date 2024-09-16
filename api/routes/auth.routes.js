import express from "express";
import passport from "passport";
import {
  login,
  register,
  verifyEmail,
  forgotPass,
  resetPass,
  checkAuth,
  logout,
} from "../controllers/auth.controllers.js";
//jwt
const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-pass", forgotPass);
authRouter.post("/reset-pass/:resetToken", resetPass);
authRouter.get(
  "/check-auth",
  passport.authenticate("jwt", { session: false }),
  checkAuth
);
//google strategy

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3001/login",
  }),
  (req, res) => {
    console.log(req.session);
    res.redirect("http://localhost:3001/dashboard");
  }
);

//github strategy

authRouter.get("/github", passport.authenticate("github"));

authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3001/github",
  }),
  (req, res) => {
    res.redirect("http://localhost:3001/dashboard");
  }
);

//Oauth logout
authRouter.get("/oauth-logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid");
    req.session.destroy();
    res.redirect("http://localhost:3001/");
  });
});

export default authRouter;
