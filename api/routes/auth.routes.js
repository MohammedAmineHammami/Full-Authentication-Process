import express from "express";
import {
  login,
  register,
  verifyEmail,
  forgotPass,
  resetPass,
  checkAuth,
  logout,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-pass", forgotPass);
authRouter.post("/reset-pass/:resetToken", resetPass);
authRouter.get("/check-auth", checkAuth);

export default authRouter;
